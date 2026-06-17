import type { Metadata } from "next";
import { PageHeader } from "@/components/ui/page-header";

export const metadata: Metadata = {
  title: "About World Cup Scoreboard",
  description: "About World Cup Scoreboard — your free, independent source for FIFA World Cup 2026 live scores, standings and match data.",
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
  return (
    <>
      <PageHeader title="About World Cup Scoreboard" description="Free, independent and real-time." />
      <div className="prose prose-invert max-w-3xl space-y-8 text-slate-300">

        <section>
          <h2 className="text-lg font-bold text-white">What We Do</h2>
          <p className="mt-2 leading-relaxed">
            World Cup Scoreboard is a free, independent football information website built for fans following the 2026 FIFA World Cup across the USA, Canada and Mexico. We cover all 104 matches across 48 teams and 16 host cities — providing live scores, real-time group standings, the full match schedule (in your local timezone), team information, injury updates, match predictions and football news.
          </p>
          <p className="mt-2 leading-relaxed">
            We are not affiliated with FIFA or any official World Cup organiser. We are a fan-built resource for football fans everywhere.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-bold text-white">Why We Built This</h2>
          <p className="mt-2 leading-relaxed">
            The World Cup 2026 spans three countries and three time zones, with 104 matches from June 11 to July 19. Keeping track of kick-off times, group standings and results across that schedule is genuinely difficult — especially for fans watching from different parts of the world. We built World Cup Scoreboard to make that easy: one place, every match, shown in your local time.
          </p>
          <p className="mt-2 leading-relaxed">
            We also believe football fans deserve clear predictions based on real data — not just gut feeling. Our prediction engine uses FIFA rankings, recent form, head-to-head records and tournament-specific context to generate probability estimates for every match.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-bold text-white">What We Cover</h2>
          <ul className="mt-2 list-disc space-y-1 pl-6">
            <li><strong>Live Scores</strong> — real-time match updates for all 104 World Cup fixtures</li>
            <li><strong>Schedule</strong> — full match schedule with timezone conversion for your location</li>
            <li><strong>Standings</strong> — live group tables updated after every match</li>
            <li><strong>Teams</strong> — profiles for all 48 qualified nations</li>
            <li><strong>Predictions</strong> — data-driven match probability estimates</li>
            <li><strong>Injuries</strong> — key player injury and availability updates</li>
            <li><strong>News</strong> — football news and match analysis from the tournament</li>
            <li><strong>Venues</strong> — information on all 16 host stadiums across 11 US cities, plus Canada and Mexico</li>
          </ul>
        </section>

        <section>
          <h2 className="text-lg font-bold text-white">How We Make Money</h2>
          <p className="mt-2 leading-relaxed">
            World Cup Scoreboard is free to use and always will be. We are supported by display advertising served through Google AdSense. Ads help cover server costs and allow us to keep the site running throughout the tournament. We do not have a premium tier, paywall or subscription.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-bold text-white">Accuracy and Disclaimers</h2>
          <p className="mt-2 leading-relaxed">
            We aim to keep all scores, standings and data as accurate and up-to-date as possible throughout the tournament. Match predictions are statistical estimates for entertainment purposes only and should not be used as the basis for betting or financial decisions. For official tournament information, visit <a href="https://www.fifa.com/worldcup" className="text-brand underline" target="_blank" rel="noopener noreferrer">fifa.com</a>.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-bold text-white">Get in Touch</h2>
          <p className="mt-2 leading-relaxed">
            Found a data error? Have a suggestion? Head to our <a href="/contact" className="text-brand underline">contact page</a> and we will get back to you as soon as we can.
          </p>
        </section>

      </div>
    </>
  );
}
