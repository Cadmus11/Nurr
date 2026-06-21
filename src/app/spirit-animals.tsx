import { useMemo } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useTheme } from '@/hooks/use-theme';
import { useProfileStore } from '@/stores/profile-store';
import { Spacing } from '@/constants/theme';
import { SPIRIT_ANIMALS } from '@/constants/cosmic/spiritAnimals';
import { calculateSpiritAnimal } from '@/utils/calculations';

const ANIMAL_EMOJIS: Record<string, string> = {
  Wolf: '🐺', Eagle: '🦅', Lion: '🦁', Fox: '🦊', Owl: '🦉',
  Bear: '🐻', Panther: '🐆', Dragon: '🐉', Snake: '🐍', Raven: '🐦‍⬛',
  Deer: '🦌', Hawk: '🦅', Horse: '🐴', Butterfly: '🦋', Turtle: '🐢',
  Phoenix: '🔥',
};

const ELEMENT_SYMBOLS: Record<string, string> = {
  Fire: '🔥', Water: '💧', Earth: '🌍', Air: '💨',
};

export default function SpiritAnimalsScreen() {
  const insets = useSafeAreaInsets();
  const theme = useTheme();
  const activeProfile = useProfileStore((s) => s.activeProfile);

  const spiritAnimal = useMemo(() => {
    if (!activeProfile) return null;
    return calculateSpiritAnimal(activeProfile.birthDate, activeProfile.name);
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
              <View style={styles.tagRow}>
                <View style={[styles.elementTag, { backgroundColor: theme.accent + '20', borderColor: theme.accent + '30' }]}>
                  <Text style={styles.elementIcon}>{ELEMENT_SYMBOLS[spiritAnimal.element] ?? '✦'}</Text>
                  <Text style={[styles.elementText, { color: theme.accent }]}>{spiritAnimal.element}</Text>
                </View>
                <View style={[styles.elementTag, { backgroundColor: theme.accent + '20', borderColor: theme.accent + '30' }]}>
                  <Text style={[styles.elementText, { color: theme.accent }]}>Direction: {spiritAnimal.direction}</Text>
                </View>
              </View>
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
              {SPIRIT_ANIMALS.map((animal) => {
                const isYours = animal.animal === spiritAnimal.animal;
                return (
                  <View key={animal.animal} style={[styles.gridCard, { backgroundColor: theme.card, borderColor: isYours ? theme.accent : theme.cardBorder }]}>
                    <Text style={styles.gridEmoji}>{ANIMAL_EMOJIS[animal.animal] ?? '🐾'}</Text>
                    <Text style={[styles.gridName, { color: isYours ? theme.accent : theme.text, fontWeight: isYours ? '700' : '600' }]}>{animal.animal}</Text>
                    <Text style={[styles.gridElement, { color: theme.textTertiary }]}>{ELEMENT_SYMBOLS[animal.element] ?? '✦'} {animal.element}</Text>
                    {isYours && <View style={[styles.yourBadge, { backgroundColor: theme.accent }]}><Text style={styles.yourBadgeText}>YOURS</Text></View>}
                  </View>
                );
              })}
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
  mainCard: { borderRadius: 20, borderWidth: 1, padding: Spacing.four, alignItems: 'center', gap: 10 },
  animalEmoji: { fontSize: 72 },
  animalName: { fontSize: 28, fontWeight: '900' },
  animalMessage: { fontSize: 15, lineHeight: 22, textAlign: 'center', fontStyle: 'italic', marginTop: 4 },
  tagRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 8, justifyContent: 'center' },
  elementTag: { flexDirection: 'row', alignItems: 'center', gap: 4, paddingVertical: 4, paddingHorizontal: 10, borderRadius: 8, borderWidth: 1 },
  elementIcon: { fontSize: 14 },
  elementText: { fontSize: 12, fontWeight: '600' },
  tag: { paddingVertical: 4, paddingHorizontal: 10, borderRadius: 8, borderWidth: 1 },
  tagText: { fontSize: 12, fontWeight: '600' },
  bulletText: { fontSize: 14, lineHeight: 22 },
  sectionTitle: { fontSize: 18, fontWeight: '700', marginTop: 8 },
  grid: { flexDirection: 'row', flexWrap: 'wrap', gap: 10 },
  gridCard: { width: '30%', borderRadius: 12, borderWidth: 1, padding: Spacing.two, alignItems: 'center', gap: 4, position: 'relative', paddingTop: Spacing.three },
  gridEmoji: { fontSize: 28 },
  gridName: { fontSize: 12 },
  gridElement: { fontSize: 10 },
  yourBadge: { position: 'absolute', top: -1, right: -1, borderRadius: 4, paddingHorizontal: 4, paddingVertical: 1 },
  yourBadgeText: { color: '#fff', fontSize: 7, fontWeight: '800' },
});
