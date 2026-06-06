import type { Metadata } from "next";
import { SeoLandingPage } from "@/app/seo-page";

export const metadata: Metadata = { title: "World Cup 2026 Bracket", description: "Expanded knockout bracket page for World Cup 2026." };

export default function Page() {
  return <SeoLandingPage title="World Cup 2026 Bracket" description="Round of 32 through final placeholder bracket with future qualification paths." links={["/bracket", "/standings", "/schedule", "/live-scores"]} />;
}
