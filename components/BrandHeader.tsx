// File: components/BrandHeader.tsx
import React from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import { theme } from "../constants/theme";

type Props = {
  size?: "sm" | "lg";
};

export default function BrandHeader({ size = "lg" }: Props) {
  const isSmall = size === "sm";

  return (
    <View style={styles.container}>
      <View style={styles.logoWrap}>
        <Image
          source={require("../assets/logo.png")}
          style={[styles.logo, isSmall ? styles.smallLogo : styles.largeLogo]}
          resizeMode="contain"
        />
      </View>

      <Text style={[styles.title, isSmall && styles.smallTitle]}>BLAZE OF FIRE</Text>
      <Text style={[styles.subtitle, isSmall && styles.smallSubtitle]}>
        Revival Global Center
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    marginBottom: 22
  },
  logoWrap: {
    marginBottom: 10,
    borderRadius: 999
  },
  logo: {
    opacity: 1
  },
  largeLogo: {
    width: 140,
    height: 140
  },
  smallLogo: {
    width: 88,
    height: 88
  },
  title: {
    color: theme.colors.gold,
    fontSize: 30,
    fontFamily: "CinzelBold",
    textAlign: "center",
    letterSpacing: 0.5
  },
  smallTitle: {
    fontSize: 24
  },
  subtitle: {
    marginTop: 4,
    color: "#F2F2F2",
    fontSize: 14,
    fontFamily: "MontserratSemiBold",
    textAlign: "center"
  },
  smallSubtitle: {
    fontSize: 12
  }
});