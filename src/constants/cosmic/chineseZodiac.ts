// ============================================================
// COSMIC ORACLE — Chinese Zodiac Database
// ============================================================

import { ChineseZodiacAnimal, ChineseZodiacData, ChineseElement } from "@/types/cosmic";

// ============================================================
// ELEMENT MEANINGS
// ============================================================

export const ELEMENT_MEANINGS: Record<
  ChineseElement,
  {
    name: string;
    yinYang: "yang" | "yin";
    description: string;
    personalityInfluence: string;
    season: string;
    direction: string;
    color: string;
  }
> = {
  metal: {
    name: "Metal",
    yinYang: "yang",
    description:
      "Metal represents strength, structure, and determination. It governs the lungs and skin and is associated with autumn. Metal signs are resilient, organized, and value integrity above all.",
    personalityInfluence:
      "Bestows sharp intellect, strong willpower, and a no-nonsense attitude. Can make a person rigid or stubborn if unbalanced.",
    season: "Autumn",
    direction: "West",
    color: "White",
  },
  water: {
    name: "Water",
    yinYang: "yin",
    description:
      "Water represents wisdom, adaptability, and deep emotion. It governs the kidneys and is associated with winter. Water signs are intuitive, diplomatic, and flow around obstacles with ease.",
    personalityInfluence:
      "Enhances intuition, emotional depth, and persuasive communication. Can lead to over-sensitivity or elusiveness when out of balance.",
    season: "Winter",
    direction: "North",
    color: "Black",
  },
  wood: {
    name: "Wood",
    yinYang: "yang",
    description:
      "Wood represents growth, creativity, and expansion. It governs the liver and is associated with spring. Wood signs are visionary, generous, and constantly seeking new horizons.",
    personalityInfluence:
      "Fuels ambition, idealism, and a nurturing spirit. Can manifest as restlessness or overextension when excessive.",
    season: "Spring",
    direction: "East",
    color: "Green",
  },
  fire: {
    name: "Fire",
    yinYang: "yang",
    description:
      "Fire represents passion, energy, and transformation. It governs the heart and is associated with summer. Fire signs are charismatic, dynamic, and natural leaders.",
    personalityInfluence:
      "Ignites enthusiasm, courage, and spontaneous joy. Can lead to impulsiveness or burnout if not tempered.",
    season: "Summer",
    direction: "South",
    color: "Red",
  },
  earth: {
    name: "Earth",
    yinYang: "yin",
    description:
      "Earth represents stability, nourishment, and practicality. It governs the spleen and is associated with the transitional seasons. Earth signs are grounded, patient, and reliable.",
    personalityInfluence:
      "Provides steadiness, pragmatism, and a nurturing disposition. Can result in stubbornness or resistance to change when overemphasized.",
    season: "Late Summer",
    direction: "Center",
    color: "Yellow",
  },
};

// ============================================================
// CHINESE ZODIAC FULL DATA
// ============================================================

export const CHINESE_ZODIAC: Record<ChineseZodiacAnimal, ChineseZodiacData> = {
  rat: {
    animal: "rat",
    years: [
      1900, 1912, 1924, 1936, 1948, 1960, 1972, 1984, 1996, 2008, 2020, 2032,
      2044, 2056, 2068, 2080, 2092,
    ],
    element: "water",
    personality: [
      "Quick-witted and resourceful in any situation",
      "Charming and sociable with a magnetic personality",
      "Ambitious and driven to achieve material success",
      "Observant with excellent attention to detail",
      "Adaptable and able to thrive under pressure",
      "Generous with close friends and family",
      "Can be overly critical of others' shortcomings",
      "Tends to worry excessively about the future",
    ],
    compatibility: ["ox", "dragon", "monkey"],
    enemy: ["horse"],
    friends: ["ox", "dragon", "monkey"],
    luckyNumbers: [2, 3, 7, 8, 12, 21],
    luckyColors: ["blue", "gold", "green", "indigo"],
    luckyDirections: ["east", "southeast", "north"],
    careerPaths: [
      "Writing and journalism",
      "Research and analysis",
      "Entrepreneurship and business",
      "Sales and marketing",
      "Creative arts and design",
      "Finance and banking",
    ],
    traits:
      "The Rat is the first animal of the Chinese zodiac, symbolizing new beginnings and survival instincts. Rats are intelligent, adaptable, and resourceful with a natural charm that draws others to them. They possess sharp minds and keen observational skills, making them excellent problem-solvers. While ambitious and goal-oriented, they can sometimes be overly cautious or critical. Their social nature and generosity toward loved ones make them loyal friends, though they can be guarded with strangers until trust is established.",
    bestYears: [2020, 2024, 2028, 2032, 2036],
    challengingYears: [2022, 2026, 2030, 2034, 2038],
  },

  ox: {
    animal: "ox",
    years: [
      1901, 1913, 1925, 1937, 1949, 1961, 1973, 1985, 1997, 2009, 2021, 2033,
      2045, 2057, 2069, 2081, 2093,
    ],
    element: "earth",
    personality: [
      "Diligent and hardworking with remarkable endurance",
      "Honest and trustworthy in all dealings",
      "Patient and methodical in approaching goals",
      "Strong sense of responsibility and duty",
      "Reserved but deeply caring beneath the surface",
      "Traditional and respectful of established systems",
      "Can be stubborn and resistant to change",
      "Tends to hold grudges when wronged",
    ],
    compatibility: ["rat", "snake", "rooster"],
    enemy: ["goat"],
    friends: ["rat", "snake", "rooster"],
    luckyNumbers: [1, 4, 7, 9, 13, 19],
    luckyColors: ["green", "red", "purple", "brown"],
    luckyDirections: ["north", "south", "east"],
    careerPaths: [
      "Engineering and construction",
      "Agriculture and farming",
      "Medicine and healthcare",
      "Education and teaching",
      "Military and law enforcement",
      "Finance and accounting",
    ],
    traits:
      "The Ox is the second animal of the Chinese zodiac, symbolizing diligence, dependability, and strength. Known for their unwavering work ethic and methodical approach, Oxen are the bedrock of any team or family. They are patient, honest, and value tradition and stability above all else. While they can appear reserved or stubborn, their quiet determination allows them to overcome obstacles that would stop others. They are deeply loyal to those they love and take their responsibilities seriously, making them reliable partners and providers.",
    bestYears: [2021, 2025, 2029, 2033, 2037],
    challengingYears: [2023, 2027, 2031, 2035, 2039],
  },

  tiger: {
    animal: "tiger",
    years: [
      1902, 1914, 1926, 1938, 1950, 1962, 1974, 1986, 1998, 2010, 2022, 2034,
      2046, 2058, 2070, 2082, 2094,
    ],
    element: "wood",
    personality: [
      "Bold and courageous with a fearless spirit",
      "Charismatic and naturally commanding attention",
      "Competitive and driven to be the best",
      "Generous and protective of loved ones",
      "Adventurous and always seeking new challenges",
      "Optimistic with an infectious enthusiasm",
      "Can be impulsive and prone to taking risks",
      "Tends to be restless when confined or bored",
    ],
    compatibility: ["dog", "horse", "pig"],
    enemy: ["monkey"],
    friends: ["dog", "horse", "pig"],
    luckyNumbers: [1, 3, 4, 7, 11, 14],
    luckyColors: ["blue", "gray", "orange", "white"],
    luckyDirections: ["east", "south", "southeast"],
    careerPaths: [
      "Military and defense",
      "Professional sports and athletics",
      "Management and executive leadership",
      "Entrepreneurship and startups",
      "Entertainment and performing arts",
      "Exploration and adventure tourism",
    ],
    traits:
      "The Tiger is the third animal of the Chinese zodiac, symbolizing courage, confidence, and leadership. Tigers are natural-born leaders with a magnetic presence that commands respect. They are fiercely independent, competitive, and thrive on challenge and adventure. Their bold nature pushes them to take risks others would avoid, often leading to great rewards. While generous and protective of their inner circle, they can be territorial and struggle with authority. Tigers are most fulfilled when leading others toward ambitious goals.",
    bestYears: [2022, 2026, 2030, 2034, 2038],
    challengingYears: [2024, 2028, 2032, 2036, 2040],
  },
  rabbit: {
    animal: "rabbit",
    years: [1903, 1915, 1927, 1939, 1951, 1963, 1975, 1987, 1999, 2011, 2023, 2035, 2047, 2059, 2071, 2083, 2095],
    element: "wood",
    personality: ["Gentle and quiet", "Elegant and refined", "Kind and compassionate", "Artistic and creative", "Cautious but determined"],
    compatibility: ["goat", "dog", "pig"],
    enemy: ["rooster"],
    friends: ["goat", "dog", "pig"],
    luckyNumbers: [3, 6, 9, 15, 27],
    luckyColors: ["red", "pink", "purple", "blue"],
    luckyDirections: ["east", "south", "northwest"],
    careerPaths: ["Art and design", "Education", "Healthcare", "Social work", "Diplomacy"],
    traits: "The Rabbit is the fourth animal of the Chinese zodiac, symbolizing longevity, grace, and good fortune. Those born in the Year of the Rabbit are gentle, quiet, and elegant. They possess refined tastes and a deep appreciation for beauty and art.",
    bestYears: [2023, 2027, 2031, 2035, 2039],
    challengingYears: [2025, 2029, 2033, 2037, 2041],
  },
  dragon: {
    animal: "dragon",
    years: [1904, 1916, 1928, 1940, 1952, 1964, 1976, 1988, 2000, 2012, 2024, 2036, 2048, 2060, 2072, 2084, 2096],
    element: "earth",
    personality: ["Confident and ambitious", "Charismatic and inspiring", "Innovative and visionary", "Passionate and determined", "Generous and noble"],
    compatibility: ["rat", "monkey", "rooster"],
    enemy: ["dog"],
    friends: ["rat", "monkey", "rooster"],
    luckyNumbers: [1, 6, 7, 11, 21],
    luckyColors: ["gold", "silver", "yellow", "white"],
    luckyDirections: ["east", "north", "south"],
    careerPaths: ["Entrepreneurship", "Leadership", "Technology", "Entertainment", "Finance"],
    traits: "The Dragon is the fifth animal of the Chinese zodiac, symbolizing power, honor, and success. Dragons are confident, ambitious, and natural leaders who inspire others with their vision and charisma.",
    bestYears: [2024, 2028, 2032, 2036, 2040],
    challengingYears: [2026, 2030, 2034, 2038, 2042],
  },
  snake: {
    animal: "snake",
    years: [1905, 1917, 1929, 1941, 1953, 1965, 1977, 1989, 2001, 2013, 2025, 2037, 2049, 2061, 2073, 2085, 2097],
    element: "fire",
    personality: ["Wise and intuitive", "Mysterious and elegant", "Deeply philosophical", "Determined and resilient", "Charming and persuasive"],
    compatibility: ["ox", "rooster", "monkey"],
    enemy: ["pig"],
    friends: ["ox", "rooster", "monkey"],
    luckyNumbers: [2, 8, 9, 13, 22],
    luckyColors: ["red", "black", "dark green", "gold"],
    luckyDirections: ["south", "southeast", "northeast"],
    careerPaths: ["Research", "Philosophy", "Psychology", "Finance", "Strategic consulting"],
    traits: "The Snake is the sixth animal of the Chinese zodiac, symbolizing wisdom, intuition, and grace. Snakes are deep thinkers with a mysterious aura and a natural talent for strategy and planning.",
    bestYears: [2025, 2029, 2033, 2037, 2041],
    challengingYears: [2027, 2031, 2035, 2039, 2043],
  },
  horse: {
    animal: "horse",
    years: [1906, 1918, 1930, 1942, 1954, 1966, 1978, 1990, 2002, 2014, 2026, 2038, 2050, 2062, 2074, 2086, 2098],
    element: "fire",
    personality: ["Energetic and free-spirited", "Adventurous and independent", "Hardworking and dedicated", "Warm-hearted and friendly", "Impatient and restless"],
    compatibility: ["tiger", "goat", "dog"],
    enemy: ["rat"],
    friends: ["tiger", "goat", "dog"],
    luckyNumbers: [3, 7, 8, 13, 23],
    luckyColors: ["green", "red", "yellow", "blue"],
    luckyDirections: ["south", "east", "northwest"],
    careerPaths: ["Sports and athletics", "Transportation", "Sales", "Entertainment", "Journalism"],
    traits: "The Horse is the seventh animal of the Chinese zodiac, symbolizing freedom, energy, and adventure. Horses are independent, enthusiastic, and love to explore the world around them.",
    bestYears: [2026, 2030, 2034, 2038, 2042],
    challengingYears: [2028, 2032, 2036, 2040, 2044],
  },
  goat: {
    animal: "goat",
    years: [1907, 1919, 1931, 1943, 1955, 1967, 1979, 1991, 2003, 2015, 2027, 2039, 2051, 2063, 2075, 2087, 2099],
    element: "earth",
    personality: ["Creative and artistic", "Gentle and compassionate", "Peaceful and calm", "Resilient and resourceful", "Intuitive and sensitive"],
    compatibility: ["rabbit", "horse", "pig"],
    enemy: ["ox"],
    friends: ["rabbit", "horse", "pig"],
    luckyNumbers: [2, 7, 8, 12, 23],
    luckyColors: ["green", "brown", "purple", "pink"],
    luckyDirections: ["south", "east", "northeast"],
    careerPaths: ["Arts and design", "Music and performance", "Education", "Healthcare", "Landscape design"],
    traits: "The Goat is the eighth animal of the Chinese zodiac, symbolizing creativity, gentleness, and resilience. Goats are artistic, compassionate, and possess a quiet strength that helps them overcome obstacles.",
    bestYears: [2027, 2031, 2035, 2039, 2043],
    challengingYears: [2029, 2033, 2037, 2041, 2045],
  },
  monkey: {
    animal: "monkey",
    years: [1908, 1920, 1932, 1944, 1956, 1968, 1980, 1992, 2004, 2016, 2028, 2040, 2052, 2064, 2076, 2088, 2100],
    element: "metal",
    personality: ["Witty and clever", "Innovative and inventive", "Energetic and lively", "Charismatic and charming", "Curious and resourceful"],
    compatibility: ["rat", "dragon", "snake"],
    enemy: ["tiger"],
    friends: ["rat", "dragon", "snake"],
    luckyNumbers: [1, 7, 8, 12, 21],
    luckyColors: ["white", "gold", "blue", "green"],
    luckyDirections: ["north", "northwest", "west"],
    careerPaths: ["Technology and innovation", "Entertainment", "Sales and marketing", "Entrepreneurship", "Science"],
    traits: "The Monkey is the ninth animal of the Chinese zodiac, symbolizing intelligence, creativity, and versatility. Monkeys are clever problem-solvers with a playful spirit and boundless curiosity.",
    bestYears: [2028, 2032, 2036, 2040, 2044],
    challengingYears: [2030, 2034, 2038, 2042, 2046],
  },
  rooster: {
    animal: "rooster",
    years: [1909, 1921, 1933, 1945, 1957, 1969, 1981, 1993, 2005, 2017, 2029, 2041, 2053, 2065, 2077, 2089, 2101],
    element: "metal",
    personality: ["Confident and proud", "Honest and direct", "Hardworking and punctual", "Observant and detail-oriented", "Courageous and bold"],
    compatibility: ["ox", "dragon", "snake"],
    enemy: ["rabbit"],
    friends: ["ox", "dragon", "snake"],
    luckyNumbers: [5, 7, 8, 13, 22],
    luckyColors: ["gold", "red", "orange", "yellow"],
    luckyDirections: ["south", "southeast", "northeast"],
    careerPaths: ["Management", "Journalism", "Public speaking", "Sales", "Military"],
    traits: "The Rooster is the tenth animal of the Chinese zodiac, symbolizing punctuality, honesty, and bravery. Roosters are confident, hardworking, and never afraid to speak their minds.",
    bestYears: [2029, 2033, 2037, 2041, 2045],
    challengingYears: [2031, 2035, 2039, 2043, 2047],
  },
  dog: {
    animal: "dog",
    years: [1910, 1922, 1934, 1946, 1958, 1970, 1982, 1994, 2006, 2018, 2030, 2042, 2054, 2066, 2078, 2090, 2102],
    element: "earth",
    personality: ["Loyal and faithful", "Honest and trustworthy", "Protective and brave", "Intelligent and intuitive", "Kind-hearted and compassionate"],
    compatibility: ["tiger", "rabbit", "horse"],
    enemy: ["dragon"],
    friends: ["tiger", "rabbit", "horse"],
    luckyNumbers: [3, 4, 8, 9, 18],
    luckyColors: ["green", "red", "purple", "brown"],
    luckyDirections: ["east", "south", "northwest"],
    careerPaths: ["Law enforcement", "Social work", "Education", "Healthcare", "Security"],
    traits: "The Dog is the eleventh animal of the Chinese zodiac, symbolizing loyalty, honesty, and justice. Dogs are faithful, protective, and always stand up for what is right.",
    bestYears: [2030, 2034, 2038, 2042, 2046],
    challengingYears: [2032, 2036, 2040, 2044, 2048],
  },
  pig: {
    animal: "pig",
    years: [1911, 1923, 1935, 1947, 1959, 1971, 1983, 1995, 2007, 2019, 2031, 2043, 2055, 2067, 2079, 2091, 2103],
    element: "water",
    personality: ["Generous and kind-hearted", "Honest and patient", "Hardworking and diligent", "Compassionate and understanding", "Enjoy life's pleasures"],
    compatibility: ["rabbit", "goat", "tiger"],
    enemy: ["snake"],
    friends: ["rabbit", "goat", "tiger"],
    luckyNumbers: [2, 5, 8, 12, 21],
    luckyColors: ["yellow", "gray", "brown", "gold"],
    luckyDirections: ["south", "east", "northeast"],
    careerPaths: ["Hospitality", "Entertainment", "Social work", "Arts and crafts", "Philanthropy"],
    traits: "The Pig is the twelfth animal of the Chinese zodiac, symbolizing generosity, compassion, and diligence. Pigs are kind-hearted, honest, and enjoy the simple pleasures of life.",
    bestYears: [2031, 2035, 2039, 2043, 2047],
    challengingYears: [2033, 2037, 2041, 2045, 2049],
  },
};
