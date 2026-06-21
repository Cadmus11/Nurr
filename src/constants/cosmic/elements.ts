import type { ElementData, ZodiacElement } from '@/types/cosmic';

export const ELEMENTS: Record<ZodiacElement, ElementData> = {
  fire: {
    element: "fire",
    traits: [
      "Passionate and enthusiastic about everything they do",
      "Natural initiators who spark action in others",
      "Courageous and willing to take risks",
      "Energetic and dynamic presence",
      "Inspirational and motivating",
      "Impatient and can burn out quickly",
    ],
    dominant: [
      "Natural leadership and charisma",
      "Creativity and self-expression",
      "Optimism and forward momentum",
      "Ability to inspire and energize others",
      "Courage to pursue bold visions",
    ],
    weak: [
      "Difficulty with patience and long-term planning",
      "Tendency toward burnout and exhaustion",
      "Can overwhelm more sensitive types",
      "Struggles with subtlety and tact",
    ],
    balanceSuggestions: [
      "Incorporate water elements — spend time near water, drink more fluids, practice cooling breathwork",
      "Meditate before acting to reduce impulsiveness",
      "Practice active listening and patience",
      "Channel excess energy into creative or physical outlets",
      "Create rest periods in your schedule",
    ],
    signs: ["aries", "leo", "sagittarius"],
  },
  earth: {
    element: "earth",
    traits: [
      "Grounded, practical, and reliable",
      "Patient and methodical in approach",
      "Strong connection to the physical world",
      "Values stability and security",
      "Hardworking and persistent",
      "Can be rigid and resistant to change",
    ],
    dominant: [
      "Exceptional reliability and follow-through",
      "Practical wisdom and common sense",
      "Ability to build lasting structures and wealth",
      "Patience and long-term perspective",
      "Grounded presence that calms others",
    ],
    weak: [
      "Resistance to change and new ideas",
      "Can be overly materialistic",
      "Stubbornness that prevents growth",
      "Tendency to get stuck in routines",
    ],
    balanceSuggestions: [
      "Incorporate air elements — study new ideas, travel, engage in stimulating conversation",
      "Practice flexibility and spontaneity",
      "Let go of attachment to outcomes",
      "Allow yourself to dream and imagine without judgment",
      "Take calculated risks to encourage growth",
    ],
    signs: ["taurus", "virgo", "capricorn"],
  },
  air: {
    element: "air",
    traits: [
      "Intellectual and analytical thinking",
      "Highly communicative and social",
      "Curious and open to new ideas",
      "Objective and fair-minded",
      "Adaptable and versatile",
      "Can be detached and overly theoretical",
    ],
    dominant: [
      "Quick thinking and problem-solving ability",
      "Excellent communication skills",
      "Social intelligence and networking",
      "Objectivity and fairness",
      "Ability to see multiple perspectives",
    ],
    weak: [
      "Emotional detachment and aloofness",
      "Overthinking and analysis paralysis",
      "Can be unreliable or inconsistent",
      "Struggles with deep emotional connection",
    ],
    balanceSuggestions: [
      "Incorporate water elements — practice emotional expression, spend time near water, journal feelings",
      "Ground through physical activity and nature walks",
      "Practice staying present rather than living in thoughts",
      "Develop consistent routines and follow through on commitments",
      "Make time for quiet contemplation without mental stimulation",
    ],
    signs: ["gemini", "libra", "aquarius"],
  },
  water: {
    element: "water",
    traits: [
      "Deeply emotional and intuitive",
      "Empathetic and compassionate",
      "Creative and imaginative",
      "Fluid and adaptable to circumstances",
      "Mysterious and depth-oriented",
      "Can be moody and overly sensitive",
    ],
    dominant: [
      "Exceptional emotional intelligence",
      "Deep intuition and psychic sensitivity",
      "Creativity and artistic ability",
      "Ability to nurture and heal others",
      "Emotional depth and capacity for connection",
    ],
    weak: [
      "Overwhelmed by emotions and moods",
      "Tendency to absorb others' energy",
      "Can be overly sensitive and easily hurt",
      "Struggles with objectivity and boundaries",
    ],
    balanceSuggestions: [
      "Incorporate fire elements — assert yourself, take action, practice confidence-building",
      "Establish healthy emotional boundaries",
      "Ground through physical exercise and earth connection",
      "Practice discernment — not every feeling requires action",
      "Create structured routines for emotional stability",
    ],
    signs: ["cancer", "scorpio", "pisces"],
  },
};

export const ELEMENT_LIST: ElementData[] = Object.values(ELEMENTS);
