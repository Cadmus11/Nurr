import { useMemo } from 'react';
import { View, Text, StyleSheet, ScrollView, Pressable } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useLocalSearchParams, router } from 'expo-router';
import { useTheme } from '@/hooks/use-theme';
import { Spacing } from '@/constants/theme';
import { findAngelNumber } from '@/constants/cosmic/angelNumbers';

export default function AngelNumberDetailScreen() {
  const { number } = useLocalSearchParams<{ number: string }>();
  const insets = useSafeAreaInsets();
  const theme = useTheme();

  const data = useMemo(() => findAngelNumber(number), [number]);

  if (!data) {
    return (
      <View style={[styles.container, { backgroundColor: theme.background }]}>
        <Text style={[styles.errorText, { color: theme.textTertiary }]}>Angel number &ldquo;{number}&rdquo; not found.</Text>
        <Pressable onPress={() => router.back()}>
          <Text style={[styles.backLink, { color: theme.accent }]}>← Go back</Text>
        </Pressable>
      </View>
    );
  }

  return (
    <ScrollView style={[styles.scroll, { backgroundColor: theme.background }]}
      contentContainerStyle={{ paddingBottom: insets.bottom + Spacing.six }}>
      <View style={styles.content}>
        <Pressable onPress={() => router.back()} style={styles.backRow}>
          <Text style={[styles.backText, { color: theme.accent }]}>← Angel Numbers</Text>
        </Pressable>

        <Text style={[styles.number, { color: theme.accent }]}>{data.number}</Text>

        <View style={[styles.card, { backgroundColor: theme.card, borderColor: theme.cardBorder }]}>
          <Text style={[styles.sectionLabel, { color: theme.textSecondary }]}>Meaning</Text>
          <Text style={[styles.sectionValue, { color: theme.text }]}>{data.meaning}</Text>
        </View>

        <View style={[styles.card, { backgroundColor: theme.card, borderColor: theme.cardBorder }]}>
          <Text style={[styles.sectionLabel, { color: theme.textSecondary }]}>Message</Text>
          <Text style={[styles.sectionValue, { color: theme.text }]}>{data.message}</Text>
        </View>

        <View style={[styles.affirmationCard, { backgroundColor: theme.accent + '10', borderColor: theme.accent + '30' }]}>
          <Text style={[styles.affLabel, { color: theme.textSecondary }]}>Affirmation</Text>
          <Text style={[styles.affText, { color: theme.accent }]}>{data.affirmation}</Text>
        </View>

        <View style={[styles.card, { backgroundColor: theme.card, borderColor: theme.cardBorder }]}>
          <Text style={[styles.sectionLabel, { color: theme.textSecondary }]}>Manifestation Advice</Text>
          <Text style={[styles.sectionValue, { color: theme.text }]}>{data.manifestationAdvice}</Text>
        </View>

        {data.warnings.length > 0 && (
          <View style={[styles.warningCard, { backgroundColor: theme.accentOrange + '10', borderColor: theme.accentOrange + '30' }]}>
            <Text style={[styles.warnLabel, { color: theme.accentOrange }]}>⚠ Warnings</Text>
            {data.warnings.map((w, i) => (
              <Text key={i} style={[styles.warnItem, { color: theme.text }]}>○ {w}</Text>
            ))}
          </View>
        )}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', justifyContent: 'center', gap: 12, padding: Spacing.four },
  scroll: { flex: 1 },
  content: { padding: Spacing.four, gap: Spacing.three },
  backRow: { marginBottom: 4 },
  backText: { fontSize: 15, fontWeight: '600' },
  number: { fontSize: 56, fontWeight: '900', textAlign: 'center', marginVertical: 8 },
  card: { borderRadius: 14, borderWidth: 1, padding: Spacing.four, gap: 8 },
  sectionLabel: { fontSize: 11, fontWeight: '700', textTransform: 'uppercase', letterSpacing: 0.5 },
  sectionValue: { fontSize: 15, lineHeight: 22 },
  affirmationCard: { borderRadius: 14, borderWidth: 1, padding: Spacing.four, alignItems: 'center', gap: 8 },
  affLabel: { fontSize: 11, fontWeight: '700', textTransform: 'uppercase', letterSpacing: 0.5 },
  affText: { fontSize: 16, fontStyle: 'italic', textAlign: 'center', lineHeight: 24 },
  warningCard: { borderRadius: 14, borderWidth: 1, padding: Spacing.four, gap: 8 },
  warnLabel: { fontSize: 14, fontWeight: '800' },
  warnItem: { fontSize: 14, lineHeight: 20 },
  errorText: { fontSize: 16, textAlign: 'center' },
  backLink: { fontSize: 15, fontWeight: '600', marginTop: 8 },
});
