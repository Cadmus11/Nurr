import { useMemo } from 'react';
import { View, Text, StyleSheet, ScrollView, Pressable } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useTheme } from '@/hooks/use-theme';
import { useProfileStore } from '@/stores/profile-store';
import { Spacing } from '@/constants/theme';
import { SPIRIT_ANIMALS } from '@/constants/cosmic/spiritAnimals';
import { calculateSunSign, calculateLifePath, calculateDestinyNumber } from '@/utils/calculations';

const ANIMAL_EMOJIS: Record<string, string> = {
  Wolf: '🐺', Eagle: '🦅', Lion: '🦁', Fox: '🦊', Owl: '🦉',
  Bear: '🐻', Panther: '🐆', Dragon: '🐉', Snake: '🐍', Raven: '🐦‍⬛',
};

export default function SpiritAnimalsScreen() {
  const insets = useSafeAreaInsets();
  const theme = useTheme();
  const activeProfile = useProfileStore((s) => s.activeProfile);

  const spiritAnimal = useMemo(() => {
    if (!activeProfile) return null;
    const [y, m, d] = activeProfile.birthDate.split('-').map(Number);
    const sunSign = calculateSunSign(m, d);
    const lifePath = calculateLifePath(activeProfile.birthDate);
    const destiny = calculateDestinyNumber(activeProfile.name);
    const index = (lifePath + destiny + y + ['aries', 'taurus', 'gemini', 'cancer', 'leo', 'virgo', 'libra', 'scorpio', 'sagittarius', 'capricorn', 'aquarius', 'pisces'].indexOf(sunSign)) % SPIRIT_ANIMALS.length;
    return SPIRIT_ANIMALS[index];
  }, [activeProfile]);

  return (
    <ScrollView style={[styles.scroll, { backgroundColor: theme.background }]}
      contentContainerStyle={{ paddingBottom: insets.bottom + Spacing.six }}>
      <View style={styles.content}>
        <Text style={[styles.title, { color: theme.text }]}>Spirit Animals</Text>
        <Text style={[styles.subtitle, { color: theme.textSecondary }]}>Discover your spiritual animal guide</Text>

        {!activeProfile ? (
          <View style={[styles.card, { backgroundColor: theme.card, borderColor: theme.cardBorder }]}>
            <Text style={[styles.cardTitle, { color: theme.text }]}>No Profile</Text>
            <Text style={[styles.cardDesc, { color: theme.textSecondary }]}>Create a profile to discover your spirit animal.</Text>
          </View>
        ) : spiritAnimal ? (
          <>
            <View style={[styles.mainCard, { backgroundColor: theme.card, borderColor: theme.cardBorder }]}>
              <Text style={styles.animalEmoji}>{ANIMAL_EMOJIS[spiritAnimal.animal] ?? '🐾'}</Text>
              <Text style={[styles.animalName, { color: theme.accent }]}>{spiritAnimal.animal}</Text>
              <Text style={[styles.animalElement, { color: theme.textSecondary }]}>Element: {spiritAnimal.element} · Direction: {spiritAnimal.direction}</Text>
              <Text style={[styles.animalMessage, { color: theme.text }]}>{spiritAnimal.spiritualMessage}</Text>
            </View>

            <View style={[styles.card, { backgroundColor: theme.card, borderColor: theme.cardBorder }]}>
              <Text style={[styles.cardLabel, { color: theme.textSecondary }]}>Life Guidance</Text>
              <Text style={[styles.cardValue, { color: theme.text }]}>{spiritAnimal.lifeGuidance}</Text>
            </View>

            <View style={[styles.card, { backgroundColor: theme.card, borderColor: theme.cardBorder }]}>
              <Text style={[styles.cardLabel, { color: theme.textSecondary }]}>Traits</Text>
              <View style={styles.tagRow}>
                {spiritAnimal.traits.map((t) => (
                  <View key={t} style={[styles.tag, { backgroundColor: theme.accent + '20', borderColor: theme.accent + '30' }]}>
                    <Text style={[styles.tagText, { color: theme.accent }]}>{t}</Text>
                  </View>
                ))}
              </View>
            </View>

            <View style={[styles.card, { backgroundColor: theme.card, borderColor: theme.cardBorder }]}>
              <Text style={[styles.cardLabel, { color: theme.textSecondary }]}>Strengths</Text>
              {spiritAnimal.strengths.map((s, i) => (
                <Text key={i} style={[styles.bulletText, { color: theme.text }]}>✦ {s}</Text>
              ))}
            </View>

            <Text style={[styles.sectionTitle, { color: theme.text }]}>All Spirit Animals</Text>
            <View style={styles.grid}>
              {SPIRIT_ANIMALS.map((animal) => (
                <View key={animal.animal} style={[styles.gridCard, { backgroundColor: theme.card, borderColor: animal.animal === spiritAnimal.animal ? theme.accent : theme.cardBorder }]}>
                  <Text style={styles.gridEmoji}>{ANIMAL_EMOJIS[animal.animal] ?? '🐾'}</Text>
                  <Text style={[styles.gridName, { color: animal.animal === spiritAnimal.animal ? theme.accent : theme.text, fontWeight: animal.animal === spiritAnimal.animal ? '700' : '600' }]}>{animal.animal}</Text>
                  <Text style={[styles.gridElement, { color: theme.textTertiary }]}>{animal.element}</Text>
                </View>
              ))}
            </View>
          </>
        ) : null}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scroll: { flex: 1 },
  content: { padding: Spacing.four, gap: Spacing.three },
  title: { fontSize: 28, fontWeight: '800' },
  subtitle: { fontSize: 15, marginBottom: 8 },
  card: { borderRadius: 14, borderWidth: 1, padding: Spacing.four, gap: 8 },
  cardTitle: { fontSize: 18, fontWeight: '700' },
  cardDesc: { fontSize: 14, textAlign: 'center' },
  cardLabel: { fontSize: 11, fontWeight: '700', textTransform: 'uppercase', letterSpacing: 0.5 },
  cardValue: { fontSize: 15, lineHeight: 22 },
  mainCard: { borderRadius: 20, borderWidth: 1, padding: Spacing.four, alignItems: 'center', gap: 8 },
  animalEmoji: { fontSize: 72 },
  animalName: { fontSize: 28, fontWeight: '900' },
  animalElement: { fontSize: 13 },
  animalMessage: { fontSize: 15, lineHeight: 22, textAlign: 'center', fontStyle: 'italic', marginTop: 8 },
  tagRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  tag: { paddingVertical: 4, paddingHorizontal: 10, borderRadius: 8, borderWidth: 1 },
  tagText: { fontSize: 12, fontWeight: '600' },
  bulletText: { fontSize: 14, lineHeight: 22 },
  sectionTitle: { fontSize: 18, fontWeight: '700', marginTop: 8 },
  grid: { flexDirection: 'row', flexWrap: 'wrap', gap: 10 },
  gridCard: { width: '30%', borderRadius: 12, borderWidth: 1, padding: Spacing.two, alignItems: 'center', gap: 4 },
  gridEmoji: { fontSize: 28 },
  gridName: { fontSize: 12 },
  gridElement: { fontSize: 10 },
});
