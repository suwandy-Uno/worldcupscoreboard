import type { Metadata } from "next";
import { SeoLandingPage } from "@/app/seo-page";

export const metadata: Metadata = { title: "World Cup 2026 Predictions", description: "Entertainment-only World Cup predictions with projected scores and confidence labels." };

export default function Page() {
  return <SeoLandingPage title="World Cup 2026 Predictions" description="Preview probability estimates, projected scores, and model factors without betting CTAs." links={["/predictions", "/schedule", "/injuries", "/teams"]} />;
}
