import type { ChineseZodiacAnimal, ChineseElement } from "@/types/cosmic";

const ANIMALS: ChineseZodiacAnimal[] = [
  "monkey", "rooster", "dog", "pig",
  "rat", "ox", "tiger", "rabbit",
  "dragon", "snake", "horse", "goat",
];

const STEM_BRANCH: { element: ChineseElement; yin: boolean }[] = [
  { element: "metal", yin: true },
  { element: "metal", yin: false },
  { element: "water", yin: true },
  { element: "water", yin: false },
  { element: "wood", yin: true },
  { element: "wood", yin: false },
  { element: "fire", yin: true },
  { element: "fire", yin: false },
  { element: "earth", yin: true },
  { element: "earth", yin: false },
];

export function getChineseZodiacAnimal(year: number): ChineseZodiacAnimal {
  return ANIMALS[year % 12];
}

export function getChineseElement(year: number): ChineseElement {
  return STEM_BRANCH[year % 10].element;
}

export function getChineseZodiacFromDate(birthDate: string): {
  animal: ChineseZodiacAnimal;
  element: ChineseElement;
} {
  const year = new Date(birthDate).getFullYear();
  return {
    animal: getChineseZodiacAnimal(year),
    element: getChineseElement(year),
  };
}
