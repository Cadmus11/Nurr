import { useMemo, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Pressable } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useTheme } from '@/hooks/use-theme';
import { useProfileStore } from '@/stores/profile-store';
import { Spacing } from '@/constants/theme';
import { calculateSunSign, getMoonSign, calculateLifePath, calculateChineseZodiac, calculateCompatibility } from '@/utils/calculations';
import type { Profile } from '@/types/cosmic';

const SCORE_LABELS: { key: keyof import('@/types/cosmic').CompatibilityScore; label: string }[] = [
  { key: 'love', label: 'Love' },
  { key: 'friendship', label: 'Friendship' },
  { key: 'business', label: 'Business' },
  { key: 'marriage', label: 'Marriage' },
  { key: 'communication', label: 'Communication' },
  { key: 'spiritual', label: 'Spiritual' },
  { key: 'family', label: 'Family' },
];

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

    const avg = Object.values(scores).reduce((s, c) => s + c, 0) / Object.values(scores).length;

    return { scores, strengths, weaknesses, average: Math.round(avg) };
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
              <View style={{ gap: 12 }}>
                <View style={[styles.card, { backgroundColor: theme.card, borderColor: theme.cardBorder }]}>
                  <Text style={[styles.statLabel, { color: theme.textSecondary }]}>Compatibility Scores</Text>
                  {SCORE_LABELS.map(({ key, label }) => {
                    const score = result.scores[key];
                    return (
                      <View key={key} style={styles.scoreRow}>
                        <Text style={[styles.scoreLabel, { color: theme.text }]}>{label}</Text>
                        <View style={[styles.scoreTrack, { backgroundColor: theme.border }]}>
                          <View style={[styles.scoreFill, { backgroundColor: score > 80 ? theme.accentGreen : score > 60 ? theme.accentOrange : theme.accent, width: `${score}%` as any }]} />
                        </View>
                        <Text style={[styles.scoreValue, { color: theme.textSecondary }]}>{score}%</Text>
                      </View>
                    );
                  })}
                </View>

                <View style={[styles.card, { backgroundColor: theme.card, borderColor: theme.cardBorder }]}>
                  <Text style={[styles.statLabel, { color: theme.textSecondary }]}>Analysis</Text>
                  {result.strengths.length > 0 && (
                    <View style={{ gap: 4 }}>
                      <Text style={[styles.strengthLabel, { color: theme.accentGreen }]}>Strengths</Text>
                      {result.strengths.map((s, i) => <Text key={i} style={[styles.bullet, { color: theme.text }]}>✦ {s}</Text>)}
                    </View>
                  )}
                  {result.weaknesses.length > 0 && (
                    <View style={{ gap: 4, marginTop: 8 }}>
                      <Text style={[styles.strengthLabel, { color: theme.accentOrange }]}>Growth Areas</Text>
                      {result.weaknesses.map((w, i) => <Text key={i} style={[styles.bullet, { color: theme.text }]}>✦ {w}</Text>)}
                    </View>
                  )}
                </View>
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
  card: { borderRadius: 14, borderWidth: 1, padding: Spacing.four, gap: 12 },
  cardTitle: { fontSize: 18, fontWeight: '700' },
  cardDesc: { fontSize: 14, textAlign: 'center' },
  pickerRow: { flexDirection: 'row', gap: 12 },
  fieldLabel: { fontSize: 11, fontWeight: '700', textTransform: 'uppercase', letterSpacing: 0.5 },
  profileBtn: { paddingVertical: 8, paddingHorizontal: 14, borderRadius: 8, borderWidth: 1 },
  profileText: { fontSize: 13 },
  statLabel: { fontSize: 12, fontWeight: '700', textTransform: 'uppercase', letterSpacing: 0.5 },
  scoreRow: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  scoreLabel: { fontSize: 13, fontWeight: '600', width: 100 },
  scoreTrack: { flex: 1, height: 8, borderRadius: 4 },
  scoreFill: { height: 8, borderRadius: 4 },
  scoreValue: { fontSize: 13, fontWeight: '700', width: 36, textAlign: 'right' },
  strengthLabel: { fontSize: 13, fontWeight: '700', marginBottom: 4 },
  bullet: { fontSize: 14, lineHeight: 22 },
});
