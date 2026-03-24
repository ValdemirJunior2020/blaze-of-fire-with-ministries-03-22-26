// File: app/(tabs)/admin.tsx
import React from "react";
import { Redirect } from "expo-router";

export default function AdminTabScreen() {
  return <Redirect href="/(tabs)/home" />;
}