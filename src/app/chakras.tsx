import { useState, useMemo } from 'react';
import { View, Text, StyleSheet, ScrollView, Pressable } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useTheme } from '@/hooks/use-theme';
import { Spacing } from '@/constants/theme';
import { CHAKRAS } from '@/constants/cosmic/chakras';
import type { ChakraName } from '@/types/cosmic';

const CHAKRA_ORDER: ChakraName[] = ['root', 'sacral', 'solar-plexus', 'heart', 'throat', 'third-eye', 'crown'];

export default function ChakrasScreen() {
  const insets = useSafeAreaInsets();
  const theme = useTheme();
  const [selected, setSelected] = useState<ChakraName>('root');

  const chakra = useMemo(() => CHAKRAS[selected], [selected]);

  return (
    <ScrollView style={[styles.scroll, { backgroundColor: theme.background }]}
      contentContainerStyle={{ paddingBottom: insets.bottom + Spacing.six }}>
      <View style={styles.content}>
        <Text style={[styles.title, { color: theme.text }]}>Chakras</Text>
        <Text style={[styles.subtitle, { color: theme.textSecondary }]}>Balance your energy centers</Text>

        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.chakraScroll}>
          <View style={styles.chakraRow}>
            {CHAKRA_ORDER.map((name) => {
              const c = CHAKRAS[name];
              const isActive = selected === name;
              return (
                <Pressable key={name} onPress={() => setSelected(name)} style={[styles.chakraBtn, { borderColor: isActive ? c.color : theme.border, backgroundColor: isActive ? c.color + '20' : theme.surface }]}>
                  <View style={[styles.chakraDot, { backgroundColor: c.color }]} />
                  <Text style={[styles.chakraLabel, { color: isActive ? c.color : theme.textSecondary, fontWeight: isActive ? '700' : '500' }]}>{c.title}</Text>
                </Pressable>
              );
            })}
          </View>
        </ScrollView>

        {chakra && (
          <View style={{ gap: 12 }}>
            <View style={[styles.headerCard, { backgroundColor: chakra.color + '15', borderColor: chakra.color + '40' }]}>
              <View style={[styles.chakraBigDot, { backgroundColor: chakra.color }]} />
              <Text style={[styles.headerTitle, { color: theme.text }]}>{chakra.title}</Text>
              <Text style={[styles.headerSub, { color: theme.textSecondary }]}>Element: {chakra.element} · Location: {chakra.location}</Text>
            </View>

            <SectionCard label="Strengths" items={chakra.strengths} theme={theme} />
            <SectionCard label="Weaknesses" items={chakra.weaknesses} theme={theme} />
            <SectionCard label="Balance Suggestions" items={chakra.balanceSuggestions} theme={theme} />
            <SectionCard label="Crystals" items={chakra.crystals} theme={theme} />

            <View style={[styles.card, { backgroundColor: theme.card, borderColor: theme.cardBorder }]}>
              <Text style={[styles.cardLabel, { color: theme.textSecondary }]}>Meditation</Text>
              <Text style={[styles.cardValue, { color: theme.text }]}>{chakra.meditationAdvice}</Text>
            </View>

            <View style={[styles.affirmationCard, { backgroundColor: theme.accent + '10', borderColor: theme.accent + '30' }]}>
              <Text style={[styles.affLabel, { color: theme.textSecondary }]}>Affirmation</Text>
              <Text style={[styles.affText, { color: theme.accent }]}>{chakra.affirmation}</Text>
            </View>
          </View>
        )}
      </View>
    </ScrollView>
  );
}

function SectionCard({ label, items, theme }: { label: string; items: string[]; theme: any }) {
  return (
    <View style={[styles.card, { backgroundColor: theme.card, borderColor: theme.cardBorder }]}>
      <Text style={[styles.cardLabel, { color: theme.textSecondary }]}>{label}</Text>
      {items.map((item, i) => (
        <View key={i} style={styles.itemRow}>
          <Text style={[styles.bullet, { color: theme.accent }]}>●</Text>
          <Text style={[styles.itemText, { color: theme.text }]}>{item}</Text>
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  scroll: { flex: 1 },
  content: { padding: Spacing.four, gap: Spacing.three },
  title: { fontSize: 28, fontWeight: '800' },
  subtitle: { fontSize: 15, marginBottom: 8 },
  chakraScroll: { marginBottom: 4 },
  chakraRow: { flexDirection: 'row', gap: 8, paddingVertical: 4 },
  chakraBtn: { flexDirection: 'row', alignItems: 'center', gap: 8, paddingHorizontal: 14, paddingVertical: 10, borderRadius: 10, borderWidth: 1 },
  chakraDot: { width: 12, height: 12, borderRadius: 6 },
  chakraLabel: { fontSize: 12, fontWeight: '600' },
  headerCard: { borderRadius: 14, borderWidth: 1, padding: Spacing.four, alignItems: 'center', gap: 8 },
  chakraBigDot: { width: 48, height: 48, borderRadius: 24 },
  headerTitle: { fontSize: 22, fontWeight: '800' },
  headerSub: { fontSize: 13 },
  card: { borderRadius: 12, borderWidth: 1, padding: Spacing.three, gap: 6 },
  cardLabel: { fontSize: 11, fontWeight: '700', textTransform: 'uppercase', letterSpacing: 0.5, marginBottom: 2 },
  cardValue: { fontSize: 15, lineHeight: 22 },
  itemRow: { flexDirection: 'row', gap: 8 },
  bullet: { fontSize: 8, marginTop: 6 },
  itemText: { fontSize: 14, flex: 1, lineHeight: 20 },
  affirmationCard: { borderRadius: 14, borderWidth: 1, padding: Spacing.four, alignItems: 'center', gap: 8 },
  affLabel: { fontSize: 11, fontWeight: '700', textTransform: 'uppercase', letterSpacing: 0.5 },
  affText: { fontSize: 16, fontStyle: 'italic', textAlign: 'center', lineHeight: 24 },
});
