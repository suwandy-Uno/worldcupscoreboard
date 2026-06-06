import type { Metadata } from "next";
import { SeoLandingPage } from "@/app/seo-page";

export const metadata: Metadata = { title: "World Cup 2026 Schedule UK Time", description: "World Cup 2026 schedule landing page for UK time searches." };

export default function Page() {
  return <SeoLandingPage title="World Cup 2026 Schedule UK Time" description="A focused landing page for supporters looking for fixtures in Europe/London time." links={["/schedule", "/world-cup-2026-schedule", "/live-scores", "/teams"]} />;
}
