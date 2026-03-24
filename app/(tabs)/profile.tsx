// File: app/(tabs)/profile.tsx
import React from "react";
import { Alert, Platform, Pressable, Text, View } from "react-native";
import { router } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import AppShell from "../../components/AppShell";
import BrandHeader from "../../components/BrandHeader";
import GoldButton from "../../components/GoldButton";
import { useAuth } from "../../context/AuthContext";
import { theme } from "../../constants/theme";
import { isAdminEmail } from "../../constants/admin";

export default function ProfileScreen() {
  const { user, logout, deleteMyAccount } = useAuth();

  const confirmDelete = async () => {
    const runDelete = async () => {
      try {
        await deleteMyAccount();

        if (Platform.OS === "web") {
          window.alert("Your account was deleted.");
        } else {
          Alert.alert("Account deleted", "Your account was deleted.");
        }

        router.replace("/login");
      } catch (error: any) {
        const message = error?.message || "Could not delete account.";

        if (Platform.OS === "web") {
          window.alert(message);
        } else {
          Alert.alert("Delete failed", message);
        }
      }
    };

    if (Platform.OS === "web") {
      const ok = window.confirm(
        "Are you sure you want to permanently delete your account?"
      );
      if (ok) await runDelete();
      return;
    }

    Alert.alert(
      "Delete account",
      "Are you sure you want to permanently delete your account?",
      [
        { text: "Cancel", style: "cancel" },
        { text: "Delete", style: "destructive", onPress: () => void runDelete() }
      ]
    );
  };

  if (!user) {
    return (
      <AppShell>
        <BrandHeader size="sm" />

        <View
          style={{
            backgroundColor: "rgba(17,17,17,0.92)",
            borderWidth: 1,
            borderColor: theme.colors.border,
            borderRadius: 24,
            padding: 20
          }}
        >
          <Text
            style={{
              color: theme.colors.gold,
              fontFamily: "CinzelBold",
              fontSize: 24,
              marginBottom: 14
            }}
          >
            Profile
          </Text>

          <Text
            style={{
              color: theme.colors.text,
              fontFamily: "MontserratMedium",
              fontSize: 15,
              lineHeight: 24,
              marginBottom: 16
            }}
          >
            You are not logged in yet.
          </Text>

          <GoldButton title="Login" onPress={() => router.push("/login")} />
          <View style={{ height: 12 }} />
          <GoldButton title="Create Account" onPress={() => router.push("/signup")} />
        </View>
      </AppShell>
    );
  }

  return (
    <AppShell>
      <BrandHeader size="sm" />

      <View
        style={{
          backgroundColor: "rgba(17,17,17,0.92)",
          borderWidth: 1,
          borderColor: theme.colors.border,
          borderRadius: 24,
          padding: 20
        }}
      >
        <Text
          style={{
            color: theme.colors.gold,
            fontFamily: "CinzelBold",
            fontSize: 24,
            marginBottom: 14
          }}
        >
          Profile
        </Text>

        <Text
          style={{
            color: theme.colors.text,
            fontFamily: "MontserratMedium",
            fontSize: 16,
            marginBottom: 8
          }}
        >
          Name: {user.displayName || "N/A"}
        </Text>

        <Text
          style={{
            color: theme.colors.text,
            fontFamily: "MontserratMedium",
            fontSize: 16,
            marginBottom: 8
          }}
        >
          Email: {user.email || "N/A"}
        </Text>

        <Text
          style={{
            color: theme.colors.text,
            fontFamily: "MontserratMedium",
            fontSize: 16,
            marginBottom: 18
          }}
        >
          Role: {user.role || "member"}
        </Text>

        {isAdminEmail(user.email) ? (
          <Pressable
            onPress={() => router.push("/(tabs)/admin-prayer-requests")}
            style={{
              flexDirection: "row",
              alignItems: "center",
              gap: 12,
              backgroundColor: "rgba(212,175,55,0.12)",
              borderWidth: 1,
              borderColor: theme.colors.border,
              borderRadius: 18,
              paddingVertical: 14,
              paddingHorizontal: 16,
              marginBottom: 16
            }}
          >
            <Ionicons name="shield-checkmark" size={24} color={theme.colors.gold} />
            <View style={{ flex: 1 }}>
              <Text
                style={{
                  color: theme.colors.gold,
                  fontFamily: "MontserratBold",
                  fontSize: 16,
                  marginBottom: 2
                }}
              >
                Open Admin Prayer Requests
              </Text>
              <Text
                style={{
                  color: theme.colors.text,
                  fontFamily: "MontserratMedium",
                  fontSize: 12
                }}
              >
                View and manage saved prayer requests
              </Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color={theme.colors.gold} />
          </Pressable>
        ) : null}

        <GoldButton title="Logout" onPress={logout} />
        <View style={{ height: 12 }} />
        <GoldButton title="Delete My Account" onPress={confirmDelete} />
      </View>
    </AppShell>
  );
}