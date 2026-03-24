// File: app/(tabs)/community.tsx
import React, { useEffect, useMemo, useState } from "react";
import {
  ActivityIndicator,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import AppShell from "../../components/AppShell";
import BrandHeader from "../../components/BrandHeader";
import { theme } from "../../constants/theme";
import { PublicUser, subscribeToUsers } from "../../services/users";

function getInitials(name: string) {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  if (parts.length === 0) return "M";
  if (parts.length === 1) return parts[0].slice(0, 1).toUpperCase();
  return `${parts[0][0]}${parts[1][0]}`.toUpperCase();
}

function MemberCard({ user }: { user: PublicUser }) {
  const initials = getInitials(user.displayName);

  return (
    <View style={styles.memberCard}>
      <View style={styles.avatar}>
        <Text style={styles.avatarText}>{initials}</Text>
      </View>

      <View style={styles.memberInfo}>
        <Text style={styles.memberName}>{user.displayName}</Text>

        {!!user.email && (
          <Text style={styles.memberEmail} numberOfLines={1}>
            {user.email}
          </Text>
        )}

        <View style={styles.roleRow}>
          <Ionicons
            name={user.role === "admin" ? "shield-checkmark" : "person"}
            size={14}
            color={theme.colors.gold}
          />
          <Text style={styles.roleText}>
            {user.role === "admin" ? "Admin" : "Member"}
          </Text>
        </View>
      </View>
    </View>
  );
}

export default function CommunityScreen() {
  const [users, setUsers] = useState<PublicUser[]>([]);
  const [loading, setLoading] = useState(true);
  const [listenerError, setListenerError] = useState("");

  useEffect(() => {
    const unsubscribe = subscribeToUsers(
      (items) => {
        setUsers(items);
        setLoading(false);
      },
      (error) => {
        setListenerError(error?.message || "Unable to load members.");
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, []);

  const memberCountText = useMemo(() => {
    if (loading) return "Loading members...";
    return `${users.length} member${users.length === 1 ? "" : "s"} signed up`;
  }, [loading, users.length]);

  return (
    <AppShell>
      <BrandHeader size="sm" />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        <View style={styles.heroCard}>
          <Text style={styles.heroTitle}>Church Family</Text>
          <Text style={styles.heroText}>
            Here you can see the people who signed up in the app.
          </Text>
          <Text style={styles.countText}>{memberCountText}</Text>
        </View>

        {loading ? (
          <View style={styles.centerBox}>
            <ActivityIndicator size="large" color={theme.colors.gold} />
            <Text style={styles.loadingText}>Loading members...</Text>
          </View>
        ) : listenerError ? (
          <View style={styles.messageCard}>
            <Text style={styles.messageTitle}>Could not load members</Text>
            <Text style={styles.messageText}>{listenerError}</Text>
          </View>
        ) : users.length === 0 ? (
          <View style={styles.messageCard}>
            <Text style={styles.messageTitle}>No members yet</Text>
            <Text style={styles.messageText}>
              When people create an account, they will appear here.
            </Text>
          </View>
        ) : (
          <View style={styles.grid}>
            {users.map((user) => (
              <MemberCard key={user.uid} user={user} />
            ))}
          </View>
        )}
      </ScrollView>
    </AppShell>
  );
}

const styles = StyleSheet.create({
  scrollContent: {
    paddingBottom: 32,
  },
  heroCard: {
    backgroundColor: "rgba(10,10,10,0.78)",
    borderRadius: 28,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.08)",
    padding: 22,
    marginBottom: 18,
  },
  heroTitle: {
    color: theme.colors.gold,
    fontFamily: "CinzelBold",
    fontSize: 30,
    marginBottom: 8,
  },
  heroText: {
    color: "#E4E4E4",
    fontFamily: "MontserratMedium",
    fontSize: 14,
    lineHeight: 22,
    marginBottom: 8,
  },
  countText: {
    color: "#BFBFBF",
    fontFamily: "MontserratSemiBold",
    fontSize: 13,
  },
  centerBox: {
    minHeight: 260,
    alignItems: "center",
    justifyContent: "center",
  },
  loadingText: {
    marginTop: 12,
    color: "#E4E4E4",
    fontFamily: "MontserratMedium",
    fontSize: 14,
  },
  messageCard: {
    backgroundColor: "rgba(12,12,12,0.92)",
    borderRadius: 24,
    borderWidth: 1,
    borderColor: "rgba(212,175,55,0.18)",
    padding: 18,
  },
  messageTitle: {
    color: theme.colors.gold,
    fontFamily: "CinzelBold",
    fontSize: 22,
    marginBottom: 8,
  },
  messageText: {
    color: "#ECECEC",
    fontFamily: "MontserratMedium",
    fontSize: 14,
    lineHeight: 22,
  },
  grid: {
    gap: 14,
  },
  memberCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(14,14,14,0.9)",
    borderRadius: 24,
    borderWidth: 1,
    borderColor: "rgba(212,175,55,0.2)",
    padding: 16,
  },
  avatar: {
    width: 58,
    height: 58,
    borderRadius: 29,
    backgroundColor: "rgba(212,175,55,0.18)",
    borderWidth: 1,
    borderColor: "rgba(212,175,55,0.35)",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 14,
  },
  avatarText: {
    color: theme.colors.gold,
    fontFamily: "MontserratBold",
    fontSize: 20,
  },
  memberInfo: {
    flex: 1,
  },
  memberName: {
    color: "#FFFFFF",
    fontFamily: "CinzelBold",
    fontSize: 18,
    marginBottom: 4,
  },
  memberEmail: {
    color: "#D7D7D7",
    fontFamily: "MontserratMedium",
    fontSize: 13,
    marginBottom: 6,
  },
  roleRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  roleText: {
    color: theme.colors.gold,
    fontFamily: "MontserratSemiBold",
    fontSize: 12,
  },
});