import { CookieOptions, Request, Response } from "express";

import { env } from "../../config/env";

export function getRefreshCookieOptions(): CookieOptions {
  return {
    httpOnly: true,
    secure: env.isProduction,
    sameSite: "strict",
    path: "/api/auth",
    maxAge: env.refreshTokenTtlDays * 24 * 60 * 60 * 1000
  };
}
// "/api/auth" and /auth is too restrictive incase we want to use the refresh token cookie for other endpoints in the future, but we don't want it sent with every request to the frontend. We can adjust this if needed when we implement the refresh token rotation and endpoint.
// Note: This function should only be used to set the refresh token cookie, as it applies the appropriate options for security and functionality. For other cookies, use res.cookie() with custom options as needed.

export function setRefreshTokenCookie(res: Response, token: string): void {
  res.cookie(env.refreshCookieName, token, getRefreshCookieOptions());
}

export function clearRefreshTokenCookie(res: Response): void {
  res.clearCookie(env.refreshCookieName, getRefreshCookieOptions());
}

export function getCookieValue(req: Request, name: string): string | undefined {
  const cookieHeader = req.headers.cookie;

  if (!cookieHeader) {
    return undefined;
  }

  const cookies = cookieHeader.split(";").map((cookie) => cookie.trim());
  const match = cookies.find((cookie) => cookie.startsWith(`${name}=`));

  return match ? decodeURIComponent(match.split("=").slice(1).join("=")) : undefined;
}
