// File: app/ministries.tsx
import React, { useEffect, useState } from "react";
import { Image, ScrollView, Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import AppShell from "../components/AppShell";
import BrandHeader from "../components/BrandHeader";
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

function MinistryCard({ item }: { item: MinistryItem }) {
  return (
    <View
      style={{
        width: "47.5%",
        backgroundColor: "rgba(30,30,30,0.95)",
        borderRadius: 24,
        borderWidth: 1,
        borderColor: "#2B2B2B",
        overflow: "hidden",
        marginBottom: 14,
        shadowColor: "#000000",
        shadowOpacity: 0.18,
        shadowRadius: 10,
        shadowOffset: { width: 0, height: 4 },
        elevation: 4,
      }}
    >
      {item.imageUrl ? (
        <Image
          source={{ uri: item.imageUrl }}
          resizeMode="cover"
          style={{ width: "100%", height: 120, backgroundColor: "#111111" }}
        />
      ) : (
        <View
          style={{
            width: "100%",
            height: 120,
            backgroundColor: "#141414",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Ionicons
            name={iconMap[item.key] || "grid"}
            size={34}
            color="#DDEBFF"
          />
        </View>
      )}

      <View style={{ padding: 14 }}>
        <Text
          style={{
            color: "#FFFFFF",
            fontFamily: "MontserratBold",
            fontSize: 17,
            marginBottom: 6,
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
              marginBottom: 6,
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
            lineHeight: 18,
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

  useEffect(() => {
    let mounted = true;

    async function load() {
      try {
        const data = await getMinistries();
        if (mounted) {
          setItems(data);
        }
      } catch (error) {
        console.error("Failed to load ministries:", error);
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    }

    load();

    return () => {
      mounted = false;
    };
  }, []);

  return (
    <AppShell>
      <BrandHeader size="sm" />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 24 }}
      >
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
              marginBottom: 8,
            }}
          >
            Ministries
          </Text>

          <Text
            style={{
              color: theme.colors.text,
              fontFamily: "MontserratMedium",
              fontSize: 13,
              lineHeight: 20,
              marginBottom: 18,
            }}
          >
            Discover the ministries of Blaze of Fire Revival Global Center.
          </Text>

          {loading ? (
            <Text
              style={{
                color: "#D8D8D8",
                fontFamily: "MontserratMedium",
                fontSize: 14,
              }}
            >
              Loading ministries...
            </Text>
          ) : (
            <View
              style={{
                flexDirection: "row",
                flexWrap: "wrap",
                justifyContent: "space-between",
              }}
            >
              {items.map((item) => (
                <MinistryCard key={item.id} item={item} />
              ))}
            </View>
          )}
        </View>
      </ScrollView>
    </AppShell>
  );
}