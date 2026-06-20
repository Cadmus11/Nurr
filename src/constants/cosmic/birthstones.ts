import type { BirthstoneData } from '@/types/cosmic';

export const BIRTHSTONES: BirthstoneData[] = [
  { month: 1, stone: "Garnet", meaning: "Protection, strength, and vitality. Garnet energizes and rejuvenates the spirit.", properties: ["Enhances vitality", "Promotes courage", "Protects during travel", "Inspires devotion"] },
  { month: 2, stone: "Amethyst", meaning: "Peace, clarity, and spiritual wisdom. Amethyst calms the mind and opens intuition.", properties: ["Calms the mind", "Enhances meditation", "Promotes sobriety", "Strengthens intuition"] },
  { month: 3, stone: "Aquamarine", meaning: "Courage, healing, and tranquility. Aquamarine soothes emotions and clears communication.", properties: ["Soothes anxiety", "Enhances communication", "Promotes courage", "Clears emotional blockages"] },
  { month: 4, stone: "Diamond", meaning: "Purity, strength, and eternal love. Diamond amplifies energy and brings clarity.", properties: ["Amplifies intentions", "Brings mental clarity", "Symbolizes commitment", "Strengthens resolve"] },
  { month: 5, stone: "Emerald", meaning: "Love, rebirth, and abundance. Emerald opens the heart and attracts prosperity.", properties: ["Opens heart chakra", "Attracts abundance", "Promotes loyalty", "Enhances intuition"] },
  { month: 6, stone: "Pearl", meaning: "Purity, wisdom, and emotional balance. Pearl nurtures the soul and calms emotions.", properties: ["Calms emotional storms", "Enhances feminine energy", "Promotes purity", "Brings wisdom"] },
  { month: 7, stone: "Ruby", meaning: "Passion, protection, and prosperity. Ruby ignites the fire of life and love.", properties: ["Ignites passion", "Provides protection", "Attracts wealth", "Energizes the spirit"] },
  { month: 8, stone: "Peridot", meaning: "Healing, growth, and positive energy. Peridot releases negativity and attracts joy.", properties: ["Releases negativity", "Promotes emotional healing", "Attracts joy", "Supports personal growth"] },
  { month: 9, stone: "Sapphire", meaning: "Wisdom, royalty, and spiritual insight. Sapphire opens the mind to higher knowledge.", properties: ["Enhances wisdom", "Promotes mental clarity", "Strengthens focus", "Opens spiritual insight"] },
  { month: 10, stone: "Opal", meaning: "Inspiration, creativity, and emotional expression. Opal amplifies feelings and artistic vision.", properties: ["Boosts creativity", "Enhances emotions", "Inspires passion", "Amplifies intentions"] },
  { month: 11, stone: "Topaz", meaning: "Abundance, joy, and manifestation. Topaz attracts prosperity and radiates warmth.", properties: ["Attracts abundance", "Radiates positive energy", "Enhances manifestation", "Promotes joy"] },
  { month: 12, stone: "Turquoise", meaning: "Protection, wisdom, and healing. Turquoise bridges earth and sky, bringing wholeness.", properties: ["Provides protection", "Enhances wisdom", "Promotes healing", "Brings good fortune"] },
];

export function getBirthstone(month: number): BirthstoneData {
  return BIRTHSTONES[Math.max(0, Math.min(11, month - 1))];
}
