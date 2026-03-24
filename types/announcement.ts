// File: types/announcement.ts

export type Announcement = {
  id: string;
  title: string;
  message: string;
  language: "en" | "pt" | "both";
  createdAt: string;
  createdBy?: string;
};