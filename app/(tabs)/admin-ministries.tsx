// File: app/(tabs)/admin-ministries.tsx
import React, { useEffect, useMemo, useState } from "react";
import {
  Alert,
  Image,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { Redirect } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import AppShell from "../../components/AppShell";
import BrandHeader from "../../components/BrandHeader";
import GoldButton from "../../components/GoldButton";
import { useAuth } from "../../context/AuthContext";
import { isAdminEmail } from "../../constants/admin";
import { theme } from "../../constants/theme";
import {
  addMinistry,
  deleteMinistry,
  getMinistries,
  updateMinistry,
} from "../../services/churchContent";
import { MinistryItem } from "../../types/churchContent";

const MINISTRY_OPTIONS: Array<{
  key: string;
  title: string;
  icon: keyof typeof Ionicons.glyphMap;
}> = [
  { key: "pastors", title: "Pastors", icon: "people-outline" },
  { key: "music", title: "Music", icon: "musical-notes-outline" },
  { key: "media", title: "Media", icon: "videocam-outline" },
  { key: "apostle", title: "Apostle", icon: "flame-outline" },
  { key: "prophets", title: "Prophets", icon: "eye-outline" },
  { key: "evangelists", title: "Evangelists", icon: "megaphone-outline" },
  { key: "teachers", title: "Teachers", icon: "school-outline" },
  { key: "children", title: "Children", icon: "happy-outline" },
];

type MinistryForm = {
  id?: string;
  key: string;
  title: string;
  description: string;
  leader: string;
  schedule: string;
  imageUrl: string;
};

const emptyForm: MinistryForm = {
  key: "",
  title: "",
  description: "",
  leader: "",
  schedule: "",
  imageUrl: "",
};

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

function MinistrySquare({
  title,
  icon,
  active,
  onPress,
}: {
  title: string;
  icon: keyof typeof Ionicons.glyphMap;
  active: boolean;
  onPress: () => void;
}) {
  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.9}
      style={{
        width: "47.5%",
        minHeight: 138,
        backgroundColor: active ? "rgba(255,255,255,0.08)" : "rgba(30,30,30,0.95)",
        borderRadius: 24,
        borderWidth: 1.5,
        borderColor: active ? "#BFD9FF" : "#2B2B2B",
        padding: 18,
        marginBottom: 14,
        shadowColor: active ? "#BFD9FF" : "#000000",
        shadowOpacity: active ? 0.35 : 0.18,
        shadowRadius: active ? 18 : 10,
        shadowOffset: { width: 0, height: 4 },
        elevation: active ? 8 : 4,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Ionicons name={icon} size={34} color="#DDEBFF" />
      <Text
        style={{
          color: "#FFFFFF",
          fontFamily: "MontserratBold",
          fontSize: 18,
          textAlign: "center",
          marginTop: 12,
        }}
      >
        {title}
      </Text>
    </TouchableOpacity>
  );
}

export default function AdminMinistriesScreen() {
  const { user } = useAuth();
  const isAdmin = isAdminEmail(user?.email);

  const [items, setItems] = useState<MinistryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [selectedKey, setSelectedKey] = useState("");
  const [form, setForm] = useState<MinistryForm>(emptyForm);

  useEffect(() => {
    let mounted = true;

    async function load() {
      try {
        const data = await getMinistries();
        if (mounted) {
          setItems(Array.isArray(data) ? data : []);
        }
      } catch (error: any) {
        console.error("Failed to load ministries:", error);
        Alert.alert("Error", error?.message || "Unable to load ministries.");
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

  const selectedExisting = useMemo(
    () => items.find((item) => item.key === selectedKey),
    [items, selectedKey]
  );

  const selectMinistry = (optionKey: string) => {
    setSelectedKey(optionKey);

    const existing = items.find((item) => item.key === optionKey);
    const option = MINISTRY_OPTIONS.find((item) => item.key === optionKey);

    if (existing) {
      setForm({
        id: existing.id,
        key: existing.key || optionKey,
        title: existing.title || option?.title || "",
        description: existing.description || "",
        leader: existing.leader || "",
        schedule: existing.schedule || "",
        imageUrl: existing.imageUrl || "",
      });
      return;
    }

    setForm({
      id: undefined,
      key: optionKey,
      title: option?.title || "",
      description: "",
      leader: "",
      schedule: "",
      imageUrl: "",
    });
  };

  const updateField = (field: keyof MinistryForm, value: string) => {
    setForm((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const reloadItems = async () => {
    const data = await getMinistries();
    setItems(Array.isArray(data) ? data : []);
  };

  const saveSelected = async () => {
    if (!form.key) {
      Alert.alert("Select Ministry", "Please choose a ministry square first.");
      return;
    }

    if (!form.title.trim()) {
      Alert.alert("Missing Title", "Please enter the ministry title.");
      return;
    }

    try {
      setSaving(true);

      const payload = {
        key: form.key,
        title: form.title.trim(),
        description: form.description.trim(),
        leader: form.leader.trim(),
        schedule: form.schedule.trim(),
        imageUrl: form.imageUrl.trim(),
      };

      if (form.id) {
        await updateMinistry(form.id, payload);
      } else {
        await addMinistry(payload);
      }

      await reloadItems();
      Alert.alert("Success", "Ministry saved successfully.");
    } catch (error: any) {
      console.error("Save ministry error:", error);
      Alert.alert("Error", error?.message || "Unable to save ministry.");
    } finally {
      setSaving(false);
    }
  };

  const removeSelected = async () => {
    if (!selectedExisting?.id) {
      Alert.alert("Nothing to Delete", "This ministry has not been saved yet.");
      return;
    }

    Alert.alert("Delete Ministry", `Delete ${selectedExisting.title}?`, [
      { text: "Cancel", style: "cancel" },
      {
        text: "Delete",
        style: "destructive",
        onPress: async () => {
          try {
            await deleteMinistry(selectedExisting.id);
            await reloadItems();
            setForm({
              id: undefined,
              key: selectedKey,
              title: MINISTRY_OPTIONS.find((item) => item.key === selectedKey)?.title || "",
              description: "",
              leader: "",
              schedule: "",
              imageUrl: "",
            });
            Alert.alert("Deleted", "Ministry removed.");
          } catch (error: any) {
            console.error("Delete ministry error:", error);
            Alert.alert("Error", error?.message || "Unable to delete ministry.");
          }
        },
      },
    ]);
  };

  if (!user) {
    return <Redirect href="/login" />;
  }

  if (!isAdmin) {
    return <Redirect href="/(tabs)/home" />;
  }

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
            marginBottom: 16,
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
            Manage Ministries
          </Text>

          <Text
            style={{
              color: theme.colors.text,
              fontFamily: "MontserratMedium",
              fontSize: 13,
              lineHeight: 20,
              marginBottom: 18,
            }}
          >
            Tap a square below to edit that ministry.
          </Text>

          <View
            style={{
              flexDirection: "row",
              flexWrap: "wrap",
              justifyContent: "space-between",
            }}
          >
            {MINISTRY_OPTIONS.map((option) => (
              <MinistrySquare
                key={option.key}
                title={option.title}
                icon={option.icon}
                active={selectedKey === option.key}
                onPress={() => selectMinistry(option.key)}
              />
            ))}
          </View>

          <Text
            style={{
              color: "#BDBDBD",
              fontFamily: "MontserratMedium",
              fontSize: 12,
              marginTop: 6,
            }}
          >
            {loading ? "Loading ministries..." : `${items.length} ministries saved`}
          </Text>
        </View>

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
              fontSize: 22,
              marginBottom: 8,
            }}
          >
            {form.title || "Select a Ministry"}
          </Text>

          {form.imageUrl ? (
            <Image
              source={{ uri: form.imageUrl }}
              resizeMode="cover"
              style={{
                width: "100%",
                height: 180,
                borderRadius: 18,
                marginBottom: 12,
                backgroundColor: "#111111",
              }}
            />
          ) : null}

          <Text style={labelStyle}>Title</Text>
          <TextInput
            value={form.title}
            onChangeText={(value) => updateField("title", value)}
            placeholder="Ministry title"
            placeholderTextColor="#888888"
            style={inputStyle}
          />

          <Text style={labelStyle}>Image URL</Text>
          <TextInput
            value={form.imageUrl}
            onChangeText={(value) => updateField("imageUrl", value)}
            placeholder="https://..."
            placeholderTextColor="#888888"
            style={inputStyle}
            autoCapitalize="none"
          />

          <Text style={labelStyle}>Leader</Text>
          <TextInput
            value={form.leader}
            onChangeText={(value) => updateField("leader", value)}
            placeholder="Leader or ministry head"
            placeholderTextColor="#888888"
            style={inputStyle}
          />

          <Text style={labelStyle}>Schedule</Text>
          <TextInput
            value={form.schedule}
            onChangeText={(value) => updateField("schedule", value)}
            placeholder="Sunday after service, Wednesday 7 PM..."
            placeholderTextColor="#888888"
            style={inputStyle}
          />

          <Text style={labelStyle}>Description</Text>
          <TextInput
            value={form.description}
            onChangeText={(value) => updateField("description", value)}
            placeholder="Write what this ministry does..."
            placeholderTextColor="#888888"
            style={[inputStyle, { minHeight: 120, textAlignVertical: "top" }]}
            multiline
          />

          <View style={{ height: 18 }} />

          <GoldButton
            title={saving ? "Saving..." : selectedExisting ? "Update Ministry" : "Save Ministry"}
            onPress={saveSelected}
          />

          <View style={{ height: 10 }} />

          <GoldButton title="Delete Ministry" onPress={removeSelected} />
        </View>
      </ScrollView>
    </AppShell>
  );
}