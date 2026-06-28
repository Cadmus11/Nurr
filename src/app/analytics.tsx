import { useMemo, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Pressable } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useTheme } from '@/hooks/use-theme';
import { useSpeech } from '@/hooks/use-speech';
import { useProfileStore } from '@/stores/profile-store';
import { Spacing } from '@/constants/theme';
import { ZODIAC_SIGNS } from '@/constants/cosmic/zodiac';
import { MOON_SIGNS } from '@/constants/cosmic/moonSigns';
import { RISING_SIGNS } from '@/constants/cosmic/risingSigns';
import { CHINESE_ZODIAC, ELEMENT_MEANINGS } from '@/constants/cosmic/chineseZodiac';
import { PLANET_LIST } from '@/constants/cosmic/planets';
import { calculateSunSign, calculateRisingSign, calculateLifePath, calculateDestinyNumber, calculateSoulUrge, calculatePersonalityNumber, calculateChineseZodiac, calculateChineseElement, getMoonSign, getZodiacElement } from '@/utils/calculations';
import { CosmicIcon } from '@/components/cosmic-icon';

type AnalyticsTab = 'energy' | 'numerology' | 'elements';

const NUMEROLOGY_COLORS = ['#ef4444', '#f97316', '#eab308', '#22c55e', '#14b8a6', '#3b82f6', '#8b5cf6', '#ec4899', '#6366f1', '#a855f7', '#d946ef', '#f43f5e'];
const ELEMENT_COLORS: Record<string, string> = { fire: '#ef4444', earth: '#22c55e', air: '#eab308', water: '#3b82f6' };

export default function AnalyticsScreen() {
  const insets = useSafeAreaInsets();
  const theme = useTheme();
  const activeProfile = useProfileStore((s) => s.activeProfile);
  const [tab, setTab] = useState<AnalyticsTab>('energy');
  const { speak, isSpeaking } = useSpeech();

  const data = useMemo(() => {
    if (!activeProfile) return null;
    const [y, m, d] = activeProfile.birthDate.split('-').map(Number);
    const birthHour = activeProfile.birthTime ? parseInt(activeProfile.birthTime.split(':')[0], 10) : 12;
    const sunSign = calculateSunSign(m, d);
    const moonSign = getMoonSign(activeProfile.birthDate, activeProfile.birthTime);
    const risingSign = calculateRisingSign(sunSign, birthHour);
    const element = getZodiacElement(sunSign);
    const lifePath = calculateLifePath(activeProfile.birthDate);
    const destiny = calculateDestinyNumber(activeProfile.name);
    const soulUrge = calculateSoulUrge(activeProfile.name);
    const personality = calculatePersonalityNumber(activeProfile.name);
    const chineseAnimal = calculateChineseZodiac(y);
    const chineseElement = calculateChineseElement(y);
    const sunData = ZODIAC_SIGNS[sunSign];
    const moonData = MOON_SIGNS[moonSign];
    const risingData = RISING_SIGNS[risingSign];
    const chineseData = CHINESE_ZODIAC[chineseAnimal];
    const elementData = ELEMENT_MEANINGS[chineseElement];
    const dominantPlanet = PLANET_LIST.find((p) => p.planet === 'jupiter') ?? PLANET_LIST[0];

    return {
      sunSign, moonSign, risingSign, element, lifePath, destiny, soulUrge, personality,
      chineseAnimal, chineseElement, sunData, moonData, risingData, chineseData, elementData,
      dominantPlanet, name: activeProfile.name, birthDate: activeProfile.birthDate,
    };
  }, [activeProfile]);

  const numerologyData = useMemo(() => {
    if (!data) return [];
    return [
      { label: 'Life Path', value: data.lifePath, desc: ZODIAC_SIGNS[data.sunSign]?.personality[0] ?? '' },
      { label: 'Destiny', value: data.destiny, desc: ZODIAC_SIGNS[data.sunSign]?.strengths[0] ?? '' },
      { label: 'Soul Urge', value: data.soulUrge, desc: ZODIAC_SIGNS[data.sunSign]?.spiritualTraits[0] ?? '' },
      { label: 'Personality', value: data.personality, desc: ZODIAC_SIGNS[data.sunSign]?.weaknesses[0] ?? '' },
    ];
  }, [data]);

  const elementData = useMemo(() => {
    if (!data) return [];
    const elements = ['fire', 'earth', 'air', 'water'];
    const signs = ['aries,leo,sagittarius', 'taurus,virgo,capricorn', 'gemini,libra,aquarius', 'cancer,scorpio,pisces'];
    const today = new Date().getDate();
    return elements.map((el, i) => ({
      name: el,
      signs: signs[i],
      isDominant: data.element === el,
      score: data.element === el ? 85 : 30 + ((today + i * 7) * 13) % 40,
    }));
  }, [data]);

  if (!activeProfile || !data) {
    return (
      <ScrollView style={[styles.scroll, { backgroundColor: theme.background }]}
        contentContainerStyle={{ paddingBottom: insets.bottom + Spacing.six }}>
        <View style={styles.content}>
          <Text style={[styles.title, { color: theme.text }]}>Analytics</Text>
          <Text style={[styles.subtitle, { color: theme.textSecondary }]}>Advanced cosmic data visualizations</Text>
          <View style={[styles.card, { backgroundColor: theme.card, borderColor: theme.cardBorder }]}>
            <Text style={[styles.emptyText, { color: theme.textSecondary }]}>Create a profile to see analytics.</Text>
          </View>
        </View>
      </ScrollView>
    );
  }

  const readAnalysis = () => {
    const text = `Analytics for ${data.name}. Sun sign ${data.sunSign}, moon sign ${data.moonSign}, rising sign ${data.risingSign}. Life path number ${data.lifePath}, destiny number ${data.destiny}. Dominant element is ${data.element}. Chinese zodiac ${data.chineseAnimal}.`;
    speak(text);
  };

  return (
    <ScrollView style={[styles.scroll, { backgroundColor: theme.background }]}
      contentContainerStyle={{ paddingBottom: insets.bottom + Spacing.six }}>
      <View style={styles.content}>
        <View style={styles.headerRow}>
          <View style={{ flex: 1 }}>
            <Text style={[styles.title, { color: theme.text }]}>Analytics</Text>
            <Text style={[styles.subtitle, { color: theme.textSecondary }]}>Advanced charts & insights</Text>
          </View>
          <Pressable
            onPress={readAnalysis}
            style={({ pressed }) => [styles.speakBtn, { backgroundColor: isSpeaking ? theme.accent + '30' : theme.card, borderColor: theme.cardBorder, opacity: pressed ? 0.7 : 1 }]}
          >
            <CosmicIcon name={isSpeaking ? 'StopCircle' : 'VolumeHigh'} size={22} color={theme.accent} />
          </Pressable>
        </View>

        <View style={styles.tabRow}>
          {(['energy', 'numerology', 'elements'] as const).map((t) => (
            <Pressable key={t} onPress={() => setTab(t)}
              style={[styles.tabBtn, { backgroundColor: tab === t ? theme.accent : theme.surface, borderColor: tab === t ? theme.accent : theme.border }]}>
              <Text style={[styles.tabText, { color: tab === t ? '#fff' : theme.text, fontWeight: tab === t ? '700' : '500' }]}>{capitalize(t)}</Text>
            </Pressable>
          ))}
        </View>

        {tab === 'energy' && (
          <>
            <View style={[styles.card, { backgroundColor: theme.card, borderColor: theme.cardBorder }]}>
              <Text style={[styles.sectionTitle, { color: theme.text }]}>Astrological Profile</Text>
              <View style={styles.statRow}>
                <Text style={[styles.statLabel, { color: theme.textSecondary }]}>Sun Sign</Text>
                <Text style={[styles.statValue, { color: theme.accent }]}>{capitalize(data.sunSign)}</Text>
              </View>
              <View style={styles.statRow}>
                <Text style={[styles.statLabel, { color: theme.textSecondary }]}>Moon Sign</Text>
                <Text style={[styles.statValue, { color: theme.accent }]}>{capitalize(data.moonSign)}</Text>
              </View>
              <View style={styles.statRow}>
                <Text style={[styles.statLabel, { color: theme.textSecondary }]}>Rising Sign</Text>
                <Text style={[styles.statValue, { color: theme.accent }]}>{capitalize(data.risingSign)}</Text>
              </View>
              <View style={styles.statRow}>
                <Text style={[styles.statLabel, { color: theme.textSecondary }]}>Chinese Zodiac</Text>
                <Text style={[styles.statValue, { color: theme.accent }]}>{capitalize(data.chineseAnimal)} · {data.elementData.name}</Text>
              </View>
              <View style={styles.statRow}>
                <Text style={[styles.statLabel, { color: theme.textSecondary }]}>Western Element</Text>
                <Text style={[styles.statValue, { color: ELEMENT_COLORS[data.element] ?? theme.accent }]}>{capitalize(data.element)}</Text>
              </View>
            </View>

            <View style={[styles.card, { backgroundColor: theme.card, borderColor: theme.cardBorder }]}>
              <Text style={[styles.sectionTitle, { color: theme.text }]}>Sun Sign {capitalize(data.sunSign)}</Text>
              <View style={styles.traitGrid}>
                {data.sunData.personality.slice(0, 6).map((trait, i) => (
                  <View key={i} style={[styles.traitPill, { backgroundColor: theme.accent + '15' }]}>
                    <Text style={[styles.traitText, { color: theme.accent }]}>{trait}</Text>
                  </View>
                ))}
              </View>
            </View>

            <View style={[styles.card, { backgroundColor: theme.card, borderColor: theme.cardBorder }]}>
              <Text style={[styles.sectionTitle, { color: theme.text }]}>Strengths vs Weaknesses</Text>
              <View style={styles.barRow}>
                <View style={{ flex: 1 }}>
                  <View style={styles.barWrap}>
                    <View style={[styles.bar, { backgroundColor: theme.accentGreen + '20' }]}>
                      <View style={[styles.barFill, { backgroundColor: theme.accentGreen, width: '70%' as any }]} />
                      <Text style={styles.barLabel}>Strengths</Text>
                    </View>
                  </View>
                </View>
              </View>
              <View style={styles.barRow}>
                <View style={{ flex: 1 }}>
                  <View style={styles.barWrap}>
                    <View style={[styles.bar, { backgroundColor: theme.accentOrange + '20' }]}>
                      <View style={[styles.barFill, { backgroundColor: theme.accentOrange, width: '30%' as any }]} />
                      <Text style={styles.barLabel}>Weaknesses</Text>
                    </View>
                  </View>
                </View>
              </View>
              <View style={{ gap: 6, marginTop: 8 }}>
                {data.sunData.strengths.slice(0, 3).map((s, i) => (
                  <Text key={i} style={[styles.bulletItem, { color: theme.accentGreen }]}>✓ {s}</Text>
                ))}
                {data.sunData.weaknesses.slice(0, 3).map((w, i) => (
                  <Text key={i} style={[styles.bulletItem, { color: theme.accentOrange }]}>○ {w}</Text>
                ))}
              </View>
            </View>
          </>
        )}

        {tab === 'numerology' && (
          <>
            <View style={[styles.card, { backgroundColor: theme.card, borderColor: theme.cardBorder }]}>
              <Text style={[styles.sectionTitle, { color: theme.text }]}>Core Numbers</Text>
              <View style={styles.numGrid}>
                {numerologyData.map((item, i) => {
                  const pct = Math.min(100, (item.value / 9) * 100);
                  const c = NUMEROLOGY_COLORS[i % NUMEROLOGY_COLORS.length];
                  return (
                    <View key={item.label}>
                      <View style={styles.numLabelRow}>
                        <Text style={[styles.numLabel, { color: theme.textSecondary }]}>{item.label}</Text>
                        <Text style={[styles.numValue, { color: c }]}>{item.value}</Text>
                      </View>
                      <View style={styles.numBarWrap}>
                        <View style={[styles.numBar, { backgroundColor: c + '20' }]}>
                          <View style={[styles.numBarFill, { backgroundColor: c, width: `${pct}%` as any }]} />
                        </View>
                      </View>
                    </View>
                  );
                })}
              </View>
            </View>

            <View style={[styles.card, { backgroundColor: theme.card, borderColor: theme.cardBorder }]}>
              <Text style={[styles.sectionTitle, { color: theme.text }]}>Number Distribution</Text>
              <Text style={[styles.cardDesc, { color: theme.textSecondary }]}>How your name numbers distribute across the chart</Text>
              <View style={styles.distGrid}>
                {Array.from({ length: 9 }, (_, i) => {
                  const num = i + 1;
                  const count = [data.lifePath, data.destiny, data.soulUrge, data.personality].filter((v) => v === num || v === num + 9).length;
                  return (
                    <View key={num} style={styles.distItem}>
                      <Text style={[styles.distNum, { color: theme.text }]}>{num}</Text>
                      <View style={[styles.distBarTrack, { backgroundColor: theme.border }]}>
                        <View style={[styles.distBarFill, { backgroundColor: NUMEROLOGY_COLORS[i], height: `${Math.max(10, count * 30)}%` as any, alignSelf: 'center' as const }]} />
                      </View>
                      <Text style={[styles.distCount, { color: theme.textSecondary }]}>{count}x</Text>
                    </View>
                  );
                })}
              </View>
            </View>
          </>
        )}

        {tab === 'elements' && (
          <>
            <View style={[styles.card, { backgroundColor: theme.card, borderColor: theme.cardBorder }]}>
              <Text style={[styles.sectionTitle, { color: theme.text }]}>Element Distribution</Text>
              <Text style={[styles.cardDesc, { color: theme.textSecondary }]}>Your dominant and supporting elements</Text>
              <View style={{ gap: 14, marginTop: 8 }}>
                {elementData.map((el) => (
                  <View key={el.name}>
                    <View style={styles.elementLabelRow}>
                      <View style={[styles.elementDot, { backgroundColor: ELEMENT_COLORS[el.name] }]} />
                      <Text style={[styles.elementLabel, { color: theme.text, fontWeight: el.isDominant ? '800' : '500' }]}>{capitalize(el.name)}</Text>
                      <Text style={[styles.elementScore, { color: ELEMENT_COLORS[el.name] }]}>{el.score}%</Text>
                    </View>
                    <View style={styles.elementBarWrap}>
                      <View style={[styles.elementBar, { backgroundColor: ELEMENT_COLORS[el.name] + '20' }]}>
                        <View style={[styles.elementBarFill, { backgroundColor: ELEMENT_COLORS[el.name], width: `${el.score}%` as any }]} />
                      </View>
                    </View>
                    {el.isDominant && <Text style={[styles.dominantBadge, { color: theme.accent }]}>★ Dominant Element</Text>}
                  </View>
                ))}
              </View>
            </View>

            <View style={[styles.card, { backgroundColor: theme.card, borderColor: theme.cardBorder }]}>
              <Text style={[styles.sectionTitle, { color: theme.text }]}>Elemental Balance</Text>
              <View style={styles.elementBreakdown}>
                <View style={[styles.balanceItem, { backgroundColor: theme.surface }]}>
                  <Text style={[styles.balanceTitle, { color: theme.text }]}>Dominant</Text>
                  <Text style={[styles.balanceValue, { color: ELEMENT_COLORS[data.element], fontSize: 32 }]}>{capitalize(data.element)}</Text>
                  <Text style={[styles.balanceDesc, { color: theme.textSecondary }]}>Your primary elemental energy — embrace its power and use it to guide your decisions.</Text>
                </View>
                <View style={[styles.balanceItem, { backgroundColor: theme.surface }]}>
                  <Text style={[styles.balanceTitle, { color: theme.text }]}>Balance Tip</Text>
                  <Text style={[styles.balanceDesc, { color: theme.textSecondary }]}>Seek activities and environments that balance your {data.element} energy with its complementary elements for optimal harmony.</Text>
                </View>
              </View>
            </View>

            <View style={[styles.card, { backgroundColor: theme.card, borderColor: theme.cardBorder }]}>
              <Text style={[styles.sectionTitle, { color: theme.text }]}>Chinese Element</Text>
              <View style={styles.chineseElementRow}>
                <Text style={[styles.chineseElementName, { color: theme.accent }]}>{data.elementData.name}</Text>
                <Text style={[styles.chineseElementDir, { color: theme.textSecondary }]}>Direction: {data.elementData.direction}</Text>
              </View>
              <View style={styles.traitGrid}>
                {data.elementData.personalityInfluence.split(',').slice(0, 4).map((trait: string, i: number) => (
                  <View key={i} style={[styles.traitPill, { backgroundColor: theme.accent + '15' }]}>
                    <Text style={[styles.traitText, { color: theme.accent }]}>{trait.trim()}</Text>
                  </View>
                ))}
              </View>
            </View>
          </>
        )}
      </View>
    </ScrollView>
  );
}

function capitalize(s: string): string { return s.charAt(0).toUpperCase() + s.slice(1); }

const styles = StyleSheet.create({
  scroll: { flex: 1 },
  content: { padding: Spacing.four, gap: Spacing.three },
  title: { fontSize: 28, fontWeight: '800' },
  subtitle: { fontSize: 15, marginBottom: 4 },
  headerRow: { flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'space-between' },
  speakBtn: { width: 44, height: 44, borderRadius: 12, borderWidth: 1, alignItems: 'center', justifyContent: 'center' },
  speakIcon: { fontSize: 20 },
  card: { borderRadius: 14, borderWidth: 1, padding: Spacing.four, gap: 10 },
  cardDesc: { fontSize: 13, lineHeight: 18 },
  emptyText: { fontSize: 15, textAlign: 'center' },
  tabRow: { flexDirection: 'row', gap: 8 },
  tabBtn: { flex: 1, paddingVertical: 10, borderRadius: 10, borderWidth: 1, alignItems: 'center' },
  tabText: { fontSize: 13 },
  sectionTitle: { fontSize: 17, fontWeight: '700' },
  statRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  statLabel: { fontSize: 14, fontWeight: '500' },
  statValue: { fontSize: 15, fontWeight: '700' },
  traitGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 6 },
  traitPill: { paddingHorizontal: 12, paddingVertical: 6, borderRadius: 20 },
  traitText: { fontSize: 13, fontWeight: '600' },
  barRow: { gap: 4 },
  barWrap: { height: 32 },
  bar: {
    flex: 1,
    borderRadius: 8,
    overflow: 'hidden',
    justifyContent: 'center',
  },
  barFill: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    borderRadius: 8,
  },
  barLabel: {
    paddingHorizontal: 14,
    fontSize: 13,
    fontWeight: '700',
    color: '#ffffff',
    zIndex: 1,
  },
  bulletItem: { fontSize: 13, lineHeight: 20 },
  numGrid: { gap: 14 },
  numLabelRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 4 },
  numLabel: { fontSize: 12, fontWeight: '600' },
  numValue: { fontSize: 24, fontWeight: '800' },
  numBarWrap: { height: 28 },
  numBar: {
    flex: 1,
    borderRadius: 8,
    overflow: 'hidden',
    justifyContent: 'center',
  },
  numBarFill: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    borderRadius: 8,
  },
  distGrid: { flexDirection: 'row', justifyContent: 'space-between', height: 120, marginTop: 8 },
  distItem: { alignItems: 'center', gap: 4, flex: 1 },
  distNum: { fontSize: 13, fontWeight: '700' },
  distBarTrack: { flex: 1, width: 8, borderRadius: 4, justifyContent: 'flex-end' },
  distBarFill: { width: 8, borderRadius: 4 },
  distCount: { fontSize: 10, fontWeight: '600' },
  elementLabelRow: { flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 4 },
  elementDot: { width: 10, height: 10, borderRadius: 5 },
  elementLabel: { fontSize: 14, flex: 1 },
  elementScore: { fontSize: 14, fontWeight: '700' },
  elementBarWrap: { height: 28 },
  elementBar: {
    flex: 1,
    borderRadius: 8,
    overflow: 'hidden',
    justifyContent: 'center',
  },
  elementBarFill: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    borderRadius: 8,
  },
  dominantBadge: { fontSize: 12, fontWeight: '700', marginTop: 2 },
  elementBreakdown: { gap: 10 },
  balanceItem: { borderRadius: 12, padding: Spacing.three, gap: 6 },
  balanceTitle: { fontSize: 12, fontWeight: '700', textTransform: 'uppercase', letterSpacing: 0.3 },
  balanceValue: { fontWeight: '800' },
  balanceDesc: { fontSize: 13, lineHeight: 18 },
  chineseElementRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  chineseElementName: { fontSize: 20, fontWeight: '800' },
  chineseElementDir: { fontSize: 13, fontWeight: '500' },
});
