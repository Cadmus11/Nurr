import type { CosmicBlueprint, Profile, PlanetName } from "@/types/cosmic";
import { getSunSign } from "./sunSign";
import { getMoonSign } from "./moonSign";
import { getRisingSign } from "./risingSign";
import { getChineseZodiacFromDate } from "./chineseZodiac";
import { calculateNumerology } from "./numerology";
import { calculateEnergyScore } from "./forecast";
import { getBirthMoonPhase } from "./lunarPhase";

const BIRTHSTONES: Record<number, string> = {
  1: "Garnet",
  2: "Amethyst",
  3: "Aquamarine",
  4: "Diamond",
  5: "Emerald",
  6: "Pearl",
  7: "Ruby",
  8: "Peridot",
  9: "Sapphire",
  10: "Opal",
  11: "Citrine",
  12: "Turquoise",
};

const SPIRIT_ANIMALS: Record<string, string> = {
  aries: "Wolf",
  taurus: "Bear",
  gemini: "Fox",
  cancer: "Owl",
  leo: "Lion",
  virgo: "Eagle",
  libra: "Raven",
  scorpio: "Panther",
  sagittarius: "Horse",
  capricorn: "Snake",
  aquarius: "Dragon",
  pisces: "Dolphin",
};

const PLANET_SIGNS: Record<string, PlanetName> = {
  aries: "mars",
  taurus: "venus",
  gemini: "mercury",
  cancer: "moon",
  leo: "sun",
  virgo: "mercury",
  libra: "venus",
  scorpio: "pluto",
  sagittarius: "jupiter",
  capricorn: "saturn",
  aquarius: "uranus",
  pisces: "neptune",
};

const LUCKY_COLORS_BY_SIGN: Record<string, string> = {
  aries: "Red",
  taurus: "Green",
  gemini: "Yellow",
  cancer: "Silver",
  leo: "Gold",
  virgo: "Navy Blue",
  libra: "Pink",
  scorpio: "Black",
  sagittarius: "Purple",
  capricorn: "Dark Brown",
  aquarius: "Electric Blue",
  pisces: "Sea Green",
};

const LUCKY_DAYS_BY_SIGN: Record<string, string> = {
  aries: "Tuesday",
  taurus: "Friday",
  gemini: "Wednesday",
  cancer: "Monday",
  leo: "Sunday",
  virgo: "Wednesday",
  libra: "Friday",
  scorpio: "Tuesday",
  sagittarius: "Thursday",
  capricorn: "Saturday",
  aquarius: "Saturday",
  pisces: "Thursday",
};

const LUCKY_DIRECTIONS_BY_ANIMAL: Record<string, string> = {
  rat: "East",
  ox: "North",
  tiger: "East",
  rabbit: "East",
  dragon: "East",
  snake: "South",
  horse: "South",
  goat: "South",
  monkey: "North",
  rooster: "South",
  dog: "East",
  pig: "South",
};

export function generateCosmicBlueprint(profile: Profile): CosmicBlueprint {
  const sunSign = getSunSign(profile.birthDate);
  const moonSign = getMoonSign(profile.birthDate, profile.birthTime);
  const risingSign = getRisingSign(sunSign, profile.birthTime);
  const chinese = getChineseZodiacFromDate(profile.birthDate);
  const numerology = calculateNumerology(profile.birthDate, profile.name);
  const energyScore = calculateEnergyScore(profile.birthDate);
  const birthMoonPhase = getBirthMoonPhase(profile.birthDate);

  const birthMonth = new Date(profile.birthDate).getMonth() + 1;

  return {
    profileId: profile.id,
    sunSign,
    moonSign,
    risingSign,
    chineseZodiac: chinese.animal,
    chineseElement: chinese.element,
    lifePathNumber: numerology.lifePath,
    destinyNumber: numerology.destiny,
    soulNumber: numerology.soulUrge,
    personalityNumber: numerology.personality,
    birthstone: BIRTHSTONES[birthMonth] ?? "Unknown",
    spiritAnimal: SPIRIT_ANIMALS[sunSign] ?? "Wolf",
    dominantPlanet: PLANET_SIGNS[sunSign] ?? "sun",
    luckyNumber: numerology.lifePath,
    luckyColor: LUCKY_COLORS_BY_SIGN[sunSign] ?? "Gold",
    luckyDay: LUCKY_DAYS_BY_SIGN[sunSign] ?? "Sunday",
    luckyDirection: LUCKY_DIRECTIONS_BY_ANIMAL[chinese.animal] ?? "East",
    energyScore,
    birthMoonPhase,
  };
}
