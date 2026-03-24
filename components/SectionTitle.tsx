// File: components/SectionTitle.tsx
import React from "react";
import { Text } from "react-native";

type Props = {
  title: string;
};

export default function SectionTitle({ title }: Props) {
  return (
    <Text
      style={{
        color: "#D4AF37",
        fontSize: 28,
        fontWeight: "700",
        marginBottom: 16
      }}
    >
      {title}
    </Text>
  );
}