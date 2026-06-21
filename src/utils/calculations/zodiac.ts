import type { ZodiacSign, MoonPhase } from '@/types/cosmic';

const ZODIAC_CUTOFFS: { sign: ZodiacSign; month: number; day: number }[] = [
  { sign: "capricorn", month: 1, day: 19 },
  { sign: "aquarius", month: 2, day: 18 },
  { sign: "pisces", month: 3, day: 20 },
  { sign: "aries", month: 4, day: 19 },
  { sign: "taurus", month: 5, day: 20 },
  { sign: "gemini", month: 6, day: 20 },
  { sign: "cancer", month: 7, day: 22 },
  { sign: "leo", month: 8, day: 22 },
  { sign: "virgo", month: 9, day: 22 },
  { sign: "libra", month: 10, day: 22 },
  { sign: "scorpio", month: 11, day: 21 },
  { sign: "sagittarius", month: 12, day: 21 },
  { sign: "capricorn", month: 12, day: 31 },
];

export function calculateSunSign(month: number, day: number): ZodiacSign {
  for (const cutoff of ZODIAC_CUTOFFS) {
    if (month < cutoff.month || (month === cutoff.month && day <= cutoff.day)) {
      return cutoff.sign;
    }
  }
  return "capricorn";
}

export function calculateMoonSign(sunSign: ZodiacSign, birthYear: number): ZodiacSign {
  const moonOffset = (birthYear % 12) + 3;
  const signs: ZodiacSign[] = [
    "aries", "taurus", "gemini", "cancer", "leo", "virgo",
    "libra", "scorpio", "sagittarius", "capricorn", "aquarius", "pisces",
  ];
  const sunIndex = signs.indexOf(sunSign);
  return signs[(sunIndex + moonOffset) % 12];
}

export function calculateRisingSign(sunSign: ZodiacSign, birthHour: number): ZodiacSign {
  const signs: ZodiacSign[] = [
    "aries", "taurus", "gemini", "cancer", "leo", "virgo",
    "libra", "scorpio", "sagittarius", "capricorn", "aquarius", "pisces",
  ];
  const sunIndex = signs.indexOf(sunSign);
  const hourOffset = Math.floor(birthHour / 2) % 12;
  return signs[(sunIndex + hourOffset) % 12];
}

export function calculateBirthMoonPhase(year: number, month: number, day: number): MoonPhase {
  const phase = getMoonPhaseNumber(year, month, day);
  const phases: MoonPhase[] = [
    "new-moon", "waxing-crescent", "first-quarter", "waxing-gibbous",
    "full-moon", "waning-gibbous", "last-quarter", "waning-crescent",
  ];
  return phases[Math.floor(phase / 0.125) % 8];
}

function getMoonPhaseNumber(y: number, m: number, d: number): number {
  let c = 0; let e = 0;
  if (m < 3) { y--; m += 12; }
  c = Math.floor(y / 100);
  e = ((y % 19) * 11 + Math.floor((c - 17) / 25.5) + Math.floor(c / 4) + 8 + Math.floor(c / 3) - 5 - (3 * c)) % 30;
  if (e < 0) e += 30;
  const j = Math.floor(365.25 * (y + 4712)) + Math.floor(30.6 * (m + 1)) + d + (0.5 - (c / 4)) - c - 2260.5;
  const n = (j - e - 1.5) / 29.530588;
  return n - Math.floor(n);
}
