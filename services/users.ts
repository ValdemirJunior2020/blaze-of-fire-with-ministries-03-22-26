// File: services/users.ts

import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "../lib/firebase";

export async function createOrUpdateUserProfile(data: {
  uid: string;
  email: string | null;
  displayName: string | null;
  role: "admin" | "member";
}) {
  const ref = doc(db, "users", data.uid);
  const snap = await getDoc(ref);

  if (!snap.exists()) {
    await setDoc(ref, {
      ...data,
      createdAt: new Date().toISOString()
    });
    return;
  }

  await setDoc(
    ref,
    {
      ...data
    },
    { merge: true }
  );
}