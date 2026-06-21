import type { SacredGeometry } from '@/types/cosmic';

export const SACRED_GEOMETRY: SacredGeometry[] = [
  {
    name: "Flower of Life",
    description: "An ancient geometric pattern composed of multiple evenly-spaced, overlapping circles arranged in a flower-like shape. It contains the blueprint of all creation and is found in temples, manuscripts, and sacred sites worldwide.",
    meaning: "The Flower of Life is one of the most fundamental sacred geometry patterns, believed to represent the cycle of creation and the interconnectedness of all life. It contains the patterns of the fabric of space-time itself and is considered a visual representation of the divine order of the universe.",
    meditationUse: "Visualize the Flower of Life expanding from your heart center, connecting you to all beings and all of creation. Use it as a focus for understanding your place in the cosmic web of existence. Meditate on the interlocking circles to experience the unity of all life.",
  },
  {
    name: "Metatron's Cube",
    description: "A complex geometric figure formed by 13 equal circles with lines connecting their centers. It contains all five Platonic solids (tetrahedron, cube, octahedron, dodecahedron, icosahedron) within its structure, representing the building blocks of all physical matter.",
    meaning: "Metatron's Cube is named after the Archangel Metatron, who is said to oversee the flow of energy in creation. It represents the geometry of the universe and the patterns through which energy manifests into form. It is a powerful symbol of protection, balance, and divine order.",
    meditationUse: "Visualize Metatron's Cube surrounding you in a sphere of light. Feel its geometric precision balancing your energy field and protecting your aura. Meditate on each of the Platonic solids within it to connect with the fundamental elements of existence.",
  },
  {
    name: "Sri Yantra",
    description: "An ancient Hindu geometric diagram composed of nine interlocking triangles radiating from a central point (bindu). Four triangles point upward (representing Shiva, the masculine) and five point downward (representing Shakti, the feminine), surrounded by concentric circles and lotus petals.",
    meaning: "The Sri Yantra is considered the queen of yantras and one of the most powerful symbols in spiritual traditions. It represents the cosmic creation process and the union of masculine and feminine energies. The central bindu represents the unmanifest source from which all creation emerges. It is used for wealth, prosperity, and spiritual awakening.",
    meditationUse: "Begin by focusing on the central bindu point. Gradually allow your awareness to expand through each layer of triangles and lotus petals, experiencing the unfolding of creation. Meditate on the balance of masculine and feminine energies within yourself. Use the Sri Yantra to align with abundance and divine purpose.",
  },
  {
    name: "Seed of Life",
    description: "A geometric figure composed of seven overlapping circles that form a flower-like pattern. It is the precursor to the Flower of Life and represents the seven days of creation in many spiritual traditions.",
    meaning: "The Seed of Life symbolizes the beginning of creation and the seven stages of growth. Each circle represents a day of creation and a fundamental aspect of existence. It holds the blueprint for all of life and represents the potential within every moment of beginning.",
    meditationUse: "Focus on the central circle as the source of your being. Allow your awareness to expand through each surrounding circle, connecting with the creative power of new beginnings. Use it to align with your creative purpose and the unfolding of your life's path.",
  },
  {
    name: "Tree of Life",
    description: "A diagram composed of ten interconnected spheres (sefirot) arranged in three pillars, connected by 22 paths. It is a central symbol in Kabbalistic tradition and represents the structure of creation, the human psyche, and the path of spiritual ascent.",
    meaning: "The Tree of Life is a map of consciousness and creation, showing how divine energy flows from the unmanifest source (Kether) through the spheres of creation to manifest in the physical world (Malkuth). Each sphere represents a quality of divine energy, and the paths represent the journey of spiritual development.",
    meditationUse: "Begin at Malkuth (Earth) at the base and visualize yourself ascending through each sphere to Kether (Crown) at the top. At each sphere, meditate on its quality — wisdom, understanding, beauty, strength, etc. — and how it manifests in your life. Use it as a map for spiritual development.",
  },
  {
    name: "Vesica Piscis",
    description: "A geometric shape formed by the intersection of two equal circles, where the center of each lies on the circumference of the other. It creates an almond-shaped lens at the intersection point.",
    meaning: "The Vesica Piscis is one of the most fundamental sacred geometry figures, representing the intersection of dualities — heaven and earth, spirit and matter, masculine and feminine. It is the womb of creation from which all other geometric forms emerge. In Christian art, it is used as a mandorla surrounding sacred figures.",
    meditationUse: "Visualize yourself at the center of the Vesica Piscis, at the intersection of two worlds. Meditate on the integration of opposites within yourself — your masculine and feminine, your spiritual and material nature. Use it as a gateway between realms during meditation.",
  },
  {
    name: "Golden Spiral",
    description: "A logarithmic spiral that grows outward by a factor of the golden ratio (Phi, approximately 1.618) with every quarter turn. It is found throughout nature in shells, galaxies, hurricanes, and the proportions of the human body.",
    meaning: "The Golden Spiral represents growth, evolution, and the unfolding of life in divine proportion. It is the pattern of organic expansion found throughout the natural world. It symbolizes the journey of the soul — always expanding, always returning to the center, but at a higher level. It represents the balance of structure and flow.",
    meditationUse: "Visualize yourself at the center of the spiral. As you follow its expansion outward, feel your consciousness expanding while remaining connected to your center. Meditate on the balance of expansion and contraction in your life. Use it to align with natural rhythms and flow.",
  },
  {
    name: "Torus",
    description: "A doughnut-shaped geometric form described as a vortex — energy flows in through one end, circulates through the center, and exits through the other end. It is the fundamental shape of energy fields in the universe, from atoms to galaxies to the human heart's electromagnetic field.",
    meaning: "The Torus is the geometric pattern of energy flow and circulation. It represents the continuous cycle of giving and receiving, expansion and contraction. It is the shape of the heart's electromagnetic field and is believed to be the pattern of the human energy field (aura). It symbolizes wholeness, balance, and the continuous flow of life energy.",
    meditationUse: "Visualize your energy field as a luminous torus surrounding your body. Energy flows in through your crown, circulates through your heart, and radiates outward. Meditate on the balanced flow of giving and receiving. Feel yourself as a self-contained universe of energy.",
  },
];

export const SACRED_GEOMETRY_BY_NAME: Record<string, SacredGeometry> =
  Object.fromEntries(SACRED_GEOMETRY.map((s) => [s.name.toLowerCase(), s]));
