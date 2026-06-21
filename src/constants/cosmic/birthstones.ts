import type { BirthstoneData } from '@/types/cosmic';

export const BIRTHSTONES: BirthstoneData[] = [
  {
    month: 1,
    stone: "Garnet",
    meaning: "Protection, vitality, and deep commitment. Garnet is a stone of physical and emotional energy, believed to purify and balance energy centers.",
    properties: [
      "Boosts energy and vitality",
      "Enhances passion and creativity",
      "Provides protective energy",
      "Strengthens commitment in relationships",
      "Promotes self-confidence",
    ],
  },
  {
    month: 2,
    stone: "Amethyst",
    meaning: "Spiritual wisdom, sobriety, and inner peace. Amethyst is a powerful protective stone that enhances spiritual awareness and calms the mind.",
    properties: [
      "Calms the mind and promotes emotional stability",
      "Enhances spiritual awareness and intuition",
      "Protects against negative energy",
      "Aids in meditation and dream recall",
      "Supports sobriety and clear thinking",
    ],
  },
  {
    month: 3,
    stone: "Aquamarine",
    meaning: "Courage, communication, and calm clarity. Aquamarine carries the soothing energy of the sea, promoting honest expression and emotional balance.",
    properties: [
      "Enhances clear communication and self-expression",
      "Calms fears and soothes anxiety",
      "Promotes courage to speak one's truth",
      "Supports emotional healing and release",
      "Connects to the energy of the ocean",
    ],
  },
  {
    month: 4,
    stone: "Diamond",
    meaning: "Strength, purity, and eternal love. Diamond is the hardest natural substance, symbolizing unbreakable bonds and clarity of purpose.",
    properties: [
      "Amplifies energy and intentions",
      "Enhances clarity and focus",
      "Symbolizes strength and invincibility",
      "Brings purity of mind and spirit",
      "Strengthens relationships and commitment",
    ],
  },
  {
    month: 5,
    stone: "Emerald",
    meaning: "Love, rebirth, and wisdom. Emerald is the stone of the heart, promoting unconditional love, compassion, and spiritual growth.",
    properties: [
      "Opens and heals the heart chakra",
      "Enhances unconditional love and compassion",
      "Promotes wisdom and spiritual growth",
      "Supports fertility and new beginnings",
      "Brings harmony to relationships",
    ],
  },
  {
    month: 6,
    stone: "Pearl",
    meaning: "Purity, integrity, and emotional wisdom. Pearl emerges from adversity, symbolizing the beauty that comes from transforming challenges into wisdom.",
    properties: [
      "Promotes emotional balance and clarity",
      "Enhances personal integrity and truth",
      "Calms overactive emotions",
      "Connects to feminine energy and intuition",
      "Symbolizes the beauty of transformation",
    ],
  },
  {
    month: 7,
    stone: "Ruby",
    meaning: "Passion, protection, and prosperity. Ruby is a stone of fiery energy that ignites passion, vitality, and devotion.",
    properties: [
      "Ignites passion and life force energy",
      "Provides protective energy against harm",
      "Attracts prosperity and abundance",
      "Enhances courage and confidence",
      "Deepens love and commitment",
    ],
  },
  {
    month: 8,
    stone: "Peridot",
    meaning: "Light, healing, and renewal. Peridot is a stone of positive energy that clears away negativity and brings lightness of being.",
    properties: [
      "Clears negative energy and patterns",
      "Promotes emotional healing and release",
      "Brings lightness and joy",
      "Supports personal growth and renewal",
      "Enhances abundance and prosperity",
    ],
  },
  {
    month: 9,
    stone: "Sapphire",
    meaning: "Wisdom, royalty, and spiritual insight. Sapphire is a stone of wisdom and divine favor, enhancing mental clarity and spiritual attunement.",
    properties: [
      "Enhances wisdom and mental clarity",
      "Promotes spiritual insight and intuition",
      "Brings protection and divine favor",
      "Strengthens focus and discipline",
      "Supports truth and authenticity",
    ],
  },
  {
    month: 10,
    stone: "Opal",
    meaning: "Inspiration, creativity, and emotional expression. Opal is a stone of cosmic energy that amplifies emotions and enhances creative vision.",
    properties: [
      "Enhances creativity and artistic inspiration",
      "Amplifies emotions and passion",
      "Promotes spontaneity and joy",
      "Supports emotional expression and release",
      "Connects to cosmic and spiritual energy",
    ],
  },
  {
    month: 11,
    stone: "Topaz",
    meaning: "Strength, abundance, and manifestation. Topaz is a stone of manifesting intentions and attracting abundance into all areas of life.",
    properties: [
      "Manifests intentions and goals",
      "Attracts abundance and prosperity",
      "Enhances strength and resilience",
      "Promotes honesty and authenticity",
      "Brings joy and generosity",
    ],
  },
  {
    month: 12,
    stone: "Turquoise",
    meaning: "Protection, healing, and connection. Turquoise is a sacred stone that bridges Earth and sky, offering protection and spiritual grounding.",
    properties: [
      "Provides protective energy during travel",
      "Promotes healing of mind, body, and spirit",
      "Connects earthly and spiritual realms",
      "Enhances communication and truth",
      "Brings good fortune and friendship",
    ],
  },
];

export const BIRTHSTONE_BY_MONTH: Record<number, BirthstoneData> =
  Object.fromEntries(BIRTHSTONES.map((b) => [b.month, b]));

export const BIRTHSTONE_BY_NAME: Record<string, BirthstoneData> =
  Object.fromEntries(BIRTHSTONES.map((b) => [b.stone.toLowerCase(), b]));

export function findBirthstone(month: number): BirthstoneData {
  return BIRTHSTONE_BY_MONTH[month] ?? BIRTHSTONES[0];
}
