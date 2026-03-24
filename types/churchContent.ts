// File: types/churchContent.ts
export type HomeContent = {
  weeklyMessage: string;
  serviceSchedule: string;
  nextEvent: string;
  latestAnnouncement: string;
  pastorShortNote: string;
};

export type MinistryItem = {
  id: string;
  key: string;
  title: string;
  description: string;
  leader?: string;
  schedule?: string;
  imageUrl?: string;
};