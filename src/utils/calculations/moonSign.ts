import type { ZodiacSign } from "@/types/cosmic";

const REFERENCE_DATE = new Date(2000, 0, 6, 12, 0, 0).getTime();
const REFERENCE_DEGREES = 285;

const SIGNS: ZodiacSign[] = [
  "aries", "taurus", "gemini", "cancer",
  "leo", "virgo", "libra", "scorpio",
  "sagittarius", "capricorn", "aquarius", "pisces",
];

export function getMoonSign(birthDate: string, birthTime?: string): ZodiacSign {
  const date = birthTime
    ? new Date(`${birthDate}T${birthTime}:00`)
    : new Date(`${birthDate}T12:00:00`);

  const msSinceRef = date.getTime() - REFERENCE_DATE;
  const daysSinceRef = msSinceRef / (1000 * 60 * 60 * 24);
  const moonDegrees = ((REFERENCE_DEGREES + daysSinceRef * 13.176) % 360 + 360) % 360;
  const signIndex = Math.floor(moonDegrees / 30) % 12;

  return SIGNS[signIndex];
}
