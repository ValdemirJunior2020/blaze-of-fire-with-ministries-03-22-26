// File: app/(tabs)/admin-home-content.tsx
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { Redirect, router } from "expo-router";
import AppShell from "../../components/AppShell";
import BrandHeader from "../../components/BrandHeader";
import GoldButton from "../../components/GoldButton";
import { theme } from "../../constants/theme";
import { useAuth } from "../../context/AuthContext";
import { isAdminEmail } from "../../constants/admin";
import {
  defaultHomeContent,
  getHomeContent,
  saveHomeContent,
} from "../../services/churchContent";

function showMessage(title: string, message: string) {
  if (Platform.OS === "web") {
    window.alert(`${title}\n\n${message}`);
    return;
  }

  Alert.alert(title, message);
}

export default function AdminHomeContentScreen() {
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [weeklyMessage, setWeeklyMessage] = useState("");
  const [serviceSchedule, setServiceSchedule] = useState("");
  const [nextEvent, setNextEvent] = useState("");
  const [latestAnnouncement, setLatestAnnouncement] = useState("");
  const [pastorShortNote, setPastorShortNote] = useState("");

  useEffect(() => {
    let mounted = true;

    async function load() {
      try {
        const data = await getHomeContent();

        if (!mounted) return;

        setWeeklyMessage(data.weeklyMessage || defaultHomeContent.weeklyMessage);
        setServiceSchedule(data.serviceSchedule || defaultHomeContent.serviceSchedule);
        setNextEvent(data.nextEvent || defaultHomeContent.nextEvent);
        setLatestAnnouncement(
          data.latestAnnouncement || defaultHomeContent.latestAnnouncement
        );
        setPastorShortNote(
          data.pastorShortNote || defaultHomeContent.pastorShortNote
        );
      } catch (error) {
        console.error("Failed to load home content:", error);

        if (!mounted) return;

        setWeeklyMessage(defaultHomeContent.weeklyMessage);
        setServiceSchedule(defaultHomeContent.serviceSchedule);
        setNextEvent(defaultHomeContent.nextEvent);
        setLatestAnnouncement(defaultHomeContent.latestAnnouncement);
        setPastorShortNote(defaultHomeContent.pastorShortNote);
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

  if (!user) {
    return <Redirect href="/(auth)/login" />;
  }

  if (!isAdminEmail(user.email)) {
    return <Redirect href="/(tabs)/home" />;
  }

  const handleSave = async () => {
    try {
      setSaving(true);

      await saveHomeContent({
        weeklyMessage: weeklyMessage.trim(),
        serviceSchedule: serviceSchedule.trim(),
        nextEvent: nextEvent.trim(),
        latestAnnouncement: latestAnnouncement.trim(),
        pastorShortNote: pastorShortNote.trim(),
      });

      showMessage("Saved", "Home content updated successfully.");
      router.push("/(tabs)/home");
    } catch (error: any) {
      console.error("Failed to save home content:", error);
      showMessage("Save failed", error?.message || "Could not save home content.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <AppShell>
      <BrandHeader size="sm" />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        <View style={styles.heroCard}>
          <Text style={styles.heroTitle}>Edit Home Content</Text>
          <Text style={styles.heroText}>
            Update the text shown on the Home page for the church.
          </Text>
        </View>

        {loading ? (
          <View style={styles.loadingWrap}>
            <ActivityIndicator size="large" color={theme.colors.gold} />
          </View>
        ) : (
          <>
            <View style={styles.formCard}>
              <Text style={styles.label}>Weekly Message</Text>
              <TextInput
                value={weeklyMessage}
                onChangeText={setWeeklyMessage}
                multiline
                placeholder="Enter weekly message"
                placeholderTextColor="#8f8f8f"
                style={[styles.input, styles.textarea]}
              />

              <Text style={styles.label}>Service Schedule</Text>
              <TextInput
                value={serviceSchedule}
                onChangeText={setServiceSchedule}
                multiline
                placeholder="Enter service schedule"
                placeholderTextColor="#8f8f8f"
                style={[styles.input, styles.textarea]}
              />

              <Text style={styles.label}>Next Event</Text>
              <TextInput
                value={nextEvent}
                onChangeText={setNextEvent}
                placeholder="Enter next event"
                placeholderTextColor="#8f8f8f"
                style={styles.input}
              />

              <Text style={styles.label}>Latest Announcement</Text>
              <TextInput
                value={latestAnnouncement}
                onChangeText={setLatestAnnouncement}
                multiline
                placeholder="Enter latest announcement"
                placeholderTextColor="#8f8f8f"
                style={[styles.input, styles.textarea]}
              />

              <Text style={styles.label}>Pastor's Short Note</Text>
              <TextInput
                value={pastorShortNote}
                onChangeText={setPastorShortNote}
                multiline
                placeholder="Enter pastor's short note"
                placeholderTextColor="#8f8f8f"
                style={[styles.input, styles.textarea]}
              />
            </View>

            <View style={styles.buttonGap}>
              <GoldButton
                title={saving ? "Saving..." : "Save Home Content"}
                onPress={handleSave}
              />
            </View>

            <View style={styles.buttonGap}>
              <GoldButton
                title="Back to Home"
                onPress={() => router.push("/(tabs)/home")}
              />
            </View>
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
  heroCard: {
    backgroundColor: "rgba(12,12,12,0.88)",
    borderRadius: 24,
    borderWidth: 1,
    borderColor: "rgba(212,175,55,0.18)",
    padding: 18,
    marginBottom: 14,
  },
  heroTitle: {
    color: theme.colors.gold,
    fontFamily: "CinzelBold",
    fontSize: 28,
    marginBottom: 8,
  },
  heroText: {
    color: "#F0F0F0",
    fontFamily: "MontserratMedium",
    fontSize: 14,
    lineHeight: 22,
  },
  formCard: {
    backgroundColor: "rgba(12,12,12,0.88)",
    borderRadius: 24,
    borderWidth: 1,
    borderColor: "rgba(212,175,55,0.18)",
    padding: 18,
    marginBottom: 14,
  },
  label: {
    color: theme.colors.gold,
    fontFamily: "CinzelBold",
    fontSize: 18,
    marginBottom: 8,
    marginTop: 10,
  },
  input: {
    backgroundColor: "rgba(255,255,255,0.06)",
    color: "#FFFFFF",
    borderWidth: 1,
    borderColor: "rgba(212,175,55,0.18)",
    borderRadius: 16,
    paddingHorizontal: 14,
    paddingVertical: 14,
    fontFamily: "MontserratMedium",
    fontSize: 14,
  },
  textarea: {
    minHeight: 110,
    textAlignVertical: "top",
  },
  loadingWrap: {
    minHeight: 260,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonGap: {
    marginBottom: 12,
  },
});