import type { MoonPhase, MoonPhaseData } from '@/types/cosmic';

export const MOON_PHASES: Record<MoonPhase, MoonPhaseData> = {
  "new-moon": {
    phase: "new-moon",
    title: "New Moon",
    symbol: "🌑",
    interpretation: "A time of new beginnings, fresh starts, and planting seeds of intention. The sky is dark, ready to be filled with light. Set your intentions now for what you wish to grow.",
    bestActivities: ["Setting intentions", "Starting new projects", "Dreaming and visioning", "Quiet reflection", "Planting seeds (literal or metaphorical)"],
    energy: "Dark, receptive, inward — potent with unseen potential.",
  },
  "waxing-crescent": {
    phase: "waxing-crescent",
    title: "Waxing Crescent",
    symbol: "🌒",
    interpretation: "The first sliver of light returns. Hope and momentum build as your intentions begin to take form. Take the first concrete steps toward your goals.",
    bestActivities: ["Taking initial action", "Building momentum", "Researching and learning", "Strengthening commitment", "Visualizing growth"],
    energy: "Growing, hopeful, active — the spark of creation catches fire.",
  },
  "first-quarter": {
    phase: "first-quarter",
    title: "First Quarter",
    symbol: "🌓",
    interpretation: "Half illuminated, half dark. A time of decision, challenge, and commitment. Obstacles may appear to test your resolve. Push through with determination.",
    bestActivities: ["Making decisions", "Overcoming obstacles", "Taking decisive action", "Committing to your path", "Problem-solving"],
    energy: "Dynamic, challenging, decisive — the moment of choice and action.",
  },
  "waxing-gibbous": {
    phase: "waxing-gibbous",
    title: "Waxing Gibbous",
    symbol: "🌔",
    interpretation: "Nearly full, almost there. Refine and adjust your approach. The goal is in sight — fine-tune your efforts and prepare for the culmination.",
    bestActivities: ["Refining plans", "Adjusting strategies", "Seeking feedback", "Practicing patience", "Preparing for culmination"],
    energy: "Refining, adjusting, anticipating — the final push before fullness.",
  },
  "full-moon": {
    phase: "full-moon",
    title: "Full Moon",
    symbol: "🌕",
    interpretation: "Peak illumination, culmination, and celebration. The full moon reveals what was hidden in darkness. Emotions run high. Harvest the fruits of your labor.",
    bestActivities: ["Celebrating achievements", "Releasing what no longer serves", "Gratitude practices", "Group ceremonies", "Harvesting results"],
    energy: "Illuminated, powerful, climactic — the peak of the lunar cycle.",
  },
  "waning-gibbous": {
    phase: "waning-gibbous",
    title: "Waning Gibbous",
    symbol: "🌖",
    interpretation: "The light begins to fade, inviting gratitude and sharing. Give thanks for what you've received and share your bounty with others.",
    bestActivities: ["Sharing knowledge", "Teaching others", "Expressing gratitude", "Giving back", "Reflecting on lessons"],
    energy: "Thankful, generous, reflective — sharing the abundance before letting go.",
  },
  "last-quarter": {
    phase: "last-quarter",
    title: "Last Quarter",
    symbol: "🌗",
    interpretation: "Half light, half dark again. A time of release, forgiveness, and letting go. Surrender what no longer serves your highest good.",
    bestActivities: ["Letting go", "Forgiveness practice", "Releasing attachments", "Cleansing and purging", "Surrender rituals"],
    energy: "Releasing, forgiving, cleansing — the courage to let go.",
  },
  "waning-crescent": {
    phase: "waning-crescent",
    title: "Waning Crescent",
    symbol: "🌘",
    interpretation: "The final sliver of light before darkness. Rest, surrender, and complete release. Trust the darkness — it is not empty but full of potential for the next cycle.",
    bestActivities: ["Rest and recovery", "Dream work", "Surrender and trust", "Inner journeying", "Preparing for new cycle"],
    energy: "Surrendering, resting, completing — the stillness before rebirth.",
  },
};

export function getMoonPhase(year: number, month: number, day: number): MoonPhase {
  const phase = getMoonPhaseNumber(year, month, day);
  const phases: MoonPhase[] = [
    "new-moon", "waxing-crescent", "first-quarter", "waxing-gibbous",
    "full-moon", "waning-gibbous", "last-quarter", "waning-crescent",
  ];
  return phases[Math.floor(phase / 0.125) % 8];
}

function getMoonPhaseNumber(y: number, m: number, d: number): number {
  let c = 0; let e = 0;
  if (m < 3) { y--; m += 12; }
  c = Math.floor(y / 100);
  e = ((y % 19) * 11 + Math.floor((c - 17) / 25.5) + Math.floor(c / 4) + 8 + Math.floor(c / 3) - 5 - (3 * c)) % 30;
  if (e < 0) e += 30;
  const j = Math.floor(365.25 * (y + 4712)) + Math.floor(30.6 * (m + 1)) + d + (0.5 - (c / 4)) - c - 2260.5;
  const n = (j - e - 1.5) / 29.530588;
  return n - Math.floor(n);
}
