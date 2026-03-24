// File: components/PrimaryButton.tsx
import React from "react";
import { Pressable, Text } from "react-native";

type Props = {
  title: string;
  onPress: () => void;
  variant?: "gold" | "dark";
  disabled?: boolean;
};

export default function PrimaryButton({
  title,
  onPress,
  variant = "gold",
  disabled = false
}: Props) {
  const backgroundColor = variant === "gold" ? "#D4AF37" : "#171717";
  const textColor = variant === "gold" ? "#000000" : "#FFFFFF";

  return (
    <Pressable
      onPress={onPress}
      disabled={disabled}
      style={{
        backgroundColor,
        borderRadius: 16,
        paddingVertical: 16,
        paddingHorizontal: 16,
        marginBottom: 12,
        borderWidth: 1,
        borderColor: "#2A2A2A",
        opacity: disabled ? 0.5 : 1
      }}
    >
      <Text
        style={{
          color: textColor,
          textAlign: "center",
          fontWeight: "700",
          fontSize: 16
        }}
      >
        {title}
      </Text>
    </Pressable>
  );
}