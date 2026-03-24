// File: app/(tabs)/ministry/[slug].tsx
import React from "react";
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { router, useLocalSearchParams } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import AppShell from "../../../components/AppShell";
import BrandHeader from "../../../components/BrandHeader";
import { getMinistryTeachingBySlug } from "../../../constants/ministryTeachings";

function SectionCard({
  title,
  items,
  color,
}: {
  title: string;
  items: string[];
  color: string;
}) {
  return (
    <View style={styles.sectionCard}>
      <Text style={[styles.sectionTitle, { color }]}>{title}</Text>

      {items.map((item, index) => (
        <View key={`${title}-${index}`} style={styles.bulletRow}>
          <View style={[styles.bulletDot, { backgroundColor: color }]} />
          <Text style={styles.bulletText}>{item}</Text>
        </View>
      ))}
    </View>
  );
}

export default function MinistryDetailScreen() {
  const params = useLocalSearchParams<{ slug?: string }>();
  const slug = typeof params.slug === "string" ? params.slug : "";
  const ministry = getMinistryTeachingBySlug(slug);

  if (!ministry) {
    return (
      <AppShell>
        <BrandHeader size="sm" />

        <View style={styles.notFoundWrap}>
          <Text style={styles.notFoundTitle}>Ministry not found</Text>
          <TouchableOpacity
            activeOpacity={0.9}
            onPress={() => router.push("/ministries")}
            style={styles.backButton}
          >
            <Ionicons name="arrow-back" size={18} color="#111111" />
            <Text style={styles.backButtonText}>Back to Ministries</Text>
          </TouchableOpacity>
        </View>
      </AppShell>
    );
  }

  return (
    <AppShell>
      <BrandHeader size="sm" />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        <View style={[styles.heroCard, { borderColor: ministry.color }]}>
          <View style={[styles.heroIconWrap, { borderColor: ministry.color, shadowColor: ministry.color }]}>
            <Ionicons name={ministry.icon} size={42} color={ministry.color} />
          </View>

          <Text style={[styles.heroTitle, { color: ministry.color }]}>
            {ministry.title}
          </Text>

          <Text style={styles.verseText}>{ministry.verse}</Text>

          <Text style={styles.purposeText}>{ministry.purpose}</Text>

          <TouchableOpacity
            activeOpacity={0.9}
            onPress={() => router.push("/ministries")}
            style={styles.backButton}
          >
            <Ionicons name="arrow-back" size={18} color="#111111" />
            <Text style={styles.backButtonText}>Back to Ministries</Text>
          </TouchableOpacity>
        </View>

        <SectionCard
          title="Mission"
          items={ministry.mission}
          color={ministry.color}
        />

        <SectionCard
          title="Responsibilities"
          items={ministry.responsibilities}
          color={ministry.color}
        />

        <SectionCard
          title="Spirit-Filled Culture"
          items={ministry.spiritFilledCulture}
          color={ministry.color}
        />

        <SectionCard
          title="Prayer Focus"
          items={ministry.prayerFocus}
          color={ministry.color}
        />
      </ScrollView>
    </AppShell>
  );
}

const styles = StyleSheet.create({
  scrollContent: {
    paddingBottom: 30,
  },
  heroCard: {
    backgroundColor: "rgba(15,15,15,0.88)",
    borderRadius: 28,
    borderWidth: 1.5,
    padding: 22,
    marginBottom: 18,
    alignItems: "center",
  },
  heroIconWrap: {
    width: 96,
    height: 96,
    borderRadius: 26,
    borderWidth: 2,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 16,
    backgroundColor: "rgba(255,255,255,0.02)",
    shadowOpacity: 1,
    shadowRadius: 16,
    shadowOffset: { width: 0, height: 0 },
  },
  heroTitle: {
    fontFamily: "CinzelBold",
    fontSize: 28,
    textAlign: "center",
    marginBottom: 8,
  },
  verseText: {
    color: "#D9D9D9",
    fontFamily: "MontserratBold",
    fontSize: 14,
    marginBottom: 12,
    textAlign: "center",
  },
  purposeText: {
    color: "#F3F3F3",
    fontFamily: "MontserratMedium",
    fontSize: 14,
    lineHeight: 24,
    textAlign: "center",
    marginBottom: 18,
  },
  sectionCard: {
    backgroundColor: "rgba(12,12,12,0.88)",
    borderRadius: 24,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.08)",
    padding: 18,
    marginBottom: 14,
  },
  sectionTitle: {
    fontFamily: "CinzelBold",
    fontSize: 22,
    marginBottom: 12,
  },
  bulletRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: 10,
  },
  bulletDot: {
    width: 8,
    height: 8,
    borderRadius: 999,
    marginTop: 7,
    marginRight: 10,
  },
  bulletText: {
    flex: 1,
    color: "#EFEFEF",
    fontFamily: "MontserratMedium",
    fontSize: 14,
    lineHeight: 22,
  },
  notFoundWrap: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 24,
  },
  notFoundTitle: {
    color: "#FFFFFF",
    fontFamily: "CinzelBold",
    fontSize: 28,
    marginBottom: 18,
    textAlign: "center",
  },
  backButton: {
    alignSelf: "center",
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    backgroundColor: "#D4AF37",
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 18,
  },
  backButtonText: {
    color: "#111111",
    fontFamily: "MontserratBold",
    fontSize: 14,
  },
});