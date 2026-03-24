// File: components/GoldButton.tsx
import React from "react";
import { Pressable, Text } from "react-native";
import { theme } from "../constants/theme";

type Props = {
  title: string;
  onPress: () => void;
};

export default function GoldButton({ title, onPress }: Props) {
  return (
    <Pressable
      onPress={onPress}
      style={{
        backgroundColor: theme.colors.gold,
        borderRadius: 18,
        paddingVertical: 15,
        paddingHorizontal: 18,
        alignItems: "center",
        justifyContent: "center"
      }}
    >
      <Text
        style={{
          color: "#000",
          fontFamily: "MontserratBold",
          fontSize: 16
        }}
      >
        {title}
      </Text>
    </Pressable>
  );
}