// File: app/ministries.tsx
import React, { useEffect, useMemo, useState } from "react";
import {
  ActivityIndicator,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  useWindowDimensions,
} from "react-native";
import { router } from "expo-router";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import AppShell from "../components/AppShell";
import BrandHeader from "../components/BrandHeader";
import { theme } from "../constants/theme";
import { getMinistries } from "../services/churchContent";
import { MinistryItem } from "../types/churchContent";

type IconName = keyof typeof Ionicons.glyphMap;
type MciName = keyof typeof MaterialCommunityIcons.glyphMap;

type MinistryTheme = {
  color: string;
  iconType: "ion" | "mci";
  iconName: IconName | MciName;
};

const ministryThemeMap: Record<string, MinistryTheme> = {
  apostle: { color: "#4DB7FF", iconType: "ion", iconName: "flame-outline" },
  prophets: { color: "#B46CFF", iconType: "ion", iconName: "eye-outline" },
  evangelists: { color: "#FFD84D", iconType: "ion", iconName: "megaphone-outline" },
  teachers: { color: "#56F28B", iconType: "ion", iconName: "school-outline" },
  music: { color: "#FF8A3D", iconType: "ion", iconName: "musical-notes-outline" },
  children: { color: "#FF5A66", iconType: "ion", iconName: "happy-outline" },
  pastors: { color: "#4DB7FF", iconType: "ion", iconName: "people-outline" },
  media: { color: "#56F28B", iconType: "ion", iconName: "videocam-outline" },
};

const fallbackThemes: MinistryTheme[] = [
  { color: "#4DB7FF", iconType: "ion", iconName: "home-outline" },
  { color: "#B46CFF", iconType: "ion", iconName: "person-outline" },
  { color: "#FFD84D", iconType: "ion", iconName: "information-circle-outline" },
  { color: "#56F28B", iconType: "ion", iconName: "settings-outline" },
  { color: "#FF8A3D", iconType: "ion", iconName: "compass-outline" },
  { color: "#FF5A66", iconType: "ion", iconName: "chatbubble-ellipses-outline" },
];

function getThemeForMinistry(item: MinistryItem, index: number): MinistryTheme {
  return ministryThemeMap[item.key] || fallbackThemes[index % fallbackThemes.length];
}

function GlowIcon({
  themeConfig,
  size,
}: {
  themeConfig: MinistryTheme;
  size: number;
}) {
  if (themeConfig.iconType === "mci") {
    return (
      <MaterialCommunityIcons
        name={themeConfig.iconName as MciName}
        size={size}
        color={themeConfig.color}
      />
    );
  }

  return (
    <Ionicons
      name={themeConfig.iconName as IconName}
      size={size}
      color={themeConfig.color}
    />
  );
}

function MinistryCard({
  item,
  index,
  compact,
}: {
  item: MinistryItem;
  index: number;
  compact: boolean;
}) {
  const themeConfig = getThemeForMinistry(item, index);
  const slug = item.key || item.id;

  return (
    <TouchableOpacity
      activeOpacity={0.9}
      onPress={() => router.push(`/(tabs)/ministry/${slug}`)}
      style={[
        styles.cardOuter,
        compact ? styles.cardOuterCompact : styles.cardOuterWide,
      ]}
    >
      <View
        style={[
          styles.cardGlow,
          {
            shadowColor: themeConfig.color,
            borderColor: themeConfig.color,
          },
        ]}
      />

      <View style={styles.cardInner}>
        {item.imageUrl ? (
          <Image source={{ uri: item.imageUrl }} resizeMode="cover" style={styles.cardImage} />
        ) : null}

        <View
          style={[
            styles.iconBox,
            {
              borderColor: themeConfig.color,
              shadowColor: themeConfig.color,
              backgroundColor: "rgba(255,255,255,0.02)",
            },
          ]}
        >
          <GlowIcon themeConfig={themeConfig} size={compact ? 34 : 42} />
        </View>

        <Text
          style={[
            styles.cardTitle,
            {
              color: themeConfig.color,
              fontSize: compact ? 20 : 22,
            },
          ]}
          numberOfLines={2}
        >
          {item.title.toUpperCase()}
        </Text>

        {!!item.leader && (
          <Text style={styles.cardMeta} numberOfLines={1}>
            {item.leader}
          </Text>
        )}

        {!!item.schedule && (
          <Text style={styles.cardMeta} numberOfLines={1}>
            {item.schedule}
          </Text>
        )}

        <Text style={styles.cardDescription} numberOfLines={4}>
          {item.description}
        </Text>

        <Text style={[styles.tapHint, { color: themeConfig.color }]}>
          Tap to open ministry
        </Text>
      </View>
    </TouchableOpacity>
  );
}

export default function MinistriesScreen() {
  const [items, setItems] = useState<MinistryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const { width } = useWindowDimensions();

  const compact = width < 900;
  const titleSize = width < 480 ? 30 : 40;

  useEffect(() => {
    let mounted = true;

    async function load() {
      try {
        const data = await getMinistries();
        if (mounted) {
          setItems(Array.isArray(data) ? data : []);
        }
      } catch (error) {
        console.error("Failed to load ministries:", error);
        if (mounted) {
          setItems([]);
        }
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    }

    void load();

    return () => {
      mounted = false;
    };
  }, []);

  const groupedItems = useMemo(() => items, [items]);

  return (
    <AppShell>
      <BrandHeader size="sm" />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        <View style={styles.heroCard}>
          <Text style={[styles.heroTitle, { fontSize: titleSize }]}>Ministries</Text>
          <Text style={styles.heroText}>
            Tap any ministry card to open its teaching page while keeping the bottom menu visible.
          </Text>

          <TouchableOpacity
            activeOpacity={0.9}
            onPress={() => router.push("/(tabs)/home")}
            style={styles.backButton}
          >
            <Ionicons name="arrow-back" size={18} color="#111111" />
            <Text style={styles.backButtonText}>Back to Home</Text>
          </TouchableOpacity>
        </View>

        {loading ? (
          <View style={styles.loadingWrap}>
            <ActivityIndicator size="large" color={theme.colors.gold} />
            <Text style={styles.loadingText}>Loading ministries...</Text>
          </View>
        ) : (
          <View style={styles.grid}>
            {groupedItems.map((item, index) => (
              <MinistryCard
                key={item.id}
                item={item}
                index={index}
                compact={compact}
              />
            ))}
          </View>
        )}
      </ScrollView>
    </AppShell>
  );
}

const styles = StyleSheet.create({
  scrollContent: {
    paddingBottom: 36,
  },
  heroCard: {
    backgroundColor: "rgba(10,10,10,0.75)",
    borderRadius: 28,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.08)",
    padding: 22,
    marginBottom: 18,
  },
  heroTitle: {
    color: "#FFFFFF",
    fontFamily: "CinzelBold",
    marginBottom: 8,
  },
  heroText: {
    color: "#D6D6D6",
    fontFamily: "MontserratMedium",
    fontSize: 14,
    lineHeight: 22,
    marginBottom: 16,
  },
  backButton: {
    alignSelf: "flex-start",
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    backgroundColor: theme.colors.gold,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 18,
  },
  backButtonText: {
    color: "#111111",
    fontFamily: "MontserratBold",
    fontSize: 14,
  },
  loadingWrap: {
    minHeight: 260,
    alignItems: "center",
    justifyContent: "center",
  },
  loadingText: {
    marginTop: 12,
    color: "#E5E5E5",
    fontFamily: "MontserratMedium",
    fontSize: 14,
  },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  cardOuter: {
    position: "relative",
    marginBottom: 18,
    borderRadius: 28,
    overflow: "visible",
  },
  cardOuterWide: {
    width: "48.5%",
    minHeight: 290,
  },
  cardOuterCompact: {
    width: "100%",
    minHeight: 260,
  },
  cardGlow: {
    ...StyleSheet.absoluteFillObject,
    borderWidth: 1.5,
    borderRadius: 28,
    shadowOpacity: 0.9,
    shadowRadius: 18,
    shadowOffset: { width: 0, height: 0 },
    opacity: 0.95,
  },
  cardInner: {
    flex: 1,
    backgroundColor: "rgba(18,18,18,0.88)",
    borderRadius: 28,
    padding: 20,
    minHeight: 260,
    justifyContent: "center",
    alignItems: "center",
  },
  cardImage: {
    width: "100%",
    height: 120,
    borderRadius: 18,
    marginBottom: 16,
  },
  iconBox: {
    width: 92,
    height: 92,
    borderRadius: 24,
    borderWidth: 2,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 16,
    shadowOpacity: 1,
    shadowRadius: 16,
    shadowOffset: { width: 0, height: 0 },
  },
  cardTitle: {
    fontFamily: "MontserratBold",
    textAlign: "center",
    marginBottom: 10,
    letterSpacing: 0.3,
  },
  cardMeta: {
    color: "#C9C9C9",
    fontFamily: "MontserratMedium",
    fontSize: 12,
    textAlign: "center",
    marginBottom: 4,
  },
  cardDescription: {
    color: "#F0F0F0",
    fontFamily: "MontserratMedium",
    fontSize: 13,
    lineHeight: 20,
    textAlign: "center",
    marginTop: 8,
  },
  tapHint: {
    marginTop: 14,
    fontFamily: "MontserratBold",
    fontSize: 12,
    letterSpacing: 0.3,
  },
});