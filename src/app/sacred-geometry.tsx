import { useState, useMemo } from 'react';
import { View, Text, StyleSheet, ScrollView, Pressable } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useTheme } from '@/hooks/use-theme';
import { Spacing } from '@/constants/theme';
import { SACRED_GEOMETRY } from '@/constants/cosmic/sacredGeometry';

export default function SacredGeometryScreen() {
  const insets = useSafeAreaInsets();
  const theme = useTheme();
  const [selected, setSelected] = useState(0);

  const symbol = useMemo(() => SACRED_GEOMETRY[selected], [selected]);

  return (
    <ScrollView style={[styles.scroll, { backgroundColor: theme.background }]}
      contentContainerStyle={{ paddingBottom: insets.bottom + Spacing.six }}>
      <View style={styles.content}>
        <Text style={[styles.title, { color: theme.text }]}>Sacred Geometry</Text>
        <Text style={[styles.subtitle, { color: theme.textSecondary }]}>
          Metatron's Cube, Flower of Life & Sri Yantra
        </Text>

        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <View style={styles.symbolRow}>
            {SACRED_GEOMETRY.map((s, i) => (
              <Pressable key={s.name} onPress={() => setSelected(i)}
                style={[styles.symbolBtn, { backgroundColor: selected === i ? theme.accent : theme.surface, borderColor: selected === i ? theme.accent : theme.border }]}>
                <Text style={[styles.symbolName, { color: selected === i ? '#fff' : theme.text, fontWeight: selected === i ? '700' : '500' }]}>{s.name}</Text>
              </Pressable>
            ))}
          </View>
        </ScrollView>

        {symbol && (
          <View style={{ gap: 12 }}>
            <View style={[styles.headerCard, { backgroundColor: theme.card, borderColor: theme.cardBorder }]}>
              <Text style={[styles.headerTitle, { color: theme.accent }]}>{symbol.name}</Text>
              <Text style={[styles.headerDesc, { color: theme.textSecondary }]}>{symbol.description}</Text>
            </View>

            <View style={[styles.card, { backgroundColor: theme.card, borderColor: theme.cardBorder }]}>
              <Text style={[styles.cardLabel, { color: theme.textSecondary }]}>Sacred Meaning</Text>
              <Text style={[styles.cardValue, { color: theme.text }]}>{symbol.meaning}</Text>
            </View>

            <View style={[styles.medCard, { backgroundColor: theme.accent + '10', borderColor: theme.accent + '30' }]}>
              <Text style={[styles.medLabel, { color: theme.textSecondary }]}>Meditation Use</Text>
              <Text style={[styles.medText, { color: theme.text }]}>{symbol.meditationUse}</Text>
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
  symbolRow: { flexDirection: 'row', gap: 8, paddingVertical: 4 },
  symbolBtn: { paddingVertical: 8, paddingHorizontal: 14, borderRadius: 10, borderWidth: 1 },
  symbolName: { fontSize: 12, fontWeight: '600' },
  headerCard: { borderRadius: 16, borderWidth: 1, padding: Spacing.four, gap: 8 },
  headerTitle: { fontSize: 22, fontWeight: '900', textAlign: 'center' },
  headerDesc: { fontSize: 14, lineHeight: 20, textAlign: 'center' },
  card: { borderRadius: 12, borderWidth: 1, padding: Spacing.three, gap: 6 },
  cardLabel: { fontSize: 11, fontWeight: '700', textTransform: 'uppercase', letterSpacing: 0.5, marginBottom: 4 },
  cardValue: { fontSize: 14, lineHeight: 22 },
  medCard: { borderRadius: 14, borderWidth: 1, padding: Spacing.four, gap: 8 },
  medLabel: { fontSize: 11, fontWeight: '700', textTransform: 'uppercase', letterSpacing: 0.5 },
  medText: { fontSize: 14, lineHeight: 22, fontStyle: 'italic' },
});
