import { useState } from 'react';
import { View, Text, TextInput, StyleSheet, ScrollView, Pressable } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useTheme } from '@/hooks/use-theme';
import { Spacing } from '@/constants/theme';

const PYTHAGOREAN: Record<string, number> = {
  a: 1, b: 2, c: 3, d: 4, e: 5, f: 6, g: 7, h: 8, i: 9,
  j: 1, k: 2, l: 3, m: 4, n: 5, o: 6, p: 7, q: 8, r: 9,
  s: 1, t: 2, u: 3, v: 4, w: 5, x: 6, y: 7, z: 8,
};

const CHALDEAN: Record<string, number> = {
  a: 1, b: 2, c: 3, d: 4, e: 5, f: 6, g: 7, h: 8, i: 1,
  j: 1, k: 2, l: 3, m: 4, n: 5, o: 7, p: 8, q: 1, r: 2,
  s: 3, t: 4, u: 6, v: 6, w: 6, x: 5, y: 1, z: 7,
};

function reduceToRoot(n: number): number {
  if (n === 11 || n === 22 || n === 33) return n;
  while (n > 9) n = String(n).split('').reduce((s, d) => s + Number(d), 0);
  return n;
}

function analyzeName(name: string, system: Record<string, number>) {
  const letters = name.replace(/[^a-zA-Z]/g, '').toLowerCase().split('');
  const values = letters.map((l) => ({ letter: l, value: system[l] ?? 0 }));
  const total = values.reduce((s, v) => s + v.value, 0);
  const root = reduceToRoot(total);
  const vowels = ['a', 'e', 'i', 'o', 'u'];
  const vowelValues = values.filter((v) => vowels.includes(v.letter));
  const consonantValues = values.filter((v) => !vowels.includes(v.letter));
  const soulUrge = reduceToRoot(vowelValues.reduce((s, v) => s + v.value, 0));
  const outerSelf = reduceToRoot(consonantValues.reduce((s, v) => s + v.value, 0));
  return { values, total, root, soulUrge, outerSelf };
}

const MEANINGS: Record<number, string> = {
  1: 'Leader, independent, pioneer — natural innovator who blazes their own trail.',
  2: 'Peacemaker, intuitive, cooperative — thrives in partnership and harmony.',
  3: 'Creative, expressive, optimistic — natural communicator with artistic gifts.',
  4: 'Builder, practical, disciplined — creates lasting foundations through hard work.',
  5: 'Adventurer, versatile, freedom-loving — thrives on change and new experiences.',
  6: 'Nurturer, responsible, loving — devoted to family, community, and service.',
  7: 'Seeker, analytical, spiritual — deep thinker drawn to wisdom and truth.',
  8: 'Ambitious, powerful, abundant — natural executive with executive presence.',
  9: 'Humanitarian, wise, selfless — compassionate soul with global vision.',
  11: 'Intuitive, enlightened, visionary — spiritual teacher with heightened awareness.',
  22: 'Master builder, visionary, practical — turns grand dreams into reality.',
  33: 'Master teacher, compassionate, inspiring — heals and uplifts humanity.',
};

export default function LetterologyScreen() {
  const insets = useSafeAreaInsets();
  const theme = useTheme();
  const [name, setName] = useState('');
  const [system, setSystem] = useState<'pythagorean' | 'chaldean'>('pythagorean');
  const result = name.trim() ? analyzeName(name.trim(), system === 'pythagorean' ? PYTHAGOREAN : CHALDEAN) : null;

  return (
    <ScrollView style={[styles.scroll, { backgroundColor: theme.background }]}
      keyboardShouldPersistTaps="handled"
      contentContainerStyle={{ paddingBottom: insets.bottom + Spacing.six }}>
      <View style={styles.content}>
        <Text style={[styles.title, { color: theme.text }]}>Letterology</Text>
        <Text style={[styles.subtitle, { color: theme.textSecondary }]}>
          Discover the vibration and meaning hidden in every letter of your name.
        </Text>

        <TextInput
          style={[styles.input, { backgroundColor: theme.inputBg, borderColor: theme.inputBorder, color: theme.text }]}
          placeholder="Enter your full name"
          placeholderTextColor={theme.placeholder}
          value={name}
          onChangeText={setName}
          autoCapitalize="words"
        />

        <View style={styles.systemRow}>
          <Pressable onPress={() => setSystem('pythagorean')}
            style={[styles.systemBtn, { backgroundColor: system === 'pythagorean' ? theme.accent : theme.surface, borderColor: system === 'pythagorean' ? theme.accent : theme.border }]}>
            <Text style={[styles.systemText, { color: system === 'pythagorean' ? '#fff' : theme.text }]}>Pythagorean</Text>
          </Pressable>
          <Pressable onPress={() => setSystem('chaldean')}
            style={[styles.systemBtn, { backgroundColor: system === 'chaldean' ? theme.accent : theme.surface, borderColor: system === 'chaldean' ? theme.accent : theme.border }]}>
            <Text style={[styles.systemText, { color: system === 'chaldean' ? '#fff' : theme.text }]}>Chaldean</Text>
          </Pressable>
        </View>

        {result && (
          <View style={styles.results}>
            <View style={[styles.card, { backgroundColor: theme.card, borderColor: theme.cardBorder }]}>
              <Text style={[styles.statLabel, { color: theme.textSecondary }]}>Expression Number ({system === 'pythagorean' ? 'Pythagorean' : 'Chaldean'})</Text>
              <Text style={[styles.statValue, { color: theme.accent }]}>{result.root}</Text>
              <Text style={[styles.statDesc, { color: theme.text }]}>{MEANINGS[result.root] ?? ''}</Text>
            </View>

            <View style={styles.row}>
              <View style={[styles.halfCard, { backgroundColor: theme.card, borderColor: theme.cardBorder }]}>
                <Text style={[styles.statLabel, { color: theme.textSecondary }]}>Inner Self (Vowels)</Text>
                <Text style={[styles.statValueSm, { color: theme.accentOrange }]}>{result.soulUrge}</Text>
                <Text style={[styles.statDescSm, { color: theme.textSecondary }]}>{MEANINGS[result.soulUrge] ?? ''}</Text>
              </View>
              <View style={[styles.halfCard, { backgroundColor: theme.card, borderColor: theme.cardBorder }]}>
                <Text style={[styles.statLabel, { color: theme.textSecondary }]}>Outer Self (Consonants)</Text>
                <Text style={[styles.statValueSm, { color: theme.accentGreen }]}>{result.outerSelf}</Text>
                <Text style={[styles.statDescSm, { color: theme.textSecondary }]}>{MEANINGS[result.outerSelf] ?? ''}</Text>
              </View>
            </View>

            <View style={[styles.chartCard, { backgroundColor: theme.card, borderColor: theme.cardBorder }]}>
              <Text style={[styles.chartTitle, { color: theme.text }]}>Letter Breakdown</Text>
              {result.values.map((v, i) => (
                <View key={i} style={[styles.letterRow, { borderBottomColor: theme.borderLight }]}>
                  <Text style={[styles.letterChar, { color: theme.text }]}>{v.letter.toUpperCase()}</Text>
                  <Text style={[styles.letterEq, { color: theme.textSecondary }]}>= {v.value}</Text>
                  <View style={[styles.letterBar, { backgroundColor: theme.accent + '20' }]}>
                    <View style={[styles.letterFill, { backgroundColor: theme.accent, width: `${(v.value / (system === 'chaldean' ? 8 : 9)) * 100}%` as any }]} />
                  </View>
                </View>
              ))}
              <View style={[styles.letterTotal, { borderTopColor: theme.border }]}>
                <Text style={[styles.totalLabel, { color: theme.text }]}>Total</Text>
                <Text style={[styles.totalValue, { color: theme.accent }]}>{result.total} → {result.root}</Text>
              </View>
            </View>
          </View>
        )}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scroll: { flex: 1 },
  content: { padding: Spacing.four, gap: Spacing.three },
  title: { fontSize: 28, fontWeight: '800' },
  subtitle: { fontSize: 15, marginBottom: 8 },
  input: { borderWidth: 1, borderRadius: 12, paddingHorizontal: 16, paddingVertical: 14, fontSize: 18, fontWeight: '600' },
  systemRow: { flexDirection: 'row', gap: 8 },
  systemBtn: { flex: 1, paddingVertical: 10, borderRadius: 10, borderWidth: 1, alignItems: 'center' },
  systemText: { fontSize: 14, fontWeight: '600' },
  results: { gap: 12 },
  card: { borderRadius: 14, borderWidth: 1, padding: Spacing.four, alignItems: 'center', gap: 8 },
  statLabel: { fontSize: 12, fontWeight: '700', textTransform: 'uppercase', letterSpacing: 0.5 },
  statValue: { fontSize: 48, fontWeight: '900' },
  statValueSm: { fontSize: 36, fontWeight: '900' },
  statDesc: { fontSize: 14, textAlign: 'center', lineHeight: 20 },
  statDescSm: { fontSize: 12, textAlign: 'center', lineHeight: 18 },
  row: { flexDirection: 'row', gap: 10 },
  halfCard: { flex: 1, borderRadius: 14, borderWidth: 1, padding: Spacing.three, alignItems: 'center', gap: 6 },
  chartCard: { borderRadius: 14, borderWidth: 1, padding: Spacing.three, gap: 6 },
  chartTitle: { fontSize: 16, fontWeight: '700', marginBottom: 4 },
  letterRow: { flexDirection: 'row', alignItems: 'center', gap: 10, paddingVertical: 6, borderBottomWidth: 1 },
  letterChar: { fontSize: 18, fontWeight: '800', width: 24 },
  letterEq: { fontSize: 13, fontWeight: '600', width: 30 },
  letterBar: { flex: 1, height: 8, borderRadius: 4, overflow: 'hidden' },
  letterFill: { height: 8, borderRadius: 4 },
  letterTotal: { flexDirection: 'row', justifyContent: 'space-between', paddingTop: 10, borderTopWidth: 1, marginTop: 4 },
  totalLabel: { fontSize: 16, fontWeight: '700' },
  totalValue: { fontSize: 16, fontWeight: '800' },
});
