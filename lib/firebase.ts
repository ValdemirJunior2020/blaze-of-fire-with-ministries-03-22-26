// File: lib/firebase.ts
import { FirebaseApp, getApp, getApps, initializeApp } from "firebase/app";
import { Auth, getAuth } from "firebase/auth";
import { Firestore, getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAZN3VywbCzIqqkzfExgeCd3S03toXBHK4",
  authDomain: "blaze-of-fire2026.firebaseapp.com",
  projectId: "blaze-of-fire2026",
  storageBucket: "blaze-of-fire2026.firebasestorage.app",
  messagingSenderId: "1056960355616",
  appId: "1:1056960355616:web:47769c9c3a152ddccb4b45",
  measurementId: "G-K3PVJWYR5Y"
};

const app: FirebaseApp = getApps().length ? getApp() : initializeApp(firebaseConfig);
const auth: Auth = getAuth(app);
const db: Firestore = getFirestore(app);

export { app, auth, db };