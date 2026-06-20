import type { Forecast, ForecastPeriod, EnergyScore } from "@/types/cosmic";
import { calculatePersonalYear } from "./numerology";
import { getMoonPhase } from "./lunarPhase";

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
