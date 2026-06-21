import type { Forecast, ForecastPeriod, EnergyScore, DailyMessage } from "@/types/cosmic";
import { calculatePersonalYear } from "./numerology";
import { calculateSunSign } from "./zodiac";
import { calculateChineseZodiac } from "./chineseZodiac";

function generateDateString(period: ForecastPeriod): string {
  const now = new Date();
  switch (period) {
    case "daily":
      return now.toISOString().split("T")[0];
    case "weekly": {
      const weekEnd = new Date(now);
      weekEnd.setDate(weekEnd.getDate() + 7);
      return `${now.toISOString().split("T")[0]}_${weekEnd.toISOString().split("T")[0]}`;
    }
    case "monthly":
      return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}`;
    case "yearly":
      return String(now.getFullYear());
  }
}

const LOVE_FORECASTS: Record<string, string[]> = {
  "1": [
    "New romantic opportunities arise — lead with confidence",
    "Passion is high, express your desires openly",
    "A bold gesture will deepen your connection",
  ],
  "2": [
    "Harmony and partnership are favored this period",
    "Listen to your partner's needs with patience",
    "A peaceful resolution to conflict is near",
  ],
  "3": [
    "Social connections bring romantic joy",
    "Creativity in love will be rewarded",
    "Express your feelings through words and art",
  ],
  "4": [
    "Stability in relationships brings comfort",
    "Build a solid foundation for lasting love",
    "Commitment and loyalty are your strengths",
  ],
  "5": [
    "Adventure awaits in your love life",
    "Embrace change and spontaneity with your partner",
    "New experiences will strengthen your bond",
  ],
  "6": [
    "Family and home take center stage in love",
    "Nurture your relationships with care and devotion",
    "Harmony at home brings romantic fulfillment",
  ],
  "7": [
    "Deep spiritual connection with your partner grows",
    "Time alone will clarify your heart's desires",
    "Trust your intuition in matters of love",
  ],
  "8": [
    "Passion and power dynamics are highlighted",
    "Balance ambition with romance for best results",
    "Shared goals strengthen your partnership",
  ],
  "9": [
    "Compassionate love brings healing",
    "Let go of past hurts and embrace new beginnings",
    "Universal love flows through all your relationships",
  ],
};

const CAREER_FORECASTS: Record<string, string[]> = {
  "1": ["Step into leadership — your initiative is needed", "New projects launch successfully", "Your ambition drives results"],
  "2": ["Collaboration is key to success", "Diplomacy opens doors", "Support from colleagues strengthens your position"],
  "3": ["Creative ideas bring recognition", "Communication skills shine", "Networking leads to opportunities"],
  "4": ["Hard work pays off with tangible results", "Build systems that support long-term growth", "Discipline is your greatest asset"],
  "5": ["Embrace change — a new direction appears", "Adaptability leads to advancement", "Risk-taking is rewarded"],
  "6": ["Service to others elevates your career", "Team harmony boosts productivity", "Mentorship roles emerge"],
  "7": ["Deep focus yields breakthroughs", "Research and analysis lead to discovery", "Trust your expertise"],
  "8": ["Financial success and authority grow", "Leadership roles expand your influence", "Strategic decisions pay dividends"],
  "9": ["Completion of a major cycle brings clarity", "Philanthropic work enhances your reputation", "New vision emerges from experience"],
};

const HEALTH_FORECASTS: Record<string, string[]> = {
  "1": ["High energy — channel it into exercise", "Start new health routines with vigor", "Your vitality is contagious"],
  "2": ["Gentle movement supports well-being", "Balance rest and activity", "Stress reduces through connection"],
  "3": ["Creative movement brings joy to fitness", "Social activities boost mental health", "Laughter is your best medicine"],
  "4": ["Consistent routines build lasting health", "Focus on nutrition and structure", "Discipline in habits pays off"],
  "5": ["Variety in exercise keeps you engaged", "Adventure sports energize your body", "Avoid burnout from overactivity"],
  "6": ["Nurturing your body with wholesome food", "Family activities support fitness", "Self-care is a priority"],
  "7": ["Rest and recovery are essential", "Mind-body practices deepen wellness", "Quiet reflection restores energy"],
  "8": ["Intense workouts build strength", "Discipline in health yields powerful results", "Listen to your body's limits"],
  "9": ["Healing and release of old patterns", "Holistic health approaches benefit you", "Compassion toward your body grows"],
};

const FINANCE_FORECASTS: Record<string, string[]> = {
  "1": ["New income streams open up", "Bold financial moves pay off", "Leadership brings financial rewards"],
  "2": ["Partnerships strengthen finances", "Steady growth through collaboration", "Shared resources bring abundance"],
  "3": ["Creative ventures generate income", "Communication skills attract opportunities", "Social connections lead to profit"],
  "4": ["Financial stability through discipline", "Long-term investments grow steadily", "Budgeting brings security"],
  "5": ["Unexpected financial opportunities arise", "Smart risks increase wealth", "Diversification protects assets"],
  "6": ["Financial harmony at home", "Family investments pay dividends", "Generosity attracts abundance"],
  "7": ["Financial wisdom through research", "Intuitive investments perform well", "Period of reflection on true value"],
  "8": ["Financial power and authority grow", "Major transactions are favored", "Strategic investments multiply wealth"],
  "9": ["Financial cycles complete and renew", "Philanthropy brings unexpected returns", "Let go of scarcity mindset"],
};

function pickMessage(messages: string[], seed: number): string {
  return messages[seed % messages.length];
}

export function generateForecast(
  birthDate: string,
  period: ForecastPeriod,
): Omit<Forecast, "period" | "date"> {
  const py = calculatePersonalYear(birthDate);
  const key = String(py);
  const now = new Date();
  const seed = now.getFullYear() + now.getMonth() + now.getDate() + py;

  return {
    love: pickMessage(LOVE_FORECASTS[key] ?? LOVE_FORECASTS["1"], seed),
    career: pickMessage(CAREER_FORECASTS[key] ?? CAREER_FORECASTS["1"], seed + 1),
    health: pickMessage(HEALTH_FORECASTS[key] ?? HEALTH_FORECASTS["1"], seed + 2),
    finance: pickMessage(FINANCE_FORECASTS[key] ?? FINANCE_FORECASTS["1"], seed + 3),
    energy: (py * 8 + seed) % 101,
    spiritual: "Trust the cosmic timing of your journey",
    travel: "Favorable conditions for exploration ahead",
    education: "Your mind is primed for new knowledge",
  };
}

export function getForecast(birthDate: string, period: ForecastPeriod): Forecast {
  return {
    period,
    date: generateDateString(period),
    ...generateForecast(birthDate, period),
  };
}

const AFFIRMATIONS_BY_SCORE: Record<string, string[]> = {
  high: [
    "The universe amplifies your power today — step boldly into your greatness",
    "Cosmic energies align in your favor — trust the momentum you feel",
    "Today carries a high vibration — your intentions manifest with ease",
    "Stars radiate strength for you — embrace the confidence flowing through you",
    "A powerful cosmic current carries you forward — ride it with faith",
  ],
  moderate: [
    "Balance guides your day — steady energy supports meaningful progress",
    "The cosmos offers gentle support — consistent effort brings results",
    "Today's energy flows at an even pace — perfect for steady advancement",
    "Harmonious vibrations surround you — build on the stability you feel",
    "Moderate skies hold steady — keep moving with calm determination",
  ],
  low: [
    "Today is a gentle tide — rest, reflect, and honor your rhythms",
    "Low energy days are sacred — the cosmos asks you to slow down",
    "Soft energies invite inward focus — nurture yourself without guilt",
    "The stars suggest stillness today — restoration powers tomorrow's rise",
    "A quiet day carries hidden gifts — listen closely to your inner voice",
  ],
};

const THEMES_BY_SCORE: Record<string, string[]> = {
  high: ["Ignition", "Ascension", "Radiance", "Breakthrough", "Alignment"],
  moderate: ["Harmony", "Growth", "Foundation", "Flow", "Balance"],
  low: ["Restoration", "Reflection", "Stillness", "Cocooning", "Surrender"],
};

const FOCUS_AREAS: Record<string, string[]> = {
  high: ["Lead with courage and take inspired action", "Share your light — your presence elevates others", "Now is the time to launch what you've been planning", "Trust your instincts — they are sharp today", "Amplify your vision and speak it into existence"],
  moderate: ["Consistency over intensity — small steps compound", "Strengthen your foundations with patient effort", "Balance action with reflection for optimal flow", "Build bridges — connections made today will last", "Tend to what's growing with steady attention"],
  low: ["Prioritize rest and deep nourishment", "Release the need to produce — being is enough", "Turn inward for the answers you seek", "Gentle movement and quiet contemplation restore you", "Forgive yourself for any perceived slowness"],
};

const MANTRA_BY_ENERGY: Record<string, string[]> = {
  high: ["I am a vessel of cosmic power", "Today I shine without apology", "The universe moves through me with purpose", "I am aligned with the highest frequencies", "My energy creates my reality"],
  moderate: ["I am exactly where I need to be", "Balance is my natural state", "I trust the pace of my journey", "Each step forward is a victory", "I flow with the rhythm of the cosmos"],
  low: ["Stillness is also sacred", "I honor my need to restore", "Rest is my right, not a reward", "The quiet times teach me the most", "I surrender and trust the process"],
};

const GUIDANCE_BY_PERSONAL_YEAR: Record<string, string[]> = {
  "1": ["New beginnings are charging your energy today", "Your leadership energy is called upon — step forward"],
  "2": ["Partnership energy softens the day — seek connection", "Collaboration brings unexpected peace today"],
  "3": ["Creative expression fuels your spirit — share your voice", "Joy finds you when you embrace your playful side"],
  "4": ["Discipline today builds tomorrow's freedom", "Structure supports you — lean into your routines"],
  "5": ["Adventure energy stirs — embrace healthy change", "Freedom calls — break one small pattern today"],
  "6": ["Love and service center your energy today", "Nurturing others fills your own cup as well"],
  "7": ["Wisdom seeks you in quiet moments today", "Trust your intuition — it speaks clearly now"],
  "8": ["Power and abundance energy surrounds you", "You are building something significant — keep going"],
  "9": ["Completion energy brings clarity and release", "Letting go creates space for new blessings"],
};

export function getDailyMessage(
  birthDate: string,
  name: string,
): DailyMessage {
  const now = new Date();
  const dateStr = now.toISOString().split("T")[0];
  const energy = calculateEnergyScore(birthDate);
  const py = calculatePersonalYear(birthDate);
  const [y, m, d] = birthDate.split("-").map(Number);
  const sunSign = calculateSunSign(m, d);
  const chineseAnimal = calculateChineseZodiac(y);

  const baseSeed = now.getFullYear() + now.getMonth() + now.getDate() + py + d;

  function pick(arr: string[], offset = 0): string {
    return arr[(baseSeed + offset) % arr.length];
  }

  const band: "high" | "moderate" | "low" =
    energy.overall >= 66 ? "high"
    : energy.overall >= 33 ? "moderate"
    : "low";

  const affirmation = pick(AFFIRMATIONS_BY_SCORE[band]);
  const theme = pick(THEMES_BY_SCORE[band]);
  const focus = pick(FOCUS_AREAS[band], 1);
  const mantra = pick(MANTRA_BY_ENERGY[band], 2);

  const guidanceKey = String(py);
  const guidancePool = GUIDANCE_BY_PERSONAL_YEAR[guidanceKey] ?? GUIDANCE_BY_PERSONAL_YEAR["1"];
  const personalGuidance = guidancePool[(baseSeed + 3) % guidancePool.length];

  const guidance = `${personalGuidance}. As a ${sunSign} born in the ${chineseAnimal} year, today's energy (${energy.overall}/100) favors ${energy.career} career moves, ${energy.love} love connections, and ${energy.finance} financial decisions.`;

  return {
    date: dateStr,
    energyScore: energy.overall,
    affirmation,
    guidance,
    theme,
    focus,
    mantra,
  };
}

export function calculateEnergyScore(birthDate: string): EnergyScore {
  const py = calculatePersonalYear(birthDate);
  const now = new Date();
  const base = (py * 7 + now.getDate() + now.getMonth() * 5) % 101;
  const overall = Math.max(0, Math.min(100, base));

  function level(v: number): "high" | "moderate" | "low" {
    if (v >= 66) return "high";
    if (v >= 33) return "moderate";
    return "low";
  }

  return {
    overall,
    career: level((py * 9 + now.getDate() * 2) % 101),
    love: level((py * 6 + now.getDate() * 3 + 7) % 101),
    finance: level((py * 8 + now.getMonth() * 4) % 101),
    health: level((py * 5 + now.getDate() * 2 + 13) % 101),
    spiritual: level((py * 4 + now.getMonth() * 3 + 23) % 101),
  };
}
