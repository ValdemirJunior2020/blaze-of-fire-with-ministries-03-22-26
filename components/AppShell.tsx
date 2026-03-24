// File: components/AppShell.tsx
import React from "react";
import {
  ImageBackground,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  View,
} from "react-native";

type Props = {
  children: React.ReactNode;
  scroll?: boolean;
};

export default function AppShell({ children, scroll = true }: Props) {
  return (
    <ImageBackground
      source={require("../assets/bg.jpg")}
      resizeMode="cover"
      style={styles.root}
      imageStyle={styles.bgImage}
    >
      <View style={styles.overlay} />

      <KeyboardAvoidingView
        style={styles.contentLayer}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        {scroll ? (
          <ScrollView
            contentContainerStyle={styles.scrollContent}
            keyboardShouldPersistTaps="handled"
            showsVerticalScrollIndicator={false}
          >
            <View style={styles.content}>{children}</View>
          </ScrollView>
        ) : (
          <View style={styles.noScrollContent}>
            <View style={styles.content}>{children}</View>
          </View>
        )}
      </KeyboardAvoidingView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    width: "100%",
    backgroundColor: "#050505",
  },
  bgImage: {
    opacity: 1,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0,0,0,0.72)",
  },
  contentLayer: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    padding: 20,
    paddingBottom: 120,
  },
  noScrollContent: {
    flex: 1,
    padding: 20,
  },
  content: {
    width: "100%",
    maxWidth: 760,
    alignSelf: "center",
  },
});