// File: app/+not-found.tsx

import { Link, Stack } from "expo-router";
import React from "react";
import { Text, View } from "react-native";

export default function NotFoundScreen() {
  return (
    <>
      <Stack.Screen options={{ title: "Not Found" }} />
      <View
        style={{
          flex: 1,
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#000",
          paddingHorizontal: 24
        }}
      >
        <Text
          style={{
            color: "#ffffff",
            fontSize: 32,
            fontWeight: "700",
            marginBottom: 12
          }}
        >
          Page not found
        </Text>

        <Text
          style={{
            color: "#cfcfcf",
            fontSize: 16,
            textAlign: "center",
            marginBottom: 20
          }}
        >
          The route does not exist yet.
        </Text>

        <Link href="/" style={{ color: "#D4AF37", fontSize: 18 }}>
          Go to Home
        </Link>
      </View>
    </>
  );
}