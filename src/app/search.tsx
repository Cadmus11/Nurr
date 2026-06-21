import { useState, useMemo } from 'react';
import { View, Text, StyleSheet, ScrollView, TextInput, Pressable } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useTheme } from '@/hooks/use-theme';
import { Spacing } from '@/constants/theme';
import { ZODIAC_SIGNS } from '@/constants/cosmic/zodiac';
import { CHINESE_ZODIAC } from '@/constants/cosmic/chineseZodiac';
import { TAROT_CARDS } from '@/constants/cosmic/tarot';
import { ANGEL_NUMBERS } from '@/constants/cosmic/angelNumbers';
import { DREAM_SYMBOLS } from '@/constants/cosmic/dreamSymbols';
import { SPIRIT_ANIMALS } from '@/constants/cosmic/spiritAnimals';
import { BIRTHSTONES } from '@/constants/cosmic/birthstones';

interface SearchResult {
  module: string;
  label: string;
  description: string;
  icon: string;
}

export default function SearchScreen() {
  const insets = useSafeAreaInsets();
  const theme = useTheme();
  const [query, setQuery] = useState('');

  const results = useMemo(() => {
    if (!query.trim()) return [];
    const q = query.toLowerCase().trim();
    const r: SearchResult[] = [];

    Object.values(ZODIAC_SIGNS).forEach((z) => {
      if (z.sign.includes(q) || z.personality.some((p) => p.toLowerCase().includes(q)) || z.strengths.some((s) => s.toLowerCase().includes(q))) {
        r.push({ module: 'Astrology', label: `${z.symbol} ${capitalize(z.sign)}`, description: z.dateRange, icon: z.symbol });
      }
    });

    Object.entries(CHINESE_ZODIAC).forEach(([animal, data]) => {
      if (animal.includes(q) || data.traits.toLowerCase().includes(q)) {
        r.push({ module: 'Chinese Zodiac', label: capitalize(animal), description: data.traits.slice(0, 100), icon: '🐉' });
      }
    });

    TAROT_CARDS.forEach((card) => {
      if (card.name.toLowerCase().includes(q) || card.keywords.some((k) => k.includes(q)) || card.meaning.toLowerCase().includes(q)) {
        r.push({ module: 'Tarot', label: card.name, description: card.meaning.slice(0, 100), icon: '▤' });
      }
    });

    ANGEL_NUMBERS.forEach((an) => {
      if (an.number.includes(q) || an.meaning.toLowerCase().includes(q)) {
        r.push({ module: 'Angel Numbers', label: an.number, description: an.meaning.slice(0, 100), icon: '✧' });
      }
    });

    DREAM_SYMBOLS.forEach((ds) => {
      if (ds.symbol.toLowerCase().includes(q) || ds.traditionalMeaning.toLowerCase().includes(q) || ds.category.includes(q)) {
        r.push({ module: 'Dreams', label: ds.symbol, description: ds.traditionalMeaning.slice(0, 100), icon: '☽' });
      }
    });

    SPIRIT_ANIMALS.forEach((sa) => {
      if (sa.animal.toLowerCase().includes(q) || sa.traits.some((t) => t.toLowerCase().includes(q))) {
        r.push({ module: 'Spirit Animals', label: sa.animal, description: sa.lifeGuidance, icon: '🐾' });
      }
    });

    BIRTHSTONES.forEach((bs) => {
      if (bs.stone.toLowerCase().includes(q)) {
        r.push({ module: 'Birthstones', label: bs.stone, description: bs.meaning.slice(0, 100), icon: '💎' });
      }
    });

    return r.slice(0, 30);
  }, [query]);

  return (
    <ScrollView style={[styles.scroll, { backgroundColor: theme.background }]}
      keyboardShouldPersistTaps="handled"
      contentContainerStyle={{ paddingBottom: insets.bottom + Spacing.six }}>
      <View style={styles.content}>
        <Text style={[styles.title, { color: theme.text }]}>Search</Text>
        <TextInput
          style={[styles.input, { backgroundColor: theme.inputBg, borderColor: theme.inputBorder, color: theme.text }]}
          placeholder="Search signs, numbers, dreams, cards..."
          placeholderTextColor={theme.placeholder}
          value={query}
          onChangeText={setQuery}
          autoFocus
        />

        {results.length === 0 && query.trim() ? (
          <Text style={[styles.emptyText, { color: theme.textTertiary }]}>No results found for "{query}"</Text>
        ) : null}

        {results.length > 0 && (
          <View style={{ gap: 8 }}>
            <Text style={[styles.resultCount, { color: theme.textSecondary }]}>{results.length} result{results.length !== 1 ? 's' : ''}</Text>
            {results.map((r, i) => (
              <View key={i} style={[styles.resultCard, { backgroundColor: theme.card, borderColor: theme.cardBorder }]}>
                <View style={styles.resultRow}>
                  <Text style={[styles.resultIcon, { color: theme.accent }]}>{r.icon}</Text>
                  <View style={{ flex: 1 }}>
                    <Text style={[styles.resultLabel, { color: theme.text }]}>{r.label}</Text>
                    <Text style={[styles.resultModule, { color: theme.accent }]}>{r.module}</Text>
                    <Text style={[styles.resultDesc, { color: theme.textSecondary }]} numberOfLines={2}>{r.description}</Text>
                  </View>
                </View>
              </View>
            ))}
          </View>
        )}

        {!query.trim() && (
          <View style={[styles.hintCard, { backgroundColor: theme.card, borderColor: theme.cardBorder }]}>
            <Text style={[styles.hintTitle, { color: theme.text }]}>Try searching for...</Text>
            {['Aries', 'Dragon', 'The Fool', '111', 'Water', 'Wolf', 'Ruby'].map((hint) => (
              <Pressable key={hint} onPress={() => setQuery(hint)}>
                <Text style={[styles.hintItem, { color: theme.accent }]}>✦ {hint}</Text>
              </Pressable>
            ))}
          </View>
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
  subtitle: { fontSize: 15, marginBottom: 8 },
  input: { borderWidth: 1, borderRadius: 12, paddingHorizontal: 16, paddingVertical: 14, fontSize: 16 },
  resultCount: { fontSize: 12, fontWeight: '600' },
  resultCard: { borderRadius: 12, borderWidth: 1, padding: Spacing.three },
  resultRow: { flexDirection: 'row', gap: 12 },
  resultIcon: { fontSize: 24, width: 32, textAlign: 'center' },
  resultLabel: { fontSize: 16, fontWeight: '700' },
  resultModule: { fontSize: 11, fontWeight: '700', textTransform: 'uppercase', letterSpacing: 0.3, marginTop: 2 },
  resultDesc: { fontSize: 13, lineHeight: 18, marginTop: 4 },
  hintCard: { borderRadius: 14, borderWidth: 1, padding: Spacing.four, gap: 10 },
  hintTitle: { fontSize: 15, fontWeight: '600', marginBottom: 4 },
  hintItem: { fontSize: 14, lineHeight: 24 },
  emptyText: { fontSize: 14, textAlign: 'center', marginTop: Spacing.four },
});
