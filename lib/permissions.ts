// User roles and permissions
export type UserRole = "user" | "admin" | "moderator";

export interface UserPermissions {
  canEditProfile: boolean;
  canUploadFiles: boolean;
  canAccessAnalytics: boolean;
  canManageTeam: boolean;
  canAccessAPI: boolean;
}

export const ROLE_PERMISSIONS: Record<UserRole, UserPermissions> = {
  user: {
    canEditProfile: true,
    canUploadFiles: true,
    canAccessAnalytics: false,
    canManageTeam: false,
    canAccessAPI: false,
  },
  moderator: {
    canEditProfile: true,
    canUploadFiles: true,
    canAccessAnalytics: true,
    canManageTeam: true,
    canAccessAPI: false,
  },
  admin: {
    canEditProfile: true,
    canUploadFiles: true,
    canAccessAnalytics: true,
    canManageTeam: true,
    canAccessAPI: true,
  },
};

export function hasPermission(
  role: UserRole,
  permission: keyof UserPermissions,
): boolean {
  return ROLE_PERMISSIONS[role][permission];
}
