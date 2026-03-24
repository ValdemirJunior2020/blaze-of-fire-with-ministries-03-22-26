// File: components/EmptyState.tsx
import React from "react";
import { Text, View } from "react-native";

type Props = {
  title: string;
  message: string;
};

export default function EmptyState({ title, message }: Props) {
  return (
    <View
      style={{
        backgroundColor: "#171717",
        borderRadius: 24,
        padding: 20,
        borderWidth: 1,
        borderColor: "#2A2A2A"
      }}
    >
      <Text
        style={{
          color: "#D4AF37",
          fontSize: 18,
          fontWeight: "700",
          marginBottom: 8
        }}
      >
        {title}
      </Text>
      <Text style={{ color: "#FFFFFF", lineHeight: 24 }}>{message}</Text>
    </View>
  );
}