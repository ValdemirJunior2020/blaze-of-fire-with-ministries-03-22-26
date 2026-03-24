// File: constants/admin.ts
export const ADMIN_EMAIL = "marcelo@blazeoffire.com";
export const ADMIN_PASSWORD = "123456";

export function isAdminEmail(email?: string | null) {
  return (email || "").trim().toLowerCase() === ADMIN_EMAIL.toLowerCase();
}