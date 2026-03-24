// File: services/announcements.ts
import {
  addDoc,
  collection,
  getDocs,
  orderBy,
  query,
  serverTimestamp
} from "firebase/firestore";
import { db } from "../lib/firebase";

export type AnnouncementItem = {
  id: string;
  title: string;
  message: string;
  language?: "en" | "pt" | "both";
  createdBy?: string;
  createdAt?: string;
};

type CreateAnnouncementInput = {
  title: string;
  message: string;
  language?: "en" | "pt" | "both";
  createdBy?: string;
};

const announcementsRef = collection(db, "announcements");

export async function createAnnouncement(input: CreateAnnouncementInput) {
  await addDoc(announcementsRef, {
    title: input.title || "",
    message: input.message || "",
    language: input.language || "en",
    createdBy: input.createdBy || "",
    createdAt: new Date().toISOString(),
    serverCreatedAt: serverTimestamp()
  });
}

export async function getAnnouncements(): Promise<AnnouncementItem[]> {
  const q = query(announcementsRef, orderBy("serverCreatedAt", "desc"));
  const snapshot = await getDocs(q);

  return snapshot.docs.map((item) => {
    const data = item.data() as Omit<AnnouncementItem, "id"> & {
      serverCreatedAt?: { toDate?: () => Date };
    };

    return {
      id: item.id,
      title: data.title || "",
      message: data.message || "",
      language: data.language || "en",
      createdBy: data.createdBy || "",
      createdAt:
        typeof data.createdAt === "string"
          ? data.createdAt
          : typeof data.serverCreatedAt?.toDate === "function"
            ? data.serverCreatedAt.toDate().toISOString()
            : new Date().toISOString()
    };
  });
}