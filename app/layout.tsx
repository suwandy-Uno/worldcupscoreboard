import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Script from "next/script";
import { Footer } from "@/components/layout/footer";
import { Header } from "@/components/layout/header";
import { MobileNav } from "@/components/layout/mobile-nav";
import { Sidebar } from "@/components/layout/sidebar";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://worldcupscoreboard.com"),
  title: {
    default: "World Cup Scoreboard | Live Scores, Schedule, Standings",
    template: "%s | World Cup Scoreboard"
  },
  description: "Live scores, schedules, standings, predictions, injuries, and match times in your timezone for World Cup 2026.",
  openGraph: {
    title: "World Cup Scoreboard",
    description: "Independent World Cup 2026 football dashboard with timezone-aware match data.",
    url: "https://worldcupscoreboard.com",
    siteName: "World Cup Scoreboard",
    type: "website"
  },
  alternates: { canonical: "/" }
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Script
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-2494373577921258"
          crossOrigin="anonymous"
          strategy="afterInteractive"
        />
        <div className="min-h-screen lg:grid lg:grid-cols-[260px_1fr]">
          <Sidebar />
          <div className="min-w-0">
            <Header />
            <main className="mx-auto w-full max-w-[1500px] px-4 pb-28 pt-5 sm:px-6 lg:px-8">{children}</main>
            <Footer />
          </div>
          <MobileNav />
        </div>
      </body>
    </html>
  );
}
