// File: app/(tabs)/home.tsx
import React, { useEffect, useState } from "react";
import { ActivityIndicator, Text, View } from "react-native";
import { router } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import AppShell from "../../components/AppShell";
import BrandHeader from "../../components/BrandHeader";
import GoldButton from "../../components/GoldButton";
import { theme } from "../../constants/theme";
import { getVerseOfTheDay } from "../../data/verses";
import { useAuth } from "../../context/AuthContext";
import { isAdminEmail } from "../../constants/admin";
import { defaultHomeContent, getHomeContent } from "../../services/churchContent";
import { HomeContent } from "../../types/churchContent";

function HomeInfoCard({
  icon,
  title,
  body
}: {
  icon: keyof typeof Ionicons.glyphMap;
  title: string;
  body: string;
}) {
  return (
    <View
      style={{
        backgroundColor: "rgba(17,17,17,0.9)",
        borderWidth: 1,
        borderColor: theme.colors.border,
        borderRadius: 24,
        padding: 18,
        marginBottom: 16
      }}
    >
      <View style={{ flexDirection: "row", alignItems: "center", marginBottom: 10 }}>
        <Ionicons name={icon} size={20} color={theme.colors.gold} />
        <Text
          style={{
            color: theme.colors.gold,
            fontFamily: "CinzelBold",
            fontSize: 19,
            marginLeft: 10,
            flex: 1
          }}
        >
          {title}
        </Text>
      </View>

      <Text
        style={{
          color: theme.colors.text,
          fontFamily: "MontserratMedium",
          fontSize: 15,
          lineHeight: 24
        }}
      >
        {body}
      </Text>
    </View>
  );
}

export default function HomeScreen() {
  const verse = getVerseOfTheDay();
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [content, setContent] = useState<HomeContent>(defaultHomeContent);

  useEffect(() => {
    const load = async () => {
      try {
        const data = await getHomeContent();
        setContent(data);
      } catch (error) {
        console.error("Failed to load home content:", error);
      } finally {
        setLoading(false);
      }
    };

    void load();
  }, []);

  const canEditHome = isAdminEmail(user?.email);

  return (
    <AppShell>
      <BrandHeader size="sm" />

      <View
        style={{
          backgroundColor: "rgba(17,17,17,0.9)",
          borderWidth: 1,
          borderColor: theme.colors.border,
          borderRadius: 24,
          padding: 20,
          marginBottom: 18
        }}
      >
        <Text
          style={{
            color: theme.colors.gold,
            fontFamily: "CinzelBold",
            fontSize: 24,
            marginBottom: 10,
            textAlign: "center"
          }}
        >
          Welcome to Blaze of Fire
        </Text>

        <Text
          style={{
            color: theme.colors.text,
            fontFamily: "MontserratMedium",
            fontSize: 15,
            lineHeight: 24,
            textAlign: "center"
          }}
        >
          Stay connected with this week&apos;s word, church schedule, announcements, and ministry opportunities.
        </Text>
      </View>

      {loading ? (
        <ActivityIndicator size="large" color={theme.colors.gold} />
      ) : (
        <>
          <HomeInfoCard
            icon="megaphone-outline"
            title="This Week's Message"
            body={content.weeklyMessage}
          />
          <HomeInfoCard
            icon="time-outline"
            title="Service Schedule"
            body={content.serviceSchedule}
          />
          <HomeInfoCard
            icon="calendar-outline"
            title="Next Event"
            body={content.nextEvent}
          />
          <HomeInfoCard
            icon="notifications-outline"
            title="Latest Announcement"
            body={content.latestAnnouncement}
          />
          <HomeInfoCard
            icon="chatbubble-ellipses-outline"
            title="Pastor's Short Note"
            body={content.pastorShortNote}
          />
        </>
      )}

      <View
        style={{
          backgroundColor: "rgba(17,17,17,0.9)",
          borderWidth: 1,
          borderColor: theme.colors.border,
          borderRadius: 24,
          padding: 20,
          marginBottom: 18
        }}
      >
        <Text
          style={{
            color: theme.colors.gold,
            fontFamily: "CinzelBold",
            fontSize: 22,
            marginBottom: 12
          }}
        >
          Verse of the Day
        </Text>

        <Text
          style={{
            color: theme.colors.text,
            fontFamily: "MontserratSemiBold",
            fontSize: 16,
            lineHeight: 30,
            marginBottom: 12
          }}
        >
          {verse.text}
        </Text>

        <Text
          style={{
            color: theme.colors.gold,
            fontFamily: "MontserratBold",
            fontSize: 15
          }}
        >
          {verse.reference}
        </Text>
      </View>

      {canEditHome ? (
        <>
          <GoldButton
            title="Edit Home Content"
            onPress={() => router.push("/(tabs)/admin-home-content")}
          />
          <View style={{ height: 14 }} />
        </>
      ) : null}

      <GoldButton title="See Ministries" onPress={() => router.push("/ministries")} />
      <View style={{ height: 14 }} />
      <GoldButton title="Watch Live Inside the App" onPress={() => router.push("/live")} />
      <View style={{ height: 14 }} />
      <GoldButton title="Send Prayer Request" onPress={() => router.push("/prayer")} />
      <View style={{ height: 14 }} />
      <GoldButton title="See Community" onPress={() => router.push("/community")} />
      <View style={{ height: 14 }} />
      <GoldButton title="Open Profile" onPress={() => router.push("/profile")} />
    </AppShell>
  );
}