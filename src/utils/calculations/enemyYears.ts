import type { ChineseZodiacAnimal } from "@/types/cosmic";
import { CHINESE_ZODIAC } from "@/constants/cosmic/chineseZodiac";
import { getChineseZodiacAnimal } from "./chineseZodiac";

export function getAllies(animal: ChineseZodiacAnimal): ChineseZodiacAnimal[] {
  return CHINESE_ZODIAC[animal].friends;
}

export function getEnemies(animal: ChineseZodiacAnimal): ChineseZodiacAnimal[] {
  return CHINESE_ZODIAC[animal].enemy;
}

const ALL_ANIMALS: ChineseZodiacAnimal[] = [
  "rat", "ox", "tiger", "rabbit",
  "dragon", "snake", "horse", "goat",
  "monkey", "rooster", "dog", "pig",
];

export function getNeutralSigns(animal: ChineseZodiacAnimal): ChineseZodiacAnimal[] {
  const data = CHINESE_ZODIAC[animal];
  const known = new Set([...data.friends, data.enemy, animal]);
  return ALL_ANIMALS.filter((a) => !known.has(a));
}

export function getChallengingYears(animal: ChineseZodiacAnimal): number[] {
  const thisYear = new Date().getFullYear();
  const data = CHINESE_ZODIAC[animal];
  return data.challengingYears.filter((y) => y >= thisYear).slice(0, 5);
}

export function getProsperousYears(animal: ChineseZodiacAnimal): number[] {
  const thisYear = new Date().getFullYear();
  const data = CHINESE_ZODIAC[animal];
  return data.bestYears.filter((y) => y >= thisYear).slice(0, 5);
}

export function getEnemyYearInfo(animal: ChineseZodiacAnimal): {
  animal: ChineseZodiacAnimal;
  allies: ChineseZodiacAnimal[];
  neutral: ChineseZodiacAnimal[];
  enemy: ChineseZodiacAnimal;
  challengingYears: number[];
  prosperousYears: number[];
} {
  return {
  animal,
  allies: getAllies(animal),
  neutral: getNeutralSigns(animal),
  enemy: CHINESE_ZODIAC[animal].enemy[0],
  challengingYears: getChallengingYears(animal),
    prosperousYears: getProsperousYears(animal),
  };
}
