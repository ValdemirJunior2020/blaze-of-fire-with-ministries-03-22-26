// File: context/AuthContext.tsx
import React, { createContext, useContext, useEffect, useMemo, useState } from "react";
import {
  User,
  createUserWithEmailAndPassword,
  deleteUser,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  updateProfile
} from "firebase/auth";
import { doc, deleteDoc } from "firebase/firestore";
import { auth, db } from "../lib/firebase";
import { isAdminEmail } from "../constants/admin";
import { createOrUpdateUserProfile } from "../services/users";

export type AppUser = {
  uid: string;
  email: string | null;
  displayName: string | null;
  role: "admin" | "member";
};

type AuthContextType = {
  user: AppUser | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  signup: (name: string, email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  deleteMyAccount: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType | null>(null);

function toAppUser(firebaseUser: User): AppUser {
  return {
    uid: firebaseUser.uid,
    email: firebaseUser.email,
    displayName: firebaseUser.displayName,
    role: isAdminEmail(firebaseUser.email) ? "admin" : "member"
  };
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<AppUser | null>(null);
  const [loading, setLoading] = useState(true);

  const syncUser = async (firebaseUser: User | null) => {
    if (!firebaseUser) {
      setUser(null);
      return;
    }

    const normalized = toAppUser(firebaseUser);
    setUser(normalized);

    try {
      await createOrUpdateUserProfile(normalized);
    } catch (error) {
      console.error("Failed to sync user profile:", error);
    }
  };

  useEffect(() => {
    let mounted = true;

    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      try {
        if (!mounted) return;
        await syncUser(firebaseUser);
      } catch (error) {
        console.error("Auth state change failed:", error);
        if (mounted) {
          setUser(null);
        }
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    });

    return () => {
      mounted = false;
      unsubscribe();
    };
  }, []);

  const login = async (email: string, password: string) => {
    const result = await signInWithEmailAndPassword(auth, email, password);
    await syncUser(result.user);
  };

  const signup = async (name: string, email: string, password: string) => {
    const result = await createUserWithEmailAndPassword(auth, email, password);
    await updateProfile(result.user, { displayName: name });
    await result.user.reload();

    const refreshedUser = auth.currentUser ?? result.user;
    await syncUser(refreshedUser);
  };

  const logout = async () => {
    await signOut(auth);
    setUser(null);
  };

  const deleteMyAccount = async () => {
    const currentUser = auth.currentUser;

    if (!currentUser) {
      throw new Error("No logged in user found.");
    }

    try {
      await deleteDoc(doc(db, "users", currentUser.uid)).catch(() => null);
      await deleteUser(currentUser);
      setUser(null);
    } catch (error: any) {
      if (error?.code === "auth/requires-recent-login") {
        throw new Error("For security, please log out, log back in, and try deleting your account again.");
      }

      throw new Error(error?.message || "Unable to delete account.");
    }
  };

  const value = useMemo(
    () => ({ user, loading, login, signup, logout, deleteMyAccount }),
    [user, loading]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used inside AuthProvider");
  }
  return context;
}
