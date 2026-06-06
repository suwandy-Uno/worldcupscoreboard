import { teams } from "@/lib/data/teams";

export function cn(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

export function getTeam(name: string) {
  return teams.find((team) => team.name === name);
}

export function siteUrl(path = "") {
  const base = process.env.NEXT_PUBLIC_SITE_URL || "https://worldcupscoreboard.com";
  return `${base}${path}`;
}
