// ============================================================
// COSMIC ORACLE — Complete 78-Card Tarot Database
// ============================================================

import { TarotCard } from "@/types/cosmic";

export const TAROT_CARDS: TarotCard[] = [
  // ============================================================
  // MAJOR ARCANA — Cards 1–22
  // ============================================================

  // --- 1: The Fool ---
  {
    id: 1,
    name: "The Fool",
    arcana: "major",
    meaning:
      "New beginnings, innocence, and spontaneity. The Fool stands at the edge of a cliff, ready to leap into the unknown with pure trust and optimism. This card represents the beginning of a journey, a leap of faith, and the beautiful naivety of fresh starts.",
    reversedMeaning:
      "Recklessness, risk-taking without forethought, and naivety that leads to folly. The reversed Fool warns against jumping without looking, taking unnecessary risks, or repeating the same mistakes.",
    keywords: ["beginnings", "innocence", "spontaneity", "adventure", "faith"],
    advice:
      "Take the leap. The universe will catch you. Trust in the journey ahead and embrace the unknown with an open heart.",
    interpretation:
      "The Fool invites you to start something new with childlike wonder. This is a card of pure potential — you stand at the precipice of a grand adventure. Trust that you have everything you need within you, even if the path ahead is unclear.",
  },

  // --- 2: The Magician ---
  {
    id: 2,
    name: "The Magician",
    arcana: "major",
    meaning:
      "Willpower, desire, and resourcefulness. The Magician stands with all four suits of the minor arcana on his table, channeling energy from above to below. This card signifies that you have all the tools you need to succeed.",
    reversedMeaning:
      "Manipulation, untapped talents, and trickery. The reversed Magician warns of misuse of power, deception, or a failure to recognize your own gifts.",
    keywords: ["willpower", "skill", "resourcefulness", "manifestation", "power"],
    advice:
      "You have everything you need. Focus your intention and channel your energy toward your goal with confidence.",
    interpretation:
      "The Magician is the master manifester. You possess all the tools required to bring your vision into reality. Align your mind, body, and spirit with your intention, and watch the universe respond to your focused will.",
  },

  // --- 3: The High Priestess ---
  {
    id: 3,
    name: "The High Priestess",
    arcana: "major",
    meaning:
      "Intuition, mystery, and the subconscious mind. The High Priestess sits between the pillars of duality, holding the scroll of sacred knowledge. She represents the hidden wisdom that lies beneath the surface of consciousness.",
    reversedMeaning:
      "Secrets withheld, intuitive blocks, and disconnection from inner wisdom. The reversed High Priestess suggests ignoring your gut feelings or being out of touch with your deeper self.",
    keywords: ["intuition", "mystery", "subconscious", "inner knowledge", "stillness"],
    advice:
      "Be still and listen. The answers you seek are within. Trust your intuition over external validation.",
    interpretation:
      "The High Priestess calls you to go within. The knowledge you seek is not found in the outer world but in the quiet depths of your own soul. Still your mind and listen to the whispers of your intuition.",
  },

  // --- 4: The Empress ---
  {
    id: 4,
    name: "The Empress",
    arcana: "major",
    meaning:
      "Femininity, beauty, nature, and abundance. The Empress sits in a lush garden, surrounded by flowing water and fertile fields. She represents nurturing, sensuality, and the creative force of the universe.",
    reversedMeaning:
      "Creative block, dependence on others, and neglect of self-care. The reversed Empress warns of losing touch with your nurturing side or smothering others with care.",
    keywords: ["abundance", "nurturing", "beauty", "creativity", "nature"],
    advice:
      "Nurture yourself and your creations. Allow abundance to flow through you and surround yourself with beauty.",
    interpretation:
      "The Empress brings a message of abundance and creativity. You are being called to nurture your ideas and yourself. Connect with nature, embrace your sensuality, and allow life's beauty to flourish through you.",
  },

  // --- 5: The Emperor ---
  {
    id: 5,
    name: "The Emperor",
    arcana: "major",
    meaning:
      "Authority, structure, and stability. The Emperor sits upon his throne, a symbol of worldly power and dominion. He represents order, discipline, and the fatherly principle of protection and provision.",
    reversedMeaning:
      "Tyranny, rigidity, and excessive control. The reversed Emperor warns of authoritarian behavior, lack of discipline, or misuse of power.",
    keywords: ["authority", "structure", "discipline", "stability", "leadership"],
    advice:
      "Take command of your life with discipline and structure. Establish clear boundaries and lead with integrity.",
    interpretation:
      "The Emperor calls you to bring order to chaos. Through discipline and structure, you build the foundation for lasting success. Take responsibility for your domain and lead with both strength and fairness.",
  },

  // --- 6: The Hierophant ---
  {
    id: 6,
    name: "The Hierophant",
    arcana: "major",
    meaning:
      "Tradition, spiritual wisdom, and conformity. The Hierophant stands as a bridge between the divine and the human, dispensing sacred knowledge through established institutions and teachings.",
    reversedMeaning:
      "Rebellion, non-conformity, and questioning the status quo. The reversed Hierophant suggests breaking free from outdated beliefs or challenging authority.",
    keywords: ["tradition", "wisdom", "conformity", "spiritual guidance", "mentorship"],
    advice:
      "Seek wisdom from established sources. Honor tradition but remain open to your own direct experience of truth.",
    interpretation:
      "The Hierophant represents the wisdom of tradition and the value of learning from those who came before you. Whether through formal education, spiritual study, or mentorship, there is power in shared knowledge and ritual.",
  },

  // --- 7: The Lovers ---
  {
    id: 7,
    name: "The Lovers",
    arcana: "major",
    meaning:
      "Love, harmony, and alignment of values. The Lovers depict a sacred union, representing not only romantic partnership but also the integration of opposing forces within oneself.",
    reversedMeaning:
      "Disharmony, imbalance, and misaligned values. The reversed Lovers warns of relationship challenges, broken trust, or a failure to honor your authentic self.",
    keywords: ["love", "harmony", "relationships", "values", "union"],
    advice:
      "Follow your heart, but stay true to your values. Real love honors both your truth and the truth of others.",
    interpretation:
      "The Lovers card speaks to the power of choice and alignment. A significant relationship or decision is before you. To walk through this door, you must be true to your deepest values and choose from love, not fear.",
  },

  // --- 8: The Chariot ---
  {
    id: 8,
    name: "The Chariot",
    arcana: "major",
    meaning:
      "Willpower, determination, and victory. The Chariot depicts a warrior riding forth in a chariot pulled by two sphinxes, representing the harnessing of opposing forces to achieve a goal.",
    reversedMeaning:
      "Lack of direction, aggression, and loss of control. The reversed Chariot warns of scattered energy, forcing outcomes, or being overpowered by circumstances.",
    keywords: ["willpower", "determination", "victory", "focus", "control"],
    advice:
      "Stay focused and determined. Harness your inner opposites and charge forward with unwavering will.",
    interpretation:
      "The Chariot is a card of triumph through sheer will. You are being called to take command of your life and direct your energy with single-minded focus. Victory belongs to those who refuse to give up.",
  },

  // --- 9: Strength ---
  {
    id: 9,
    name: "Strength",
    arcana: "major",
    meaning:
      "Courage, inner strength, and compassion. A woman gently closes the jaws of a lion, demonstrating that true strength comes not from force but from patience, kindness, and inner fortitude.",
    reversedMeaning:
      "Self-doubt, weakness, and raw emotion. The reversed Strength suggests insecurity, lack of self-control, or a failure to face challenges with grace.",
    keywords: ["courage", "inner strength", "compassion", "patience", "resilience"],
    advice:
      "True power is gentle. Face your challenges with patience, compassion, and quiet confidence.",
    interpretation:
      "Strength reminds you that real power is not loud or aggressive. It is the quiet courage to face your fears, the patience to tame your inner beasts, and the compassion to meet challenges with a steady heart.",
  },

  // --- 10: The Hermit ---
  {
    id: 10,
    name: "The Hermit",
    arcana: "major",
    meaning:
      "Introspection, solitude, and inner guidance. The Hermit stands atop a mountain, holding a lantern that illuminates the path. This card signifies a period of withdrawal and soul-searching.",
    reversedMeaning:
      "Isolation, loneliness, and withdrawal from the world. The reversed Hermit warns of excessive solitude, fear of connection, or refusing to seek help.",
    keywords: ["introspection", "solitude", "wisdom", "guidance", "contemplation"],
    advice:
      "Turn inward and seek the answers within. Solitude is not loneliness — it is an opportunity to find your true self.",
    interpretation:
      "The Hermit calls you to a period of quiet reflection. By withdrawing from the noise of the world, you can hear the voice of your own soul. The light you seek is already within you — trust its guidance.",
  },

  // --- 11: Wheel of Fortune ---
  {
    id: 11,
    name: "Wheel of Fortune",
    arcana: "major",
    meaning:
      "Change, cycles, and destiny. The Wheel of Fortune turns endlessly, reminding us that life is in constant motion — what goes up must come down, and what falls will rise again.",
    reversedMeaning:
      "Bad luck, resistance to change, and broken cycles. The reversed Wheel of Fortune suggests feeling stuck in a negative pattern or resisting the natural flow of life.",
    keywords: ["change", "cycles", "destiny", "luck", "turning point"],
    advice:
      "Embrace the cycles of life. What goes around comes around — trust the turning of the wheel.",
    interpretation:
      "The Wheel of Fortune signals a turning point. Life's cycles are in motion, and change is inevitable. Rather than resisting, surrender to the flow. Remember that every low is followed by a rise, and every peak eventually descends.",
  },

  // --- 12: Justice ---
  {
    id: 12,
    name: "Justice",
    arcana: "major",
    meaning:
      "Fairness, truth, and cause and effect. Justice sits with scales and sword, weighing the truth of every situation. This card represents accountability, legal matters, and the law of karma.",
    reversedMeaning:
      "Injustice, dishonesty, and lack of accountability. The reversed Justice warns of unfairness, avoiding responsibility, or ignoring the truth.",
    keywords: ["justice", "truth", "fairness", "karma", "accountability"],
    advice:
      "Seek the truth and stand by it. What you put out into the universe will be returned to you.",
    interpretation:
      "Justice calls you to be honest and accountable. The truth will prevail, and every action has consequences. Make decisions with integrity, knowing that the universe seeks balance in all things.",
  },

  // --- 13: The Hanged Man ---
  {
    id: 13,
    name: "The Hanged Man",
    arcana: "major",
    meaning:
      "Sacrifice, surrender, and new perspectives. The Hanged Man hangs upside down from a tree, seeing the world from an entirely different angle. This card invites you to pause, sacrifice, and shift your viewpoint.",
    reversedMeaning:
      "Stalling, resistance to sacrifice, and refusal to let go. The reversed Hanged Man suggests clinging to the old way or refusing to make needed changes.",
    keywords: ["surrender", "sacrifice", "new perspective", "pause", "letting go"],
    advice:
      "Stop struggling. Sometimes the most powerful action is no action at all. Surrender and see things differently.",
    interpretation:
      "The Hanged Man asks you to release control and surrender to the moment. By letting go of your need to force outcomes, you gain a fresh perspective. What appears as a sacrifice now is actually a doorway to enlightenment.",
  },

  // --- 14: Death ---
  {
    id: 14,
    name: "Death",
    arcana: "major",
    meaning:
      "Transformation, endings, and new beginnings. Death is the most misunderstood card in the tarot — it rarely signifies physical death. Instead, it represents profound transformation and the necessary end of one chapter so another can begin.",
    reversedMeaning:
      "Resistance to change, stagnation, and fear of endings. The reversed Death warns of clinging to what must end, preventing new growth from entering your life.",
    keywords: ["transformation", "endings", "rebirth", "letting go", "transition"],
    advice:
      "What is ending is making way for something new. Release the old with gratitude and trust the process of rebirth.",
    interpretation:
      "Death heralds a major transformation. Something in your life is ending — a relationship, a career, a belief system. Honor what has been, but do not cling to it. Only by releasing the old can you make space for the new life waiting to be born.",
  },

  // --- 15: Temperance ---
  {
    id: 15,
    name: "Temperance",
    arcana: "major",
    meaning:
      "Balance, moderation, and patience. Temperance depicts an angel blending two cups of water, representing the harmonious fusion of opposing forces. This card is about finding the middle path.",
    reversedMeaning:
      "Imbalance, excess, and lack of patience. The reversed Temperance warns of overindulgence, recklessness, or a failure to find harmony.",
    keywords: ["balance", "moderation", "patience", "harmony", "healing"],
    advice:
      "Find the middle way. Blend opposing forces in your life with patience and grace.",
    interpretation:
      "Temperance teaches the art of balance. You are being called to moderate your extremes and find a harmonious rhythm. Patience is your ally — trust that the slow, steady path leads to lasting fulfillment.",
  },

  // --- 16: The Devil ---
  {
    id: 16,
    name: "The Devil",
    arcana: "major",
    meaning:
      "Bondage, materialism, and shadow self. The Devil represents the chains we create for ourselves — addiction, materialism, fear, and unhealthy attachments. It calls you to examine what enslaves you.",
    reversedMeaning:
      "Freedom, release, and reclaiming power. The reversed Devil signals a breakthrough — you are ready to break free from unhealthy patterns and reclaim your sovereignty.",
    keywords: ["shadow", "attachment", "materialism", "addiction", "bondage"],
    advice:
      "Face your shadows. The chains that bind you are of your own making — you have the power to break them.",
    interpretation:
      "The Devil reveals the areas where you have given away your power. Whether through addiction, material obsession, or toxic relationships, you are being called to recognize your chains and remember that you hold the key to your own liberation.",
  },

  // --- 17: The Tower ---
  {
    id: 17,
    name: "The Tower",
    arcana: "major",
    meaning:
      "Sudden upheaval, chaos, and revelation. Lightning strikes the tower, sending figures plunging into the abyss. This card represents the sudden collapse of false structures and the painful but necessary awakening that follows.",
    reversedMeaning:
      "Delayed disaster, resisting change, and fear of upheaval. The reversed Tower suggests trying to avoid an inevitable collapse or prolonging a painful situation.",
    keywords: ["upheaval", "revelation", "sudden change", "crisis", "awakening"],
    advice:
      "What crumbles was never meant to stand. Let the old structures fall — something truer will rise in their place.",
    interpretation:
      "The Tower brings sudden, shocking change. A foundation you thought was solid is collapsing. Though painful, this destruction is necessary — it clears away illusions and false structures, making room for a more authentic foundation.",
  },

  // --- 18: The Star ---
  {
    id: 18,
    name: "The Star",
    arcana: "major",
    meaning:
      "Hope, faith, and spiritual renewal. The Star depicts a woman pouring water onto the earth and into a pool, surrounded by seven shining stars. This card brings a message of healing, inspiration, and calm after the storm.",
    reversedMeaning:
      "Hopelessness, despair, and lack of faith. The reversed Star suggests a loss of direction, discouragement, or difficulty trusting the universe.",
    keywords: ["hope", "faith", "renewal", "healing", "inspiration"],
    advice:
      "Have faith. The universe is guiding you toward healing and renewal. Trust in the light ahead.",
    interpretation:
      "The Star is a beautiful card of hope and healing after a period of turmoil. The storm has passed, and you are being guided toward peace and renewal. Connect with your inner light and trust that the universe is leading you home.",
  },

  // --- 19: The Moon ---
  {
    id: 19,
    name: "The Moon",
    arcana: "major",
    meaning:
      "Illusion, fear, and the subconscious. The Moon reveals a path illuminated only by moonlight, with a wolf and a dog howling at the celestial body. This card warns of hidden truths, illusions, and the shadows of the mind.",
    reversedMeaning:
      "Clarity, release of fear, and truth revealed. The reversed Moon signals that confusion is lifting, fears are being faced, and hidden truths are coming to light.",
    keywords: ["illusion", "fear", "subconscious", "mystery", "intuition"],
    advice:
      "Not everything is as it seems. Trust your intuition to guide you through the darkness and reveal hidden truths.",
    interpretation:
      "The Moon invites you to navigate the realm of the subconscious. Fears and illusions may cloud your vision, but your intuition is the lantern that will guide you through. Look beyond the surface — deeper truths await your discovery.",
  },

  // --- 20: The Sun ---
  {
    id: 20,
    name: "The Sun",
    arcana: "major",
    meaning:
      "Joy, success, and vitality. The Sun is one of the most positive cards in the tarot. A bright sun shines on a child riding a white horse, symbolizing happiness, achievement, and the pure joy of being alive.",
    reversedMeaning:
      "Temporary sadness, lack of enthusiasm, and diminished success. The reversed Sun suggests a cloud over your joy — temporary delays that dim but do not extinguish your light.",
    keywords: ["joy", "success", "vitality", "celebration", "positivity"],
    advice:
      "Celebrate your success and bask in the warmth of this moment. You have earned this joy.",
    interpretation:
      "The Sun brings radiant energy and success. This is a time of celebration, vitality, and pure joy. Your light is shining brightly, and the universe is rewarding your efforts. Enjoy this moment of triumph and let your spirit glow.",
  },

  // --- 21: Judgement ---
  {
    id: 21,
    name: "Judgement",
    arcana: "major",
    meaning:
      "Reflection, reckoning, and inner calling. Judgement depicts angels blowing trumpets as the dead rise from their graves. This card represents a spiritual awakening, a moment of reckoning, and the call to live your highest purpose.",
    reversedMeaning:
      "Self-doubt, refusal of self-evaluation, and ignoring the call. The reversed Judgement suggests avoiding necessary self-reflection or rejecting a spiritual calling.",
    keywords: ["judgement", "awakening", "reckoning", "calling", "rebirth"],
    advice:
      "Answer the call. Reflect on your life with honesty and rise to meet your higher purpose.",
    interpretation:
      "Judgement calls you to a moment of profound self-evaluation. The past is being reviewed, and you are being called to account for your choices. This is not about punishment — it is about awakening to your true purpose and answering the call of your soul.",
  },

  // --- 22: The World ---
  {
    id: 22,
    name: "The World",
    arcana: "major",
    meaning:
      "Completion, accomplishment, and wholeness. The World depicts a dancer surrounded by a wreath, symbolizing the successful completion of a major life cycle. This card represents fulfillment, integration, and cosmic unity.",
    reversedMeaning:
      "Incompletion, delays, and stagnation. The reversed World suggests unfinished business, missed deadlines, or feeling stuck before reaching the finish line.",
    keywords: ["completion", "accomplishment", "wholeness", "travel", "fulfillment"],
    advice:
      "You have completed a major cycle. Celebrate your achievement and prepare for the next grand adventure.",
    interpretation:
      "The World marks the successful completion of a significant chapter in your life. You have integrated the lessons of the journey and arrived at a place of wholeness. Celebrate your achievement — you have earned this moment of fulfillment.",
  },

  // ============================================================
  // MINOR ARCANA — WANDS (Creativity, Action, Energy)
  // Cards 23–36
  // ============================================================

  // --- 23: Ace of Wands ---
  {
    id: 23,
    name: "Ace of Wands",
    arcana: "minor",
    suit: "wands",
    number: 1,
    meaning:
      "A spark of inspiration, new creative energy, and the beginning of an exciting venture. The Ace of Wands represents pure creative potential — the spark that ignites passion and purpose.",
    reversedMeaning:
      "Delays in starting, lack of motivation, and creative blocks. The reversed Ace warns of missed opportunities or failing to act on inspiration.",
    keywords: ["inspiration", "new beginning", "creativity", "passion", "potential"],
    advice:
      "A bold new idea is seeking to be born through you. Seize the spark and act on your inspiration.",
    interpretation:
      "The Ace of Wands brings a burst of creative fire into your life. A new passion, idea, or venture is ready to be born. This is pure potential — what you choose to create with this energy is entirely up to you.",
  },

  // --- 24: Two of Wands ---
  {
    id: 24,
    name: "Two of Wands",
    arcana: "minor",
    suit: "wands",
    number: 2,
    meaning:
      "Planning, making decisions, and looking toward the future. The Two of Wands depicts a figure holding a globe, surveying the horizon and contemplating the path ahead.",
    reversedMeaning:
      "Fear of the unknown, poor planning, and lack of vision. The reversed Two warns of indecision, unrealistic goals, or failing to plan.",
    keywords: ["planning", "future", "decision", "vision", "discovery"],
    advice:
      "Look ahead and make your plans. The world is waiting for you — step forward with courage and vision.",
    interpretation:
      "The Two of Wands calls you to expand your horizons. You have outgrown your current situation and are being drawn toward something greater. Make your plans, set your intentions, and prepare to explore new territories.",
  },

  // --- 25: Three of Wands ---
  {
    id: 25,
    name: "Three of Wands",
    arcana: "minor",
    suit: "wands",
    number: 3,
    meaning:
      "Expansion, foresight, and progress. The Three of Wands shows a figure watching ships sail toward the horizon, indicating that your plans are coming to fruition and your horizons are expanding.",
    reversedMeaning:
      "Obstacles, delays, and frustration with progress. The reversed Three warns of setbacks, impatience, or the need to revise your plans.",
    keywords: ["expansion", "progress", "foresight", "growth", "adventure"],
    advice:
      "Your plans are taking shape. Keep your vision clear and trust that the seeds you have planted will bear fruit.",
    interpretation:
      "The Three of Wands signals that your efforts are beginning to pay off. The ships you set sailing are returning with bounty. Continue to think big and trust that your long-term vision is unfolding as it should.",
  },

  // --- 26: Four of Wands ---
  {
    id: 26,
    name: "Four of Wands",
    arcana: "minor",
    suit: "wands",
    number: 4,
    meaning:
      "Celebration, harmony, and homecoming. The Four of Wands depicts a festive wreath and a joyful gathering, symbolizing stability, belonging, and the joy of shared success.",
    reversedMeaning:
      "Lack of harmony, cancelled celebrations, and instability at home. The reversed Four warns of conflict, feeling unwelcome, or disruptions in family life.",
    keywords: ["celebration", "harmony", "home", "community", "stability"],
    advice:
      "Celebrate your blessings and honor the community that supports you. You are exactly where you belong.",
    interpretation:
      "The Four of Wands brings a time of joy and celebration. You have built a strong foundation, and now it is time to enjoy the fruits of your labor with loved ones. This is a card of gratitude, community, and the warmth of home.",
  },

  // --- 27: Five of Wands ---
  {
    id: 27,
    name: "Five of Wands",
    arcana: "minor",
    suit: "wands",
    number: 5,
    meaning:
      "Competition, conflict, and challenge. The Five of Wands shows five figures wielding wands in a chaotic struggle, representing rivalry, disagreement, and the friction that comes from diverse perspectives.",
    reversedMeaning:
      "Avoidance of conflict, resolution, and compromise. The reversed Five suggests finding common ground, backing down from unnecessary fights, or practicing diplomacy.",
    keywords: ["conflict", "competition", "challenge", "rivalry", "tension"],
    advice:
      "Not all battles need to be fought. Choose your conflicts wisely and seek healthy competition that fuels growth.",
    interpretation:
      "The Five of Wands brings tension and competition. Different egos and ideas are clashing, creating friction. While conflict can be uncomfortable, it can also sharpen your skills and clarify your position. Choose your battles wisely.",
  },

  // --- 28: Six of Wands ---
  {
    id: 28,
    name: "Six of Wands",
    arcana: "minor",
    suit: "wands",
    number: 6,
    meaning:
      "Victory, recognition, and public success. The Six of Wands depicts a figure riding through a crowd, crowned with laurels, representing triumph, praise, and the acknowledgment of your achievements.",
    reversedMeaning:
      "Lack of recognition, ego inflation, and fall from grace. The reversed Six warns of pride before a fall, unearned praise, or being overlooked despite your efforts.",
    keywords: ["victory", "recognition", "success", "praise", "accomplishment"],
    advice:
      "You have earned this moment of triumph. Receive recognition with humility and gratitude.",
    interpretation:
      "The Six of Wands is a card of victory and public acclaim. Your hard work is being recognized, and others are celebrating your success. Accept the praise gracefully, but remain humble — true champions know their worth without needing constant validation.",
  },

  // --- 29: Seven of Wands ---
  {
    id: 29,
    name: "Seven of Wands",
    arcana: "minor",
    suit: "wands",
    number: 7,
    meaning:
      "Defense, standing your ground, and perseverance. The Seven of Wands shows a figure wielding a wand from a high vantage point, fending off numerous attackers below. This card speaks of protecting your position and defending your beliefs.",
    reversedMeaning:
      "Giving up, feeling overwhelmed, and loss of resolve. The reversed Seven warns of being overwhelmed, yielding too easily, or exhaustion from constant battle.",
    keywords: ["defense", "perseverance", "standing ground", "challenge", "courage"],
    advice:
      "Hold your position and defend what matters to you. You are stronger than you realize.",
    interpretation:
      "The Seven of Wands calls you to stand firm. Challenges are coming from multiple directions, and it may feel like the world is against you. But you have the high ground — trust in your position and defend your boundaries with courage.",
  },

  // --- 30: Eight of Wands ---
  {
    id: 30,
    name: "Eight of Wands",
    arcana: "minor",
    suit: "wands",
    number: 8,
    meaning:
      "Speed, movement, and rapid progress. The Eight of Wands depicts eight wands flying through the air, representing swift momentum, forward motion, and things falling into place quickly.",
    reversedMeaning:
      "Delays, frustration, and slow progress. The reversed Eight suggests stalled momentum, missed flights, or the need to wait for the right timing.",
    keywords: ["speed", "movement", "progress", "momentum", "action"],
    advice:
      "Things are moving quickly now. Ride the wave of momentum and trust the pace of the universe.",
    interpretation:
      "The Eight of Wands brings a burst of forward momentum. Obstacles are clearing, and events are accelerating rapidly. This is not a time to hesitate — seize the moment and move with the swift current of energy flowing around you.",
  },

  // --- 31: Nine of Wands ---
  {
    id: 31,
    name: "Nine of Wands",
    arcana: "minor",
    suit: "wands",
    number: 9,
    meaning:
      "Resilience, persistence, and last stands. The Nine of Wands shows a wounded figure standing guard, leaning on a wand while others stand behind. This card represents the final stretch of a long battle — you are tired but almost there.",
    reversedMeaning:
      "Exhaustion, giving up at the last hurdle, and defensiveness. The reversed Nine warns of burnout, paranoia, or quitting just before success.",
    keywords: ["resilience", "persistence", "endurance", "last stand", "fatigue"],
    advice:
      "You are almost there. Dig deep and find the strength to cross the finish line.",
    interpretation:
      "The Nine of Wands speaks of resilience in the face of adversity. You have been through a long struggle and wear the scars to prove it. But the end is in sight. Summon your remaining strength for one final push.",
  },

  // --- 32: Ten of Wands ---
  {
    id: 32,
    name: "Ten of Wands",
    arcana: "minor",
    suit: "wands",
    number: 10,
    meaning:
      "Burden, overcommitment, and hard work. The Ten of Wands depicts a figure struggling to carry a massive bundle of wands, representing the weight of too many responsibilities.",
    reversedMeaning:
      "Release of burdens, delegation, and lightening the load. The reversed Ten suggests learning to say no, asking for help, or letting go of unnecessary responsibilities.",
    keywords: ["burden", "overcommitment", "responsibility", "stress", "hard work"],
    advice:
      "You are carrying too much. Delegate, release, and prioritize what truly matters.",
    interpretation:
      "The Ten of Wands reveals that you are overburdened. You have taken on too much, and the weight is becoming unbearable. This card is a wake-up call to reassess your commitments and release what is not yours to carry.",
  },

  // --- 33: Page of Wands ---
  {
    id: 33,
    name: "Page of Wands",
    arcana: "minor",
    suit: "wands",
    meaning:
      "Enthusiasm, exploration, and free spirit. The Page of Wands brings the energy of a young adventurer — curious, passionate, and eager to explore new horizons.",
    reversedMeaning:
      "Lack of direction, setbacks in new projects, and waning enthusiasm. The reversed Page warns of losing steam, unfocused energy, or starting things without finishing them.",
    keywords: ["enthusiasm", "exploration", "curiosity", "passion", "discovery"],
    advice:
      "Approach life with childlike wonder. Your enthusiasm will open doors you never expected.",
    interpretation:
      "The Page of Wands carries a message of exciting new possibilities. A spark of inspiration is igniting your curiosity. Follow it with passion and an open heart — this is the beginning of a creative adventure that will expand your horizons.",
  },

  // --- 34: Knight of Wands ---
  {
    id: 34,
    name: "Knight of Wands",
    arcana: "minor",
    suit: "wands",
    meaning:
      "Action, adventure, and boldness. The Knight of Wands charges forward with fiery determination, representing the impulse to take bold action and pursue your passions with fearless energy.",
    reversedMeaning:
      "Recklessness, impulsiveness, and burnout. The reversed Knight warns of rushing without thought, lack of direction, or burning out from excessive intensity.",
    keywords: ["action", "adventure", "boldness", "passion", "impulse"],
    advice:
      "Charge forward with confidence, but temper your fire with wisdom. Bold action combined with strategy wins the day.",
    interpretation:
      "The Knight of Wands gallops into your life with fiery, adventurous energy. You are being called to take bold action and pursue your passions with fearless determination. Your enthusiasm is contagious — channel it wisely.",
  },

  // --- 35: Queen of Wands ---
  {
    id: 35,
    name: "Queen of Wands",
    arcana: "minor",
    suit: "wands",
    meaning:
      "Courage, confidence, and warmth. The Queen of Wands radiates magnetic energy, self-assurance, and creative fire. She is a natural leader who inspires others with her passion and vitality.",
    reversedMeaning:
      "Jealousy, self-doubt, and demanding behavior. The reversed Queen warns of insecurity masked as aggression, creative blocks, or demanding too much from yourself and others.",
    keywords: ["confidence", "warmth", "courage", "leadership", "vitality"],
    advice:
      "Own your power with warmth and confidence. Your passion lights the way for others to follow.",
    interpretation:
      "The Queen of Wands is a confident, charismatic leader. She embodies the warmth of the sun and the fierce determination of fire. Step into your power, trust your instincts, and let your natural magnetism draw the right people and opportunities to you.",
  },

  // --- 36: King of Wands ---
  {
    id: 36,
    name: "King of Wands",
    arcana: "minor",
    suit: "wands",
    meaning:
      "Vision, leadership, and entrepreneurial spirit. The King of Wands sits on his throne, radiating authority, vision, and the bold energy of a natural-born leader who turns ideas into reality.",
    reversedMeaning:
      "Tyranny, ruthlessness, and misuse of power. The reversed King warns of arrogance, unrealistic expectations, or leading through fear rather than inspiration.",
    keywords: ["leadership", "vision", "authority", "entrepreneurship", "boldness"],
    advice:
      "Lead with vision and integrity. Your bold ideas have the power to inspire and transform.",
    interpretation:
      "The King of Wands is a visionary leader who brings ideas to life. He embodies the mature, responsible expression of the fire element. You are being called to take charge, inspire others with your vision, and lead with both courage and honor.",
  },

  // ============================================================
  // MINOR ARCANA — CUPS (Emotions, Love, Intuition)
  // Cards 37–50
  // ============================================================

  // --- 37: Ace of Cups ---
  {
    id: 37,
    name: "Ace of Cups",
    arcana: "minor",
    suit: "cups",
    number: 1,
    meaning:
      "New feelings, emotional awakening, and the overflowing of love. The Ace of Cups represents the pure essence of love, compassion, and emotional abundance pouring into your life.",
    reversedMeaning:
      "Emotional emptiness, blocked feelings, and repressed love. The reversed Ace warns of emotional withholding, infertility of spirit, or refusing to open your heart.",
    keywords: ["love", "emotion", "new feelings", "compassion", "intuition"],
    advice:
      "Open your heart to receive and give love. Emotional fullness is your birthright — let the waters flow.",
    interpretation:
      "The Ace of Cups overflows with divine love and emotional abundance. A new chapter of emotional fulfillment is beginning. Whether romantic, spiritual, or self-love, your heart is being invited to open and receive the love that the universe is offering.",
  },

  // --- 38: Two of Cups ---
  {
    id: 38,
    name: "Two of Cups",
    arcana: "minor",
    suit: "cups",
    number: 2,
    meaning:
      "Partnership, unity, and mutual attraction. The Two of Cups represents a deep emotional connection between two people, whether romantic, platonic, or professional.",
    reversedMeaning:
      "Imbalance in a relationship, broken trust, or separation. The reversed Two warns of disharmony, unrequited love, or emotional disconnection.",
    keywords: ["partnership", "unity", "love", "connection", "harmony"],
    advice:
      "Open your heart to true partnership. The deepest bonds are built on mutual respect and emotional honesty.",
    interpretation:
      "The Two of Cups is a beautiful card of love and partnership. A significant connection is forming or deepening. This is a time for emotional openness and reciprocal affection.",
  },

  // --- 39: Three of Cups ---
  {
    id: 39,
    name: "Three of Cups",
    arcana: "minor",
    suit: "cups",
    number: 3,
    meaning:
      "Celebration, friendship, and community. The Three of Cups represents joy, social connections, and coming together with loved ones.",
    reversedMeaning:
      "Overindulgence, gossip, or isolation from community. The reversed Three warns of social conflicts or neglecting friendships.",
    keywords: ["celebration", "friendship", "community", "joy", "togetherness"],
    advice:
      "Celebrate with those who lift you up. Community and connection nourish the soul.",
    interpretation:
      "The Three of Cups brings a time of joy and celebration with friends and community. This is a card of social connection, creative collaboration, and pure happiness.",
  },

  // --- 40: Four of Cups ---
  {
    id: 40,
    name: "Four of Cups",
    arcana: "minor",
    suit: "cups",
    number: 4,
    meaning:
      "Contemplation, apathy, and reevaluation. The Four of Cups depicts a figure sitting under a tree, ignoring a floating cup while three are at their feet.",
    reversedMeaning:
      "New motivation, renewed interest, and acceptance. The reversed Four signals a fresh perspective and a willingness to engage.",
    keywords: ["contemplation", "apathy", "reevaluation", "meditation", "discontent"],
    advice:
      "Look within to understand what truly fulfills you. A new opportunity is being offered — open your eyes.",
    interpretation:
      "The Four of Cups suggests a period of introspection and mild dissatisfaction. You may be taking your blessings for granted or feeling uninspired. A new invitation is on its way.",
  },

  // --- 41: Five of Cups ---
  {
    id: 41,
    name: "Five of Cups",
    arcana: "minor",
    suit: "cups",
    number: 5,
    meaning:
      "Loss, grief, and disappointment. The Five of Cups shows a figure mourning three spilled cups while two remain standing behind them.",
    reversedMeaning:
      "Acceptance, moving on, and finding peace. The reversed Five signals the beginning of healing and emotional recovery.",
    keywords: ["loss", "grief", "disappointment", "sorrow", "regret"],
    advice:
      "Grieve what is lost, but do not forget what remains. Two cups still stand — focus on what you still have.",
    interpretation:
      "The Five of Cups brings a time of sadness and loss. Something valuable has slipped away, and you are in mourning. But take heart — not all is lost. Look for the blessings that remain.",
  },

  // --- 42: Six of Cups ---
  {
    id: 42,
    name: "Six of Cups",
    arcana: "minor",
    suit: "cups",
    number: 6,
    meaning:
      "Nostalgia, childhood memories, and innocent joy. The Six of Cups evokes the sweetness of the past and the purity of simpler times.",
    reversedMeaning:
      "Living in the past, unrealistic nostalgia, or refusing to grow up. The reversed Six warns of excessive sentimentality or being stuck in old patterns.",
    keywords: ["nostalgia", "memories", "innocence", "joy", "kindness"],
    advice:
      "Honor your past but do not live in it. Let the sweet memories inspire your present.",
    interpretation:
      "The Six of Cups brings a wave of nostalgia and fond memories. A gift from the past may reappear, or you may feel called to reconnect with someone from your early years.",
  },

  // --- 43: Seven of Cups ---
  {
    id: 43,
    name: "Seven of Cups",
    arcana: "minor",
    suit: "cups",
    number: 7,
    meaning:
      "Choices, fantasies, and wishful thinking. The Seven of Cups shows a figure confronted by seven mystical cups, each offering a different dream or illusion.",
    reversedMeaning:
      "Clarity, focus, and realistic goals. The reversed Seven cuts through the illusions, bringing grounded decision-making.",
    keywords: ["choices", "fantasy", "illusions", "options", "dreams"],
    advice:
      "Be careful what you wish for. Not every glittering option is what it appears to be — choose wisely.",
    interpretation:
      "The Seven of Cups presents a dazzling array of choices, but not all are what they seem. Fantasies and illusions abound. Ground yourself in reality before making any major decisions.",
  },

  // --- 44: Eight of Cups ---
  {
    id: 44,
    name: "Eight of Cups",
    arcana: "minor",
    suit: "cups",
    number: 8,
    meaning:
      "Departure, withdrawal, and seeking deeper meaning. The Eight of Cups shows a figure walking away from a stack of cups, leaving behind what no longer serves them.",
    reversedMeaning:
      "Fear of change, clinging to the familiar, and aimless wandering. The reversed Eight suggests reluctance to leave an unfulfilling situation.",
    keywords: ["departure", "withdrawal", "seeking", "disillusionment", "journey"],
    advice:
      "It is time to walk away from what no longer fulfills you. The path to deeper meaning lies ahead.",
    interpretation:
      "The Eight of Cups signals a conscious decision to leave behind a situation that no longer serves your emotional or spiritual growth. This is not a failure — it is a courageous step toward greater fulfillment.",
  },

  // --- 45: Nine of Cups ---
  {
    id: 45,
    name: "Nine of Cups",
    arcana: "minor",
    suit: "cups",
    number: 9,
    meaning:
      "Contentment, satisfaction, and wishes fulfilled. The Nine of Cups is the wish card — representing emotional fulfillment and material abundance.",
    reversedMeaning:
      "Dissatisfaction, unfulfilled desires, or superficial happiness. The reversed Nine suggests that something is still missing despite outward success.",
    keywords: ["contentment", "satisfaction", "wishes", "abundance", "happiness"],
    advice:
      "Your wish is being granted. Receive this abundance with gratitude and enjoy the fruits of your labors.",
    interpretation:
      "The Nine of Cups is a card of deep satisfaction and wish fulfillment. Your dreams are manifesting, and emotional contentment is within reach. This is a time to celebrate how far you have come.",
  },

  // --- 46: Ten of Cups ---
  {
    id: 46,
    name: "Ten of Cups",
    arcana: "minor",
    suit: "cups",
    number: 10,
    meaning:
      "Emotional fulfillment, family happiness, and lasting joy. The Ten of Cups represents the ultimate card of love, harmony, and domestic bliss.",
    reversedMeaning:
      "Broken family, disrupted harmony, or unfulfilled dreams. The reversed Ten warns of domestic strife or shattered ideals.",
    keywords: ["fulfillment", "family", "happiness", "harmony", "peace"],
    advice:
      "True happiness is found in love and connection. Cherish the peaceful moments with those you love.",
    interpretation:
      "The Ten of Cups is a glorious card of emotional fulfillment and family joy. The love and harmony you have been seeking is here. This is a time of deep contentment and grateful connection.",
  },

  // --- 47: Page of Cups ---
  {
    id: 47,
    name: "Page of Cups",
    arcana: "minor",
    suit: "cups",
    meaning:
      "Creative inspiration, intuitive messages, and emotional openness. The Page of Cups brings a message of love, artistic expression, or spiritual insight.",
    reversedMeaning:
      "Creative blocks, emotional immaturity, or ignoring intuitive guidance. The reversed Page warns of escapism or refusing to grow emotionally.",
    keywords: ["inspiration", "intuition", "creativity", "message", "openness"],
    advice:
      "Stay open to the whispers of your heart. A creative or emotional message is seeking your attention.",
    interpretation:
      "The Page of Cups arrives with a message of creative and emotional inspiration. An intuitive insight, a new artistic project, or a tender feeling is asking to be acknowledged and expressed.",
  },

  // --- 48: Knight of Cups ---
  {
    id: 48,
    name: "Knight of Cups",
    arcana: "minor",
    suit: "cups",
    meaning:
      "Romance, charm, and artistic pursuit. The Knight of Cups rides forward with a cup in hand, offering love, creativity, and emotional sincerity.",
    reversedMeaning:
      "Jealousy, moodiness, and unrealistic expectations. The reversed Knight warns of emotional manipulation or chasing impossible fantasies.",
    keywords: ["romance", "charm", "creativity", "pursuit", "idealism"],
    advice:
      "Follow your heart's desire, but keep your feet on the ground. True romance is genuine, not idealized.",
    interpretation:
      "The Knight of Cups brings a romantic, creative energy. A proposal, invitation, or artistic inspiration is on its way. This is a time to follow your passion with both heart and integrity.",
  },

  // --- 49: Queen of Cups ---
  {
    id: 49,
    name: "Queen of Cups",
    arcana: "minor",
    suit: "cups",
    meaning:
      "Emotional depth, compassion, and intuitive wisdom. The Queen of Cups embodies the nurturing, empathetic, and deeply feeling aspects of the watery element.",
    reversedMeaning:
      "Emotional dependence, martyrdom, or emotional repression. The reversed Queen warns of being overwhelmed by feelings or using emotions to manipulate.",
    keywords: ["compassion", "intuition", "nurturing", "depth", "empathy"],
    advice:
      "Lead with your heart, but do not lose yourself in others' emotions. Compassion without boundaries is not sustainable.",
    interpretation:
      "The Queen of Cups represents emotional maturity and intuitive wisdom. You are being called to nurture yourself and others with deep compassion while maintaining healthy emotional boundaries.",
  },

  // --- 50: King of Cups ---
  {
    id: 50,
    name: "King of Cups",
    arcana: "minor",
    suit: "cups",
    meaning:
      "Emotional maturity, diplomacy, and calm authority. The King of Cups has mastered his emotions and uses his emotional intelligence to lead with wisdom and compassion.",
    reversedMeaning:
      "Emotional volatility, manipulation, and moodiness. The reversed King warns of repressed emotions exploding or using emotional insight to control others.",
    keywords: ["wisdom", "diplomacy", "emotional mastery", "calm", "authority"],
    advice:
      "Master your emotions rather than letting them master you. True strength is calm, compassionate, and controlled.",
    interpretation:
      "The King of Cups represents emotional mastery and mature leadership. You have developed the ability to navigate turbulent emotional waters with grace and wisdom. Now use this gift to guide others.",
  },

  // ============================================================
  // MINOR ARCANA — SWORDS (Thought, Conflict, Truth)
  // Cards 51–64
  // ============================================================

  // --- 51: Ace of Swords ---
  {
    id: 51,
    name: "Ace of Swords",
    arcana: "minor",
    suit: "swords",
    number: 1,
    meaning:
      "Clarity, breakthrough, and intellectual triumph. The Ace of Swords cuts through confusion with the power of truth and sharp mental focus.",
    reversedMeaning:
      "Confusion, misinformation, and mental blocks. The reversed Ace warns of unclear thinking, hasty decisions, or distorted truth.",
    keywords: ["clarity", "truth", "breakthrough", "intellect", "justice"],
    advice:
      "Seek the truth with courage. A moment of mental clarity is here — act on it decisively.",
    interpretation:
      "The Ace of Swords brings a powerful breakthrough in thinking. A truth is being revealed, a solution is appearing, or a moment of crystal clarity is upon you. Seize this mental edge.",
  },

  // --- 52: Two of Swords ---
  {
    id: 52,
    name: "Two of Swords",
    arcana: "minor",
    suit: "swords",
    number: 2,
    meaning:
      "Difficult decisions, stalemate, and being torn between two choices. The Two of Swords depicts a blindfolded figure holding two crossed swords, unable to see clearly.",
    reversedMeaning:
      "Indecision resolved, information revealed, and making a choice. The reversed Two signals that clarity is coming and a decision must be made.",
    keywords: ["decision", "stalemate", "difficult choice", "balance", "denial"],
    advice:
      "Remove the blindfold. The answer is already within you — trust yourself to make the right choice.",
    interpretation:
      "The Two of Swords presents a difficult decision where you feel stuck between two options. The blindfold suggests you may be avoiding the truth. Remove your defenses and see the situation clearly.",
  },

  // --- 53: Three of Swords ---
  {
    id: 53,
    name: "Three of Swords",
    arcana: "minor",
    suit: "swords",
    number: 3,
    meaning:
      "Heartbreak, sorrow, and painful truth. The Three of Swords shows a heart pierced by three swords, representing grief, betrayal, and emotional pain.",
    reversedMeaning:
      "Healing, forgiveness, and releasing pain. The reversed Three signals the beginning of emotional recovery and learning from heartache.",
    keywords: ["heartbreak", "sorrow", "grief", "betrayal", "pain"],
    advice:
      "This pain will not last forever. Allow yourself to grieve, then begin the healing process.",
    interpretation:
      "The Three of Swords brings emotional pain and heartbreak. A truth has come to light that wounds deeply. Allow yourself to feel the sorrow, but remember — this too shall pass.",
  },

  // --- 54: Four of Swords ---
  {
    id: 54,
    name: "Four of Swords",
    arcana: "minor",
    suit: "swords",
    number: 4,
    meaning:
      "Rest, recovery, and contemplation. The Four of Swords depicts a figure lying in rest, surrounded by swords. This card calls for a period of peaceful retreat.",
    reversedMeaning:
      "Restlessness, burnout, and refusal to rest. The reversed Four warns of pushing too hard without allowing time for recovery.",
    keywords: ["rest", "meditation", "recovery", "retreat", "peace"],
    advice:
      "You have been through enough. Give yourself permission to rest and recharge.",
    interpretation:
      "The Four of Swords calls for a much-needed rest. You have been through a battle, and your mind and body need time to recover. This is not retreat — it is strategic recovery.",
  },

  // --- 55: Five of Swords ---
  {
    id: 55,
    name: "Five of Swords",
    arcana: "minor",
    suit: "swords",
    number: 5,
    meaning:
      "Conflict, defeat, and hollow victory. The Five of Swords shows a figure collecting swords while two others walk away in defeat. Winning at all costs has left a bitter taste.",
    reversedMeaning:
      "Reconciliation, compromise, and moving past conflict. The reversed Five suggests putting down your sword and making peace.",
    keywords: ["conflict", "defeat", "victory", "tension", "loss"],
    advice:
      "Is this battle worth winning? Some victories come at too high a price — choose peace.",
    interpretation:
      "The Five of Swords warns of conflict where winning comes at a great cost. Even if you prevail, relationships may be damaged beyond repair. Consider whether the fight is truly worth it.",
  },

  // --- 56: Six of Swords ---
  {
    id: 56,
    name: "Six of Swords",
    arcana: "minor",
    suit: "swords",
    number: 6,
    meaning:
      "Transition, moving forward, and leaving troubled waters behind. The Six of Swords depicts a ferryman carrying passengers across a body of water toward calmer shores.",
    reversedMeaning:
      "Resistance to change, unresolved baggage, and delayed transition. The reversed Six warns of being stuck in a painful situation.",
    keywords: ["transition", "moving on", "travel", "healing", "progress"],
    advice:
      "You are moving toward calmer waters. The journey may be uncomfortable, but it is necessary for healing.",
    interpretation:
      "The Six of Swords represents a transition away from difficulty toward peace. You are leaving behind turbulent times and moving toward a more stable, calm future. Trust the journey.",
  },

  // --- 57: Seven of Swords ---
  {
    id: 57,
    name: "Seven of Swords",
    arcana: "minor",
    suit: "swords",
    number: 7,
    meaning:
      "Deception, strategy, and stealth. The Seven of Swords shows a figure sneaking away with five swords while two remain stuck in the ground. Cunning and resourcefulness are at play.",
    reversedMeaning:
      "Confession, rethinking strategy, and honesty. The reversed Seven suggests that deception is being uncovered or a better approach is needed.",
    keywords: ["deception", "strategy", "stealth", "cunning", "escape"],
    advice:
      "Think before you act — not everyone plays fair. Use wisdom and strategy to protect yourself.",
    interpretation:
      "The Seven of Swords warns of deception or underhanded tactics. Someone may not be acting with integrity. Keep your wits about you and act strategically to protect your interests.",
  },

  // --- 58: Eight of Swords ---
  {
    id: 58,
    name: "Eight of Swords",
    arcana: "minor",
    suit: "swords",
    number: 8,
    meaning:
      "Feeling trapped, self-imposed limitations, and negative thinking. The Eight of Swords depicts a blindfolded figure surrounded by swords, trapped by their own mental constructs.",
    reversedMeaning:
      "Liberation, new perspective, and empowerment. The reversed Eight signals breaking free from limiting beliefs and seeing a way out.",
    keywords: ["trapped", "limitation", "negativity", "fear", "paralysis"],
    advice:
      "The prison is in your mind. Remove the blindfold and you will see the way out.",
    interpretation:
      "The Eight of Swords reveals that the biggest obstacle is your own thinking. You feel trapped and powerless, but in reality, there is a way out — you just cannot see it through your fear. Shift your mindset.",
  },

  // --- 59: Nine of Swords ---
  {
    id: 59,
    name: "Nine of Swords",
    arcana: "minor",
    suit: "swords",
    number: 9,
    meaning:
      "Anxiety, worry, and nightmares. The Nine of Swords shows a figure sitting up in bed, hands covering their face, tormented by their own thoughts.",
    reversedMeaning:
      "Hope, recovery, and releasing worry. The reversed Nine signals that the darkest hour is passing and light is returning.",
    keywords: ["anxiety", "worry", "fear", "nightmares", "despair"],
    advice:
      "Your fears are worse than reality. Reach out for support — you do not have to carry this alone.",
    interpretation:
      "The Nine of Swords represents intense anxiety and psychological distress. Your mind is creating scenarios worse than reality. This card asks you to seek support and remember that this too shall pass.",
  },

  // --- 60: Ten of Swords ---
  {
    id: 60,
    name: "Ten of Swords",
    arcana: "minor",
    suit: "swords",
    number: 10,
    meaning:
      "Rock bottom, painful endings, and betrayal. The Ten of Swords shows a figure lying face down with ten swords in their back — the final blow has been struck.",
    reversedMeaning:
      "Recovery, regeneration, and rising from the ashes. The reversed Ten signals that the worst is over and healing can begin.",
    keywords: ["endings", "rock bottom", "betrayal", "pain", "crisis"],
    advice:
      "Rock bottom is solid ground. You cannot fall any further — the only direction is up.",
    interpretation:
      "The Ten of Swords marks a painful ending. You have hit rock bottom, and the situation feels devastating. But take heart — this is the end of the cycle. From here, there is nowhere to go but up.",
  },

  // --- 61: Page of Swords ---
  {
    id: 61,
    name: "Page of Swords",
    arcana: "minor",
    suit: "swords",
    meaning:
      "Curiosity, new ideas, and intellectual ambition. The Page of Swords is eager to learn, debate, and explore new mental territory.",

    reversedMeaning:
      "Hasty words, gossip, and scattered thinking. The reversed Page warns of carelessness with information or starting arguments without thinking.",
    keywords: ["curiosity", "ideas", "intellect", "communication", "learning"],
    advice:
      "Stay curious and keep asking questions. Your thirst for knowledge will open new doors.",
    interpretation:
      "The Page of Swords brings a thirst for knowledge and mental exploration. A new idea, study opportunity, or intellectual challenge is calling. Embrace it with enthusiasm but think before you speak.",
  },

  // --- 62: Knight of Swords ---
  {
    id: 62,
    name: "Knight of Swords",
    arcana: "minor",
    suit: "swords",
    meaning:
      "Action, speed, and determination. The Knight of Swords charges forward with sword raised, ready to cut through any obstacle with intellectual force.",
    reversedMeaning:
      "Rushing, impulsiveness, and burnout. The reversed Knight warns of hasty decisions, aggression, or charging ahead without a clear plan.",
    keywords: ["action", "speed", "determination", "ambition", "force"],
    advice:
      "Charge ahead with clarity, not just speed. Make sure your direction is right before you accelerate.",
    interpretation:
      "The Knight of Swords brings swift, decisive energy. You are ready to take action and pursue your goals with intense focus. Just ensure you are heading in the right direction before you rush forward.",
  },

  // --- 63: Queen of Swords ---
  {
    id: 63,
    name: "Queen of Swords",
    arcana: "minor",
    suit: "swords",
    meaning:
      "Clear thinking, direct communication, and independence. The Queen of Swords sees through deception and speaks the truth, no matter how uncomfortable.",
    reversedMeaning:
      "Coldness, harsh criticism, and bitterness. The reversed Queen warns of being overly critical, emotionally closed off, or using words as weapons.",
    keywords: ["clarity", "truth", "independence", "communication", "wisdom"],
    advice:
      "Speak your truth with clarity and compassion. Wisdom is knowing when to be sharp and when to be gentle.",
    interpretation:
      "The Queen of Swords represents sharp intellect and clear communication. You are being called to seek the truth, speak it boldly, and make decisions with your head while keeping your heart open.",
  },

  // --- 64: King of Swords ---
  {
    id: 64,
    name: "King of Swords",
    arcana: "minor",
    suit: "swords",
    meaning:
      "Authority, truth, and intellectual power. The King of Swords wields the power of clear thinking, justice, and moral integrity.",
    reversedMeaning:
      "Misuse of power, manipulation, and intellectual tyranny. The reversed King warns of cold authority, dishonest leadership, or using knowledge to control others.",
    keywords: ["authority", "truth", "justice", "intellect", "leadership"],
    advice:
      "Lead with truth and integrity. Your wisdom is a tool for justice, not control.",
    interpretation:
      "The King of Swords represents intellectual authority and moral clarity. You are being called to take a stand for truth and justice. Lead with your mind, but temper it with ethical responsibility.",
  },

  // ============================================================
  // MINOR ARCANA — PENTACLES (Material, Work, Abundance)
  // Cards 65–78
  // ============================================================

  // --- 65: Ace of Pentacles ---
  {
    id: 65,
    name: "Ace of Pentacles",
    arcana: "minor",
    suit: "pentacles",
    number: 1,
    meaning:
      "New financial opportunity, prosperity, and material beginnings. The Ace of Pentacles offers a seed of abundance — a new job, investment, or source of income.",
    reversedMeaning:
      "Missed opportunity, financial setbacks, and lack of planning. The reversed Ace warns of losing a promising chance or poor financial decisions.",
    keywords: ["prosperity", "new opportunity", "abundance", "wealth", "beginnings"],
    advice:
      "A new opportunity for abundance is here. Invest your energy wisely and watch it grow.",
    interpretation:
      "The Ace of Pentacles brings a tangible new beginning in the material world. A financial opportunity, a job offer, or a practical project is presenting itself. This seed of prosperity is ready to be cultivated.",
  },

  // --- 66: Two of Pentacles ---
  {
    id: 66,
    name: "Two of Pentacles",
    arcana: "minor",
    suit: "pentacles",
    number: 2,
    meaning:
      "Balance, adaptability, and juggling multiple priorities. The Two of Pentacles shows a figure skillfully balancing two large coins in an infinity loop.",
    reversedMeaning:
      "Overwhelm, financial disorganization, and dropping the ball. The reversed Two warns of losing balance and struggling to keep up.",
    keywords: ["balance", "adaptability", "juggling", "priorities", "flexibility"],
    advice:
      "Keep your balance as life throws multiple demands your way. Adaptability is your greatest asset.",
    interpretation:
      "The Two of Pentacles asks you to juggle multiple responsibilities with grace. Life is demanding, and you must stay flexible. Keep your priorities straight, and do not let stress throw you off balance.",
  },

  // --- 67: Three of Pentacles ---
  {
    id: 67,
    name: "Three of Pentacles",
    arcana: "minor",
    suit: "pentacles",
    number: 3,
    meaning:
      "Teamwork, collaboration, and skill development. The Three of Pentacles depicts artisans working together on a cathedral, representing collective effort and craftsmanship.",
    reversedMeaning:
      "Lack of teamwork, poor quality, and competing agendas. The reversed Three warns of misaligned goals, lack of commitment, or cutting corners.",
    keywords: ["teamwork", "collaboration", "skill", "craftsmanship", "quality"],
    advice:
      "Great things are built through collaboration. Share your skills and trust the team.",
    interpretation:
      "The Three of Pentacles celebrates teamwork and mastery. You are working with others to create something meaningful. Share your expertise, learn from your collaborators, and take pride in the quality of your work.",
  },

  // --- 68: Four of Pentacles ---
  {
    id: 68,
    name: "Four of Pentacles",
    arcana: "minor",
    suit: "pentacles",
    number: 4,
    meaning:
      "Security, control, and materialism. The Four of Pentacles shows a figure clutching four coins tightly, representing a need for financial security and fear of loss.",
    reversedMeaning:
      "Generosity, letting go, and financial liberation. The reversed Four warns of over-giving or financial instability through reckless spending.",
    keywords: ["security", "control", "saving", "materialism", "protection"],
    advice:
      "Hold on to what you have, but do not let fear of loss keep you from living fully.",
    interpretation:
      "The Four of Pentacles speaks to financial security and material control. You may be holding tightly to your resources out of fear. While saving is wise, ensure your need for security is not closing your heart to generosity.",
  },

  // --- 69: Five of Pentacles ---
  {
    id: 69,
    name: "Five of Pentacles",
    arcana: "minor",
    suit: "pentacles",
    number: 5,
    meaning:
      "Hardship, financial loss, and feeling left out in the cold. The Five of Pentacles shows two figures walking past a lit church, excluded and impoverished.",
    reversedMeaning:
      "Recovery, spiritual enrichment, and finding help. The reversed Five signals the end of financial difficulty and the beginning of recovery.",
    keywords: ["hardship", "poverty", "loss", "exclusion", "struggle"],
    advice:
      "Help is available if you are willing to seek it. This difficult period is temporary.",
    interpretation:
      "The Five of Pentacles brings a period of material hardship or feeling left out. You may be struggling financially or emotionally isolated. But the church in the background reminds you that help is available — do not be afraid to ask.",
  },

  // --- 70: Six of Pentacles ---
  {
    id: 70,
    name: "Six of Pentacles",
    arcana: "minor",
    suit: "pentacles",
    number: 6,
    meaning:
      "Generosity, charity, and sharing wealth. The Six of Pentacles depicts a wealthy figure distributing coins to those in need, representing the flow of abundance.",
    reversedMeaning:
      "Strings attached, inequality, and power imbalances. The reversed Six warns of conditional giving, charity with hidden motives, or power dynamics.",
    keywords: ["generosity", "charity", "sharing", "balance", "kindness"],
    advice:
      "Give freely and receive graciously. The flow of abundance is maintained by generosity.",
    interpretation:
      "The Six of Pentacles speaks to the cycle of giving and receiving. Whether you are in a position to give or need to receive, do so with grace. True generosity comes without expectation.",
  },

  // --- 71: Seven of Pentacles ---
  {
    id: 71,
    name: "Seven of Pentacles",
    arcana: "minor",
    suit: "pentacles",
    number: 7,
    meaning:
      "Patience, assessment, and long-term growth. The Seven of Pentacles shows a farmer surveying their crop, reflecting on the results of their hard work.",
    reversedMeaning:
      "Impatience, wasted effort, and disappointment. The reversed Seven warns of investments not paying off or wanting results too quickly.",
    keywords: ["patience", "assessment", "growth", "reflection", "cultivation"],
    advice:
      "Take a moment to assess your progress. Are your efforts bearing fruit? Patience is key.",
    interpretation:
      "The Seven of Pentacles asks you to pause and evaluate your long-term investments. Your hard work has been planted — now it is time to be patient and see what grows. Reflect on whether your efforts are aligned with your goals.",
  },

  // --- 72: Eight of Pentacles ---
  {
    id: 72,
    name: "Eight of Pentacles",
    arcana: "minor",
    suit: "pentacles",
    number: 8,
    meaning:
      "Diligence, mastery, and skill development. The Eight of Pentacles shows a craftsman hard at work, perfecting their craft through dedication and practice.",
    reversedMeaning:
      "Perfectionism, lack of motivation, and shortcuts. The reversed Eight warns of boredom with routine, cutting corners, or refusing to learn.",
    keywords: ["diligence", "mastery", "skill", "practice", "dedication"],
    advice:
      "Mastery comes through consistent practice. Keep honing your craft — the results will follow.",
    interpretation:
      "The Eight of Pentacles celebrates the joy of craftsmanship and continuous improvement. You are dedicating yourself to mastering a skill or completing a project with meticulous attention. Your discipline will pay off.",
  },

  // --- 73: Nine of Pentacles ---
  {
    id: 73,
    name: "Nine of Pentacles",
    arcana: "minor",
    suit: "pentacles",
    number: 9,
    meaning:
      "Luxury, self-sufficiency, and financial independence. The Nine of Pentacles depicts a woman in a lush garden, surrounded by abundance she has cultivated herself.",
    reversedMeaning:
      "Financial setbacks, dependence on others, and overindulgence. The reversed Nine warns of living beyond your means or losing your independence.",
    keywords: ["luxury", "independence", "abundance", "self-sufficiency", "elegance"],
    advice:
      "You have earned this comfort. Enjoy the fruits of your labor with gratitude.",
    interpretation:
      "The Nine of Pentacles represents the enjoyment of well-earned luxury and financial independence. You have built a life of comfort and beauty through your own efforts. Enjoy this moment of abundance.",
  },

  // --- 74: Ten of Pentacles ---
  {
    id: 74,
    name: "Ten of Pentacles",
    arcana: "minor",
    suit: "pentacles",
    number: 10,
    meaning:
      "Legacy, inheritance, and lasting wealth. The Ten of Pentacles represents generational abundance, family business, and the fulfillment of long-term material goals.",
    reversedMeaning:
      "Family disputes over money, loss of inheritance, and financial collapse. The reversed Ten warns of broken family traditions or squandered legacy.",
    keywords: ["legacy", "wealth", "family", "inheritance", "tradition"],
    advice:
      "Build something that will last beyond your lifetime. True wealth is generational.",
    interpretation:
      "The Ten of Pentacles speaks to legacy and long-term prosperity. You are building a foundation that will support not just you but future generations. Honor your roots while creating lasting value.",
  },

  // --- 75: Page of Pentacles ---
  {
    id: 75,
    name: "Page of Pentacles",
    arcana: "minor",
    suit: "pentacles",
    meaning:
      "Ambition, new study, and practical learning. The Page of Pentacles is eager to learn the ways of the material world — finance, trade, or a new skill.",
    reversedMeaning:
      "Lack of progress, procrastination, and missed opportunities. The reversed Page warns of failing to apply yourself or lacking discipline.",
    keywords: ["ambition", "learning", "study", "dedication", "new skill"],
    advice:
      "A new opportunity to learn and grow is here. Apply yourself with discipline and patience.",
    interpretation:
      "The Page of Pentacles brings the energy of a dedicated student. A new area of study, a financial skill, or a practical project is calling. Approach it with discipline, patience, and a willingness to learn step by step.",
  },

  // --- 76: Knight of Pentacles ---
  {
    id: 76,
    name: "Knight of Pentacles",
    arcana: "minor",
    suit: "pentacles",
    meaning:
      "Hard work, responsibility, and steady progress. The Knight of Pentacles moves slowly but surely, carrying his pentacle with unwavering dedication.",
    reversedMeaning:
      "Stagnation, laziness, and routine without purpose. The reversed Knight warns of getting stuck in a rut or lacking ambition.",
    keywords: ["hard work", "responsibility", "determination", "patience", "reliability"],
    advice:
      "Slow and steady wins the race. Keep working diligently — your persistence will be rewarded.",
    interpretation:
      "The Knight of Pentacles embodies patient, reliable effort. He is not flashy or fast, but he is unstoppable. This is a time to focus on your responsibilities with quiet determination and consistent effort.",
  },

  // --- 77: Queen of Pentacles ---
  {
    id: 77,
    name: "Queen of Pentacles",
    arcana: "minor",
    suit: "pentacles",
    meaning:
      "Nurturing abundance, practicality, and domestic comfort. The Queen of Pentacles is the earth mother who combines material success with loving care.",
    reversedMeaning:
      "Neglect, financial insecurity, and overwork. The reversed Queen warns of neglecting home and health for work, or financial mismanagement.",
    keywords: ["nurturing", "abundance", "practicality", "comfort", "generosity"],
    advice:
      "Create a life of comfort and abundance for yourself and those you love. Practical love is powerful.",
    interpretation:
      "The Queen of Pentacles represents the perfect balance of material success and nurturing care. You are being called to create a warm, abundant environment for yourself and others while staying grounded and practical.",
  },

  // --- 78: King of Pentacles ---
  {
    id: 78,
    name: "King of Pentacles",
    arcana: "minor",
    suit: "pentacles",
    meaning:
      "Wealth, leadership, and financial mastery. The King of Pentacles sits on his throne, surrounded by abundance, representing the pinnacle of material success and business acumen.",
    reversedMeaning:
      "Greed, financial mismanagement, and stubbornness. The reversed King warns of materialism without ethics, poor investments, or using wealth to control others.",
    keywords: ["wealth", "leadership", "abundance", "mastery", "success"],
    advice:
      "You have achieved material mastery. Now use your wealth and influence to create lasting value.",
    interpretation:
      "The King of Pentacles represents the highest achievement in the material realm. You have mastered the world of finance and business. With this power comes responsibility — use your abundance to create legacies and uplift others.",
  },
];
