// File: services/churchContent.ts
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  orderBy,
  query,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import { db } from "../lib/firebase";
import { HomeContent, MinistryItem } from "../types/churchContent";

const HOME_DOC_ID = "main";
const HOME_COLLECTION = "church_content";
const MINISTRIES_COLLECTION = "ministries";

export const defaultHomeContent: HomeContent = {
  weeklyMessage:
    "Welcome to this week at Blaze of Fire. Stay strong in faith and join us in worship.",
  serviceSchedule: "Sunday Worship - 10:00 AM\nWednesday Prayer - 7:00 PM",
  nextEvent: "Next Event: Sunday Worship Service",
  latestAnnouncement: "Latest Announcement: Welcome to our church family.",
  pastorShortNote: "Pastor's Note: Keep seeking God this week.",
};

export async function getHomeContent(): Promise<HomeContent> {
  const ref = doc(db, HOME_COLLECTION, HOME_DOC_ID);
  const snap = await getDoc(ref);

  if (!snap.exists()) {
    return defaultHomeContent;
  }

  const data = snap.data() as Partial<HomeContent>;

  return {
    weeklyMessage: data.weeklyMessage || defaultHomeContent.weeklyMessage,
    serviceSchedule: data.serviceSchedule || defaultHomeContent.serviceSchedule,
    nextEvent: data.nextEvent || defaultHomeContent.nextEvent,
    latestAnnouncement: data.latestAnnouncement || defaultHomeContent.latestAnnouncement,
    pastorShortNote: data.pastorShortNote || defaultHomeContent.pastorShortNote,
  };
}

export async function saveHomeContent(content: HomeContent): Promise<void> {
  const ref = doc(db, HOME_COLLECTION, HOME_DOC_ID);
  await setDoc(ref, content, { merge: true });
}

export async function getMinistries(): Promise<MinistryItem[]> {
  const q = query(collection(db, MINISTRIES_COLLECTION), orderBy("title", "asc"));
  const snap = await getDocs(q);

  return snap.docs.map((item) => {
    const data = item.data() as Partial<MinistryItem>;

    return {
      id: item.id,
      key: data.key || "",
      title: data.title || "",
      description: data.description || "",
      leader: data.leader || "",
      schedule: data.schedule || "",
      imageUrl: data.imageUrl || "",
    };
  });
}

export async function addMinistry(
  input: Omit<MinistryItem, "id">
): Promise<void> {
  await addDoc(collection(db, MINISTRIES_COLLECTION), input);
}

export async function updateMinistry(
  id: string,
  input: Omit<MinistryItem, "id">
): Promise<void> {
  const ref = doc(db, MINISTRIES_COLLECTION, id);
  await updateDoc(ref, {
    key: input.key,
    title: input.title,
    description: input.description,
    leader: input.leader || "",
    schedule: input.schedule || "",
    imageUrl: input.imageUrl || "",
  });
}

export async function deleteMinistry(id: string): Promise<void> {
  const ref = doc(db, MINISTRIES_COLLECTION, id);
  await deleteDoc(ref);
}