export const commonTimezones = [
  "America/New_York",
  "America/Los_Angeles",
  "America/Toronto",
  "Europe/London",
  "Europe/Paris",
  "Asia/Singapore",
  "Asia/Kolkata",
  "Asia/Jakarta",
  "Australia/Sydney"
];

export function formatMatchTime(isoDate: string, timeZone: string, options?: Intl.DateTimeFormatOptions) {
  return new Intl.DateTimeFormat("en", {
    timeZone,
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    ...options
  }).format(new Date(isoDate));
}

export function formatClock(date: Date, timeZone: string) {
  return new Intl.DateTimeFormat("en", {
    timeZone,
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit"
  }).format(date);
}
