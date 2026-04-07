import { NextFunction, Request, Response } from "express";

import { AppError } from "../shared/errors/app-error";
import { UserRole } from "../shared/constants/auth";
import { verifyAccessToken } from "../shared/utils/token";

export function authenticate(req: Request, _res: Response, next: NextFunction): void {
  const authorizationHeader = req.headers.authorization;

  if (!authorizationHeader?.startsWith("Bearer ")) {
    next(new AppError(401, "Authentication required.", "UNAUTHORIZED"));
    return;
  }

  const token = authorizationHeader.slice("Bearer ".length);

  try {
    const payload = verifyAccessToken(token);

    if (payload.status !== "ACTIVE") {
      next(new AppError(403, "Your account is not active.", "ACCOUNT_NOT_ACTIVE"));
      return;
    }

    req.user = payload;
    next();
  } catch (_error) {
    next(new AppError(401, "Invalid or expired access token.", "UNAUTHORIZED"));
  }
}

export function authorize(...roles: UserRole[]) {
  return (req: Request, _res: Response, next: NextFunction): void => {
    if (!req.user) {
      next(new AppError(401, "Authentication required.", "UNAUTHORIZED"));
      return;
    }

    if (!roles.includes(req.user.role)) {
      next(new AppError(403, "You do not have permission to perform this action.", "FORBIDDEN"));
      return;
    }

    next();
  };
}
