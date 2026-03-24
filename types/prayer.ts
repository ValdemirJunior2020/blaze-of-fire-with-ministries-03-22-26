// File: types/prayer.ts

export type PrayerRequest = {
  id: string;
  userId: string;
  name: string;
  email: string;
  request: string;
  isPrivate: boolean;
  status: "new" | "praying" | "completed";
  createdAt: string;
};