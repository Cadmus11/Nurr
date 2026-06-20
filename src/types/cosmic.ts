// ============================================================
// COSMIC ORACLE — Core Type Definitions
// ============================================================

// --- Profile ---
export interface Profile {
  id: string;
  name: string;
  birthDate: string; // ISO date YYYY-MM-DD
  birthTime?: string; // HH:mm (optional)
  birthLocation?: string;
  notes?: string;
  avatar?: string; // emoji or image uri
  type: ProfileType;
  createdAt: string;
}

export type ProfileType =
  | "self"
  | "partner"
  | "friend"
  | "child"
  | "family"
  | "client";

// --- Western Zodiac ---
export type ZodiacSign =
  | "aries"
  | "taurus"
  | "gemini"
  | "cancer"
  | "leo"
  | "virgo"
  | "libra"
  | "scorpio"
  | "sagittarius"
  | "capricorn"
  | "aquarius"
  | "pisces";

export type ZodiacElement = "fire" | "earth" | "air" | "water";
export type ZodiacQuality = "cardinal" | "fixed" | "mutable";

export interface ZodiacData {
  sign: ZodiacSign;
  symbol: string;
  dateRange: string;
  element: ZodiacElement;
  quality: ZodiacQuality;
  rulingPlanet: string;
  personality: string[];
  strengths: string[];
  weaknesses: string[];
  loveStyle: string;
  careerStyle: string;
  financialHabits: string;
  spiritualTraits: string[];
  luckyNumbers: number[];
  luckyColors: string[];
  luckyCrystals: string[];
  luckyDays: string[];
}

// --- Moon Sign ---
export interface MoonSignData {
  sign: ZodiacSign;
  emotionalNature: string;
  hiddenFears: string;
  relationshipPatterns: string;
  emotionalStrengths: string[];
  intuition: string;
  subconscious: string;
}

// --- Rising Sign ---
export interface RisingSignData {
  sign: ZodiacSign;
  firstImpressions: string;
  socialBehavior: string;
  appearanceTraits: string[];
  publicPersona: string;
}

// --- Chinese Zodiac ---
export type ChineseZodiacAnimal =
  | "rat"
  | "ox"
  | "tiger"
  | "rabbit"
  | "dragon"
  | "snake"
  | "horse"
  | "goat"
  | "monkey"
  | "rooster"
  | "dog"
  | "pig";

export type ChineseElement = "wood" | "fire" | "earth" | "metal" | "water";

export interface ChineseZodiacData {
  animal: ChineseZodiacAnimal;
  years: number[];
  element: ChineseElement;
  personality: string[];
  compatibility: ChineseZodiacAnimal[];
  enemy: ChineseZodiacAnimal[];
  friends: ChineseZodiacAnimal[];
  luckyNumbers: number[];
  luckyColors: string[];
  luckyDirections: string[];
  careerPaths: string[];
  traits: string;
  bestYears: number[];
  challengingYears: number[];
}

// --- Numerology ---
export type NumerologyNumber = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 11 | 22 | 33;

export interface NumerologyResult {
  lifePath: number;
  destiny: number;
  soulUrge: number;
  personality: number;
  birthday: number;
  maturity: number;
  challengeNumbers: number[];
  karmicDebt: number | null;
  pinnacleCycles: number[];
  personalYear: number;
  personalMonth: number;
  personalDay: number;
}

export interface NumerologyInterpretation {
  number: number;
  title: string;
  strengths: string[];
  weaknesses: string[];
  love: string;
  career: string;
  finances: string;
  spiritualLessons: string[];
  growthAreas: string[];
}

// --- Tarot ---
export type TarotSuit = "wands" | "cups" | "swords" | "pentacles";
export type TarotArcana = "major" | "minor";

export interface TarotCard {
  id: number;
  name: string;
  arcana: TarotArcana;
  suit?: TarotSuit;
  number?: number;
  meaning: string;
  reversedMeaning: string;
  keywords: string[];
  advice: string;
  interpretation: string;
}

export type TarotSpread =
  | "single"
  | "three"
  | "five"
  | "seven"
  | "celtic-cross"
  | "relationship"
  | "career"
  | "year-ahead";

export interface TarotReading {
  id: string;
  profileId: string;
  spread: TarotSpread;
  cards: TarotCard[];
  positions: string[];
  date: string;
  notes?: string;
}

// --- Angel Numbers ---
export interface AngelNumber {
  number: string;
  meaning: string;
  message: string;
  affirmation: string;
  manifestationAdvice: string;
  warnings: string[];
}

// --- Dream Symbols ---
export type DreamCategory =
  | "animals"
  | "nature"
  | "water"
  | "death"
  | "birth"
  | "flying"
  | "objects"
  | "places"
  | "people"
  | "body"
  | "food"
  | "clothing"
  | "vehicles"
  | "buildings";

export interface DreamSymbol {
  symbol: string;
  category: DreamCategory;
  traditionalMeaning: string;
  spiritualMeaning: string;
  psychologicalMeaning: string;
  advice: string;
}

// --- Chakras ---
export type ChakraName =
  | "root"
  | "sacral"
  | "solar-plexus"
  | "heart"
  | "throat"
  | "third-eye"
  | "crown";

export interface ChakraData {
  name: ChakraName;
  title: string;
  color: string;
  element: string;
  location: string;
  strengths: string[];
  weaknesses: string[];
  balanceSuggestions: string[];
  meditationAdvice: string;
  crystals: string[];
  affirmation: string;
}

// --- Spirit Animals ---
export interface SpiritAnimal {
  animal: string;
  traits: string[];
  lifeGuidance: string;
  strengths: string[];
  spiritualMessage: string;
  element: string;
  direction: string;
}

// --- Moon Phases ---
export type MoonPhase =
  | "new-moon"
  | "waxing-crescent"
  | "first-quarter"
  | "waxing-gibbous"
  | "full-moon"
  | "waning-gibbous"
  | "last-quarter"
  | "waning-crescent";

export interface MoonPhaseData {
  phase: MoonPhase;
  title: string;
  symbol: string;
  interpretation: string;
  bestActivities: string[];
  energy: string;
}

// --- Planets ---
export type PlanetName =
  | "sun"
  | "moon"
  | "mercury"
  | "venus"
  | "mars"
  | "jupiter"
  | "saturn"
  | "uranus"
  | "neptune"
  | "pluto";

export interface PlanetData {
  planet: PlanetName;
  title: string;
  rules: string;
  influence: string;
  strengths: string[];
  weaknesses: string[];
  color: string;
  day: string;
}

// --- Elements (Western) ---
export interface ElementData {
  element: ZodiacElement;
  traits: string[];
  dominant: string[];
  weak: string[];
  balanceSuggestions: string[];
  signs: ZodiacSign[];
}

// --- Birthstones ---
export interface BirthstoneData {
  month: number;
  stone: string;
  meaning: string;
  properties: string[];
}

// --- Compatibility ---
export interface CompatibilityScore {
  love: number;
  marriage: number;
  friendship: number;
  business: number;
  communication: number;
  spiritual: number;
  family: number;
}

export interface CompatibilityResult {
  profileA: string;
  profileB: string;
  scores: CompatibilityScore;
  strengths: string[];
  weaknesses: string[];
  advice: string[];
  growthAreas: string[];
}

// --- Forecast ---
export type ForecastPeriod = "daily" | "weekly" | "monthly" | "yearly";

export interface Forecast {
  period: ForecastPeriod;
  date: string;
  love: string;
  career: string;
  health: string;
  finance: string;
  energy: number;
  spiritual: string;
  travel: string;
  education: string;
}

// --- Energy Score ---
export interface EnergyScore {
  overall: number;
  career: "high" | "moderate" | "low";
  love: "high" | "moderate" | "low";
  finance: "high" | "moderate" | "low";
  health: "high" | "moderate" | "low";
  spiritual: "high" | "moderate" | "low";
}

// --- Cosmic Blueprint ---
export interface CosmicBlueprint {
  profileId: string;
  sunSign: ZodiacSign;
  moonSign: ZodiacSign;
  risingSign: ZodiacSign;
  chineseZodiac: ChineseZodiacAnimal;
  chineseElement: ChineseElement;
  lifePathNumber: number;
  destinyNumber: number;
  soulNumber: number;
  personalityNumber: number;
  birthstone: string;
  spiritAnimal: string;
  dominantPlanet: PlanetName;
  luckyNumber: number;
  luckyColor: string;
  luckyDay: string;
  luckyDirection: string;
  energyScore: EnergyScore;
  birthMoonPhase: MoonPhase;
}

// --- Journal ---
export type JournalCategory =
  | "dream"
  | "manifestation"
  | "goal"
  | "meditation"
  | "tarot"
  | "life-event"
  | "general";

export interface JournalEntry {
  id: string;
  profileId: string;
  title: string;
  content: string;
  category: JournalCategory;
  tags: string[];
  date: string;
  mood?: string;
}

// --- Sacred Geometry ---
export interface SacredGeometry {
  name: string;
  description: string;
  meaning: string;
  meditationUse: string;
}

// --- Life Cycles ---
export interface LifeCycle {
  currentCycle: string;
  currentDescription: string;
  growthCycle: string;
  growthDescription: string;
  destinyCycle: string;
  destinyDescription: string;
  forecasts: {
    love: string;
    wealth: string;
    health: string;
    opportunities: string;
  };
}

// --- App Settings ---
export interface AppSettings {
  theme: CosmicTheme;
  defaultProfileId: string | null;
  notifications: boolean;
  haptics: boolean;
  soundEffects: boolean;
}

export type CosmicTheme =
  | "midnight"
  | "galaxy"
  | "nebula"
  | "solar"
  | "golden-mystic"
  | "emerald"
  | "cosmic-purple";

// --- Navigation ---
export type CosmicModule =
  | "home"
  | "blueprint"
  | "numerology"
  | "astrology"
  | "compatibility"
  | "tarot"
  | "angel-numbers"
  | "dreams"
  | "chakras"
  | "spirit-animals"
  | "forecast"
  | "letterology"
  | "moon-calendar"
  | "journal"
  | "profile"
  | "settings"
  | "search";
