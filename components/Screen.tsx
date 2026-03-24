// File: components/Screen.tsx
import React from "react";
import { SafeAreaView, ScrollView, StyleSheet, View } from "react-native";

type Props = {
  children: React.ReactNode;
  scroll?: boolean;
};

export default function Screen({ children, scroll = true }: Props) {
  if (scroll) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <ScrollView contentContainerStyle={styles.scrollContent}>
          <View>{children}</View>
        </ScrollView>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.content}>{children}</View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#0A0A0A"
  },
  scrollContent: {
    padding: 16
  },
  content: {
    flex: 1,
    padding: 16
  }
});