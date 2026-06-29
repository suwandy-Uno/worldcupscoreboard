import type { Metadata } from "next";
import { PageHeader } from "@/components/ui/page-header";

export const metadata: Metadata = {
  title: "About World Cup Scoreboard — Independent FIFA World Cup 2026 Coverage",
  description: "Learn about World Cup Scoreboard — your free, independent source for FIFA World Cup 2026 live scores, standings, predictions, team news and match schedules for all 104 fixtures.",
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
          <h2 className="text-lg font-bold text-white">The 2026 World Cup — Why This Tournament Is Different</h2>
          <p className="mt-2 leading-relaxed">
            The FIFA World Cup 2026 is not simply another edition of the tournament — it is a structural reinvention of the world&apos;s biggest sporting event. With 48 teams competing for the first time (up from 32), the tournament introduces a new Round of 32 knockout stage and 72 group-stage matches before a single elimination ball is kicked. That means more nations qualifying, more upsets, and a genuine shot at glory for countries that would never have made it in previous cycles.
          </p>
          <p className="mt-2 leading-relaxed">
            The three-nation co-hosting arrangement — USA, Canada, and Mexico — makes 2026 logistically unique as well. Matches will be played in 16 stadiums across 11 US cities, plus Toronto (Canada) and Guadalajara and Mexico City (Mexico). Fans travelling to follow their team may need to cross international borders between matches. Kick-off times span up to five different time zones. For global viewers, keeping track of what is happening and when has never been more complex. That complexity is exactly the problem World Cup Scoreboard is designed to solve.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-bold text-white">Our Prediction Methodology</h2>
          <p className="mt-2 leading-relaxed">
            Our match prediction model combines two signals: FIFA world ranking and recent competitive form. Rankings capture long-term quality — a team ranked #1 has demonstrated sustained excellence across years of competitive football. Form captures the short-term — a team that has won its last five matches is in a very different psychological and tactical moment than one that has drawn or lost recently.
          </p>
          <p className="mt-2 leading-relaxed">
            We convert rankings into a strength score using exponential decay, so the gap between #1 and #20 is far larger than the gap between #40 and #60. Form is scored on a W=3, D=1, L=0 basis across the five most recent competitive matches. The two signals are combined and normalised to produce win, draw and loss probabilities for each fixture.
          </p>
          <p className="mt-2 leading-relaxed">
            These are statistical estimates intended for analysis and entertainment. They are not betting tips, and they do not factor in injuries, tactical setups, weather, or the psychological effects of high-pressure knockout football — all of which can swing a match result in ways no model can fully predict. For the same reason we publish a confidence rating alongside each prediction: High confidence means a large ranking gap between the two sides; Low confidence means the teams are closely matched and the outcome is genuinely uncertain.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-bold text-white">How to Use This Site</h2>
          <p className="mt-2 leading-relaxed">
            The <a href="/live-scores" className="text-brand underline">Live Scores</a> page is updated in real time during matches and is the fastest way to see current scores, goal scorers, and which teams are playing right now. The <strong>Top 15</strong> tab combines live, halftime, and upcoming fixtures into a single view so you never miss what is happening.
          </p>
          <p className="mt-2 leading-relaxed">
            The <a href="/schedule" className="text-brand underline">Schedule</a> page lists all 104 fixtures with a timezone selector — choose your local city and every kick-off time converts automatically. The <a href="/standings" className="text-brand underline">Standings</a> page shows all 12 group tables with live goal difference and points. <a href="/predictions" className="text-brand underline">Predictions</a> are organised by tournament phase — Group Stage Matchday 1 through to the Final — and collapse to show only the phases most relevant to the current stage of the tournament.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-bold text-white">Get in Touch</h2>
          <p className="mt-2 leading-relaxed">
            Found a data error? Have a suggestion for a feature we should build? We read every message. Head to our <a href="/contact" className="text-brand underline">contact page</a> and we will get back to you as soon as we can.
          </p>
        </section>

      </div>
    </>
  );
}
