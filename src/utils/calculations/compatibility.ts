import type {
  ZodiacSign,
  ChineseZodiacAnimal,
  CompatibilityScore,
} from "@/types/cosmic";
import { CHINESE_ZODIAC } from "@/constants/cosmic/chineseZodiac";
import { getZodiacElement, getZodiacQuality } from "./sunSign";

const ELEMENT_COMPATIBILITY: Record<string, Partial<Record<string, number>>> = {
  fire: { fire: 70, earth: 40, air: 90, water: 50 },
  earth: { fire: 40, earth: 80, air: 50, water: 85 },
  air: { fire: 90, earth: 50, air: 70, water: 45 },
  water: { fire: 50, earth: 85, air: 45, water: 80 },
};

const QUALITY_COMPATIBILITY: Record<string, Partial<Record<string, number>>> = {
  cardinal: { cardinal: 50, fixed: 75, mutable: 85 },
  fixed: { cardinal: 75, fixed: 45, mutable: 80 },
  mutable: { cardinal: 85, fixed: 80, mutable: 55 },
};

const SAME_SIGN_SCORE = 65;

const ZODIAC_AFFINITY: Partial<Record<ZodiacSign, Partial<Record<ZodiacSign, number>>>> = {
  aries: { leo: 90, sagittarius: 85, gemini: 75, aquarius: 70 },
  taurus: { virgo: 85, capricorn: 80, cancer: 75, pisces: 70 },
  gemini: { libra: 85, aquarius: 80, aries: 75, leo: 70 },
  cancer: { scorpio: 90, pisces: 85, taurus: 75, virgo: 70 },
  leo: { aries: 90, sagittarius: 85, gemini: 75, libra: 70 },
  virgo: { taurus: 85, capricorn: 80, cancer: 75, scorpio: 70 },
  libra: { gemini: 85, aquarius: 80, leo: 75, sagittarius: 70 },
  scorpio: { cancer: 90, pisces: 85, virgo: 75, capricorn: 70 },
  sagittarius: { aries: 85, leo: 85, libra: 75, aquarius: 70 },
  capricorn: { taurus: 80, virgo: 80, scorpio: 75, pisces: 70 },
  aquarius: { gemini: 80, libra: 80, aries: 70, sagittarius: 70 },
  pisces: { cancer: 85, scorpio: 85, taurus: 70, capricorn: 70 },
};

const LIFE_PATH_COMPATIBILITY: Record<string, Partial<Record<string, number>>> = {
  "1": { "1": 50, "2": 40, "3": 85, "4": 60, "5": 80, "6": 70, "7": 45, "8": 75, "9": 85 },
  "2": { "1": 40, "2": 50, "3": 75, "4": 85, "5": 45, "6": 90, "7": 80, "8": 40, "9": 75 },
  "3": { "1": 85, "2": 75, "3": 60, "4": 40, "5": 90, "6": 80, "7": 70, "8": 65, "9": 85 },
  "4": { "1": 60, "2": 85, "3": 40, "4": 50, "5": 45, "6": 90, "7": 80, "8": 85, "9": 55 },
  "5": { "1": 80, "2": 45, "3": 90, "4": 45, "5": 50, "6": 60, "7": 70, "8": 75, "9": 85 },
  "6": { "1": 70, "2": 90, "3": 80, "4": 90, "5": 60, "6": 50, "7": 45, "8": 75, "9": 80 },
  "7": { "1": 45, "2": 80, "3": 70, "4": 80, "5": 70, "6": 45, "7": 50, "8": 40, "9": 85 },
  "8": { "1": 75, "2": 40, "3": 65, "4": 85, "5": 75, "6": 75, "7": 40, "8": 50, "9": 60 },
  "9": { "1": 85, "2": 75, "3": 85, "4": 55, "5": 85, "6": 80, "7": 85, "8": 60, "9": 50 },
};

function zodiacCompatibility(signA: ZodiacSign, signB: ZodiacSign): number {
  if (signA === signB) return SAME_SIGN_SCORE;

  const direct = ZODIAC_AFFINITY[signA]?.[signB];
  if (direct) return direct;

  const reverse = ZODIAC_AFFINITY[signB]?.[signA];
  if (reverse) return reverse;

  const elA = getZodiacElement(signA);
  const elB = getZodiacElement(signB);
  const elementScore = ELEMENT_COMPATIBILITY[elA]?.[elB] ?? 50;

  const qualA = getZodiacQuality(signA);
  const qualB = getZodiacQuality(signB);
  const qualityScore = QUALITY_COMPATIBILITY[qualA]?.[qualB] ?? 50;

  return Math.round((elementScore + qualityScore) / 2);
}

function chineseZodiacCompatibility(
  animalA: ChineseZodiacAnimal,
  animalB: ChineseZodiacAnimal,
): number {
  if (animalA === animalB) return 60;

  const dataA = CHINESE_ZODIAC[animalA];
  if (dataA.compatibility.includes(animalB)) return 90;
  if (dataA.enemy.includes(animalB)) return 20;
  if (dataA.friends.includes(animalB)) return 80;

  return 50;
}

function numerologyCompatibility(lifePathA: number, lifePathB: number): number {
  const keyA = String(lifePathA);
  const keyB = String(lifePathB);
  return LIFE_PATH_COMPATIBILITY[keyA]?.[keyB] ?? 50;
}

export function calculateCompatibility(input: {
  zodiacA: ZodiacSign;
  zodiacB: ZodiacSign;
  chineseAnimalA: ChineseZodiacAnimal;
  chineseAnimalB: ChineseZodiacAnimal;
  lifePathA: number;
  lifePathB: number;
  moonSignA: ZodiacSign;
  moonSignB: ZodiacSign;
}): CompatibilityScore {
  const zodiac = zodiacCompatibility(input.zodiacA, input.zodiacB);
  const moon = zodiacCompatibility(input.moonSignA, input.moonSignB);
  const chinese = chineseZodiacCompatibility(
    input.chineseAnimalA,
    input.chineseAnimalB,
  );
  const numerology = numerologyCompatibility(input.lifePathA, input.lifePathB);

  const love = Math.round(zodiac * 0.35 + moon * 0.25 + chinese * 0.2 + numerology * 0.2);
  const marriage = Math.round(zodiac * 0.25 + moon * 0.2 + chinese * 0.25 + numerology * 0.3);
  const friendship = Math.round(zodiac * 0.2 + moon * 0.15 + chinese * 0.35 + numerology * 0.3);
  const business = Math.round(zodiac * 0.2 + moon * 0.1 + chinese * 0.3 + numerology * 0.4);
  const communication = Math.round(zodiac * 0.3 + moon * 0.3 + chinese * 0.15 + numerology * 0.25);
  const spiritual = Math.round(zodiac * 0.2 + moon * 0.35 + chinese * 0.25 + numerology * 0.2);
  const family = Math.round(zodiac * 0.2 + moon * 0.25 + chinese * 0.35 + numerology * 0.2);

  return {
    love: Math.min(100, Math.max(0, love)),
    marriage: Math.min(100, Math.max(0, marriage)),
    friendship: Math.min(100, Math.max(0, friendship)),
    business: Math.min(100, Math.max(0, business)),
    communication: Math.min(100, Math.max(0, communication)),
    spiritual: Math.min(100, Math.max(0, spiritual)),
    family: Math.min(100, Math.max(0, family)),
  };
}
