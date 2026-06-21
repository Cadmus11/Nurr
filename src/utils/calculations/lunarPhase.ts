import type { MoonPhase } from "@/types/cosmic";

const KNOWN_NEW_MOON = new Date(2000, 0, 6, 18, 14, 0).getTime();
const LUNAR_CYCLE_MS = 29.53058867 * 24 * 60 * 60 * 1000;

const PHASES: { name: MoonPhase; start: number; end: number }[] = [
  { name: "new-moon", start: 0, end: 0.0625 },
  { name: "waxing-crescent", start: 0.0625, end: 0.1875 },
  { name: "first-quarter", start: 0.1875, end: 0.3125 },
  { name: "waxing-gibbous", start: 0.3125, end: 0.4375 },
  { name: "full-moon", start: 0.4375, end: 0.5625 },
  { name: "waning-gibbous", start: 0.5625, end: 0.6875 },
  { name: "last-quarter", start: 0.6875, end: 0.8125 },
  { name: "waning-crescent", start: 0.8125, end: 1 },
];

export function getMoonPhase(date: Date): MoonPhase;
export function getMoonPhase(year: number, month: number, day: number): MoonPhase;
export function getMoonPhase(yOrDate: number | Date, month?: number, day?: number): MoonPhase {
  let date: Date;
  if (yOrDate instanceof Date) {
    date = yOrDate;
  } else {
    date = new Date(yOrDate, (month ?? 1) - 1, day ?? 1);
  }

  const msSinceRef = date.getTime() - KNOWN_NEW_MOON;
  const cycles = msSinceRef / LUNAR_CYCLE_MS;
  const fraction = ((cycles % 1) + 1) % 1;

  for (const phase of PHASES) {
    if (fraction >= phase.start && fraction < phase.end) {
      return phase.name;
    }
  }

  return "new-moon";
}

export function getBirthMoonPhase(birthDate: string): MoonPhase {
  return getMoonPhase(new Date(birthDate));
}

export function getMoonIllumination(date: Date = new Date()): number {
  const msSinceRef = date.getTime() - KNOWN_NEW_MOON;
  const cycles = msSinceRef / LUNAR_CYCLE_MS;
  const fraction = ((cycles % 1) + 1) % 1;
  const angle = fraction * 2 * Math.PI;
  return Math.round(((1 - Math.cos(angle)) / 2) * 100);
}
