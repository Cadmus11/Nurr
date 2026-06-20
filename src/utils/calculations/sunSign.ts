import type { ZodiacSign } from "@/types/cosmic";

const ZODIAC_RANGES: { sign: ZodiacSign; month: number; day: number }[] = [
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

export function getSunSign(birthDate: string): ZodiacSign {
  const date = new Date(birthDate);
  const month = date.getMonth() + 1;
  const day = date.getDate();

  for (const range of ZODIAC_RANGES) {
    if (month < range.month || (month === range.month && day <= range.day)) {
      return range.sign;
    }
  }

  return "capricorn";
}

export function getZodiacElement(sign: ZodiacSign): "fire" | "earth" | "air" | "water" {
  const elements: Record<string, "fire" | "earth" | "air" | "water"> = {
    aries: "fire",
    leo: "fire",
    sagittarius: "fire",
    taurus: "earth",
    virgo: "earth",
    capricorn: "earth",
    gemini: "air",
    libra: "air",
    aquarius: "air",
    cancer: "water",
    scorpio: "water",
    pisces: "water",
  };
  return elements[sign];
}

export function getZodiacQuality(sign: ZodiacSign): "cardinal" | "fixed" | "mutable" {
  const qualities: Record<string, "cardinal" | "fixed" | "mutable"> = {
    aries: "cardinal",
    cancer: "cardinal",
    libra: "cardinal",
    capricorn: "cardinal",
    taurus: "fixed",
    leo: "fixed",
    scorpio: "fixed",
    aquarius: "fixed",
    gemini: "mutable",
    virgo: "mutable",
    sagittarius: "mutable",
    pisces: "mutable",
  };
  return qualities[sign];
}
