import type { Metadata } from "next";
import { SeoLandingPage } from "@/app/seo-page";

export const metadata: Metadata = { title: "World Cup 2026 Live Score", description: "Live score hub with auto-refreshing match cards and API-ready polling." };

export default function Page() {
  return <SeoLandingPage title="World Cup 2026 Live Score" description="Follow live sample score cards, match clocks, halftime states, and timeline placeholders." links={["/live-scores", "/schedule", "/match/mexico-south-africa-group-a", "/predictions"]} />;
}
