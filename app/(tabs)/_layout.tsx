// File: app/(tabs)/_layout.tsx
import React from "react";
import { Tabs } from "expo-router";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { theme } from "../../constants/theme";

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        sceneStyle: {
          backgroundColor: "#050505"
        },
        tabBarStyle: {
          backgroundColor: "#060606",
          borderTopColor: theme.colors.border,
          height: 72,
          paddingTop: 8,
          paddingBottom: 10
        },
        tabBarLabelStyle: {
          fontFamily: "MontserratSemiBold",
          fontSize: 11,
          marginTop: 2
        },
        tabBarActiveTintColor: theme.colors.gold,
        tabBarInactiveTintColor: "#8A8A8A"
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          title: "Home",
          tabBarIcon: ({ color, size, focused }) => (
            <Ionicons name={focused ? "home" : "home-outline"} size={size} color={color} />
          )
        }}
      />

      <Tabs.Screen
        name="live"
        options={{
          title: "Live",
          tabBarIcon: ({ color, size, focused }) => (
            <Ionicons
              name={focused ? "play-circle" : "play-circle-outline"}
              size={size}
              color={color}
            />
          )
        }}
      />

      <Tabs.Screen
        name="prayer"
        options={{
          title: "Prayer",
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="hands-pray" size={size} color={color} />
          )
        }}
      />

      <Tabs.Screen
        name="community"
        options={{
          title: "People",
          tabBarIcon: ({ color, size, focused }) => (
            <Ionicons
              name={focused ? "people" : "people-outline"}
              size={size}
              color={color}
            />
          )
        }}
      />

      <Tabs.Screen
        name="profile"
        options={{
          title: "Me",
          tabBarIcon: ({ color, size, focused }) => (
            <Ionicons
              name={focused ? "person" : "person-outline"}
              size={size}
              color={color}
            />
          )
        }}
      />

      <Tabs.Screen
        name="admin"
        options={{
          href: null
        }}
      />

      <Tabs.Screen
        name="admin-prayer-requests"
        options={{
          href: null
        }}
      />

      <Tabs.Screen
        name="admin-home-content"
        options={{
          href: null
        }}
      />

      <Tabs.Screen
        name="admin-ministries"
        options={{
          href: null
        }}
      />

      <Tabs.Screen
        name="giving"
        options={{
          title: "Giving",
          tabBarIcon: ({ color, size, focused }) => (
            <Ionicons
              name={focused ? "heart" : "heart-outline"}
              size={size}
              color={color}
            />
          )
        }}
      />
    </Tabs>
  );
}