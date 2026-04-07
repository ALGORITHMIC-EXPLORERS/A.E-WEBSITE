export const USER_ROLES = ["STUDENT", "ADMIN", "SUPER_ADMIN"] as const;
export const USER_STATUSES = [
  "PENDING_VERIFICATION",
  "ACTIVE",
  "SUSPENDED",
  "DEACTIVATED"
] as const;

export type UserRole = (typeof USER_ROLES)[number];
export type UserStatus = (typeof USER_STATUSES)[number];
