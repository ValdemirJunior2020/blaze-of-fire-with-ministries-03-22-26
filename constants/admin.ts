// File: constants/admin.ts
export const ADMIN_EMAIL = "marcelo@blazeoffire.com";

export function isAdminEmail(email?: string | null) {
  return (email || "").trim().toLowerCase() === ADMIN_EMAIL.toLowerCase();
}