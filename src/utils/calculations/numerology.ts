import type { NumerologyResult } from "@/types/cosmic";

function reduceNumber(n: number, masterNumbers = true): number {
  if (n === 0) return 0;
  const masters = new Set([11, 22, 33]);
  let num = n;
  while (num > 9 && !(masterNumbers && masters.has(num))) {
    num = String(num)
      .split("")
      .reduce((sum, d) => sum + parseInt(d, 10), 0);
  }
  return num;
}

function letterValue(char: string): number {
  const upper = char.toUpperCase();
  const code = upper.charCodeAt(0);
  if (code < 65 || code > 90) return 0;
  const pos = code - 64;
  return ((pos - 1) % 9) + 1;
}

function sumNameValues(name: string): number {
  return name
    .replace(/[^a-zA-Z]/g, "")
    .split("")
    .reduce((sum, c) => sum + letterValue(c), 0);
}

const VOWELS = new Set(["A", "E", "I", "O", "U"]);

function sumVowels(name: string): number {
  return name
    .replace(/[^a-zA-Z]/g, "")
    .split("")
    .filter((c) => VOWELS.has(c.toUpperCase()))
    .reduce((sum, c) => sum + letterValue(c), 0);
}

function sumConsonants(name: string): number {
  return name
    .replace(/[^a-zA-Z]/g, "")
    .split("")
    .filter((c) => !VOWELS.has(c.toUpperCase()))
    .reduce((sum, c) => sum + letterValue(c), 0);
}

export function calculateLifePath(birthDate: string): number {
  const date = new Date(birthDate);
  const month = reduceNumber(date.getMonth() + 1, false);
  const day = reduceNumber(date.getDate(), false);
  const year = reduceNumber(date.getFullYear(), false);
  return reduceNumber(month + day + year);
}

export function calculateDestiny(fullName: string): number {
  return reduceNumber(sumNameValues(fullName));
}

export function calculateSoulUrge(fullName: string): number {
  return reduceNumber(sumVowels(fullName));
}

export function calculatePersonality(fullName: string): number {
  return reduceNumber(sumConsonants(fullName));
}

export function calculateBirthday(birthDate: string): number {
  const day = new Date(birthDate).getDate();
  return reduceNumber(day, false);
}

export function calculateMaturity(lifePath: number, destiny: number): number {
  return reduceNumber(lifePath + destiny);
}

export function calculateChallengeNumbers(birthDate: string): number[] {
  const date = new Date(birthDate);
  const m = reduceNumber(date.getMonth() + 1, false);
  const d = reduceNumber(date.getDate(), false);
  const y = reduceNumber(date.getFullYear(), false);
  const y1 = Math.abs(m - d);
  const y2 = Math.abs(d - y);
  const y3 = Math.abs(y1 - y2);
  const y4 = Math.abs(
    reduceNumber(date.getMonth() + 1 + date.getFullYear(), false) -
      reduceNumber(date.getDate(), false),
  );
  return [y1, y2, y3, y4].map((n) => reduceNumber(n, false));
}

export function calculateKarmicDebt(birthDate: string): number | null {
  const lifePath = calculateLifePath(birthDate);
  return [13, 14, 16, 19].includes(lifePath) ? lifePath : null;
}

export function calculatePinnacleCycles(birthDate: string): number[] {
  const date = new Date(birthDate);
  const m = reduceNumber(date.getMonth() + 1, false);
  const d = reduceNumber(date.getDate(), false);
  const y = reduceNumber(date.getFullYear(), false);
  const lifePath = calculateLifePath(birthDate);

  const first = reduceNumber(m + d);
  const second = reduceNumber(d + y);
  const third = reduceNumber(first + second);
  const fourth = reduceNumber(m + y);

  return [first, second, third, fourth];
}

export function calculatePersonalYear(birthDate: string): number {
  const now = new Date();
  const date = new Date(birthDate);
  const currentYear = now.getFullYear();
  const m = date.getMonth() + 1;
  const d = date.getDate();
  return reduceNumber(m + d + currentYear);
}

export function calculatePersonalMonth(birthDate: string): number {
  const py = calculatePersonalYear(birthDate);
  const month = new Date().getMonth() + 1;
  return reduceNumber(py + month);
}

export function calculatePersonalDay(birthDate: string): number {
  const pm = calculatePersonalMonth(birthDate);
  const day = new Date().getDate();
  return reduceNumber(pm + day);
}

export function calculateNumerology(
  birthDate: string,
  fullName: string,
): NumerologyResult {
  const lifePath = calculateLifePath(birthDate);
  const destiny = calculateDestiny(fullName);
  const soulUrge = calculateSoulUrge(fullName);
  const personality = calculatePersonality(fullName);

  return {
    lifePath,
    destiny,
    soulUrge,
    personality,
    birthday: calculateBirthday(birthDate),
    maturity: calculateMaturity(lifePath, destiny),
    challengeNumbers: calculateChallengeNumbers(birthDate),
    karmicDebt: calculateKarmicDebt(birthDate),
    pinnacleCycles: calculatePinnacleCycles(birthDate),
    personalYear: calculatePersonalYear(birthDate),
    personalMonth: calculatePersonalMonth(birthDate),
    personalDay: calculatePersonalDay(birthDate),
  };
}
