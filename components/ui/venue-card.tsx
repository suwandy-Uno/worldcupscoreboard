import type { Venue } from "@/lib/types";

const COUNTRY_FLAG: Record<string, string> = {
  USA: "us", Canada: "ca", Mexico: "mx",
};

export function VenueCard({ venue }: { venue: Venue }) {
  const flagCode = COUNTRY_FLAG[venue.country];
  return (
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
        {/* Country flag badge */}
        {flagCode && (
          <div className="absolute right-3 top-3">
            <img
              src={`https://flagcdn.com/w40/${flagCode}.png`}
              alt={venue.country}
              width={32}
              height={24}
              className="rounded shadow"
            />
          </div>
        )}
        {/* Matches hosted badge */}
        <div className="absolute bottom-3 right-3 rounded bg-brand/90 px-2 py-0.5 text-xs font-bold text-white">
          {venue.matches} matches
        </div>
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
      </div>
    </div>
  );
}
