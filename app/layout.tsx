import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Script from "next/script";
import { Footer } from "@/components/layout/footer";
import { Header } from "@/components/layout/header";
import { MobileNav } from "@/components/layout/mobile-nav";
import { Sidebar } from "@/components/layout/sidebar";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

const SITE_URL = "https://worldcupscoreboard.com";
const SITE_NAME = "World Cup Scoreboard";
const DEFAULT_TITLE = "World Cup 2026 Live Scores, Schedule & Standings";
const DEFAULT_DESC =
  "Free World Cup 2026 live scores, real-time standings, full match schedule, injury updates and predictions. Matches shown in your local timezone. USA · Canada · Mexico.";
const OG_IMAGE = `${SITE_URL}/og-image.png`;

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: DEFAULT_TITLE,
    template: `%s | ${SITE_NAME}`,
  },
  description: DEFAULT_DESC,
  keywords: [
    "World Cup 2026 live scores",
    "FIFA World Cup 2026",
    "World Cup schedule 2026",
    "World Cup standings",
    "World Cup 2026 fixtures",
    "soccer world cup 2026",
    "football world cup 2026",
    "world cup live",
    "WC26",
    "USA Canada Mexico World Cup",
  ],
  authors: [{ name: SITE_NAME, url: SITE_URL }],
  creator: SITE_NAME,
  publisher: SITE_NAME,
  category: "Sports",
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1 },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: SITE_URL,
    siteName: SITE_NAME,
    title: DEFAULT_TITLE,
    description: DEFAULT_DESC,
    images: [{ url: OG_IMAGE, width: 1200, height: 630, alt: "World Cup 2026 Live Scoreboard" }],
  },
  twitter: {
    card: "summary_large_image",
    site: "@WC26Scoreboard",
    creator: "@WC26Scoreboard",
    title: DEFAULT_TITLE,
    description: DEFAULT_DESC,
    images: [OG_IMAGE],
  },
  alternates: { canonical: "/" },
  verification: {
    // Add Google Search Console verification token here once you get it
    // google: "YOUR_VERIFICATION_TOKEN",
  },
  other: {
    "theme-color": "#0d1117",
  },
};

// JSON-LD structured data
const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebSite",
      "@id": `${SITE_URL}/#website`,
      url: SITE_URL,
      name: SITE_NAME,
      description: DEFAULT_DESC,
      potentialAction: {
        "@type": "SearchAction",
        target: { "@type": "EntryPoint", urlTemplate: `${SITE_URL}/schedule?q={search_term_string}` },
        "query-input": "required name=search_term_string",
      },
    },
    {
      "@type": "SportsOrganization",
      "@id": `${SITE_URL}/#org`,
      name: "FIFA World Cup 2026",
      url: "https://www.fifa.com/worldcup",
      sport: "Soccer",
      location: {
        "@type": "Place",
        name: "USA, Canada, Mexico",
      },
    },
    {
      "@type": "SportsEvent",
      "@id": `${SITE_URL}/#event`,
      name: "FIFA World Cup 2026",
      startDate: "2026-06-11",
      endDate: "2026-07-19",
      location: {
        "@type": "Place",
        name: "United States, Canada, Mexico",
        address: { "@type": "PostalAddress", addressCountry: "US" },
      },
      organizer: { "@type": "Organization", name: "FIFA", url: "https://www.fifa.com" },
      description:
        "The 2026 FIFA World Cup hosted across 16 stadiums in the USA, Canada, and Mexico.",
      url: SITE_URL,
      image: OG_IMAGE,
    },
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <link rel="preconnect" href="https://flagcdn.com" />
        <link rel="preconnect" href="https://images.unsplash.com" />
        <link rel="dns-prefetch" href="https://pagead2.googlesyndication.com" />
      </head>
      <body className={inter.className}>
        {/* Google Analytics 4 */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-ZK7NR5HDJ2"
          strategy="afterInteractive"
        />
        <Script id="ga4" strategy="afterInteractive">
          {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','G-ZK7NR5HDJ2',{page_path:window.location.pathname});`}
        </Script>
        {/* Google AdSense */}
        <Script
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-2494373577921258"
          crossOrigin="anonymous"
          strategy="afterInteractive"
        />
        <div className="min-h-screen lg:grid lg:grid-cols-[260px_1fr]">
          <Sidebar />
          <div className="min-w-0">
            <Header />
            <main className="mx-auto w-full max-w-[1500px] px-4 pb-28 pt-5 sm:px-6 lg:px-8">
              {children}
            </main>
            <Footer />
          </div>
          <MobileNav />
        </div>
      </body>
    </html>
  );
}
