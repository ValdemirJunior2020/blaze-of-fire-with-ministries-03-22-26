// File: app/index.tsx
import React from "react";
import { Redirect } from "expo-router";
import { ActivityIndicator, View } from "react-native";
import { useAuth } from "../context/AuthContext";
import { theme } from "../constants/theme";

export default function IndexScreen() {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <View
        style={{
          flex: 1,
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: theme.colors.background
        }}
      >
        <ActivityIndicator size="large" color={theme.colors.gold} />
      </View>
    );
  }

  return <Redirect href={user ? "/(tabs)/home" : "/(auth)/login"} />;
}