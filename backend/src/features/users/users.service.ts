import { prisma } from "../../config/prisma-client";
import { UserRole, UserStatus } from "../../shared/constants/auth";

export interface CreateUserInput {
  name: string;
  email: string;
}

export const usersService = {
  listUsers: async () => "This is usersService.listUsers endpoint.",

  getUserById: async (_input: { userId: string }) =>
    "This is usersService.getUserById endpoint.",

  isDuplicateEmailError: (error: unknown) => {
    return (
      error &&
      typeof error === "object" &&
      "code" in error &&
      error.code === "P2002"
    );
  },

  updateUserAccess: async (_input: {
    userId: string;
    role?: UserRole;
    status?: UserStatus;
  }) => "This is usersService.updateUserAccess endpoint."
};
