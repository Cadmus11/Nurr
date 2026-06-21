import { SPIRIT_ANIMALS } from "@/constants/cosmic/spiritAnimals";
import { calculateLifePath, calculateDestinyNumber } from "./numerology";
import { calculateSunSign } from "./zodiac";
import type { SpiritAnimal } from "@/types/cosmic";

const SIGN_LIST = ["aries","taurus","gemini","cancer","leo","virgo","libra","scorpio","sagittarius","capricorn","aquarius","pisces"];

export function calculateSpiritAnimal(birthDate: string, name: string): SpiritAnimal {
  const [y, m, d] = birthDate.split("-").map(Number);
  const sunSign = calculateSunSign(m, d);
  const lifePath = calculateLifePath(birthDate);
  const destiny = calculateDestinyNumber(name);
  const signIndex = SIGN_LIST.indexOf(sunSign);
  const index = (lifePath + destiny + y + signIndex) % SPIRIT_ANIMALS.length;
  return SPIRIT_ANIMALS[index];
}
