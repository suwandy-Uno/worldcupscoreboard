"use client";

import { Bell, CalendarDays, ChevronRight, Clock, MapPin, Star, Trophy } from "lucide-react";
import { useEffect, useState } from "react";
import type { Injury, Match, NewsItem, Prediction, Standing } from "@/lib/types";
import { MatchCard } from "@/components/ui/match-card";
import { NewsCard } from "@/components/ui/news-card";
import { PredictionCard } from "@/components/ui/prediction-card";
import { ScheduleTable } from "@/components/ui/schedule-table";
import { StandingsTable } from "@/components/ui/standings-table";
import { useAutoRefresh } from "@/lib/hooks/use-auto-refresh";
import { useTimezone } from "@/lib/hooks/use-timezone";
import { formatClock } from "@/lib/services/timezone";

type PredictionCardData = { match?: Match; prediction: Prediction };

/* ─── Top Scorers data ─────────────────────────────────────── */
const TOP_SCORERS = [
  { name: "H. Lozano", team: "Mexico", flagCode: "mx", goals: 2 },
  { name: "Á. Morata", team: "Spain", flagCode: "es", goals: 1 },
  { name: "T. Weah", team: "USA", flagCode: "us", goals: 1 },
  { name: "P. Tau", team: "South Africa", flagCode: "za", goals: 1 },
];

export function HomeDashboard({
  matches,
  standings,
  predictionCards,
  injuries,
  news
}: {
  matches: Match[];
  standings: Standing[];
  predictionCards: PredictionCardData[];
  injuries: Injury[];
  news: NewsItem[];
}) {
  const live = useAutoRefresh(matches, "/api/matches", 15000);
  const injuryState = useAutoRefresh(injuries, "/api/injuries", 60000);
  const newsState = useAutoRefresh(news, "/api/news", 90000);
  const { timezone } = useTimezone();
  const [now, setNow] = useState(new Date());

  useEffect(() => {
    const id = window.setInterval(() => setNow(new Date()), 1000);
    return () => window.clearInterval(id);
  }, []);

  const liveMatches = live.data.filter((m) => ["live", "halftime"].includes(m.status));
  const upcoming = live.data.filter((m) => m.status === "upcoming");
  const groups = Array.from(new Set(standings.map((r) => r.group))).slice(0, 3);
  const spotlight = predictionCards.find((c) => c.match?.status === "upcoming");

  const timeStr = formatClock(now, timezone);
  const dateStr = new Intl.DateTimeFormat("en", {
    timeZone: timezone, weekday: "long", day: "numeric", month: "long", year: "numeric"
  }).format(now);
  const tzAbbr = new Intl.DateTimeFormat("en", { timeZone: timezone, timeZoneName: "short" })
    .format(now).split(" ").pop() ?? "";
  const tzCity = timezone.split("/").pop()?.replace(/_/g, " ") ?? timezone;

  /* Injury badge styling */
  const injuryBadge = (status: Injury["status"]) =>
    status === "Out" ? "bg-rose-900/50 text-rose-400" :
    status === "Doubtful" ? "bg-amber-900/40 text-amber-400" :
    status === "Fit" ? "bg-emerald-900/40 text-emerald-400" :
    "bg-slate-700 text-slate-300";

  const teamFlagCode: Record<string, string> = {
    Germany: "de", Brazil: "br", France: "fr", USA: "us",
    England: "gb-eng", Spain: "es", Argentina: "ar", Mexico: "mx",
    Netherlands: "nl", Japan: "jp", Portugal: "pt", Morocco: "ma"
  };

  return (
    <div className="grid gap-6 xl:grid-cols-[1fr_340px]">
      {/* ── Main column ─────────────────────────────────────── */}
      <div className="space-y-7">

        {/* Hero banner */}
        <div className="relative overflow-hidden rounded-xl shadow-glow" style={{ minHeight: 260 }}>
          {/* Stadium background */}
          <img
            src="https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=1400&q=80"
            alt="Stadium"
            className="absolute inset-0 h-full w-full object-cover"
            loading="eager"
          />
          {/* Dark gradient overlay */}
          <div className="absolute inset-0" style={{ background: "linear-gradient(90deg, rgba(10,14,26,0.92) 45%, rgba(10,14,26,0.55) 75%, rgba(10,14,26,0.15) 100%)" }} />
          {/* Gold accent glow */}
          <div className="absolute inset-0" style={{ background: "radial-gradient(circle at 80% 50%, rgba(246,196,83,.12), transparent 50%)" }} />
          <div className="relative z-10 p-8 max-w-lg">
            <p className="text-xs font-bold uppercase tracking-[.2em] text-gold">FIFA World Cup™</p>
            <h1 className="mt-2 text-4xl font-black leading-tight sm:text-5xl">
              FIFA WORLD CUP<br />2026™
            </h1>
            <p className="mt-1.5 text-lg font-semibold text-slate-300">11 JUNE — 19 JULY 2026</p>
            <div className="mt-4 flex flex-wrap gap-5 text-sm text-slate-300">
              <span className="flex items-center gap-1.5"><Trophy className="h-3.5 w-3.5 text-gold" /> 48 Teams</span>
              <span className="flex items-center gap-1.5"><CalendarDays className="h-3.5 w-3.5" /> 104 Matches</span>
              <span className="flex items-center gap-1.5"><MapPin className="h-3.5 w-3.5" /> 16 Cities</span>
              <span className="flex items-center gap-1.5"><Star className="h-3.5 w-3.5" /> 3 Countries</span>
            </div>
            <a href="/schedule" className="mt-5 inline-flex items-center gap-2 rounded-lg bg-brand px-5 py-2.5 text-sm font-bold text-white hover:bg-brand/80">
              <CalendarDays className="h-4 w-4" /> Explore Full Schedule
            </a>
          </div>
        </div>

        {/* Live Now */}
        {liveMatches.length > 0 && (
          <section>
            <div className="mb-3 flex items-center gap-2">
              <span className="h-2.5 w-2.5 animate-pulse rounded-full bg-rose-500" />
              <h2 className="text-base font-bold">Live Now</h2>
            </div>
            <div className="flex gap-4 overflow-x-auto pb-1 scrollbar-hide">
              {liveMatches.map((m) => (
                <div key={m.id} className="min-w-[280px] flex-shrink-0 sm:min-w-[300px]">
                  <MatchCard match={m} />
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Today's Matches */}
        <section>
          <div className="mb-3 flex items-center justify-between">
            <h2 className="text-base font-bold">Today&apos;s Matches</h2>
            <a href="/schedule" className="text-xs text-brand hover:opacity-80">View Full Schedule</a>
          </div>
          <ScheduleTable matches={upcoming.slice(0, 4)} />
        </section>

        {/* Group Standings */}
        <section>
          <h2 className="mb-3 text-base font-bold">Group Standings</h2>
          <div className="grid gap-4 sm:grid-cols-3">
            {groups.map((g) => (
              <StandingsTable key={g} group={g} rows={standings.filter((r) => r.group === g)} />
            ))}
          </div>
        </section>

        {/* Latest News */}
        <section>
          <div className="mb-3 flex items-center justify-between">
            <h2 className="text-base font-bold">Latest News</h2>
            <a href="/news" className="text-xs text-brand hover:opacity-80">View All News</a>
          </div>
          <div className="grid gap-4 sm:grid-cols-3">
            {newsState.data.slice(0, 3).map((item) => <NewsCard key={item.id} item={item} />)}
          </div>
        </section>
      </div>

      {/* ── Right sidebar ────────────────────────────────────── */}
      <aside className="space-y-5">

        {/* Your Time */}
        <div className="card p-4">
          <div className="mb-2 flex items-center gap-2 text-sm font-semibold text-slate-300">
            <Clock className="h-4 w-4" /> Your Time
          </div>
          <p className="text-4xl font-black tabular-nums">{timeStr}</p>
          <p className="mt-1 text-xs text-slate-400">{dateStr}</p>
          <div className="mt-2 flex items-center justify-between">
            <span className="text-sm text-slate-300">{tzCity}, United Kingdom</span>
            <span className="rounded bg-white/10 px-2 py-0.5 text-xs font-semibold text-slate-300">{tzAbbr}</span>
          </div>
        </div>

        {/* Top Scorers */}
        <div className="card p-4">
          <div className="mb-3 flex items-center justify-between">
            <h3 className="text-sm font-bold">Top Scorers <span className="text-xs font-normal text-slate-400">(So Far)</span></h3>
          </div>
          <ol className="space-y-3">
            {TOP_SCORERS.map((s, i) => (
              <li key={s.name} className="flex items-center gap-3">
                <span className="w-4 shrink-0 text-xs text-slate-500">{i + 1}</span>
                <img
                  src={`https://flagcdn.com/w40/${s.flagCode}.png`}
                  alt={s.team}
                  width={28}
                  height={21}
                  className="rounded object-cover shadow"
                />
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-semibold truncate">{s.name}</div>
                  <div className="text-xs text-slate-400">{s.team}</div>
                </div>
                <span className="text-xl font-black text-gold">{s.goals}</span>
              </li>
            ))}
          </ol>
          <a href="/standings" className="mt-3 flex items-center gap-1 text-xs text-brand hover:opacity-80">
            View All Players <ChevronRight className="h-3 w-3" />
          </a>
        </div>

        {/* Predictions */}
        {spotlight?.match && (
          <div className="card overflow-hidden">
            <div className="flex items-center justify-between border-b border-line px-4 py-3">
              <h3 className="text-sm font-bold">Predictions</h3>
              <span className="rounded bg-brand/20 px-2 py-0.5 text-[10px] font-bold text-brand">Upcoming</span>
            </div>
            <div className="p-4">
              <PredictionCard match={spotlight.match} prediction={spotlight.prediction} />
            </div>
          </div>
        )}

        {/* Injury News */}
        <div className="card p-4">
          <div className="mb-3 flex items-center justify-between">
            <h3 className="flex items-center gap-1.5 text-sm font-bold">
              🩹 Injury News
            </h3>
            <a href="/injuries" className="text-xs text-brand hover:opacity-80">View All</a>
          </div>
          <div className="space-y-3">
            {injuryState.data.filter((i) => i.status !== "Fit").slice(0, 3).map((injury) => {
              const code = teamFlagCode[injury.team];
              return (
                <div key={injury.id} className="flex items-center gap-3">
                  <div className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full bg-white/10 overflow-hidden">
                    {code ? (
                      <img src={`https://flagcdn.com/w80/${code}.png`} alt={injury.team} className="h-full w-full object-cover" />
                    ) : (
                      <span className="text-lg">🏳️</span>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-semibold truncate">{injury.player}</div>
                    <div className="text-xs text-slate-400">{injury.team} · {injury.issue}</div>
                  </div>
                  <span className={`flex-shrink-0 rounded px-2 py-0.5 text-xs font-bold ${injuryBadge(injury.status)}`}>
                    {injury.status}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

      </aside>
    </div>
  );
}
