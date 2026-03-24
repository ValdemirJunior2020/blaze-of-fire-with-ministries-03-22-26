// File: app/(tabs)/giving.tsx
import React from "react";
import {
  Alert,
  Image,
  Linking,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import AppShell from "../../components/AppShell";
import BrandHeader from "../../components/BrandHeader";
import GoldButton from "../../components/GoldButton";
import { theme } from "../../constants/theme";

const PAYPAL_URL = "https://www.paypal.com/paypalme/blazeoffire";

// REPLACE THIS WITH YOUR REAL ZELLE EMAIL OR PHONE
const ZELLE_VALUE = "marcelo@blazeoffire.com";

const QR_IMAGE = require("../../assets/qr.jpeg");

export default function GivingScreen() {
  const openExternalLink = async (url: string, label: string) => {
    try {
      const supported = await Linking.canOpenURL(url);

      if (!supported) {
        Alert.alert("Error", `Unable to open ${label}.`);
        return;
      }

      await Linking.openURL(url);
    } catch {
      Alert.alert("Error", `Something went wrong opening ${label}.`);
    }
  };

  const openPayPal = async () => {
    await openExternalLink(PAYPAL_URL, "PayPal");
  };

  const openZelle = async () => {
    const cleanValue = ZELLE_VALUE.trim();

    if (!cleanValue) {
      Alert.alert("Zelle", "Please add the Zelle email or phone first.");
      return;
    }

    try {
      await Linking.openURL(`mailto:${cleanValue}?subject=Zelle Donation`);
    } catch {
      Alert.alert(
        "Zelle",
        `Send your donation through Zelle to: ${cleanValue}`
      );
    }
  };

  return (
    <AppShell>
      <BrandHeader size="sm" />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        <View style={styles.card}>
          <Text style={styles.title}>Give / Donate</Text>

          <Text style={styles.description}>
            Support Blaze of Fire Revival Global Center through PayPal or Zelle.
          </Text>

          <View style={styles.buttonGap}>
            <GoldButton title="Donate with PayPal" onPress={openPayPal} />
          </View>

          <Text style={styles.detailText}>PayPal: {PAYPAL_URL}</Text>

          <View style={styles.divider} />

          <View style={styles.buttonGap}>
            <GoldButton title="Donate with Zelle" onPress={openZelle} />
          </View>

          <Text style={styles.detailText}>Zelle: {ZELLE_VALUE}</Text>

          <View style={styles.divider} />

          <Text style={styles.qrTitle}>Scan to Give</Text>

          <View style={styles.qrWrap}>
            <Image source={QR_IMAGE} resizeMode="contain" style={styles.qrImage} />
          </View>

          <Text style={styles.qrNote}>
            You can also scan this QR code to give.
          </Text>
        </View>
      </ScrollView>
    </AppShell>
  );
}

const styles = StyleSheet.create({
  scrollContent: {
    paddingBottom: 32,
  },
  card: {
    backgroundColor: "rgba(17,17,17,0.92)",
    borderWidth: 1,
    borderColor: theme.colors.border,
    borderRadius: 24,
    padding: 20,
  },
  title: {
    color: theme.colors.gold,
    fontFamily: "CinzelBold",
    fontSize: 24,
    marginBottom: 10,
  },
  description: {
    color: theme.colors.text,
    fontFamily: "MontserratMedium",
    fontSize: 15,
    lineHeight: 24,
    marginBottom: 18,
  },
  buttonGap: {
    marginBottom: 12,
  },
  detailText: {
    color: "#CFCFCF",
    fontFamily: "MontserratMedium",
    fontSize: 12,
    lineHeight: 20,
  },
  divider: {
    height: 1,
    backgroundColor: "rgba(212,175,55,0.18)",
    marginVertical: 18,
  },
  qrTitle: {
    color: theme.colors.gold,
    fontFamily: "CinzelBold",
    fontSize: 20,
    marginBottom: 14,
    textAlign: "center",
  },
  qrWrap: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(255,255,255,0.04)",
    borderRadius: 22,
    borderWidth: 1,
    borderColor: "rgba(212,175,55,0.18)",
    padding: 16,
  },
  qrImage: {
    width: 260,
    height: 260,
    borderRadius: 16,
    backgroundColor: "#ffffff",
  },
  qrNote: {
    color: "#D8D8D8",
    fontFamily: "MontserratMedium",
    fontSize: 13,
    lineHeight: 20,
    marginTop: 12,
    textAlign: "center",
  },
});