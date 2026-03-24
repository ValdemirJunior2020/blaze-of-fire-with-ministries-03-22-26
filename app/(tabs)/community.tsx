// File: app/(tabs)/community.tsx

import React from "react";
import { Linking, Text, View } from "react-native";
import AppShell from "../../components/AppShell";
import BrandHeader from "../../components/BrandHeader";
import GoldButton from "../../components/GoldButton";
import { theme } from "../../constants/theme";

export default function CommunityScreen() {
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
          marginBottom: 14
        }}
      >
        <Text
          style={{
            color: theme.colors.gold,
            fontFamily: "CinzelBold",
            fontSize: 22,
            marginBottom: 12
          }}
        >
          Connect
        </Text>

        <View style={{ gap: 12 }}>
          <GoldButton
            title="Instagram"
            onPress={() => Linking.openURL("https://www.instagram.com/boffireglobal/")}
          />
          <GoldButton
            title="Facebook"
            onPress={() => Linking.openURL("https://www.facebook.com/BlazeofFireGlobal")}
          />
          <GoldButton
            title="Gallery"
            onPress={() => Linking.openURL("https://blazeoffirehubs.com/gallery/")}
          />
        </View>
      </View>
    </AppShell>
  );
}