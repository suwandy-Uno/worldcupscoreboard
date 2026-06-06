"use client";

import { useEffect, useState } from "react";
import { X } from "lucide-react";
import type { Match, Venue } from "@/lib/types";

const COUNTRY_FLAG: Record<string, string> = {
  USA: "us", Canada: "ca", Mexico: "mx",
};

const TEAM_FLAG: Record<string, string> = {
  Mexico: "mx", "South Africa": "za", Spain: "es", Japan: "jp",
  USA: "us", Iran: "ir", France: "fr", Australia: "au",
  England: "gb-eng", Denmark: "dk", Brazil: "br", "Korea Republic": "kr",
  Argentina: "ar", Canada: "ca", Portugal: "pt", Senegal: "sn",
  Netherlands: "nl", Ecuador: "ec", Qatar: "qa", Albania: "al",
  Chile: "cl", Germany: "de", Morocco: "ma", Uruguay: "uy", Nigeria: "ng",
  Wales: "gb-wls",
};

function statusLabel(m: Match) {
  if (m.status === "live") return <span className="rounded bg-rose-600 px-1.5 py-0.5 text-[10px] font-bold">LIVE {m.minute}&apos;</span>;
  if (m.status === "halftime") return <span className="rounded bg-amber-500 px-1.5 py-0.5 text-[10px] font-bold text-black">HT</span>;
  if (m.status === "finished") return <span className="text-[10px] text-slate-500">FT</span>;
  return <span className="text-[10px] text-slate-400">{new Date(m.isoDate).toLocaleDateString(undefined, { month: "short", day: "numeric" })}</span>;
}

function MatchRow({ m }: { m: Match }) {
  const hFlag = TEAM_FLAG[m.home];
  const aFlag = TEAM_FLAG[m.away];
  const score = m.homeScore !== null ? `${m.homeScore} – ${m.awayScore}` : "vs";
  return (
    <a href={`/match/${m.slug}`} className="flex items-center gap-3 rounded-lg px-3 py-2.5 transition-colors hover:bg-white/[.06]">
      <span className="w-24 text-xs text-slate-400">{statusLabel(m)}</span>
      <div className="flex flex-1 items-center justify-end gap-2 text-sm font-semibold">
        {hFlag && <img src={`https://flagcdn.com/w40/${hFlag}.png`} alt={m.home} width={22} height={16} className="rounded shadow" />}
        <span className="max-w-[90px] truncate text-right">{m.home}</span>
      </div>
      <span className="shrink-0 rounded bg-white/[.08] px-2 py-1 text-sm font-black tabular-nums">{score}</span>
      <div className="flex flex-1 items-center gap-2 text-sm font-semibold">
        <span className="max-w-[90px] truncate">{m.away}</span>
        {aFlag && <img src={`https://flagcdn.com/w40/${aFlag}.png`} alt={m.away} width={22} height={16} className="rounded shadow" />}
      </div>
      <span className="w-16 text-right text-xs text-slate-500">Grp {m.group}</span>
    </a>
  );
}

function MatchesModal({ venue, onClose }: { venue: Venue; onClose: () => void }) {
  const [matches, setMatches] = useState<Match[] | null>(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    fetch("/api/matches")
      .then((r) => r.json())
      .then((data: Match[]) => setMatches(data.filter((m) => m.venue === venue.name)))
      .catch(() => setError(true));
  }, [venue.name]);

  const venueMatches = matches;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" onClick={onClose}>
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" />
      <div
        className="relative z-10 w-full max-w-xl rounded-2xl border border-line bg-[#0d1117] shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-line px-5 py-4">
          <div>
            <h2 className="text-lg font-black">{venue.name}</h2>
            <p className="text-xs text-slate-400">{venue.city}, {venue.country} · {venue.matches} matches</p>
          </div>
          <button onClick={onClose} className="rounded-full p-1.5 hover:bg-white/[.08]">
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Match list */}
        <div className="max-h-[60vh] overflow-y-auto p-2">
          {error && <p className="py-8 text-center text-sm text-slate-400">Could not load matches.</p>}
          {!error && matches === null && (
            <div className="py-8 text-center text-sm text-slate-400 animate-pulse">Loading…</div>
          )}
          {!error && matches !== null && venueMatches!.length === 0 && (
            <p className="py-8 text-center text-sm text-slate-400">No matches scheduled here yet.</p>
          )}
          {!error && venueMatches && venueMatches.map((m) => <MatchRow key={m.id} m={m} />)}
        </div>
      </div>
    </div>
  );
}

export function VenueCard({ venue }: { venue: Venue }) {
  const [showModal, setShowModal] = useState(false);
  const flagCode = COUNTRY_FLAG[venue.country];

  return (
    <>
      <div className="card overflow-hidden">
        {/* Stadium photo */}
        <div className="relative h-44 overflow-hidden">
          <img
            src={venue.image}
            alt={venue.name}
            className="h-full w-full object-cover"
            loading="lazy"
            onError={(e) => {
              (e.target as HTMLImageElement).src =
                "https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=800&q=80";
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
          {flagCode && (
            <div className="absolute right-3 top-3">
              <img src={`https://flagcdn.com/w40/${flagCode}.png`} alt={venue.country} width={32} height={24} className="rounded shadow" />
            </div>
          )}
          {/* Clickable matches badge */}
          <button
            onClick={() => setShowModal(true)}
            className="absolute bottom-3 right-3 rounded bg-brand/90 px-2 py-0.5 text-xs font-bold text-white hover:bg-brand transition-colors cursor-pointer"
            title="View matches at this venue"
          >
            {venue.matches} matches ↗
          </button>
        </div>

        {/* Info */}
        <div className="p-4">
          <h3 className="text-lg font-bold leading-tight">{venue.name}</h3>
          <p className="mt-0.5 text-sm text-slate-400">{venue.city}, {venue.country}</p>
          <div className="mt-3 grid grid-cols-2 gap-3 text-sm">
            <div>
              <p className="text-xs text-slate-500">Capacity</p>
              <p className="font-semibold">{venue.capacity}</p>
            </div>
            <div>
              <p className="text-xs text-slate-500">Local Time Zone</p>
              <p className="font-semibold">{venue.timezone.split("/")[1]?.replace(/_/g, " ") ?? venue.timezone}</p>
            </div>
          </div>
          {/* Matches link */}
          <button
            onClick={() => setShowModal(true)}
            className="mt-3 text-xs text-brand hover:underline"
          >
            View all {venue.matches} matches →
          </button>
        </div>
      </div>

      {showModal && <MatchesModal venue={venue} onClose={() => setShowModal(false)} />}
    </>
  );
}
