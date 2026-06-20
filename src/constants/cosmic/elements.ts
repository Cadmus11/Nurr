import type { ElementData, ZodiacElement } from '@/types/cosmic';

export const ELEMENTS: Record<ZodiacElement, ElementData> = {
  fire: {
    element: "fire",
    traits: ["Passionate and energetic", "Natural leader", "Impulsive and courageous", "Creative and inspired", "Enthusiastic and optimistic"],
    dominant: ["Leo", "Aries", "Sagittarius"],
    weak: ["Virgo", "Capricorn"],
    balanceSuggestions: [
      "Channel your fire into creative projects rather than conflict",
      "Practice patience before taking action",
      "Balance activity with stillness through meditation",
      "Surround yourself with water and earth energy for grounding",
    ],
    signs: ["aries", "leo", "sagittarius"],
  },
  earth: {
    element: "earth",
    traits: ["Grounded and practical", "Reliable and patient", "Sensual and stable", "Hardworking and disciplined", "Loyal and consistent"],
    dominant: ["Taurus", "Virgo", "Capricorn"],
    weak: ["Gemini", "Sagittarius"],
    balanceSuggestions: [
      "Allow yourself spontaneity and play",
      "Connect with air and fire energy for inspiration",
      "Practice letting go of rigid expectations",
      "Explore creative or spiritual practices",
    ],
    signs: ["taurus", "virgo", "capricorn"],
  },
  air: {
    element: "air",
    traits: ["Intellectual and curious", "Communicative and social", "Objective and analytical", "Adaptable and versatile", "Idea-oriented"],
    dominant: ["Gemini", "Libra", "Aquarius"],
    weak: ["Cancer", "Scorpio"],
    balanceSuggestions: [
      "Ground your ideas with practical action",
      "Connect with your emotions, not just your thoughts",
      "Practice being present rather than in your head",
      "Incorporate physical movement and earth connection",
    ],
    signs: ["gemini", "libra", "aquarius"],
  },
  water: {
    element: "water",
    traits: ["Emotional and intuitive", "Deeply feeling", "Empathetic and nurturing", "Mysterious and psychic", "Artistic and creative"],
    dominant: ["Cancer", "Scorpio", "Pisces"],
    weak: ["Aries", "Libra"],
    balanceSuggestions: [
      "Establish healthy emotional boundaries",
      "Balance empathy with self-protection",
      "Use fire and air energy for decisive action",
      "Practice grounding techniques to avoid overwhelm",
    ],
    signs: ["cancer", "scorpio", "pisces"],
  },
};
