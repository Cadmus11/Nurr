import type { NumerologyResult } from '@/types/cosmic';

function reduceToRoot(n: number): number {
  if (n === 11 || n === 22 || n === 33) return n;
  while (n > 9) n = String(n).split('').reduce((s, d) => s + Number(d), 0);
  return n;
}

function reduceNonMaster(n: number): number {
  while (n > 9) n = String(n).split('').reduce((s, d) => s + Number(d), 0);
  return n;
}

export function calculateLifePath(birthDate: string): number {
  const [y, m, d] = birthDate.split('-').map(Number);
  const sum = reduceNonMaster(y) + reduceNonMaster(m) + reduceNonMaster(d);
  return reduceToRoot(sum);
}

export function calculateDestinyNumber(name: string): number {
  const pythagorean: Record<string, number> = {
    a: 1, b: 2, c: 3, d: 4, e: 5, f: 6, g: 7, h: 8, i: 9,
    j: 1, k: 2, l: 3, m: 4, n: 5, o: 6, p: 7, q: 8, r: 9,
    s: 1, t: 2, u: 3, v: 4, w: 5, x: 6, y: 7, z: 8,
  };
  const total = name
    .toLowerCase()
    .replace(/[^a-z]/g, '')
    .split('')
    .reduce((s, c) => s + (pythagorean[c] ?? 0), 0);
  return reduceToRoot(total);
}

export function calculateSoulUrge(name: string): number {
  const pythagorean: Record<string, number> = {
    a: 1, b: 2, c: 3, d: 4, e: 5, f: 6, g: 7, h: 8, i: 9,
    j: 1, k: 2, l: 3, m: 4, n: 5, o: 6, p: 7, q: 8, r: 9,
    s: 1, t: 2, u: 3, v: 4, w: 5, x: 6, y: 7, z: 8,
  };
  const vowels = ['a', 'e', 'i', 'o', 'u'];
  const total = name
    .toLowerCase()
    .replace(/[^a-z]/g, '')
    .split('')
    .filter((c) => vowels.includes(c))
    .reduce((s, c) => s + (pythagorean[c] ?? 0), 0);
  return reduceToRoot(total);
}

export function calculatePersonalityNumber(name: string): number {
  const pythagorean: Record<string, number> = {
    a: 1, b: 2, c: 3, d: 4, e: 5, f: 6, g: 7, h: 8, i: 9,
    j: 1, k: 2, l: 3, m: 4, n: 5, o: 6, p: 7, q: 8, r: 9,
    s: 1, t: 2, u: 3, v: 4, w: 5, x: 6, y: 7, z: 8,
  };
  const vowels = ['a', 'e', 'i', 'o', 'u'];
  const total = name
    .toLowerCase()
    .replace(/[^a-z]/g, '')
    .split('')
    .filter((c) => !vowels.includes(c))
    .reduce((s, c) => s + (pythagorean[c] ?? 0), 0);
  return reduceToRoot(total);
}

export function calculateBirthdayNumber(birthDate: string): number {
  const day = parseInt(birthDate.split('-')[2], 10);
  return reduceToRoot(day);
}

export function calculateMaturityNumber(lifePath: number, destiny: number): number {
  return reduceToRoot(lifePath + destiny);
}

export function calculatePersonalYear(birthDate: string): number {
  const [y] = birthDate.split('-').map(Number);
  const [_, m, d] = birthDate.split('-').map(Number);
  const currentYear = new Date().getFullYear();
  const sum = reduceNonMaster(m) + reduceNonMaster(d) + reduceNonMaster(currentYear);
  return reduceToRoot(sum);
}

export function calculatePersonalMonth(birthDate: string): number {
  const personalYear = calculatePersonalYear(birthDate);
  const currentMonth = new Date().getMonth() + 1;
  return reduceToRoot(personalYear + currentMonth);
}

export function calculatePersonalDay(birthDate: string): number {
  const personalMonth = calculatePersonalMonth(birthDate);
  const currentDay = new Date().getDate();
  return reduceToRoot(personalMonth + currentDay);
}

export function calculateNumerology(birthDate: string, name: string): NumerologyResult {
  return calculateAllNumerology(birthDate, name);
}

export function calculateAllNumerology(birthDate: string, name: string): NumerologyResult {
  const lifePath = calculateLifePath(birthDate);
  const destiny = calculateDestinyNumber(name);
  const soulUrge = calculateSoulUrge(name);
  const personality = calculatePersonalityNumber(name);
  const birthday = calculateBirthdayNumber(birthDate);
  const maturity = calculateMaturityNumber(lifePath, destiny);
  const challengeNumbers = calculateChallengeNumbers(birthDate);
  const karmicDebt = calculateKarmicDebt(birthDate, name);
  const pinnacleCycles = calculatePinnacleCycles(birthDate);
  const personalYear = calculatePersonalYear(birthDate);
  const personalMonth = calculatePersonalMonth(birthDate);
  const personalDay = calculatePersonalDay(birthDate);

  return {
    lifePath, destiny, soulUrge, personality, birthday, maturity,
    challengeNumbers, karmicDebt, pinnacleCycles, personalYear, personalMonth, personalDay,
  };
}

export function calculateChallengeNumbers(birthDate: string): number[] {
  const [y, m, d] = birthDate.split('-').map(Number);
  const a = reduceNonMaster(m);
  const b = reduceNonMaster(d);
  const c = reduceNonMaster(y);
  const first = Math.abs(a - b);
  const second = Math.abs(b - c);
  const third = Math.abs(a - c);
  return [first, second, third, Math.abs(first - second)];
}

export function calculateKarmicDebt(birthDate: string, name: string): number | null {
  const debitNumbers = [13, 14, 16, 19];
  const lifePath = calculateLifePath(birthDate);
  const destiny = calculateDestinyNumber(name);
  const combined = lifePath + destiny;
  if (debitNumbers.includes(combined)) return combined;
  if (debitNumbers.includes(lifePath)) return lifePath;
  if (debitNumbers.includes(destiny)) return destiny;
  return null;
}

export function calculatePinnacleCycles(birthDate: string): number[] {
  const [y, m, d] = birthDate.split('-').map(Number);
  const month = reduceNonMaster(m);
  const day = reduceNonMaster(d);
  const year = reduceNonMaster(y);
  const first = reduceToRoot(month + day);
  const second = reduceToRoot(day + year);
  const third = reduceToRoot(first + second);
  const fourth = reduceToRoot(month + year);
  return [first, second, third, fourth];
}
