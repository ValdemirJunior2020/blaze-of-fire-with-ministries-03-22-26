// File: app/admin/announcements.tsx
import React, { useEffect, useState } from "react";
import { ActivityIndicator, Alert, ScrollView, Text, View } from "react-native";
import AppShell from "../../components/AppShell";
import BrandHeader from "../../components/BrandHeader";
import FormInput from "../../components/FormInput";
import GoldButton from "../../components/GoldButton";
import { theme } from "../../constants/theme";
import { useAuth } from "../../context/AuthContext";
import { isAdminEmail } from "../../constants/admin";
import { createAnnouncement, getAnnouncements } from "../../services/announcements";

export default function AdminAnnouncementsScreen() {
  const { user } = useAuth();
  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [items, setItems] = useState<Array<{ id: string; title: string; message: string }>>([]);

  const loadAnnouncements = async () => {
    try {
      setLoading(true);
      const data = await getAnnouncements();
      setItems(data.map((item) => ({ id: item.id, title: item.title, message: item.message })));
    } catch (error: any) {
      Alert.alert("Error", error?.message || "Unable to load announcements.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadAnnouncements();
  }, []);

  if (!isAdminEmail(user?.email)) {
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
          <Text style={{ color: theme.colors.gold, fontFamily: "CinzelBold", fontSize: 24, marginBottom: 12 }}>
            Admin Only
          </Text>
          <Text style={{ color: theme.colors.text, fontFamily: "MontserratMedium", fontSize: 15, lineHeight: 24 }}>
            You do not have permission to manage announcements.
          </Text>
        </View>
      </AppShell>
    );
  }

  const handleSave = async () => {
    if (!title.trim() || !message.trim()) {
      Alert.alert("Missing fields", "Please fill title and message.");
      return;
    }

    try {
      setSaving(true);
      await createAnnouncement({
        title: title.trim(),
        message: message.trim(),
        language: "both",
        createdBy: user?.email || ""
      });
      setTitle("");
      setMessage("");
      await loadAnnouncements();
      Alert.alert("Saved", "Announcement posted.");
    } catch (error: any) {
      Alert.alert("Error", error?.message || "Unable to save announcement.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <AppShell>
      <BrandHeader size="sm" />

      <View
        style={{
          backgroundColor: "rgba(17,17,17,0.92)",
          borderWidth: 1,
          borderColor: theme.colors.border,
          borderRadius: 24,
          padding: 20,
          marginBottom: 16
        }}
      >
        <Text style={{ color: theme.colors.gold, fontFamily: "CinzelBold", fontSize: 24, marginBottom: 14 }}>
          Admin Announcements
        </Text>

        <FormInput label="Title" value={title} onChangeText={setTitle} placeholder="Church update" />
        <FormInput label="Message" value={message} onChangeText={setMessage} placeholder="Write the announcement here" />

        <GoldButton title={saving ? "Saving..." : "Post Announcement"} onPress={handleSave} />
      </View>

      <View
        style={{
          backgroundColor: "rgba(17,17,17,0.92)",
          borderWidth: 1,
          borderColor: theme.colors.border,
          borderRadius: 24,
          padding: 20
        }}
      >
        <Text style={{ color: theme.colors.gold, fontFamily: "CinzelBold", fontSize: 22, marginBottom: 14 }}>
          Recent Announcements
        </Text>

        {loading ? (
          <ActivityIndicator size="large" color={theme.colors.gold} />
        ) : (
          <ScrollView showsVerticalScrollIndicator={false}>
            {items.length === 0 ? (
              <Text style={{ color: theme.colors.text, fontFamily: "MontserratMedium", fontSize: 15 }}>
                No announcements yet.
              </Text>
            ) : (
              items.map((item) => (
                <View
                  key={item.id}
                  style={{
                    backgroundColor: "rgba(255,255,255,0.04)",
                    borderWidth: 1,
                    borderColor: theme.colors.border,
                    borderRadius: 18,
                    padding: 16,
                    marginBottom: 12
                  }}
                >
                  <Text style={{ color: theme.colors.gold, fontFamily: "MontserratBold", fontSize: 16, marginBottom: 8 }}>
                    {item.title}
                  </Text>
                  <Text style={{ color: theme.colors.text, fontFamily: "MontserratMedium", fontSize: 14, lineHeight: 22 }}>
                    {item.message}
                  </Text>
                </View>
              ))
            )}
          </ScrollView>
        )}
      </View>
    </AppShell>
  );
}
