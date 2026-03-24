// File: services/users.ts
import {
  collection,
  doc,
  onSnapshot,
  serverTimestamp,
  setDoc,
} from "firebase/firestore";
import { db } from "../lib/firebase";

export type PublicUser = {
  uid: string;
  email: string;
  displayName: string;
  role: "admin" | "member";
  createdAt?: unknown;
};

export async function createOrUpdateUserProfile(user: {
  uid: string;
  email: string | null;
  displayName: string | null;
  role: "admin" | "member";
}) {
  const ref = doc(db, "users", user.uid);

  await setDoc(
    ref,
    {
      uid: user.uid,
      email: user.email || "",
      displayName: user.displayName || "Member",
      role: user.role,
      updatedAt: serverTimestamp(),
      createdAt: serverTimestamp(),
    },
    { merge: true }
  );
}

export function subscribeToUsers(
  onData: (users: PublicUser[]) => void,
  onError?: (error: Error) => void
) {
  const ref = collection(db, "users");

  return onSnapshot(
    ref,
    (snapshot) => {
      const users: PublicUser[] = snapshot.docs
        .map((item) => {
          const data = item.data() as Partial<PublicUser>;

          return {
            uid: data.uid || item.id,
            email: data.email || "",
            displayName: data.displayName || "Member",
            role: data.role === "admin" ? "admin" : "member",
            createdAt: data.createdAt,
          };
        })
        .sort((a, b) =>
          (a.displayName || "").localeCompare(b.displayName || "")
        );

      onData(users);
    },
    (error) => {
      console.error("Failed to load users:", error);
      if (onError) {
        onError(error);
      }
    }
  );
}