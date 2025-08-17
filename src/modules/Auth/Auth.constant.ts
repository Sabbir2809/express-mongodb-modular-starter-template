export const AUTH_ROLES = {
  user: "USER",
  admin: "ADMIN",
  super_admin: "SUPER_ADMIN",
} as const;

export const ALL_USER_ROLES = Object.values(AUTH_ROLES);
