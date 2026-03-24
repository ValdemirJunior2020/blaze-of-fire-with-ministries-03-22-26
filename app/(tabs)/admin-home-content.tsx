// File: app/(tabs)/admin-home-content.tsx
import React, { useEffect, useState } from "react";
import { Alert, ScrollView, Text, TextInput, View } from "react-native";
import { Redirect } from "expo-router";
import AppShell from "../../components/AppShell";
import BrandHeader from "../../components/BrandHeader";
import GoldButton from "../../components/GoldButton";
import { useAuth } from "../../context/AuthContext";
import { isAdminEmail } from "../../constants/admin";
import { theme } from "../../constants/theme";
import {
  defaultHomeContent,
  getHomeContent,
  saveHomeContent,
} from "../../services/churchContent";
import { HomeContent } from "../../types/churchContent";

const inputStyle = {
  backgroundColor: "#0A0A0A",
  color: "#FFFFFF",
  borderRadius: 16,
  borderWidth: 1,
  borderColor: "#1E1E1E",
  paddingHorizontal: 14,
  paddingVertical: 12,
  fontFamily: "MontserratMedium" as const,
  fontSize: 15,
  marginTop: 8,
};

const labelStyle = {
  color: theme.colors.gold,
  fontFamily: "MontserratBold" as const,
  fontSize: 15,
  marginTop: 14,
};

export default function AdminHomeContentScreen() {
  const { user } = useAuth();
  const isAdmin = isAdminEmail(user?.email);

  const [form, setForm] = useState<HomeContent>(defaultHomeContent);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    let mounted = true;

    async function load() {
      try {
        const data = await getHomeContent();
        if (mounted) {
          setForm(data);
        }
      } catch (error: any) {
        Alert.alert("Error", error?.message || "Unable to load home content.");
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    }

    load();

    return () => {
      mounted = false;
    };
  }, []);

  if (!user) {
    return <Redirect href="/login" />;
  }

  if (!isAdmin) {
    return <Redirect href="/(tabs)/home" />;
  }

  const updateField = (field: keyof HomeContent, value: string) => {
    setForm((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const onSave = async () => {
    try {
      setSaving(true);
      await saveHomeContent(form);
      Alert.alert("Success", "Home page content updated.");
    } catch (error: any) {
      Alert.alert("Error", error?.message || "Unable to save home content.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <AppShell>
      <BrandHeader size="sm" />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 24 }}
      >
        <View
          style={{
            backgroundColor: "rgba(17,17,17,0.92)",
            borderWidth: 1,
            borderColor: theme.colors.border,
            borderRadius: 24,
            padding: 20,
          }}
        >
          <Text
            style={{
              color: theme.colors.gold,
              fontFamily: "CinzelBold",
              fontSize: 24,
              marginBottom: 8,
            }}
          >
            Manage Home Page
          </Text>

          <Text
            style={{
              color: theme.colors.text,
              fontFamily: "MontserratMedium",
              fontSize: 13,
              lineHeight: 20,
              marginBottom: 8,
            }}
          >
            Only the pastor/admin can update this content.
          </Text>

          <Text style={labelStyle}>This Week's Message</Text>
          <TextInput
            value={form.weeklyMessage}
            onChangeText={(value) => updateField("weeklyMessage", value)}
            placeholder="Enter this week's message"
            placeholderTextColor="#888888"
            style={inputStyle}
            multiline
          />

          <Text style={labelStyle}>Service Schedule</Text>
          <TextInput
            value={form.serviceSchedule}
            onChangeText={(value) => updateField("serviceSchedule", value)}
            placeholder="Enter service schedule"
            placeholderTextColor="#888888"
            style={inputStyle}
            multiline
          />

          <Text style={labelStyle}>Next Event</Text>
          <TextInput
            value={form.nextEvent}
            onChangeText={(value) => updateField("nextEvent", value)}
            placeholder="Enter next event"
            placeholderTextColor="#888888"
            style={inputStyle}
            multiline
          />

          <Text style={labelStyle}>Latest Announcement</Text>
          <TextInput
            value={form.latestAnnouncement}
            onChangeText={(value) => updateField("latestAnnouncement", value)}
            placeholder="Enter latest announcement"
            placeholderTextColor="#888888"
            style={inputStyle}
            multiline
          />

          <Text style={labelStyle}>Pastor's Short Note</Text>
          <TextInput
            value={form.pastorShortNote}
            onChangeText={(value) => updateField("pastorShortNote", value)}
            placeholder="Enter pastor's short note"
            placeholderTextColor="#888888"
            style={inputStyle}
            multiline
          />

          <View style={{ height: 18 }} />

          <GoldButton
            title={loading ? "Loading..." : saving ? "Saving..." : "Save Home Content"}
            onPress={onSave}
          />
        </View>
      </ScrollView>
    </AppShell>
  );
}
