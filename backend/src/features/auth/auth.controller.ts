import { Request, Response } from "express";

import { env } from "../../config/env";
import { AppError } from "../../shared/errors/app-error";
import { requireEmail, requirePassword, requireString } from "../../shared/validation/request";
import {
  clearRefreshTokenCookie,
  getCookieValue,
  setRefreshTokenCookie
} from "../../shared/utils/cookies";
import { asyncHandler } from "../../shared/utils/async-handler";
import { authService } from "./auth.service";

function getClientIp(req: Request): string | undefined {
  const forwardedFor = req.headers["x-forwarded-for"];

  if (typeof forwardedFor === "string") {
    return forwardedFor.split(",")[0]?.trim();
  }

  return req.socket.remoteAddress;
}

function getRefreshTokenFromRequest(req: Request): string | undefined {
  return (
    getCookieValue(req, env.refreshCookieName) ??
    (typeof req.body?.refreshToken === "string" ? req.body.refreshToken : undefined)
  );
}

export const authController = {
  register: asyncHandler(async (req: Request, res: Response) => {
    const body = req.body as Record<string, unknown>;
    const result = await authService.register({
      firstName: requireString(body.firstName, "firstName", { maxLength: 80 }),
      lastName: requireString(body.lastName, "lastName", { maxLength: 80 }),
      username: requireString(body.username, "username", { maxLength: 80 }),
      email: requireEmail(body.email),
      password: requirePassword(body.password)
    });

    const statusCode = result.alreadyExists ? 200 : 201;
    const message = result.alreadyExists
      ? result.verificationEmailSent
        ? "Account already exists and is pending verification. A new verification email was sent."
        : "Account already exists and is pending verification, but email delivery failed. Use resend verification endpoint."
      : result.verificationEmailSent
        ? "Account created successfully. Verification email sent."
        : "Account created successfully, but verification email delivery failed. Use resend verification endpoint.";

    return res.status(statusCode).json({
      message,
      data: {
        ...result,
        resendVerificationEndpoint: "/api/auth/resend-verification"
      }
    });
  }),

  login: asyncHandler(async (req: Request, res: Response) => {
    const body = req.body as Record<string, unknown>;
    const result = await authService.login({
      email: requireString(body.email, "email"),
      password: requirePassword(body.password),
      userAgent: req.headers["user-agent"],
      ipAddress: getClientIp(req)
    });

    setRefreshTokenCookie(res, result.refreshToken);

    return res.status(200).json({
      message: "Login successful.",
      data: {
        user: result.user,
        accessToken: result.accessToken
      }
    });
  }),

  refresh: asyncHandler(async (req: Request, res: Response) => {
    const refreshToken = getRefreshTokenFromRequest(req);

    if (!refreshToken) {
      throw new AppError(401, "Refresh token is required.", "UNAUTHORIZED");
    }

    const result = await authService.refreshSession({
      refreshToken,
      userAgent: req.headers["user-agent"],
      ipAddress: getClientIp(req)
    });

    setRefreshTokenCookie(res, result.refreshToken);

    return res.status(200).json({
      message: "Session refreshed successfully.",
      data: {
        user: result.user,
        accessToken: result.accessToken
      }
    });
  }),

  logout: asyncHandler(async (req: Request, res: Response) => {
    const refreshToken = getRefreshTokenFromRequest(req);

    if (refreshToken) {
      await authService.logout({ refreshToken });
    }

    clearRefreshTokenCookie(res);

    return res.status(200).json({
      message: "Logout successful."
    });
  }),

  forgotPassword: asyncHandler(async (req: Request, res: Response) => {
    const body = req.body as Record<string, unknown>;

    await authService.forgotPassword({
      email: requireEmail(body.email)
    });

    return res.status(200).json({
      message: "If the account exists, a password reset email has been sent."
    });
  }),

  resetPassword: asyncHandler(async (req: Request, res: Response) => {
    const body = req.body as Record<string, unknown>;

    await authService.resetPassword({
      token: requireString(body.token, "token"),
      password: requirePassword(body.password)
    });

    clearRefreshTokenCookie(res);

    return res.status(200).json({
      message: "Password reset successful."
    });
  }),

  verifyEmail: asyncHandler(async (req: Request, res: Response) => {
    const body = req.body as Record<string, unknown>;

    await authService.verifyEmail({
      token: requireString(body.token, "token")
    });

    return res.status(200).json({
      message: "Email verified successfully."
    });
  }),

  resendVerificationEmail: asyncHandler(async (req: Request, res: Response) => {
    const body = req.body as Record<string, unknown>;

    await authService.resendVerificationEmail({
      email: requireEmail(body.email)
    });

    return res.status(200).json({
      message: "Verification email sent if the account is eligible."
    });
  }),

  me: asyncHandler(async (req: Request, res: Response) => {
    if (!req.user) {
      throw new AppError(401, "Authentication required.", "UNAUTHORIZED");
    }

    const profile = await authService.getProfile({ userId: req.user.sub });

    return res.status(200).json({
      message: "Profile fetched successfully.",
      data: profile
    });
  }),

  changePassword: asyncHandler(async (req: Request, res: Response) => {
    if (!req.user) {
      throw new AppError(401, "Authentication required.", "UNAUTHORIZED");
    }

    const body = req.body as Record<string, unknown>;

    await authService.changePassword({
      userId: req.user.sub,
      currentPassword: requirePassword(body.currentPassword, "currentPassword"),
      newPassword: requirePassword(body.newPassword, "newPassword")
    });

    return res.status(200).json({
      message: "Password updated successfully."
    });
  })
};
