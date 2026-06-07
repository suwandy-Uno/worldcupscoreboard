import type { Metadata } from "next";
import { SeoLandingPage } from "@/app/seo-page";

export const metadata: Metadata = { title: "World Cup 2026 Playoff", description: "Expanded knockout playoff page for World Cup 2026." };

export default function Page() {
  return <SeoLandingPage title="World Cup 2026 Playoff" description="Round of 32 through final placeholder playoff with future qualification paths." links={["/playoff", "/standings", "/schedule", "/live-scores"]} />;
}
