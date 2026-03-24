// File: app/admin/home-content.tsx
import React from "react";
import { Redirect } from "expo-router";

export default function AdminHomeContentRedirectScreen() {
  return <Redirect href="/(tabs)/admin-home-content" />;
}