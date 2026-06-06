import type { Venue } from "@/lib/types";

export function VenueCard({ venue }: { venue: Venue }) {
  return (
    <div className="card p-4">
      <h3 className="text-lg font-bold">{venue.name}</h3>
      <p className="text-sm text-slate-400">{venue.city}, {venue.country}</p>
      <div className="mt-4 grid grid-cols-3 gap-3 text-sm">
        <div><p className="text-xs text-slate-500">Capacity</p><p>{venue.capacity}</p></div>
        <div><p className="text-xs text-slate-500">Matches</p><p>{venue.matches}</p></div>
        <div><p className="text-xs text-slate-500">Timezone</p><p>{venue.timezone}</p></div>
      </div>
    </div>
  );
}
