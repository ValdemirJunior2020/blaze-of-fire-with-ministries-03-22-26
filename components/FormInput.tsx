// File: components/FormInput.tsx
import React from "react";
import { Text, TextInput, View } from "react-native";

type Props = {
  label: string;
  value: string;
  onChangeText: (value: string) => void;
  placeholder?: string;
  secureTextEntry?: boolean;
  autoCapitalize?: "none" | "sentences" | "words" | "characters";
};

export default function FormInput({
  label,
  value,
  onChangeText,
  placeholder,
  secureTextEntry = false,
  autoCapitalize = "none"
}: Props) {
  return (
    <View style={{ marginBottom: 16 }}>
      {label ? (
        <Text
          style={{
            color: "#D4AF37",
            fontWeight: "600",
            marginBottom: 8
          }}
        >
          {label}
        </Text>
      ) : null}

      <TextInput
        style={{
          backgroundColor: "#171717",
          color: "#FFFFFF",
          borderRadius: 16,
          paddingHorizontal: 16,
          paddingVertical: 16
        }}
        placeholder={placeholder}
        placeholderTextColor="#8a8a8a"
        value={value}
        onChangeText={onChangeText}
        secureTextEntry={secureTextEntry}
        autoCapitalize={autoCapitalize}
      />
    </View>
  );
}