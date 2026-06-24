import { useMemo, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Pressable } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useTheme } from '@/hooks/use-theme';
import { useProfileStore } from '@/stores/profile-store';
import { Spacing } from '@/constants/theme';
import { getEnemyYearInfo } from '@/utils/calculations';
import { CHINESE_ZODIAC } from '@/constants/cosmic/chineseZodiac';
import { CosmicIcon } from '@/components/cosmic-icon';
import type { ChineseZodiacAnimal } from '@/types/cosmic';

const ANIMAL_EMOJIS: Record<string, string> = {
  rat: '🐀', ox: '🐂', tiger: '🐅', rabbit: '🐇',
  dragon: '🐉', snake: '🐍', horse: '🐎', goat: '🐐',
  monkey: '🐒', rooster: '🐓', dog: '🐕', pig: '🐖',
};

const ALL_ANIMALS: ChineseZodiacAnimal[] = [
  'rat', 'ox', 'tiger', 'rabbit', 'dragon', 'snake',
  'horse', 'goat', 'monkey', 'rooster', 'dog', 'pig',
];

export default function EnemyYearsScreen() {
  const insets = useSafeAreaInsets();
  const theme = useTheme();
  const activeProfile = useProfileStore((s) => s.activeProfile);
  const [selectedAnimal, setSelectedAnimal] = useState<ChineseZodiacAnimal | null>(null);

  const info = useMemo(() => {
    if (!selectedAnimal) return null;
    return getEnemyYearInfo(selectedAnimal);
  }, [selectedAnimal]);

  if (!activeProfile) {
    return (
      <ScrollView style={[styles.scroll, { backgroundColor: theme.background }]}
        contentContainerStyle={{ paddingBottom: insets.bottom + Spacing.six }}>
        <View style={styles.content}>
          <Text style={[styles.title, { color: theme.text }]}>Enemy Years</Text>
          <Text style={[styles.subtitle, { color: theme.textSecondary }]}>Allies, neutral signs, enemies & prosperous years</Text>
          <View style={[styles.card, { backgroundColor: theme.card, borderColor: theme.cardBorder }]}>
            <Text style={[styles.cardTitle, { color: theme.text }]}>No Profile</Text>
            <Text style={[styles.cardDesc, { color: theme.textSecondary }]}>Create a profile to see your enemy years analysis.</Text>
          </View>
        </View>
      </ScrollView>
    );
  }

  return (
    <ScrollView style={[styles.scroll, { backgroundColor: theme.background }]}
      contentContainerStyle={{ paddingBottom: insets.bottom + Spacing.six }}>
      <View style={styles.content}>
        <Text style={[styles.title, { color: theme.text }]}>Enemy Years</Text>
        <Text style={[styles.subtitle, { color: theme.textSecondary }]}>Chinese zodiac relationships & cycles</Text>

        <Text style={[styles.sectionLabel, { color: theme.textSecondary }]}>Select Animal Sign</Text>
        <View style={styles.animalGrid}>
          {ALL_ANIMALS.map((animal) => {
            const isActive = selectedAnimal === animal;
            return (
              <Pressable key={animal} onPress={() => setSelectedAnimal(animal)}
                style={[styles.animalBtn, { backgroundColor: isActive ? theme.accent : theme.surface, borderColor: isActive ? theme.accent : theme.border }]}>
                <Text style={styles.animalEmoji}>{ANIMAL_EMOJIS[animal]}</Text>
                <Text style={[styles.animalLabel, { color: isActive ? '#fff' : theme.text, fontWeight: isActive ? '700' : '500' }]}>{capitalize(animal)}</Text>
              </Pressable>
            );
          })}
        </View>

        {info && (
          <View style={{ gap: 12 }}>
            <View style={[styles.featureCard, { backgroundColor: theme.card, borderColor: theme.cardBorder }]}>
              <Text style={styles.animalEmoji}>{ANIMAL_EMOJIS[info.animal]}</Text>
              <Text style={[styles.featureTitle, { color: theme.accent }]}>{capitalize(info.animal)}</Text>
              <Text style={[styles.featureSub, { color: theme.textSecondary }]}>{CHINESE_ZODIAC[info.animal].traits}</Text>
            </View>

            <View style={[styles.sectionCard, { backgroundColor: theme.card, borderColor: theme.cardBorder }]}>
              <View style={styles.sectionHeaderRow}>
                <CosmicIcon name="Profile2User" size={16} color={theme.accentGreen} />
                <Text style={[styles.sectionHeader, { color: theme.accentGreen }]}> Allies</Text>
              </View>
              <View style={styles.tagRow}>
                {info.allies.map((a) => (
                  <View key={a} style={[styles.tag, { backgroundColor: theme.accentGreen + '20', borderColor: theme.accentGreen + '40' }]}>
                    <Text style={[styles.tagText, { color: theme.accentGreen }]}>{ANIMAL_EMOJIS[a]} {capitalize(a)}</Text>
                  </View>
                ))}
              </View>
            </View>

            <View style={[styles.sectionCard, { backgroundColor: theme.card, borderColor: theme.cardBorder }]}>
              <View style={styles.sectionHeaderRow}>
                <CosmicIcon name="ElementEqual" size={16} color={theme.textSecondary} />
                <Text style={[styles.sectionHeader, { color: theme.textSecondary }]}> Neutral Signs</Text>
              </View>
              <View style={styles.tagRow}>
                {info.neutral.map((a) => (
                  <View key={a} style={[styles.tag, { backgroundColor: theme.surface, borderColor: theme.border }]}>
                    <Text style={[styles.tagText, { color: theme.textSecondary }]}>{ANIMAL_EMOJIS[a]} {capitalize(a)}</Text>
                  </View>
                ))}
              </View>
            </View>

            <View style={[styles.sectionCard, { backgroundColor: theme.card, borderColor: theme.cardBorder }]}>
              <View style={styles.sectionHeaderRow}>
                <CosmicIcon name="CloseCircle" size={16} color={theme.accentOrange} />
                <Text style={[styles.sectionHeader, { color: theme.accentOrange }]}> Enemy</Text>
              </View>
              <View style={styles.tagRow}>
                <View key={info.enemy} style={[styles.tag, { backgroundColor: theme.accentOrange + '20', borderColor: theme.accentOrange + '40' }]}>
                  <Text style={[styles.tagText, { color: theme.accentOrange }]}>{ANIMAL_EMOJIS[info.enemy]} {capitalize(info.enemy)}</Text>
                </View>
              </View>
            </View>

            <View style={[styles.sectionCard, { backgroundColor: theme.card, borderColor: theme.cardBorder }]}>
              <View style={styles.sectionHeaderRow}>
                <CosmicIcon name="Star1" size={16} color={theme.accent} />
                <Text style={[styles.sectionHeader, { color: theme.accent }]}> Prosperous Years</Text>
              </View>
              <View style={styles.yearRow}>
                {info.prosperousYears.map((y) => (
                  <View key={y} style={[styles.yearTag, { backgroundColor: theme.accent + '20', borderColor: theme.accent + '40' }]}>
                    <Text style={[styles.yearText, { color: theme.accent }]}>{y}</Text>
                  </View>
                ))}
              </View>
            </View>

            <View style={[styles.sectionCard, { backgroundColor: theme.card, borderColor: theme.cardBorder }]}>
              <View style={styles.sectionHeaderRow}>
                <CosmicIcon name="Warning2" size={16} color={theme.error} />
                <Text style={[styles.sectionHeader, { color: theme.error }]}> Challenging Years</Text>
              </View>
              <View style={styles.yearRow}>
                {info.challengingYears.map((y) => (
                  <View key={y} style={[styles.yearTag, { backgroundColor: theme.error + '20', borderColor: theme.error + '40' }]}>
                    <Text style={[styles.yearText, { color: theme.error }]}>{y}</Text>
                  </View>
                ))}
              </View>
            </View>

            <View style={[styles.sectionCard, { backgroundColor: theme.card, borderColor: theme.cardBorder }]}>
              <View style={styles.sectionHeaderRow}>
                <CosmicIcon name="Box" size={16} color={theme.accent} />
                <Text style={[styles.sectionHeader, { color: theme.accent }]}> Brand Affinities</Text>
              </View>
              <View style={{ gap: 12, marginTop: 4 }}>
                <View>
                  <Text style={[styles.brandLabel, { color: theme.textSecondary }]}>Clothing Brands</Text>
                  <View style={styles.brandRow}>
                    {CHINESE_ZODIAC[info.animal].clothingBrands.map((b) => (
                      <View key={b} style={[styles.brandTag, { backgroundColor: theme.surface, borderColor: theme.border }]}>
                        <Text style={[styles.brandText, { color: theme.text }]}>{b}</Text>
                      </View>
                    ))}
                  </View>
                </View>
                <View>
                  <Text style={[styles.brandLabel, { color: theme.textSecondary }]}>Car Brands</Text>
                  <View style={styles.brandRow}>
                    {CHINESE_ZODIAC[info.animal].carBrands.map((b) => (
                      <View key={b} style={[styles.brandTag, { backgroundColor: theme.surface, borderColor: theme.border }]}>
                        <Text style={[styles.brandText, { color: theme.text }]}>{b}</Text>
                      </View>
                    ))}
                  </View>
                </View>
                <View>
                  <Text style={[styles.brandLabel, { color: theme.textSecondary }]}>Luxury Brands</Text>
                  <View style={styles.brandRow}>
                    {CHINESE_ZODIAC[info.animal].luxuryBrands.map((b) => (
                      <View key={b} style={[styles.brandTag, { backgroundColor: theme.surface, borderColor: theme.border }]}>
                        <Text style={[styles.brandText, { color: theme.text }]}>{b}</Text>
                      </View>
                    ))}
                  </View>
                </View>
                <View>
                  <Text style={[styles.brandLabel, { color: theme.textSecondary }]}>Accessory Brands</Text>
                  <View style={styles.brandRow}>
                    {CHINESE_ZODIAC[info.animal].accessoryBrands.map((b) => (
                      <View key={b} style={[styles.brandTag, { backgroundColor: theme.surface, borderColor: theme.border }]}>
                        <Text style={[styles.brandText, { color: theme.text }]}>{b}</Text>
                      </View>
                    ))}
                  </View>
                </View>
                <View>
                  <Text style={[styles.brandLabel, { color: theme.textSecondary }]}>Watch Brands</Text>
                  <View style={styles.brandRow}>
                    {CHINESE_ZODIAC[info.animal].watchBrands.map((b) => (
                      <View key={b} style={[styles.brandTag, { backgroundColor: theme.surface, borderColor: theme.border }]}>
                        <Text style={[styles.brandText, { color: theme.text }]}>{b}</Text>
                      </View>
                    ))}
                  </View>
                </View>
                <View>
                  <Text style={[styles.brandLabel, { color: theme.textSecondary }]}>Shoe Brands</Text>
                  <View style={styles.brandRow}>
                    {CHINESE_ZODIAC[info.animal].shoeBrands.map((b) => (
                      <View key={b} style={[styles.brandTag, { backgroundColor: theme.surface, borderColor: theme.border }]}>
                        <Text style={[styles.brandText, { color: theme.text }]}>{b}</Text>
                      </View>
                    ))}
                  </View>
                </View>
                <View>
                  <Text style={[styles.brandLabel, { color: theme.textSecondary }]}>Tech Brands</Text>
                  <View style={styles.brandRow}>
                    {CHINESE_ZODIAC[info.animal].techBrands.map((b) => (
                      <View key={b} style={[styles.brandTag, { backgroundColor: theme.surface, borderColor: theme.border }]}>
                        <Text style={[styles.brandText, { color: theme.text }]}>{b}</Text>
                      </View>
                    ))}
                  </View>
                </View>
                <View>
                  <Text style={[styles.brandLabel, { color: theme.textSecondary }]}>Fragrance Brands</Text>
                  <View style={styles.brandRow}>
                    {CHINESE_ZODIAC[info.animal].fragranceBrands.map((b) => (
                      <View key={b} style={[styles.brandTag, { backgroundColor: theme.surface, borderColor: theme.border }]}>
                        <Text style={[styles.brandText, { color: theme.text }]}>{b}</Text>
                      </View>
                    ))}
                  </View>
                </View>
              </View>
            </View>
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
  sectionLabel: { fontSize: 12, fontWeight: '700', textTransform: 'uppercase', letterSpacing: 0.5, marginTop: 4 },
  card: { borderRadius: 14, borderWidth: 1, padding: Spacing.four, alignItems: 'center', gap: 8 },
  cardTitle: { fontSize: 18, fontWeight: '700' },
  cardDesc: { fontSize: 14, textAlign: 'center' },
  animalGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  animalBtn: { flexDirection: 'row', alignItems: 'center', gap: 6, paddingVertical: 8, paddingHorizontal: 12, borderRadius: 10, borderWidth: 1 },
  animalEmoji: { fontSize: 20 },
  animalLabel: { fontSize: 13 },
  featureCard: { borderRadius: 16, borderWidth: 1, padding: Spacing.four, alignItems: 'center', gap: 8 },
  featureTitle: { fontSize: 24, fontWeight: '900' },
  featureSub: { fontSize: 14, lineHeight: 20, textAlign: 'center' },
  sectionCard: { borderRadius: 12, borderWidth: 1, padding: Spacing.three, gap: 10 },
  sectionHeaderRow: { flexDirection: 'row', alignItems: 'center' },
  sectionHeader: { fontSize: 14, fontWeight: '800' },
  tagRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  tag: { paddingVertical: 6, paddingHorizontal: 12, borderRadius: 8, borderWidth: 1 },
  tagText: { fontSize: 13, fontWeight: '600' },
  yearRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  yearTag: { paddingVertical: 6, paddingHorizontal: 14, borderRadius: 8, borderWidth: 1 },
  yearText: { fontSize: 15, fontWeight: '700' },
  brandLabel: { fontSize: 12, fontWeight: '700', textTransform: 'uppercase', letterSpacing: 0.3, marginBottom: 6 },
  brandRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 6 },
  brandTag: { paddingVertical: 5, paddingHorizontal: 10, borderRadius: 6, borderWidth: 1 },
  brandText: { fontSize: 12, fontWeight: '500' },
});
