import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useLocalSearchParams } from 'expo-router';
import { useTheme } from '@/hooks/use-theme';
import { Spacing } from '@/constants/theme';
import { findBrand } from '@/constants/cosmic/brands';

const ELEMENT_COLORS: Record<string, string> = {
  fire: '#f97316', earth: '#22c55e', air: '#3b82f6', water: '#06b6d4',
};

const NUMBER_EMOJIS: Record<number, string> = {
  1: '🥇', 2: '🤝', 3: '🎨', 4: '🏛️', 5: '✈️',
  6: '💚', 7: '🔍', 8: '💎', 9: '🌍', 11: '🔮', 22: '🏗️', 33: '🕊️',
};

export default function BrandDetailScreen() {
  const { slug } = useLocalSearchParams<{ slug: string }>();
  const insets = useSafeAreaInsets();
  const theme = useTheme();
  const brand = slug ? findBrand(slug) : undefined;

  if (!brand) {
    return (
      <View style={[styles.container, { backgroundColor: theme.background }]}>
        <Text style={[styles.errorText, { color: theme.textTertiary }]}>Brand not found</Text>
      </View>
    );
  }

  const { astrology, numerology, luckyColors, luckyNumbers, keywords, energy, logo, name, tagline, description, founder, foundedYear, category } = brand;
  const elemColor = ELEMENT_COLORS[astrology.element] ?? theme.accent;

  return (
    <ScrollView style={[styles.scroll, { backgroundColor: theme.background }]}
      contentContainerStyle={{ paddingBottom: insets.bottom + Spacing.six }}>
      <View style={styles.content}>

        {/* Header */}
        <View style={[styles.headerCard, { backgroundColor: theme.card, borderColor: theme.cardBorder }]}>
          <Text style={styles.headerLogo}>{logo}</Text>
          <Text style={[styles.headerName, { color: theme.text }]}>{name}</Text>
          <Text style={[styles.headerTagline, { color: theme.textSecondary }]}>{tagline}</Text>
          <View style={styles.headerMeta}>
            <Text style={[styles.headerYear, { color: theme.textTertiary }]}>
              Founded {foundedYear} by {founder}
            </Text>
          </View>
        </View>

        {/* Brand Number */}
        <View style={[styles.heroCard, { backgroundColor: theme.card, borderColor: theme.cardBorder }]}>
          <Text style={styles.heroEmoji}>{NUMBER_EMOJIS[numerology.brandNumber] ?? '⭐'}</Text>
          <Text style={[styles.heroNumber, { color: theme.accent }]}>#{numerology.brandNumber}</Text>
          <Text style={[styles.heroExpression, { color: theme.text }]}>{numerology.expression}</Text>
          <Text style={[styles.heroEnergy, { color: theme.textSecondary }]}>{energy}</Text>
        </View>

        {/* Split: Astrology + Numerology Strengths */}
        <View style={styles.row}>
          <View style={[styles.halfCard, { backgroundColor: theme.card, borderColor: theme.cardBorder }]}>
            <Text style={[styles.sectionIcon, { color: theme.accent }]}>♄</Text>
            <Text style={[styles.sectionTitle, { color: theme.text }]}>Astrology</Text>
            <View style={[styles.badge, { backgroundColor: elemColor + '20' }]}>
              <Text style={[styles.badgeText, { color: elemColor }]}>♈ {astrology.zodiacSign}</Text>
            </View>
            <Text style={[styles.statLabel, { color: theme.textSecondary }]}>Ruling Planet</Text>
            <Text style={[styles.statValue, { color: theme.text }]}>{astrology.rulingPlanet}</Text>
            <Text style={[styles.statLabel, { color: theme.textSecondary }]}>Element</Text>
            <Text style={[styles.statValue, { color: elemColor }]}>{astrology.element}</Text>
            <Text style={[styles.statLabel, { color: theme.textSecondary }]}>Compatible Signs</Text>
            <Text style={[styles.statValue, { color: theme.text }]}>
              {astrology.compatibleSigns.map((s: string) => s.charAt(0).toUpperCase() + s.slice(1)).join(', ')}
            </Text>
          </View>

          <View style={[styles.halfCard, { backgroundColor: theme.card, borderColor: theme.cardBorder }]}>
            <Text style={[styles.sectionIcon, { color: theme.accentOrange }]}>#</Text>
            <Text style={[styles.sectionTitle, { color: theme.text }]}>Strengths</Text>
            {numerology.strengths.map((s: string, i: number) => (
              <View key={i} style={styles.bulletRow}>
                <Text style={[styles.bullet, { color: theme.accentGreen }]}>▸</Text>
                <Text style={[styles.bulletText, { color: theme.text }]}>{s}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* Keywords */}
        <View style={[styles.card, { backgroundColor: theme.card, borderColor: theme.cardBorder }]}>
          <Text style={[styles.sectionTitle, { color: theme.text }]}>Keywords</Text>
          <View style={styles.tagRow}>
            {keywords.map((kw: string, i: number) => (
              <View key={i} style={[styles.tag, { backgroundColor: theme.surface, borderColor: theme.border }]}>
                <Text style={[styles.tagText, { color: theme.textSecondary }]}>{kw}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* Lucky Colors + Numbers */}
        <View style={styles.row}>
          <View style={[styles.halfCard, { backgroundColor: theme.card, borderColor: theme.cardBorder }]}>
            <Text style={[styles.sectionIcon, { color: theme.accent }]}>🎨</Text>
            <Text style={[styles.sectionTitle, { color: theme.text }]}>Lucky Colors</Text>
            <View style={styles.colorRow}>
              {luckyColors.map((c: string, i: number) => (
                <View key={i} style={[styles.colorDot, { backgroundColor: c }]} />
              ))}
            </View>
            <View style={{ gap: 4 }}>
              {luckyColors.map((c: string, i: number) => (
                <Text key={i} style={[styles.colorLabel, { color: theme.textSecondary }]}>{c}</Text>
              ))}
            </View>
          </View>

          <View style={[styles.halfCard, { backgroundColor: theme.card, borderColor: theme.cardBorder }]}>
            <Text style={[styles.sectionIcon, { color: theme.accentOrange }]}>🔢</Text>
            <Text style={[styles.sectionTitle, { color: theme.text }]}>Lucky Numbers</Text>
            {luckyNumbers.map((n: number, i: number) => (
              <View key={i} style={styles.numRow}>
                <Text style={[styles.numValue, { color: theme.accent }]}>{n}</Text>
                <View style={[styles.numBarBg, { backgroundColor: theme.surface, borderColor: theme.border }]}>
                  <View style={[styles.numBarFill, { backgroundColor: theme.accent, width: `${(n % 9 + 1) * 10}%` as any }]} />
                </View>
              </View>
            ))}
          </View>
        </View>

        {/* Challenges */}
        <View style={[styles.card, { backgroundColor: theme.card, borderColor: theme.cardBorder }]}>
          <Text style={[styles.sectionTitle, { color: theme.text }]}>Challenges</Text>
          {numerology.challenges.map((c: string, i: number) => (
            <View key={i} style={styles.bulletRow}>
              <Text style={[styles.bullet, { color: theme.error }]}>▸</Text>
              <Text style={[styles.bulletText, { color: theme.textSecondary }]}>{c}</Text>
            </View>
          ))}
        </View>

        {/* Description */}
        <View style={[styles.card, { backgroundColor: theme.card, borderColor: theme.cardBorder }]}>
          <Text style={[styles.sectionTitle, { color: theme.text }]}>About</Text>
          <Text style={[styles.descText, { color: theme.textSecondary }]}>{description}</Text>
          <Text style={[styles.catLabel, { color: theme.textTertiary, marginTop: 12 }]}>
            Category: {category.replace('-', ' ')}
          </Text>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  errorText: { fontSize: 16 },
  scroll: { flex: 1 },
  content: { padding: Spacing.four, gap: Spacing.three },
  headerCard: { borderRadius: 14, borderWidth: 1, padding: Spacing.four, alignItems: 'center', gap: 8 },
  headerLogo: { fontSize: 56 },
  headerName: { fontSize: 24, fontWeight: '800' },
  headerTagline: { fontSize: 14, textAlign: 'center', fontStyle: 'italic' },
  headerMeta: { marginTop: 4 },
  headerYear: { fontSize: 12, textAlign: 'center' },
  heroCard: { borderRadius: 14, borderWidth: 1, padding: Spacing.four, alignItems: 'center', gap: 8 },
  heroEmoji: { fontSize: 48 },
  heroNumber: { fontSize: 56, fontWeight: '900' },
  heroExpression: { fontSize: 16, fontWeight: '700', textAlign: 'center' },
  heroEnergy: { fontSize: 13, textAlign: 'center', lineHeight: 18, fontStyle: 'italic' },
  row: { flexDirection: 'row', gap: 10 },
  halfCard: { flex: 1, borderRadius: 14, borderWidth: 1, padding: Spacing.three, gap: 6 },
  sectionIcon: { fontSize: 20, textAlign: 'center' },
  sectionTitle: { fontSize: 16, fontWeight: '700', textAlign: 'center', marginBottom: 4 },
  badge: { alignSelf: 'center', paddingHorizontal: 12, paddingVertical: 4, borderRadius: 8 },
  badgeText: { fontSize: 13, fontWeight: '700' },
  statLabel: { fontSize: 11, fontWeight: '600', textTransform: 'uppercase', letterSpacing: 0.3, marginTop: 4 },
  statValue: { fontSize: 14, fontWeight: '600' },
  bulletRow: { flexDirection: 'row', gap: 6, alignItems: 'flex-start' },
  bullet: { fontSize: 14, lineHeight: 20 },
  bulletText: { fontSize: 13, lineHeight: 20, flex: 1 },
  card: { borderRadius: 14, borderWidth: 1, padding: Spacing.three, gap: 8 },
  tagRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 6 },
  tag: { paddingHorizontal: 10, paddingVertical: 4, borderRadius: 8, borderWidth: 0.5 },
  tagText: { fontSize: 12, fontWeight: '600' },
  colorRow: { flexDirection: 'row', gap: 8, justifyContent: 'center' },
  colorDot: { width: 28, height: 28, borderRadius: 14, borderWidth: 1, borderColor: 'rgba(0,0,0,0.1)' },
  colorLabel: { fontSize: 11, textAlign: 'center' },
  numRow: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  numValue: { fontSize: 16, fontWeight: '800', width: 24 },
  numBarBg: { flex: 1, height: 8, borderRadius: 4, borderWidth: 0.5, overflow: 'hidden' },
  numBarFill: { height: 8, borderRadius: 4 },
  descText: { fontSize: 14, lineHeight: 22 },
  catLabel: { fontSize: 12, fontWeight: '600', textTransform: 'uppercase', letterSpacing: 0.3 },
});
