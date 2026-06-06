import type { Metadata } from "next";
import { MatchCard } from "@/components/ui/match-card";
import { PageHeader } from "@/components/ui/page-header";
import { PredictionCard } from "@/components/ui/prediction-card";
import { getMatches, getPredictions } from "@/lib/services/sports-data";
import { siteUrl } from "@/lib/utils";

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const match = (await getMatches()).find((item) => item.slug === params.slug);
  return { title: match ? `${match.home} vs ${match.away} Match Centre` : "Match Centre", description: "Score, venue, local time, prediction, timeline placeholder, stats, injuries, and group impact." };
}

export default async function MatchPage({ params }: { params: { slug: string } }) {
  const [matches, predictions] = await Promise.all([getMatches(), getPredictions()]);
  const match = matches.find((item) => item.slug === params.slug) ?? matches[0];
  const prediction = predictions.find((item) => item.matchId === match.id);
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "SportsEvent",
    name: `${match.home} vs ${match.away}`,
    startDate: match.isoDate,
    location: match.venue,
    url: siteUrl(`/match/${match.slug}`)
  };
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <PageHeader title={`${match.home} vs ${match.away}`} description={`${match.venue} · Group ${match.group} · match centre with API-ready score, lineup, stats, and timeline sections.`} />
      <div className="grid gap-5 xl:grid-cols-[1fr_380px]">
        <section className="space-y-5">
          <MatchCard match={match} />
          <div className="card grid gap-4 p-4 md:grid-cols-3">
            {["Lineups", "Timeline", "Key Stats"].map((title) => <div key={title}><h2 className="font-bold">{title}</h2><p className="mt-2 text-sm text-slate-400">Placeholder ready for sports data provider events.</p></div>)}
          </div>
        </section>
        {prediction ? <PredictionCard match={match} prediction={prediction} /> : null}
      </div>
    </>
  );
}
