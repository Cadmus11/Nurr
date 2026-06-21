import { useState, useMemo } from 'react';
import { View, Text, StyleSheet, ScrollView, Pressable } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useTheme } from '@/hooks/use-theme';
import { Spacing } from '@/constants/theme';
import { TAROT_CARDS } from '@/constants/cosmic/tarot';
import type { TarotCard, TarotSpread } from '@/types/cosmic';

const SPREADS: { key: TarotSpread; label: string; positions: string[] }[] = [
  { key: 'single', label: 'Single Card', positions: ['Guidance'] },
  { key: 'three', label: 'Three Card', positions: ['Past', 'Present', 'Future'] },
];

export default function TarotScreen() {
  const insets = useSafeAreaInsets();
  const theme = useTheme();
  const [spread, setSpread] = useState<TarotSpread>('single');
  const [reading, setReading] = useState<{ cards: TarotCard[]; spread: TarotSpread } | null>(null);

  const spreadConfig = useMemo(() => SPREADS.find((s) => s.key === spread) ?? SPREADS[0], [spread]);

  const drawCards = () => {
    const count = spread === 'single' ? 1 : 3;
    const shuffled = [...TAROT_CARDS].sort(() => Math.random() - 0.5);
    setReading({ cards: shuffled.slice(0, count), spread });
  };

  return (
    <ScrollView style={[styles.scroll, { backgroundColor: theme.background }]}
      contentContainerStyle={{ paddingBottom: insets.bottom + Spacing.six }}>
      <View style={styles.content}>
        <Text style={[styles.title, { color: theme.text }]}>Tarot</Text>
        <Text style={[styles.subtitle, { color: theme.textSecondary }]}>Draw cards and explore their meanings</Text>

        <View style={styles.spreadRow}>
          {SPREADS.map((s) => (
            <Pressable key={s.key} onPress={() => { setSpread(s.key); setReading(null); }}
              style={[styles.spreadBtn, { backgroundColor: spread === s.key ? theme.accent : theme.surface, borderColor: spread === s.key ? theme.accent : theme.border }]}>
              <Text style={[styles.spreadText, { color: spread === s.key ? '#fff' : theme.text, fontWeight: spread === s.key ? '700' : '500' }]}>{s.label}</Text>
            </Pressable>
          ))}
        </View>

        <Pressable onPress={drawCards} style={({ pressed }) => [styles.drawBtn, { backgroundColor: theme.accent, opacity: pressed ? 0.8 : 1 }]}>
          <Text style={styles.drawText}>Draw Cards</Text>
        </Pressable>

        {reading && (
          <View style={styles.cardsSection}>
            {reading.cards.map((card, i) => (
              <View key={card.id + '-' + i} style={[styles.card, { backgroundColor: theme.card, borderColor: theme.cardBorder }]}>
                <Text style={[styles.cardPosition, { color: theme.textSecondary }]}>{spreadConfig.positions[i] ?? `Card ${i + 1}`}</Text>
                <Text style={[styles.cardName, { color: theme.accent }]}>{card.name}</Text>
                <Text style={[styles.cardSub, { color: theme.textTertiary }]}>
                  {card.arcana === 'major' ? 'Major Arcana' : `${capitalize(card.suit ?? '')} · ${numberLabel(card.number)}`}
                </Text>
                <View style={[styles.divider, { backgroundColor: theme.border }]} />
                <Text style={[styles.cardMeaning, { color: theme.text }]}>{card.meaning}</Text>
                {card.keywords.length > 0 && (
                  <Text style={[styles.keywords, { color: theme.textSecondary }]}>Keywords: {card.keywords.join(' · ')}</Text>
                )}
                <Text style={[styles.advice, { color: theme.accentGreen, fontStyle: 'italic' }]}>{card.advice}</Text>
              </View>
            ))}
          </View>
        )}
      </View>
    </ScrollView>
  );
}

function capitalize(s: string): string { return s.charAt(0).toUpperCase() + s.slice(1); }

function numberLabel(n?: number): string {
  if (!n) return '';
  const labels = ['', 'Ace', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight', 'Nine', 'Ten', 'Page', 'Knight', 'Queen', 'King'];
  return labels[n] ?? String(n);
}

const styles = StyleSheet.create({
  scroll: { flex: 1 },
  content: { padding: Spacing.four, gap: Spacing.three },
  title: { fontSize: 28, fontWeight: '800' },
  subtitle: { fontSize: 15, marginBottom: 8 },
  spreadRow: { flexDirection: 'row', gap: 8 },
  spreadBtn: { flex: 1, paddingVertical: 12, borderRadius: 10, borderWidth: 1, alignItems: 'center' },
  spreadText: { fontSize: 14 },
  drawBtn: { paddingVertical: 16, borderRadius: 14, alignItems: 'center' },
  drawText: { color: '#fff', fontSize: 16, fontWeight: '700' },
  cardsSection: { gap: 12 },
  card: { borderRadius: 14, borderWidth: 1, padding: Spacing.four, gap: 8 },
  cardPosition: { fontSize: 11, fontWeight: '700', textTransform: 'uppercase', letterSpacing: 0.5 },
  cardName: { fontSize: 22, fontWeight: '800' },
  cardSub: { fontSize: 13 },
  divider: { height: 1, marginVertical: 4 },
  cardMeaning: { fontSize: 15, lineHeight: 22 },
  keywords: { fontSize: 12, fontStyle: 'italic', lineHeight: 18 },
  advice: { fontSize: 14, lineHeight: 20, marginTop: 4 },
});
