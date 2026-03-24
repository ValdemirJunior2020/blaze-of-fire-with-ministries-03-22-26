// File: app/admin/events.tsx

import React from "react";
import EmptyState from "../../components/EmptyState";
import Screen from "../../components/Screen";
import SectionTitle from "../../components/SectionTitle";

export default function AdminEventsScreen() {
  return (
    <Screen>
      <SectionTitle title="Events" />
      <EmptyState
        title="Events area ready"
        message="Next step is to add church events, flyers, service times, and conference banners here."
      />
    </Screen>
  );
}