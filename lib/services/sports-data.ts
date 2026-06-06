import { injuries } from "@/lib/data/injuries";
import { matches } from "@/lib/data/matches";
import { predictions } from "@/lib/data/predictions";
import { standings } from "@/lib/data/standings";
import { teams } from "@/lib/data/teams";
import { venues } from "@/lib/data/venues";

const liveDrift = () => Math.floor(Date.now() / 60000) % 8;

export async function getMatches() {
  return matches.map((match) =>
    match.status === "live"
      ? { ...match, minute: Math.min(90, (match.minute ?? 0) + liveDrift()) }
      : match
  );
}

export async function getLiveScores() {
  return (await getMatches()).filter((match) => ["live", "halftime"].includes(match.status));
}

export async function getStandings() {
  return standings;
}

export async function getPredictions() {
  return predictions;
}

export async function getInjuries() {
  return injuries.map((injury) => ({ ...injury, updatedAt: new Date().toISOString() }));
}

export async function getTeams() {
  return teams;
}

export async function getVenues() {
  return venues;
}
