// File: app/ministries.tsx
import React, { useEffect, useState } from "react";
import { Image, ScrollView, Text, View, useWindowDimensions } from "react-native";
import { router } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import AppShell from "../components/AppShell";
import BrandHeader from "../components/BrandHeader";
import GoldButton from "../components/GoldButton";
import { theme } from "../constants/theme";
import { getMinistries } from "../services/churchContent";
import { MinistryItem } from "../types/churchContent";

const iconMap: Record<string, keyof typeof Ionicons.glyphMap> = {
  pastors: "people",
  music: "musical-notes",
  media: "videocam",
  apostle: "flame",
  prophets: "eye",
  evangelists: "megaphone",
  teachers: "school",
  children: "happy",
};

function MinistryCard({
  item,
  compact,
}: {
  item: MinistryItem;
  compact: boolean;
}) {
  return (
    <View
      style={{
        width: compact ? "100%" : "48.5%",
        backgroundColor: "rgba(12,12,12,0.96)",
        borderRadius: 24,
        borderWidth: 1,
        borderColor: "rgba(212,175,55,0.22)",
        overflow: "hidden",
        marginBottom: 16,
        shadowColor: "#000000",
        shadowOpacity: 0.28,
        shadowRadius: 10,
        shadowOffset: { width: 0, height: 6 },
        elevation: 5,
      }}
    >
      {item.imageUrl ? (
        <Image
          source={{ uri: item.imageUrl }}
          resizeMode="cover"
          style={{
            width: "100%",
            height: 150,
            backgroundColor: "#111111",
          }}
        />
      ) : (
        <View
          style={{
            width: "100%",
            height: 150,
            backgroundColor: "#111111",
            alignItems: "center",
            justifyContent: "center",
            borderBottomWidth: 1,
            borderBottomColor: "rgba(212,175,55,0.14)",
          }}
        >
          <View
            style={{
              width: 74,
              height: 74,
              borderRadius: 37,
              backgroundColor: "rgba(212,175,55,0.12)",
              alignItems: "center",
              justifyContent: "center",
              borderWidth: 1,
              borderColor: "rgba(212,175,55,0.25)",
            }}
          >
            <Ionicons
              name={iconMap[item.key] || "grid"}
              size={32}
              color={theme.colors.gold}
            />
          </View>
        </View>
      )}

      <View style={{ padding: 16 }}>
        <Text
          style={{
            color: "#FFFFFF",
            fontFamily: "CinzelBold",
            fontSize: 18,
            marginBottom: 8,
          }}
        >
          {item.title}
        </Text>

        {!!item.leader && (
          <Text
            style={{
              color: theme.colors.gold,
              fontFamily: "MontserratSemiBold",
              fontSize: 12,
              marginBottom: 6,
            }}
          >
            {item.leader}
          </Text>
        )}

        {!!item.schedule && (
          <Text
            style={{
              color: "#CFCFCF",
              fontFamily: "MontserratMedium",
              fontSize: 12,
              marginBottom: 8,
            }}
          >
            {item.schedule}
          </Text>
        )}

        <Text
          style={{
            color: "#D8D8D8",
            fontFamily: "MontserratMedium",
            fontSize: 12,
            lineHeight: 19,
          }}
          numberOfLines={5}
        >
          {item.description}
        </Text>
      </View>
    </View>
  );
}

export default function MinistriesScreen() {
  const [items, setItems] = useState<MinistryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const { width } = useWindowDimensions();
  const compact = width < 820;

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

  return (
    <AppShell>
      <BrandHeader size="sm" />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 28 }}
      >
        <View
          style={{
            backgroundColor: "rgba(12,12,12,0.96)",
            borderWidth: 1,
            borderColor: "rgba(212,175,55,0.30)",
            borderRadius: 28,
            padding: 20,
            marginBottom: 18,
          }}
        >
          <Text
            style={{
              color: theme.colors.gold,
              fontFamily: "CinzelBold",
              fontSize: 32,
              marginBottom: 8,
            }}
          >
            Ministries
          </Text>

          <Text
            style={{
              color: theme.colors.text,
              fontFamily: "MontserratMedium",
              fontSize: 14,
              lineHeight: 22,
              marginBottom: 18,
            }}
          >
            Discover the ministries of Blaze of Fire Revival Global Center and find
            where you can serve, grow, and connect.
          </Text>

          <GoldButton
            title="Back to Home"
            onPress={() => router.push("/(tabs)/home")}
          />
        </View>

        {loading ? (
          <View
            style={{
              backgroundColor: "rgba(12,12,12,0.96)",
              borderWidth: 1,
              borderColor: "rgba(212,175,55,0.18)",
              borderRadius: 24,
              padding: 18,
            }}
          >
            <Text
              style={{
                color: "#D8D8D8",
                fontFamily: "MontserratMedium",
                fontSize: 14,
              }}
            >
              Loading ministries...
            </Text>
          </View>
        ) : (
          <View
            style={{
              flexDirection: "row",
              flexWrap: "wrap",
              justifyContent: "space-between",
            }}
          >
            {items.map((item) => (
              <MinistryCard key={item.id} item={item} compact={compact} />
            ))}
          </View>
        )}
      </ScrollView>
    </AppShell>
  );
}