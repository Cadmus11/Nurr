import type { LifeCycle } from '@/types/cosmic';

export const DEFAULT_LIFE_CYCLES: LifeCycle = {
  currentCycle: "Foundation & Growth",
  currentDescription: "You are in a period of building foundations and expanding your stability. This cycle focuses on establishing security so that you can build higher in the next phase. Focus on discipline, consistency, and practical progress.",
  growthCycle: "Expression & Creativity",
  growthDescription: "Your next growth cycle calls you to express your authentic self and embrace creativity. Share your gifts with the world, take creative risks, and allow your true self to be seen.",
  destinyCycle: "Wisdom & Legacy",
  destinyDescription: "Your ultimate destiny cycle leads you toward becoming a source of wisdom and legacy. You are evolving into a teacher or guide who shares the hard-won wisdom of your journey.",
  forecasts: {
    love: "A period of deepening connections. Existing relationships grow stronger through honest communication. If single, you may attract a partner who values genuine connection.",
    wealth: "Financial foundations are strengthening. This is a favorable time for long-term investments and building savings. Patience with money management will pay dividends.",
    health: "Your health is supported by consistent routines. Focus on sustainable wellness practices. Small daily habits compound into significant improvements.",
    opportunities: "Opportunities arrive through steady, consistent effort. Pay attention to offers requiring long-term commitment. Partnerships are favored now.",
  },
};

export const LIFE_CYCLE_TYPES: Record<string, { current: string; growth: string; destiny: string }> = {
  foundation: {
    current: "Foundation & Growth",
    growth: "Expression & Creativity",
    destiny: "Wisdom & Legacy",
  },
  transformation: {
    current: "Transformation & Release",
    growth: "Alignment & Purpose",
    destiny: "Mastery & Contribution",
  },
  expansion: {
    current: "Expansion & Exploration",
    growth: "Focus & Mastery",
    destiny: "Service & Leadership",
  },
  healing: {
    current: "Healing & Integration",
    growth: "Strength & Resilience",
    destiny: "Compassion & Teaching",
  },
  creation: {
    current: "Creation & Innovation",
    growth: "Structure & Refinement",
    destiny: "Legacy & Impact",
  },
};
