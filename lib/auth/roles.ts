import { Role } from "@/types/user";

export const ROLES: Record<Role, Role> = {
  ADMIN: 'ADMIN',
  MUSYRIF: 'MUSYRIF',
  SANTRI: 'SANTRI',
};

export const canAccess = (userRole: Role, allowedRoles: Role[]) => {
  return allowedRoles.includes(userRole);
};
