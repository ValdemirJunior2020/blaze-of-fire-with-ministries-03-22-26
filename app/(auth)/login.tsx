// File: app/(auth)/login.tsx
import React, { useState } from "react";
import { Alert, Platform, Text, TextInput, View } from "react-native";
import { router } from "expo-router";
import AppShell from "../../components/AppShell";
import BrandHeader from "../../components/BrandHeader";
import GoldButton from "../../components/GoldButton";
import { theme } from "../../constants/theme";
import { useAuth } from "../../context/AuthContext";

export default function LoginScreen() {
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const showMessage = (title: string, message: string) => {
    if (Platform.OS === "web") {
      window.alert(`${title}\n\n${message}`);
      return;
    }

    Alert.alert(title, message);
  };

  const handleLogin = async () => {
    if (!email.trim() || !password.trim()) {
      showMessage("Missing fields", "Please enter email and password.");
      return;
    }

    try {
      setLoading(true);
      await login(email.trim(), password);
      router.replace("/(tabs)/home");
    } catch (error: any) {
      showMessage("Login failed", error?.message || "Could not log in.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AppShell scroll={false}>
      <BrandHeader />

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
          Login
        </Text>

        <TextInput
          placeholder="Email"
          placeholderTextColor="#8A8A8A"
          autoCapitalize="none"
          keyboardType="email-address"
          value={email}
          onChangeText={setEmail}
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
          placeholder="Password"
          placeholderTextColor="#8A8A8A"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
          style={{
            backgroundColor: theme.colors.cardSoft,
            color: theme.colors.text,
            borderRadius: 16,
            padding: 14,
            marginBottom: 16,
            fontFamily: "MontserratMedium"
          }}
        />

        <GoldButton
          title={loading ? "Signing In..." : "Sign In"}
          onPress={handleLogin}
        />

        <View style={{ height: 12 }} />

        <GoldButton
          title="Create Account"
          onPress={() => router.push("/signup")}
        />
      </View>
    </AppShell>
  );
}