// File: app/(tabs)/home.tsx
import React, { useEffect, useState } from "react";
import { ActivityIndicator, ScrollView, StyleSheet, Text, View } from "react-native";
import { router } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import AppShell from "../../components/AppShell";
import BrandHeader from "../../components/BrandHeader";
import GoldButton from "../../components/GoldButton";
import { theme } from "../../constants/theme";
import { useAuth } from "../../context/AuthContext";
import { isAdminEmail } from "../../constants/admin";
import { defaultHomeContent, getHomeContent } from "../../services/churchContent";

type HomeContent = {
  weeklyMessage: string;
  serviceSchedule: string;
  nextEvent: string;
  latestAnnouncement: string;
  pastorShortNote: string;
};

function InfoCard({
  icon,
  title,
  value,
}: {
  icon: keyof typeof Ionicons.glyphMap;
  title: string;
  value: string;
}) {
  return (
    <View style={styles.card}>
      <View style={styles.cardTitleRow}>
        <Ionicons name={icon} size={18} color={theme.colors.gold} />
        <Text style={styles.cardTitle}>{title}</Text>
      </View>
      <Text style={styles.cardText}>{value}</Text>
    </View>
  );
}

function ButtonRow({
  title,
  onPress,
}: {
  title: string;
  onPress: () => void;
}) {
  return (
    <View style={styles.buttonWrap}>
      <GoldButton title={title} onPress={onPress} />
    </View>
  );
}

export default function HomeScreen() {
  const { user } = useAuth();
  const [content, setContent] = useState<HomeContent>(defaultHomeContent);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;

    async function load() {
      try {
        const data = await getHomeContent();
        if (mounted) {
          setContent(data);
        }
      } catch (error) {
        console.error("Failed to load home content:", error);
        if (mounted) {
          setContent(defaultHomeContent);
        }
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    }

    void load();

    return () => {
      mounted = false;
    };
  }, []);

  const isAdmin = isAdminEmail(user?.email);

  return (
    <AppShell>
      <BrandHeader size="sm" />

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        {loading ? (
          <View style={styles.loadingWrap}>
            <ActivityIndicator size="large" color={theme.colors.gold} />
          </View>
        ) : (
          <>
            <InfoCard
              icon="calendar-outline"
              title="Weekly Message"
              value={content.weeklyMessage}
            />
            <InfoCard
              icon="time-outline"
              title="Service Schedule"
              value={content.serviceSchedule}
            />
            <InfoCard
              icon="megaphone-outline"
              title="Next Event"
              value={content.nextEvent}
            />
            <InfoCard
              icon="notifications-outline"
              title="Latest Announcement"
              value={content.latestAnnouncement}
            />
            <InfoCard
              icon="chatbubble-ellipses-outline"
              title="Pastor's Short Note"
              value={content.pastorShortNote}
            />
            <InfoCard
              icon="book-outline"
              title="Verse of the Day"
              value={"His compassions never fail. They are new every morning; great is Your faithfulness.\n\nLamentations 3:22-23"}
            />

            {isAdmin && (
              <ButtonRow
                title="Edit Home Content"
                onPress={() => router.push("/(tabs)/admin-home-content")}
              />
            )}

            <ButtonRow
              title="See Ministries"
              onPress={() => router.push("/ministries")}
            />

            <ButtonRow
              title="Watch Live Inside the App"
              onPress={() => router.push("/(tabs)/live")}
            />

            <ButtonRow
              title="Send Prayer Request"
              onPress={() => router.push("/(tabs)/prayer")}
            />

            <ButtonRow
              title="See Community"
              onPress={() => router.push("/(tabs)/community")}
            />

            <ButtonRow
              title="Open Profile"
              onPress={() => router.push("/(tabs)/profile")}
            />
          </>
        )}
      </ScrollView>
    </AppShell>
  );
}

const styles = StyleSheet.create({
  scrollContent: {
    paddingBottom: 32,
  },
  loadingWrap: {
    minHeight: 300,
    alignItems: "center",
    justifyContent: "center",
  },
  card: {
    backgroundColor: "rgba(12,12,12,0.88)",
    borderRadius: 24,
    borderWidth: 1,
    borderColor: "rgba(212,175,55,0.18)",
    padding: 18,
    marginBottom: 14,
  },
  cardTitleRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
    gap: 8,
  },
  cardTitle: {
    color: theme.colors.gold,
    fontFamily: "CinzelBold",
    fontSize: 20,
  },
  cardText: {
    color: "#F0F0F0",
    fontFamily: "MontserratMedium",
    fontSize: 14,
    lineHeight: 24,
  },
  buttonWrap: {
    marginBottom: 12,
  },
});