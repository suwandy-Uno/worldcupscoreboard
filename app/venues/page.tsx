import type { Metadata } from "next";
import { AutoVenues } from "@/components/auto-data-views";
import { PageHeader } from "@/components/ui/page-header";
import { getVenues } from "@/lib/services/sports-data";

export const metadata: Metadata = { title: "World Cup 2026 Venues", description: "Host city and stadium cards with timezone and match placeholders." };

export default async function VenuesPage() {
  const venues = await getVenues();
  return (
    <>
      <PageHeader title="World Cup 2026 Venues" description="Host cities and stadium cards with capacity placeholders, local timezones, and hosted match counts." />
      <AutoVenues venues={venues} />
    </>
  );
}
