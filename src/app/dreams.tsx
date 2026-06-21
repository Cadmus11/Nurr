import { useState, useMemo } from 'react';
import { View, Text, StyleSheet, ScrollView, TextInput, Pressable } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useTheme } from '@/hooks/use-theme';
import { Spacing } from '@/constants/theme';
import { DREAM_SYMBOLS } from '@/constants/cosmic/dreamSymbols';
import type { DreamCategory } from '@/types/cosmic';

const CATEGORIES: { key: DreamCategory; label: string; icon: string }[] = [
  { key: 'animals', label: 'Animals', icon: '🐾' },
  { key: 'nature', label: 'Nature', icon: '🌿' },
  { key: 'water', label: 'Water', icon: '🌊' },
  { key: 'flying', label: 'Flying', icon: '✈' },
  { key: 'people', label: 'People', icon: '👥' },
  { key: 'objects', label: 'Objects', icon: '🔑' },
  { key: 'places', label: 'Places', icon: '🏠' },
  { key: 'body', label: 'Body', icon: '👤' },
  { key: 'birth', label: 'Birth', icon: '👶' },
  { key: 'death', label: 'Death', icon: '💀' },
  { key: 'food', label: 'Food', icon: '🍎' },
  { key: 'clothing', label: 'Clothing', icon: '👕' },
  { key: 'buildings', label: 'Buildings', icon: '🏛' },
  { key: 'vehicles', label: 'Vehicles', icon: '🚗' },
];

export default function DreamsScreen() {
  const insets = useSafeAreaInsets();
  const theme = useTheme();
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState<DreamCategory | null>(null);

  const results = useMemo(() => {
    let filtered = DREAM_SYMBOLS;
    if (category) filtered = filtered.filter((s) => s.category === category);
    if (query.trim()) {
      const q = query.toLowerCase().trim();
      filtered = filtered.filter((s) => s.symbol.toLowerCase().includes(q) || s.traditionalMeaning.toLowerCase().includes(q));
    }
    return filtered.slice(0, 30);
  }, [query, category]);

  return (
    <ScrollView style={[styles.scroll, { backgroundColor: theme.background }]}
      keyboardShouldPersistTaps="handled"
      contentContainerStyle={{ paddingBottom: insets.bottom + Spacing.six }}>
      <View style={styles.content}>
        <Text style={[styles.title, { color: theme.text }]}>Dream Interpretation</Text>
        <Text style={[styles.subtitle, { color: theme.textSecondary }]}>Explore the meaning behind your dreams</Text>

        <TextInput
          style={[styles.input, { backgroundColor: theme.inputBg, borderColor: theme.inputBorder, color: theme.text }]}
          placeholder="Search dream symbols..."
          placeholderTextColor={theme.placeholder}
          value={query}
          onChangeText={(t) => { setQuery(t); setCategory(null); }}
        />

        {!query && !category && (
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.catScroll}>
            <View style={styles.catRow}>
              {CATEGORIES.map((c) => (
                <Pressable key={c.key} onPress={() => setCategory(c.key)}
                  style={[styles.catBtn, { backgroundColor: theme.surface, borderColor: theme.border }]}>
                  <Text style={styles.catIcon}>{c.icon}</Text>
                  <Text style={[styles.catLabel, { color: theme.text }]}>{c.label}</Text>
                </Pressable>
              ))}
            </View>
          </ScrollView>
        )}

        {category && (
          <Pressable onPress={() => setCategory(null)} style={[styles.clearBtn, { backgroundColor: theme.accent + '20' }]}>
            <Text style={[styles.clearText, { color: theme.accent }]}>✕ {CATEGORIES.find((c) => c.key === category)?.label}</Text>
          </Pressable>
        )}

        {results.length === 0 ? (
          <Text style={[styles.emptyText, { color: theme.textTertiary }]}>No symbols found. Try a different search.</Text>
        ) : (
          results.map((symbol) => (
            <View key={symbol.symbol} style={[styles.symbolCard, { backgroundColor: theme.card, borderColor: theme.cardBorder }]}>
              <Text style={[styles.symbolName, { color: theme.accent }]}>{symbol.symbol}</Text>
              <Text style={[styles.symbolMeaning, { color: theme.text }]}>{symbol.traditionalMeaning}</Text>
              <Text style={[styles.symbolSpiritual, { color: theme.textSecondary }]}>{symbol.spiritualMeaning}</Text>
              <Text style={[styles.symbolPsych, { color: theme.textTertiary }]}>{symbol.psychologicalMeaning}</Text>
              <Text style={[styles.symbolAdvice, { color: theme.accentGreen, fontStyle: 'italic' }]}>{symbol.advice}</Text>
            </View>
          ))
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
  input: { borderWidth: 1, borderRadius: 12, paddingHorizontal: 16, paddingVertical: 14, fontSize: 16 },
  catScroll: { marginBottom: 4 },
  catRow: { flexDirection: 'row', gap: 8, paddingVertical: 4 },
  catBtn: { flexDirection: 'row', alignItems: 'center', gap: 6, paddingHorizontal: 14, paddingVertical: 10, borderRadius: 10, borderWidth: 1 },
  catIcon: { fontSize: 16 },
  catLabel: { fontSize: 13, fontWeight: '600' },
  clearBtn: { paddingVertical: 8, paddingHorizontal: 14, borderRadius: 8, alignSelf: 'flex-start' },
  clearText: { fontSize: 13, fontWeight: '600' },
  symbolCard: { borderRadius: 14, borderWidth: 1, padding: Spacing.three, gap: 6 },
  symbolName: { fontSize: 18, fontWeight: '800' },
  symbolMeaning: { fontSize: 14, lineHeight: 20 },
  symbolSpiritual: { fontSize: 13, lineHeight: 19, fontStyle: 'italic' },
  symbolPsych: { fontSize: 13, lineHeight: 19 },
  symbolAdvice: { fontSize: 13, lineHeight: 19, marginTop: 2 },
  emptyText: { fontSize: 14, textAlign: 'center', marginTop: Spacing.four },
});
