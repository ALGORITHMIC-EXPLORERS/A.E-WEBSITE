import { UserRole, UserStatus } from "../../shared/constants/auth";

export const usersService = {
  listUsers: async () => "This is usersService.listUsers endpoint.",

  getUserById: async (_input: { userId: string }) =>
    "This is usersService.getUserById endpoint.",

  updateUserAccess: async (_input: {
    userId: string;
    role?: UserRole;
    status?: UserStatus;
  }) => "This is usersService.updateUserAccess endpoint."
};
