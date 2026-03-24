// File: app/(tabs)/prayer.tsx
import React, { useEffect, useState } from "react";
import { Alert, Platform, Switch, Text, TextInput, View } from "react-native";
import { router } from "expo-router";
import AppShell from "../../components/AppShell";
import BrandHeader from "../../components/BrandHeader";
import GoldButton from "../../components/GoldButton";
import { theme } from "../../constants/theme";
import { useAuth } from "../../context/AuthContext";
import { createPrayerRequest } from "../../services/prayerRequests";

export default function PrayerScreen() {
  const { user } = useAuth();

  const [name, setName] = useState(user?.displayName || "");
  const [email, setEmail] = useState(user?.email || "");
  const [request, setRequest] = useState("");
  const [isPrivate, setIsPrivate] = useState(false);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    setName(user?.displayName || "");
    setEmail(user?.email || "");
  }, [user]);

  const showMessage = (title: string, message: string) => {
    if (Platform.OS === "web") {
      window.alert(`${title}\n\n${message}`);
      return;
    }

    Alert.alert(title, message);
  };

  const handleSubmit = async () => {
    if (!name.trim()) {
      showMessage("Missing name", "Please enter your name.");
      return;
    }

    if (!email.trim()) {
      showMessage("Missing email", "Please enter your email.");
      return;
    }

    if (!request.trim()) {
      showMessage("Missing request", "Please write your prayer request.");
      return;
    }

    try {
      setSaving(true);

      await createPrayerRequest({
        userId: user?.uid || "guest",
        name: name.trim(),
        email: email.trim(),
        request: request.trim(),
        isPrivate
      });

      setRequest("");
      setIsPrivate(false);

      showMessage(
        "Prayer request sent",
        "Your prayer request was submitted successfully."
      );
    } catch (error: any) {
      showMessage(
        "Submit failed",
        error?.message || "Could not send your prayer request."
      );
    } finally {
      setSaving(false);
    }
  };

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
          marginBottom: 16
        }}
      >
        <Text
          style={{
            color: theme.colors.gold,
            fontFamily: "CinzelBold",
            fontSize: 22,
            marginBottom: 8
          }}
        >
          Prayer Request
        </Text>

        <Text
          style={{
            color: theme.colors.text,
            fontFamily: "MontserratMedium",
            fontSize: 14,
            lineHeight: 22,
            marginBottom: 16
          }}
        >
          Share your request and our team will pray for you.
        </Text>

        {!user ? (
          <View
            style={{
              backgroundColor: "rgba(212,175,55,0.08)",
              borderWidth: 1,
              borderColor: theme.colors.border,
              borderRadius: 18,
              padding: 14,
              marginBottom: 16
            }}
          >
            <Text
              style={{
                color: theme.colors.text,
                fontFamily: "MontserratMedium",
                fontSize: 14,
                lineHeight: 22,
                marginBottom: 12
              }}
            >
              You can submit as a guest, but creating an account is better if you want us
              to identify your requests later.
            </Text>

            <GoldButton title="Create Account" onPress={() => router.push("/signup")} />
          </View>
        ) : null}

        <TextInput
          placeholder="Your Name"
          placeholderTextColor="#8A8A8A"
          value={name}
          onChangeText={setName}
          style={{
            backgroundColor: theme.colors.cardSoft,
            color: theme.colors.text,
            borderRadius: 16,
            padding: 14,
            marginBottom: 12,
            fontFamily: "MontserratMedium"
          }}
        />

        <TextInput
          placeholder="Your Email"
          placeholderTextColor="#8A8A8A"
          value={email}
          onChangeText={setEmail}
          autoCapitalize="none"
          keyboardType="email-address"
          style={{
            backgroundColor: theme.colors.cardSoft,
            color: theme.colors.text,
            borderRadius: 16,
            padding: 14,
            marginBottom: 12,
            fontFamily: "MontserratMedium"
          }}
        />

        <TextInput
          placeholder="Write your prayer request here..."
          placeholderTextColor="#8A8A8A"
          value={request}
          onChangeText={setRequest}
          multiline
          textAlignVertical="top"
          style={{
            backgroundColor: theme.colors.cardSoft,
            color: theme.colors.text,
            borderRadius: 16,
            padding: 14,
            minHeight: 140,
            marginBottom: 14,
            fontFamily: "MontserratMedium"
          }}
        />

        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            backgroundColor: theme.colors.cardSoft,
            borderRadius: 16,
            paddingHorizontal: 14,
            paddingVertical: 10,
            marginBottom: 16
          }}
        >
          <View style={{ flex: 1, paddingRight: 12 }}>
            <Text
              style={{
                color: theme.colors.text,
                fontFamily: "MontserratSemiBold",
                fontSize: 15,
                marginBottom: 4
              }}
            >
              Private request
            </Text>

            <Text
              style={{
                color: theme.colors.muted,
                fontFamily: "MontserratMedium",
                fontSize: 12,
                lineHeight: 18
              }}
            >
              Turn this on if you want your request to stay private.
            </Text>
          </View>

          <Switch
            value={isPrivate}
            onValueChange={setIsPrivate}
            trackColor={{ false: "#555", true: theme.colors.gold }}
            thumbColor={isPrivate ? "#111" : "#DDD"}
          />
        </View>

        <GoldButton
          title={saving ? "Sending..." : "Send Prayer Request"}
          onPress={handleSubmit}
        />
      </View>
    </AppShell>
  );
}