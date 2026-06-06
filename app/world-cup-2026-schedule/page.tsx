import type { Metadata } from "next";
import { SeoLandingPage } from "@/app/seo-page";

export const metadata: Metadata = { title: "World Cup 2026 Schedule", description: "Timezone-aware World Cup 2026 schedule page with internal links to live scores, standings, and teams." };

export default function Page() {
  return <SeoLandingPage title="World Cup 2026 Schedule" description="Find sample fixtures, venue notes, and local match times for the 2026 tournament." links={["/schedule", "/live-scores", "/standings", "/teams"]} />;
}
