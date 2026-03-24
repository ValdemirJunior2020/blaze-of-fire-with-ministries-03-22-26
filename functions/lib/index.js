// File: functions/src/index.ts
import { onDocumentCreated } from "firebase-functions/v2/firestore";
import { initializeApp } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";
import fetch from "node-fetch";
initializeApp();
export const notifyAdminOnPrayerRequest = onDocumentCreated("prayer_requests/{requestId}", async (event) => {
    const snapshot = event.data;
    if (!snapshot)
        return;
    const prayer = snapshot.data();
    const db = getFirestore();
    const devicesSnapshot = await db.collection("admin_devices").get();
    const tokens = devicesSnapshot.docs
        .map((docSnap) => docSnap.data())
        .map((item) => item.expoPushToken)
        .filter((token) => Boolean(token));
    if (!tokens.length) {
        console.log("No admin tokens found.");
        return;
    }
    const messages = tokens.map((token) => ({
        to: token,
        sound: "default",
        title: "New Prayer Request",
        body: `${prayer.name || "Someone"} sent a prayer request`,
        data: {
            screen: "/admin/prayer-requests",
            requestId: snapshot.id,
            email: prayer.email || "",
            private: Boolean(prayer.isPrivate)
        }
    }));
    const response = await fetch("https://exp.host/--/api/v2/push/send", {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Accept-encoding": "gzip, deflate",
            "Content-Type": "application/json"
        },
        body: JSON.stringify(messages)
    });
    const result = await response.text();
    console.log("Expo push response:", result);
});
