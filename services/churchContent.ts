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

export const defaultMinistries: MinistryItem[] = [
  {
    id: "default-apostolic",
    key: "apostle",
    title: "Apostolic Ministry",
    description:
      "Strengthening the church foundation with prayer, vision, and spiritual leadership.",
    leader: "Apostle Marcelo",
    schedule: "Leadership gatherings",
    imageUrl: "",
  },
  {
    id: "default-prophetic",
    key: "prophets",
    title: "Prophetic Ministry",
    description:
      "Encouraging the church through discernment, intercession, and spiritual direction.",
    leader: "Prophetic Team",
    schedule: "Prayer nights and special services",
    imageUrl: "",
  },
  {
    id: "default-evangelism",
    key: "evangelists",
    title: "Evangelism",
    description:
      "Reaching souls with the Gospel through outreach, compassion, and community impact.",
    leader: "Evangelism Team",
    schedule: "Weekend outreach",
    imageUrl: "",
  },
  {
    id: "default-teaching",
    key: "teachers",
    title: "Teaching Ministry",
    description:
      "Helping believers grow in biblical truth, discipleship, and daily application of the Word.",
    leader: "Teaching Team",
    schedule: "Bible study during the week",
    imageUrl: "",
  },
  {
    id: "default-worship",
    key: "music",
    title: "Worship & Music",
    description:
      "Leading the church into the presence of God through praise, worship, and excellence.",
    leader: "Worship Team",
    schedule: "Rehearsals during the week",
    imageUrl: "",
  },
  {
    id: "default-children",
    key: "children",
    title: "Children's Ministry",
    description:
      "Guiding children in faith with love, biblical teaching, and a joyful environment.",
    leader: "Children's Team",
    schedule: "Sunday service",
    imageUrl: "",
  },
];

function withTimeout<T>(promise: Promise<T>, ms = 4000): Promise<T> {
  return new Promise<T>((resolve, reject) => {
    const timer = setTimeout(() => {
      reject(new Error(`Request timed out after ${ms}ms`));
    }, ms);

    promise
      .then((value) => {
        clearTimeout(timer);
        resolve(value);
      })
      .catch((error) => {
        clearTimeout(timer);
        reject(error);
      });
  });
}

export async function getHomeContent(): Promise<HomeContent> {
  try {
    const ref = doc(db, HOME_COLLECTION, HOME_DOC_ID);
    const snap = await withTimeout(getDoc(ref), 4000);

    if (!snap.exists()) {
      return defaultHomeContent;
    }

    const data = snap.data() as Partial<HomeContent>;

    return {
      weeklyMessage: data.weeklyMessage || defaultHomeContent.weeklyMessage,
      serviceSchedule: data.serviceSchedule || defaultHomeContent.serviceSchedule,
      nextEvent: data.nextEvent || defaultHomeContent.nextEvent,
      latestAnnouncement:
        data.latestAnnouncement || defaultHomeContent.latestAnnouncement,
      pastorShortNote: data.pastorShortNote || defaultHomeContent.pastorShortNote,
    };
  } catch (error) {
    console.error("getHomeContent failed, using defaults:", error);
    return defaultHomeContent;
  }
}

export async function saveHomeContent(content: HomeContent): Promise<void> {
  const ref = doc(db, HOME_COLLECTION, HOME_DOC_ID);
  await setDoc(ref, content, { merge: true });
}

export async function getMinistries(): Promise<MinistryItem[]> {
  try {
    const q = query(collection(db, MINISTRIES_COLLECTION), orderBy("title", "asc"));
    const snap = await withTimeout(getDocs(q), 4000);

    if (snap.empty) {
      return defaultMinistries;
    }

    const items = snap.docs.map((item) => {
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

    return items.length ? items : defaultMinistries;
  } catch (error) {
    console.error("getMinistries failed, using default ministries:", error);
    return defaultMinistries;
  }
}

export async function addMinistry(input: Omit<MinistryItem, "id">): Promise<void> {
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