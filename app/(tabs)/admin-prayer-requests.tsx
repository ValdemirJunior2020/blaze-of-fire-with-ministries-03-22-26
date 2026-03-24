// File: app/(tabs)/admin-prayer-requests.tsx
import React, { useEffect, useState } from "react";
import { ActivityIndicator, ScrollView, Text, View } from "react-native";
import { Redirect } from "expo-router";
import AppShell from "../../components/AppShell";
import GoldButton from "../../components/GoldButton";
import BrandHeader from "../../components/BrandHeader";
import { theme } from "../../constants/theme";
import { useAuth } from "../../context/AuthContext";
import { isAdminEmail } from "../../constants/admin";
import {
  deletePrayerRequest,
  markPrayerRequestAsPrayed,
  subscribeToPrayerRequests,
  type PrayerRequest
} from "../../services/prayerRequests";

export default function AdminPrayerRequestsScreen() {
  const { user, loading: authLoading } = useAuth();
  const [items, setItems] = useState<PrayerRequest[]>([]);
  const [loading, setLoading] = useState(true);
  const [listenerError, setListenerError] = useState<string | null>(null);

  useEffect(() => {
    if (authLoading) return;
    if (!isAdminEmail(user?.email)) return;

    setLoading(true);
    setListenerError(null);

    const unsubscribe = subscribeToPrayerRequests(
      (docs) => {
        setItems(Array.isArray(docs) ? docs : []);
        setLoading(false);
      },
      (error) => {
        setListenerError(error?.message || "Failed to load prayer requests.");
        setLoading(false);
      }
    );

    return () => {
      unsubscribe();
    };
  }, [authLoading, user?.email]);

  if (authLoading) {
    return (
      <AppShell>
        <BrandHeader size="sm" />
      </AppShell>
    );
  }

  if (!user) {
    return <Redirect href="/login" />;
  }

  if (!isAdminEmail(user.email)) {
    return <Redirect href="/(tabs)/home" />;
  }

  return (
    <AppShell>
      <BrandHeader size="sm" />

      <ScrollView
        contentContainerStyle={{ paddingBottom: 120 }}
        showsVerticalScrollIndicator={false}
      >
        <View
          style={{
            backgroundColor: "rgba(17,17,17,0.92)",
            borderWidth: 1,
            borderColor: theme.colors.border,
            borderRadius: 24,
            padding: 20
          }}
        >
          <Text
            style={{
              color: theme.colors.gold,
              fontFamily: "CinzelBold",
              fontSize: 24,
              marginBottom: 14
            }}
          >
            Admin Prayer Requests
          </Text>

          {loading ? (
            <ActivityIndicator size="large" color={theme.colors.gold} />
          ) : listenerError ? (
            <View
              style={{
                backgroundColor: "rgba(255,255,255,0.04)",
                borderWidth: 1,
                borderColor: theme.colors.border,
                borderRadius: 18,
                padding: 16
              }}
            >
              <Text
                style={{
                  color: theme.colors.text,
                  fontFamily: "MontserratMedium",
                  fontSize: 15,
                  lineHeight: 22
                }}
              >
                {listenerError}
              </Text>
            </View>
          ) : items.length === 0 ? (
            <Text
              style={{
                color: theme.colors.text,
                fontFamily: "MontserratMedium",
                fontSize: 15
              }}
            >
              No prayer requests yet.
            </Text>
          ) : (
            items.map((item) => (
              <View
                key={item.id}
                style={{
                  backgroundColor: "rgba(255,255,255,0.04)",
                  borderWidth: 1,
                  borderColor: theme.colors.border,
                  borderRadius: 18,
                  padding: 16,
                  marginBottom: 14
                }}
              >
                <Text
                  style={{
                    color: theme.colors.gold,
                    fontFamily: "MontserratBold",
                    fontSize: 16,
                    marginBottom: 6
                  }}
                >
                  {item.name}
                </Text>

                <Text
                  style={{
                    color: "#D9D9D9",
                    fontFamily: "MontserratMedium",
                    fontSize: 13,
                    marginBottom: 6
                  }}
                >
                  {item.email}
                </Text>

                <Text
                  style={{
                    color: "#BFBFBF",
                    fontFamily: "MontserratMedium",
                    fontSize: 12,
                    marginBottom: 10
                  }}
                >
                  Privacy: {item.isPrivate ? "Private" : "Public"} | Status: {item.status || "new"}
                </Text>

                <Text
                  style={{
                    color: theme.colors.text,
                    fontFamily: "MontserratMedium",
                    fontSize: 15,
                    lineHeight: 24,
                    marginBottom: 14
                  }}
                >
                  {item.request}
                </Text>

                <GoldButton
                  title="Mark as Prayed"
                  onPress={() => void markPrayerRequestAsPrayed(item.id)}
                />

                <View style={{ height: 10 }} />

                <GoldButton
                  title="Delete Request"
                  onPress={() => void deletePrayerRequest(item.id)}
                />
              </View>
            ))
          )}
        </View>
      </ScrollView>
    </AppShell>
  );
}
