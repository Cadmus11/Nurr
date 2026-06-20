import type { ZodiacSign } from "@/types/cosmic";

const SIGNS: ZodiacSign[] = [
  "aries", "taurus", "gemini", "cancer",
  "leo", "virgo", "libra", "scorpio",
  "sagittarius", "capricorn", "aquarius", "pisces",
];

export function getRisingSign(
  sunSign: ZodiacSign,
  birthTime?: string,
): ZodiacSign {
  if (!birthTime) {
    return sunSign;
  }

  const [hours] = birthTime.split(":").map(Number);
  const sunIndex = SIGNS.indexOf(sunSign);
  const sunriseHour = (sunIndex + 1) * 2;
  const hourDiff = ((hours - sunriseHour) % 24 + 24) % 24;
  const signShift = Math.round(hourDiff / 2);
  const risingIndex = (sunIndex + signShift) % 12;

  return SIGNS[risingIndex];
}
