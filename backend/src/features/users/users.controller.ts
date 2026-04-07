import { Request, Response } from "express";

import { asyncHandler } from "../../shared/utils/async-handler";
import { optionalString, requireParam } from "../../shared/validation/request";
import { UserRole, UserStatus } from "../../shared/constants/auth";
import { AppError } from "../../shared/errors/app-error";
import { usersService } from "./users.service";

function parseRole(value: string | undefined): UserRole | undefined {
  if (!value) {
    return undefined;
  }

  const normalized = value.toUpperCase() as UserRole;
  const roles: UserRole[] = ["STUDENT", "ADMIN", "SUPER_ADMIN"];

  if (!roles.includes(normalized)) {
    throw new AppError(400, "role is invalid.", "VALIDATION_ERROR");
  }

  return normalized;
}

function parseStatus(value: string | undefined): UserStatus | undefined {
  if (!value) {
    return undefined;
  }

  const normalized = value.toUpperCase() as UserStatus;
  const statuses: UserStatus[] = [
    "PENDING_VERIFICATION",
    "ACTIVE",
    "SUSPENDED",
    "DEACTIVATED"
  ];

  if (!statuses.includes(normalized)) {
    throw new AppError(400, "status is invalid.", "VALIDATION_ERROR");
  }

  return normalized;
}

export const usersController = {
  listUsers: asyncHandler(async (_req: Request, res: Response) => {
    const users = await usersService.listUsers();

    return res.status(200).json({
      message: "Users fetched successfully.",
      data: users
    });
  }),

  getUser: asyncHandler(async (req: Request, res: Response) => {
    const user = await usersService.getUserById({
      userId: requireParam(req.params.userId, "userId")
    });

    return res.status(200).json({
      message: "User fetched successfully.",
      data: user
    });
  }),

  updateUserAccess: asyncHandler(async (req: Request, res: Response) => {
    const body = req.body as Record<string, unknown>;
    const user = await usersService.updateUserAccess({
      userId: requireParam(req.params.userId, "userId"),
      role: parseRole(optionalString(body.role)),
      status: parseStatus(optionalString(body.status))
    });

    return res.status(200).json({
      message: "User access updated successfully.",
      data: user
    });
  })
};
