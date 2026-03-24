// File: services/testimonies.ts
import {
  addDoc,
  collection,
  getDocs,
  orderBy,
  query,
  serverTimestamp,
  where
} from "firebase/firestore";
import { db } from "../lib/firebase";
import { Testimony } from "../types/testimony";

const testimoniesRef = collection(db, "testimonies");

export async function submitTestimony(data: {
  userId: string;
  name: string;
  title: string;
  message: string;
}) {
  await addDoc(testimoniesRef, {
    ...data,
    approved: false,
    createdAt: new Date().toISOString(),
    serverCreatedAt: serverTimestamp()
  });
}

export async function getApprovedTestimonies(): Promise<Testimony[]> {
  const q = query(
    testimoniesRef,
    where("approved", "==", true),
    orderBy("serverCreatedAt", "desc")
  );

  const snapshot = await getDocs(q);

  return snapshot.docs.map((item) => ({
    id: item.id,
    ...(item.data() as Omit<Testimony, "id">)
  }));
}