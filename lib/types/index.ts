export type MatchStatus = "upcoming" | "live" | "halftime" | "finished";

export type Team = {
  id: string;
  name: string;
  slug: string;
  flag: string;
  flagCode: string;
  group: string;
  confederation: string;
  ranking: number;
  form: string;
};

export type Match = {
  id: string;
  slug: string;
  group: string;
  home: string;
  away: string;
  homeScore: number | null;
  awayScore: number | null;
  venue: string;
  isoDate: string;
  status: MatchStatus;
  minute?: number;
  scorers: string[];
};

export type Standing = {
  group: string;
  team: string;
  played: number;
  won: number;
  drawn: number;
  lost: number;
  gf: number;
  ga: number;
  gd: number;
  pts: number;
};

export type Prediction = {
  matchId: string;
  homeWin: number;
  draw: number;
  awayWin: number;
  projectedScore: string;
  confidence: "Low" | "Medium" | "High";
  factors: string[];
};

export type Injury = {
  id: string;
  player: string;
  team: string;
  status: "Out" | "Doubtful" | "Suspended" | "Fit" | "Unknown";
  severity: "Low" | "Medium" | "High";
  issue: string;
  expectedReturn: string;
  source: string;
  updatedAt: string;
};

export type NewsItem = {
  id: string;
  title: string;
  category: string;
  summary: string;
  image: string;
  publishedAt: string;
};

export type Venue = {
  id: string;
  name: string;
  city: string;
  country: string;
  capacity: string;
  timezone: string;
  matches: number;
};
