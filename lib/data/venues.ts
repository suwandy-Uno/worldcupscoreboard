import type { Venue } from "@/lib/types";

export const venues: Venue[] = [
  { id: "v1", name: "MetLife Stadium", city: "New Jersey", country: "USA", capacity: "82,500", timezone: "America/New_York", matches: 8 },
  { id: "v2", name: "AT&T Stadium", city: "Dallas", country: "USA", capacity: "80,000", timezone: "America/Chicago", matches: 9 },
  { id: "v3", name: "Estadio Azteca", city: "Mexico City", country: "Mexico", capacity: "87,000", timezone: "America/Mexico_City", matches: 5 },
  { id: "v4", name: "BC Place", city: "Vancouver", country: "Canada", capacity: "54,500", timezone: "America/Vancouver", matches: 7 },
  { id: "v5", name: "SoFi Stadium", city: "Los Angeles", country: "USA", capacity: "70,000", timezone: "America/Los_Angeles", matches: 8 }
];
