// File: types/devotional.ts

export type Devotional = {
  id: string;
  title: string;
  verse: string;
  reference: string;
  message: string;
  language: "en" | "pt" | "both";
  createdAt: string;
  createdBy?: string;
};