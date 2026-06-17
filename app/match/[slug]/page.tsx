import type { Metadata } from "next";
import { MatchCard } from "@/components/ui/match-card";
import { PageHeader } from "@/components/ui/page-header";
import { PredictionCard } from "@/components/ui/prediction-card";
import { getMatches, getPredictions } from "@/lib/services/sports-data";
import { siteUrl } from "@/lib/utils";

export async function generateStaticParams() {
  const matches = await getMatches();
  return matches.map((match) => ({ slug: match.slug }));
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const match = (await getMatches()).find((item) => item.slug === params.slug);
  return {
    title: match ? `${match.home} vs ${match.away} — World Cup 2026` : "Match Centre",
    description: match
      ? `Live score, match stats and prediction for ${match.home} vs ${match.away} — Group ${match.group}, ${match.venue}. FIFA World Cup 2026.`
      : "World Cup 2026 match centre with live score, stats and prediction."
  };
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
      <PageHeader title={`${match.home} vs ${match.away}`} description={`${match.venue} · Group ${match.group} · FIFA World Cup 2026`} />
      <div className="grid gap-5 xl:grid-cols-[1fr_380px]">
        <section className="space-y-5">
          <MatchCard match={match} />
          <div className="card grid gap-4 p-4 md:grid-cols-3">
            <div>
              <h2 className="font-bold">Lineups</h2>
              <p className="mt-2 text-sm text-slate-400">Official lineups are confirmed approximately one hour before kick-off. Check back closer to the match for starting XI and substitutes for both sides.</p>
            </div>
            <div>
              <h2 className="font-bold">Match Timeline</h2>
              <p className="mt-2 text-sm text-slate-400">Goal scorers, bookings, substitutions and key moments will appear here as the match progresses. All events are shown in match minute order.</p>
            </div>
            <div>
              <h2 className="font-bold">Key Stats</h2>
              <p className="mt-2 text-sm text-slate-400">Possession, shots on target, pass accuracy and other match statistics will be updated live. Stats help paint the full picture beyond the scoreline.</p>
            </div>
          </div>
          <div className="card p-4">
            <h2 className="font-bold">About This Match</h2>
            <p className="mt-2 text-sm leading-relaxed text-slate-400">
              {match.home} take on {match.away} in Group {match.group} of the 2026 FIFA World Cup at {match.venue}. This is one of {104} matches being played across 16 venues in the United States, Canada and Mexico — the largest World Cup in history with 48 nations competing for the trophy. Group {match.group} results will determine which teams advance to the Round of 32. Every point matters in the group stage, where the top two teams from each group plus the best third-placed sides progress to the knockout rounds.
            </p>
          </div>
        </section>
        {prediction ? <PredictionCard match={match} prediction={prediction} /> : null}
      </div>
    </>
  );
}
