import type { ChineseZodiacAnimal, ChineseElement } from '@/types/cosmic';
import { CHINESE_ZODIAC } from '@/constants/cosmic/chineseZodiac';

export function calculateChineseZodiac(birthYear: number): ChineseZodiacAnimal {
  for (const [animal, data] of Object.entries(CHINESE_ZODIAC)) {
    if (data.years.includes(birthYear)) {
      return animal as ChineseZodiacAnimal;
    }
  }
  const animals: ChineseZodiacAnimal[] = [
    "rat", "ox", "tiger", "rabbit", "dragon", "snake",
    "horse", "goat", "monkey", "rooster", "dog", "pig",
  ];
  return animals[(birthYear - 4) % 12];
}

export function calculateChineseElement(birthYear: number): ChineseElement {
  const elements: ChineseElement[] = ["wood", "fire", "earth", "metal", "water"];
  return elements[Math.floor(((birthYear - 4) % 10) / 2)];
}

export function getChineseZodiacFromDate(birthDate: string): { animal: ChineseZodiacAnimal; element: ChineseElement } {
  const year = new Date(birthDate).getFullYear();
  return { animal: calculateChineseZodiac(year), element: calculateChineseElement(year) };
}

export function getChineseZodiacAnimal(birthDate: string): ChineseZodiacAnimal {
  return getChineseZodiacFromDate(birthDate).animal;
}
