// File: types/user.ts

export type AppUser = {
  uid: string;
  email: string | null;
  displayName: string | null;
  role: "admin" | "member";
};