import { useMemo, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Pressable } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useTheme } from '@/hooks/use-theme';
import { useProfileStore } from '@/stores/profile-store';
import { Spacing } from '@/constants/theme';
import { calculateSunSign, getMoonSign, calculateLifePath, calculateChineseZodiac, calculateCompatibility } from '@/utils/calculations';
import type { Profile, CompatibilityScore } from '@/types/cosmic';

const SCORE_LABELS: { key: keyof CompatibilityScore; label: string; icon: string }[] = [
  { key: 'love', label: 'Love', icon: '❤' },
  { key: 'marriage', label: 'Marriage', icon: '💍' },
  { key: 'friendship', label: 'Friendship', icon: '🤝' },
  { key: 'business', label: 'Business', icon: '💼' },
  { key: 'communication', label: 'Communication', icon: '💬' },
  { key: 'spiritual', label: 'Spiritual', icon: '🌌' },
  { key: 'family', label: 'Family', icon: '👨‍👩‍👧‍👦' },
];

function getAdvice(scores: CompatibilityScore): string[] {
  const advice: string[] = [];
  const avg = Object.values(scores).reduce((s, c) => s + c, 0) / Object.values(scores).length;
  if (avg >= 80) advice.push('You share a rare cosmic harmony — nurture this connection with intention and gratitude.');
  else if (avg >= 65) advice.push('Strong foundation exists — focus on your growth areas to deepen the bond.');
  else if (avg >= 50) advice.push('Balance of harmony and challenge — communicate openly to bridge differences.');
  else advice.push('Opposing energies create tension — with awareness and effort, differences can become strengths.');
  if (scores.communication < 65) advice.push('Prioritize honest dialogue. Different communication styles need patience and practice.');
  if (scores.love < scores.friendship) advice.push('Build on your natural friendship — romantic depth often follows genuine connection.');
  if (scores.spiritual < 60) advice.push('Explore shared spiritual practices to align your deeper values.');
  if (scores.family < 65) advice.push('Discuss family values and expectations early to build alignment.');
  return advice;
}

function getGrowthAreas(scores: CompatibilityScore): string[] {
  const areas: string[] = [];
  const entries = Object.entries(scores) as [keyof CompatibilityScore, number][];
  const sorted = entries.sort(([, a], [, b]) => a - b);
  const lowest = sorted.slice(0, 3);
  for (const [key] of lowest) {
    const map: Record<string, string> = {
      love: 'Cultivate romantic connection through quality time and shared experiences.',
      marriage: 'Strengthen long-term alignment through shared goals and values.',
      friendship: 'Invest in mutual interests and genuine enjoyment of each other.',
      business: 'Define clear roles and complementary responsibilities.',
      communication: 'Practice active listening and non-defensive expression.',
      spiritual: 'Explore shared spiritual or philosophical practices.',
      family: 'Align on family traditions, boundaries, and future visions.',
    };
    areas.push(map[key] ?? 'Conscious effort in this area will bring balance.');
  }
  return areas;
}

export default function CompatibilityScreen() {
  const insets = useSafeAreaInsets();
  const theme = useTheme();
  const profiles = useProfileStore((s) => s.profiles);
  const [profileA, setProfileA] = useState<string | null>(null);
  const [profileB, setProfileB] = useState<string | null>(null);

  const result = useMemo(() => {
    if (!profileA || !profileB || profileA === profileB) return null;
    const a = profiles.find((p) => p.id === profileA);
    const b = profiles.find((p) => p.id === profileB);
    if (!a || !b) return null;

    const [ay, am, ad] = a.birthDate.split('-').map(Number);
    const [by, bm, bd] = b.birthDate.split('-').map(Number);
    const zodiacA = calculateSunSign(am, ad);
    const zodiacB = calculateSunSign(bm, bd);
    const moonA = getMoonSign(a.birthDate, a.birthTime);
    const moonB = getMoonSign(b.birthDate, b.birthTime);
    const lifePathA = calculateLifePath(a.birthDate);
    const lifePathB = calculateLifePath(b.birthDate);
    const chineseA = calculateChineseZodiac(ay);
    const chineseB = calculateChineseZodiac(by);

    const scores = calculateCompatibility({
      zodiacA, zodiacB,
      moonSignA: moonA, moonSignB: moonB,
      lifePathA, lifePathB,
      chineseAnimalA: chineseA, chineseAnimalB: chineseB,
    });

    const avg = Math.round(Object.values(scores).reduce((s, c) => s + c, 0) / Object.values(scores).length);

    const strengths: string[] = [];
    const weaknesses: string[] = [];
    const highScores = Object.entries(scores).filter(([, v]) => v >= 75).map(([k]) => k);
    const lowScores = Object.entries(scores).filter(([, v]) => v < 50).map(([k]) => k);
    if (highScores.length > 0) strengths.push(`Strong compatibility in: ${highScores.map(capitalize).join(', ')}`);
    if (lowScores.length > 0) weaknesses.push(`Areas for growth in: ${lowScores.map(capitalize).join(', ')}`);
    if (scores.love >= 80) strengths.push('Deep romantic potential — signs align harmoniously');
    if (scores.friendship >= 80) strengths.push('Natural friendship — you understand each other');
    if (scores.business >= 80) strengths.push('Strong business synergy — complementary skills');
    if (scores.communication < 60) weaknesses.push('Communication styles differ — practice patience');
    if (scores.spiritual < 60) weaknesses.push('Spiritual values may not fully align');

    const advice = getAdvice(scores);
    const growthAreas = getGrowthAreas(scores);

    return { scores, strengths, weaknesses, advice, growthAreas, average: avg, profileA: a, profileB: b };
  }, [profileA, profileB, profiles]);

  return (
    <ScrollView style={[styles.scroll, { backgroundColor: theme.background }]}
      contentContainerStyle={{ paddingBottom: insets.bottom + Spacing.six }}>
      <View style={styles.content}>
        <Text style={[styles.title, { color: theme.text }]}>Compatibility</Text>
        <Text style={[styles.subtitle, { color: theme.textSecondary }]}>Compare two profiles across all systems</Text>

        {profiles.length < 2 ? (
          <View style={[styles.card, { backgroundColor: theme.card, borderColor: theme.cardBorder }]}>
            <Text style={[styles.cardTitle, { color: theme.text }]}>Need Two Profiles</Text>
            <Text style={[styles.cardDesc, { color: theme.textSecondary }]}>Create at least two profiles to compare compatibility.</Text>
          </View>
        ) : (
          <>
            <View style={styles.pickerRow}>
              <ProfilePicker label="Profile A" profiles={profiles} selected={profileA} onSelect={setProfileA} theme={theme} />
              <ProfilePicker label="Profile B" profiles={profiles} selected={profileB} onSelect={setProfileB} theme={theme} />
            </View>

            {result && (
              <View style={{ gap: 14 }}>
                <View style={[styles.overallCard, { backgroundColor: theme.card, borderColor: theme.cardBorder }]}>
                  <Text style={[styles.overallLabel, { color: theme.textSecondary }]}>Overall Compatibility</Text>
                  <Text style={[styles.overallScore, {
                    color: result.average >= 75 ? theme.accentGreen : result.average >= 55 ? theme.accentOrange : theme.accent,
                  }]}>{result.average}%</Text>
                  <View style={[styles.overallTrack, { backgroundColor: theme.border }]}>
                    <View style={[styles.overallFill, {
                      backgroundColor: result.average >= 75 ? theme.accentGreen : result.average >= 55 ? theme.accentOrange : theme.accent,
                      width: `${result.average}%` as any,
                    }]} />
                  </View>
                </View>

                <View style={[styles.card, { backgroundColor: theme.card, borderColor: theme.cardBorder }]}>
                  <Text style={[styles.statLabel, { color: theme.textSecondary }]}>Category Scores</Text>
                  {SCORE_LABELS.map(({ key, label, icon }) => {
                    const score = result.scores[key];
                    return (
                      <View key={key} style={styles.scoreRow}>
                        <Text style={styles.scoreIcon}>{icon}</Text>
                        <Text style={[styles.scoreLabel, { color: theme.text }]}>{label}</Text>
                        <View style={[styles.scoreTrack, { backgroundColor: theme.border }]}>
                          <View style={[styles.scoreFill, {
                            backgroundColor: score >= 75 ? theme.accentGreen : score >= 55 ? theme.accentOrange : theme.accent,
                            width: `${score}%` as any,
                          }]} />
                        </View>
                        <Text style={[styles.scoreValue, { color: theme.textSecondary }]}>{score}%</Text>
                      </View>
                    );
                  })}
                </View>

                <View style={[styles.card, { backgroundColor: theme.card, borderColor: theme.cardBorder }]}>
                  <Text style={[styles.statLabel, { color: theme.textSecondary }]}>Advice</Text>
                  {result.advice.map((a, i) => (
                    <Text key={i} style={[styles.bulletText, { color: theme.text }]}>✦ {a}</Text>
                  ))}
                </View>

                <View style={[styles.card, { backgroundColor: theme.card, borderColor: theme.cardBorder }]}>
                  <Text style={[styles.statLabel, { color: theme.textSecondary }]}>Growth Areas</Text>
                  {result.growthAreas.map((g, i) => (
                    <Text key={i} style={[styles.bulletText, { color: theme.accentOrange }]}>○ {g}</Text>
                  ))}
                </View>

                {result.strengths.length > 0 && (
                  <View style={[styles.card, { backgroundColor: theme.card, borderColor: theme.cardBorder }]}>
                    <Text style={[styles.statLabel, { color: theme.accentGreen }]}>Strengths</Text>
                    {result.strengths.map((s, i) => (
                      <Text key={i} style={[styles.bulletText, { color: theme.text }]}>✦ {s}</Text>
                    ))}
                  </View>
                )}

                {result.weaknesses.length > 0 && (
                  <View style={[styles.card, { backgroundColor: theme.card, borderColor: theme.cardBorder }]}>
                    <Text style={[styles.statLabel, { color: theme.accentOrange }]}>Growth Areas</Text>
                    {result.weaknesses.map((w, i) => (
                      <Text key={i} style={[styles.bulletText, { color: theme.text }]}>✦ {w}</Text>
                    ))}
                  </View>
                )}
              </View>
            )}
          </>
        )}
      </View>
    </ScrollView>
  );
}

function ProfilePicker({ label, profiles, selected, onSelect, theme }: { label: string; profiles: Profile[]; selected: string | null; onSelect: (id: string) => void; theme: any }) {
  return (
    <View style={{ flex: 1, gap: 8 }}>
      <Text style={[styles.fieldLabel, { color: theme.textSecondary }]}>{label}</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ maxHeight: 140 }}>
        <View style={{ gap: 6 }}>
          {profiles.map((p) => (
            <Pressable key={p.id} onPress={() => onSelect(p.id)}
              style={[styles.profileBtn, { backgroundColor: selected === p.id ? theme.accent + '20' : theme.surface, borderColor: selected === p.id ? theme.accent : theme.border }]}>
              <Text style={[styles.profileText, { color: selected === p.id ? theme.accent : theme.text, fontWeight: selected === p.id ? '700' : '500' }]}>{p.name}</Text>
            </Pressable>
          ))}
        </View>
      </ScrollView>
    </View>
  );
}

function capitalize(s: string): string { return s.charAt(0).toUpperCase() + s.slice(1); }

const styles = StyleSheet.create({
  scroll: { flex: 1 },
  content: { padding: Spacing.four, gap: Spacing.three },
  title: { fontSize: 28, fontWeight: '800' },
  subtitle: { fontSize: 15, marginBottom: 8 },
  card: { borderRadius: 14, borderWidth: 1, padding: Spacing.four, gap: 10 },
  cardTitle: { fontSize: 18, fontWeight: '700' },
  cardDesc: { fontSize: 14, textAlign: 'center' },
  pickerRow: { flexDirection: 'row', gap: 12 },
  fieldLabel: { fontSize: 11, fontWeight: '700', textTransform: 'uppercase', letterSpacing: 0.5 },
  profileBtn: { paddingVertical: 8, paddingHorizontal: 14, borderRadius: 8, borderWidth: 1 },
  profileText: { fontSize: 13 },
  overallCard: { borderRadius: 20, borderWidth: 1, padding: Spacing.four, alignItems: 'center', gap: 8 },
  overallLabel: { fontSize: 12, fontWeight: '700', textTransform: 'uppercase', letterSpacing: 0.5 },
  overallScore: { fontSize: 56, fontWeight: '900' },
  overallTrack: { width: '100%', height: 10, borderRadius: 5 },
  overallFill: { height: 10, borderRadius: 5 },
  statLabel: { fontSize: 12, fontWeight: '700', textTransform: 'uppercase', letterSpacing: 0.5 },
  scoreRow: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  scoreIcon: { fontSize: 14, width: 24, textAlign: 'center' },
  scoreLabel: { fontSize: 13, fontWeight: '600', width: 90 },
  scoreTrack: { flex: 1, height: 8, borderRadius: 4 },
  scoreFill: { height: 8, borderRadius: 4 },
  scoreValue: { fontSize: 13, fontWeight: '700', width: 36, textAlign: 'right' },
  bulletText: { fontSize: 14, lineHeight: 22 },
});
