// File: app/(tabs)/admin.tsx
import React from "react";
import { Redirect, router } from "expo-router";
import { Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import AppShell from "../../components/AppShell";
import BrandHeader from "../../components/BrandHeader";
import GoldButton from "../../components/GoldButton";
import { theme } from "../../constants/theme";
import { useAuth } from "../../context/AuthContext";
import { isAdminEmail } from "../../constants/admin";

function AdminActionCard({
  icon,
  title,
  description,
  buttonText,
  onPress,
}: {
  icon: keyof typeof Ionicons.glyphMap;
  title: string;
  description: string;
  buttonText: string;
  onPress: () => void;
}) {
  return (
    <View
      style={{
        backgroundColor: "rgba(17,17,17,0.92)",
        borderWidth: 1,
        borderColor: theme.colors.border,
        borderRadius: 24,
        padding: 20,
        marginBottom: 16,
      }}
    >
      <View style={{ alignItems: "center", marginBottom: 12 }}>
        <Ionicons name={icon} size={38} color={theme.colors.gold} />
      </View>

      <Text
        style={{
          color: theme.colors.gold,
          fontFamily: "CinzelBold",
          fontSize: 22,
          textAlign: "center",
          marginBottom: 8,
        }}
      >
        {title}
      </Text>

      <Text
        style={{
          color: theme.colors.text,
          fontFamily: "MontserratMedium",
          fontSize: 14,
          lineHeight: 22,
          textAlign: "center",
          marginBottom: 16,
        }}
      >
        {description}
      </Text>

      <GoldButton title={buttonText} onPress={onPress} />
    </View>
  );
}

export default function AdminTabScreen() {
  const { user } = useAuth();
  const isAdmin = isAdminEmail(user?.email);

  if (!user) {
    return <Redirect href="/login" />;
  }

  if (!isAdmin) {
    return <Redirect href="/(tabs)/home" />;
  }

  return (
    <AppShell>
      <BrandHeader size="sm" />

      <AdminActionCard
        icon="chatbox-ellipses-outline"
        title="Prayer Requests"
        description="Review and manage prayer requests from the congregation."
        buttonText="Open Prayer Requests"
        onPress={() => router.push("/(tabs)/admin-prayer-requests")}
      />

      <AdminActionCard
        icon="home-outline"
        title="Manage Home Page"
        description="Update this week’s message, schedule, next event, announcements, and pastor note."
        buttonText="Edit Home Page"
        onPress={() => router.push("/(tabs)/admin-home-content")}
      />

      <AdminActionCard
        icon="people-outline"
        title="Manage Ministries"
        description="Add and update ministry cards for the church."
        buttonText="Edit Ministries"
        onPress={() => router.push("/(tabs)/admin-ministries")}
      />
    </AppShell>
  );
}