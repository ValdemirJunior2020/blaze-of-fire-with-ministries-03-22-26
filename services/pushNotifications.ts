// File: services/pushNotifications.ts
import { Platform } from "react-native";
import * as Device from "expo-device";
import * as Notifications from "expo-notifications";
import { doc, setDoc, serverTimestamp } from "firebase/firestore";
import { db } from "../lib/firebase";
import { isAdminEmail } from "../constants/admin";

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowBanner: true,
    shouldShowList: true,
    shouldPlaySound: true,
    shouldSetBadge: false
  })
});

export async function registerAdminForPushNotifications(
  userId: string,
  email: string
) {
  if (!isAdminEmail(email)) return null;
  if (Platform.OS === "web") return null;
  if (!Device.isDevice) return null;

  const { status: existingStatus } = await Notifications.getPermissionsAsync();
  let finalStatus = existingStatus;

  if (existingStatus !== "granted") {
    const { status } = await Notifications.requestPermissionsAsync();
    finalStatus = status;
  }

  if (finalStatus !== "granted") {
    throw new Error("Push notification permission was not granted.");
  }

  const projectId =
    process.env.EXPO_PUBLIC_PROJECT_ID ||
    process.env.REACT_APP_EXPO_PROJECT_ID ||
    "";

  const tokenResult = await Notifications.getExpoPushTokenAsync(
    projectId ? { projectId } : undefined
  );

  const token = tokenResult.data;

  await setDoc(
    doc(db, "admin_devices", userId),
    {
      userId,
      email,
      expoPushToken: token,
      platform: Platform.OS,
      updatedAt: serverTimestamp()
    },
    { merge: true }
  );

  return token;
}