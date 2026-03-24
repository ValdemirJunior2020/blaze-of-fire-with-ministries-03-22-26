// File: app/(tabs)/giving.tsx
import React from "react";
import { Alert, Linking, Text, View } from "react-native";
import AppShell from "../../components/AppShell";
import BrandHeader from "../../components/BrandHeader";
import GoldButton from "../../components/GoldButton";
import { theme } from "../../constants/theme";

const PAYPAL_URL = "https://www.paypal.com/paypalme/blazeoffire";

export default function GivingScreen() {
  const openPayPal = async () => {
    try {
      const supported = await Linking.canOpenURL(PAYPAL_URL);

      if (!supported) {
        Alert.alert("Error", "Unable to open PayPal link.");
        return;
      }

      await Linking.openURL(PAYPAL_URL);
    } catch (error) {
      Alert.alert("Error", "Something went wrong opening the donation link.");
    }
  };

  return (
    <AppShell>
      <BrandHeader size="sm" />

      <View
        style={{
          backgroundColor: "rgba(17,17,17,0.92)",
          borderWidth: 1,
          borderColor: theme.colors.border,
          borderRadius: 24,
          padding: 20,
        }}
      >
        <Text
          style={{
            color: theme.colors.gold,
            fontFamily: "CinzelBold",
            fontSize: 24,
            marginBottom: 10,
          }}
        >
          Give / Donate
        </Text>

        <Text
          style={{
            color: theme.colors.text,
            fontFamily: "MontserratMedium",
            fontSize: 15,
            lineHeight: 24,
            marginBottom: 18,
          }}
        >
          Support Blaze of Fire Revival Global Center through PayPal.
        </Text>

        <GoldButton title="Donate with PayPal" onPress={openPayPal} />

        <Text
          style={{
            color: "#CFCFCF",
            fontFamily: "MontserratMedium",
            fontSize: 12,
            marginTop: 14,
          }}
        >
          PayPal: {PAYPAL_URL}
        </Text>
      </View>
    </AppShell>
  );
}