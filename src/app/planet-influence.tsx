import { useMemo, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Pressable } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useTheme } from '@/hooks/use-theme';
import { useProfileStore } from '@/stores/profile-store';
import { Spacing } from '@/constants/theme';
import { PLANETS, PLANET_LIST } from '@/constants/cosmic/planets';
import { calculateSunSign } from '@/utils/calculations';
import { ZODIAC_SIGNS } from '@/constants/cosmic/zodiac';
import type { PlanetName } from '@/types/cosmic';

const PLANET_EMOJIS: Record<string, string> = {
  sun: '☀️', moon: '🌙', mercury: '☿', venus: '♀',
  mars: '♂', jupiter: '♃', saturn: '♄', uranus: '⛢',
  neptune: '♆', pluto: '♇',
};

export default function PlanetInfluenceScreen() {
  const insets = useSafeAreaInsets();
  const theme = useTheme();
  const activeProfile = useProfileStore((s) => s.activeProfile);
  const [selectedPlanet, setSelectedPlanet] = useState<PlanetName>('sun');

  const planetData = useMemo(() => PLANETS[selectedPlanet], [selectedPlanet]);

  const dominantPlanet = useMemo(() => {
    if (!activeProfile) return null;
    const [, m, d] = activeProfile.birthDate.split('-').map(Number);
    const sunSign = calculateSunSign(m, d);
    return ZODIAC_SIGNS[sunSign].rulingPlanet.toLowerCase() as PlanetName;
  }, [activeProfile]);

  return (
    <ScrollView style={[styles.scroll, { backgroundColor: theme.background }]}
      contentContainerStyle={{ paddingBottom: insets.bottom + Spacing.six }}>
      <View style={styles.content}>
        <Text style={[styles.title, { color: theme.text }]}>Planet Influence</Text>
        <Text style={[styles.subtitle, { color: theme.textSecondary }]}>Dominant & secondary planetary energies</Text>

        {activeProfile && dominantPlanet && (() => {
          const p = PLANETS[dominantPlanet as PlanetName];
          return (
            <View style={[styles.dominantCard, { backgroundColor: theme.card, borderColor: theme.cardBorder }]}>
              <Text style={[styles.domLabel, { color: theme.textSecondary }]}>Your Dominant Planet</Text>
              <Text style={styles.domEmoji}>{PLANET_EMOJIS[dominantPlanet]}</Text>
              <Text style={[styles.domName, { color: theme.accent }]}>{p.title}</Text>
              <Text style={[styles.domInfluence, { color: theme.textSecondary }]}>{p.influence}</Text>
            </View>
          );
        })()}

        <Text style={[styles.sectionLabel, { color: theme.textSecondary }]}>Select a Planet</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <View style={styles.planetRow}>
            {PLANET_LIST.map((p) => {
              const isActive = selectedPlanet === p.planet;
              return (
                <Pressable key={p.planet} onPress={() => setSelectedPlanet(p.planet)}
                  style={[styles.planetBtn, { backgroundColor: isActive ? p.color + '30' : theme.surface, borderColor: isActive ? p.color : theme.border }]}>
                  <Text style={styles.planetEmoji}>{PLANET_EMOJIS[p.planet]}</Text>
                  <Text style={[styles.planetLabel, { color: isActive ? p.color : theme.text, fontWeight: isActive ? '700' : '500' }]}>{p.title}</Text>
                  <Text style={[styles.planetDay, { color: theme.textTertiary }]}>{p.day}</Text>
                </Pressable>
              );
            })}
          </View>
        </ScrollView>

        {planetData && (
          <View style={{ gap: 12 }}>
            <View style={[styles.headerCard, { backgroundColor: planetData.color + '15', borderColor: planetData.color + '40' }]}>
              <Text style={[styles.headerTitle, { color: theme.text }]}>{planetData.title}</Text>
              <Text style={[styles.headerSub, { color: theme.textSecondary }]}>Rules: {planetData.rules}</Text>
            </View>

            <View style={[styles.card, { backgroundColor: theme.card, borderColor: theme.cardBorder }]}>
              <Text style={[styles.cardLabel, { color: theme.textSecondary }]}>Influence</Text>
              <Text style={[styles.cardValue, { color: theme.text }]}>{planetData.influence}</Text>
            </View>

            <View style={[styles.card, { backgroundColor: theme.card, borderColor: theme.cardBorder }]}>
              <Text style={[styles.cardLabel, { color: theme.textSecondary }]}>Strengths</Text>
              {planetData.strengths.map((s, i) => (
                <Text key={i} style={[styles.bulletText, { color: theme.text }]}>✦ {s}</Text>
              ))}
            </View>

            <View style={[styles.card, { backgroundColor: theme.card, borderColor: theme.cardBorder }]}>
              <Text style={[styles.cardLabel, { color: theme.textSecondary }]}>Weaknesses</Text>
              {planetData.weaknesses.map((w, i) => (
                <Text key={i} style={[styles.bulletText, { color: theme.text }]}>✦ {w}</Text>
              ))}
            </View>

            {dominantPlanet && (
              <View style={[styles.rowCards, { gap: 12 }]}>
                <View style={[styles.miniCard, { backgroundColor: theme.card, borderColor: theme.cardBorder, flex: 1 }]}>
                  <Text style={[styles.miniLabel, { color: theme.textSecondary }]}>Color</Text>
                  <View style={[styles.colorDot, { backgroundColor: planetData.color }]} />
                  <Text style={[styles.miniValue, { color: theme.text }]}>{planetData.color}</Text>
                </View>
                <View style={[styles.miniCard, { backgroundColor: theme.card, borderColor: theme.cardBorder, flex: 1 }]}>
                  <Text style={[styles.miniLabel, { color: theme.textSecondary }]}>Day</Text>
                  <Text style={[styles.miniEmoji, { color: theme.text }]}>📅</Text>
                  <Text style={[styles.miniValue, { color: theme.text }]}>{planetData.day}</Text>
                </View>
              </View>
            )}
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
  sectionLabel: { fontSize: 12, fontWeight: '700', textTransform: 'uppercase', letterSpacing: 0.5, marginTop: 4 },
  dominantCard: { borderRadius: 16, borderWidth: 1, padding: Spacing.four, alignItems: 'center', gap: 8 },
  domLabel: { fontSize: 12, fontWeight: '700', textTransform: 'uppercase', letterSpacing: 0.5 },
  domEmoji: { fontSize: 48 },
  domName: { fontSize: 24, fontWeight: '900' },
  domInfluence: { fontSize: 14, lineHeight: 20, textAlign: 'center' },
  planetRow: { flexDirection: 'row', gap: 8, paddingVertical: 4 },
  planetBtn: { alignItems: 'center', gap: 4, paddingHorizontal: 14, paddingVertical: 10, borderRadius: 10, borderWidth: 1 },
  planetEmoji: { fontSize: 24 },
  planetLabel: { fontSize: 11, fontWeight: '600' },
  planetDay: { fontSize: 9 },
  headerCard: { borderRadius: 14, borderWidth: 1, padding: Spacing.four, alignItems: 'center', gap: 8 },
  headerTitle: { fontSize: 22, fontWeight: '800' },
  headerSub: { fontSize: 13, textAlign: 'center' },
  card: { borderRadius: 12, borderWidth: 1, padding: Spacing.three, gap: 6 },
  cardLabel: { fontSize: 11, fontWeight: '700', textTransform: 'uppercase', letterSpacing: 0.5, marginBottom: 2 },
  cardValue: { fontSize: 15, lineHeight: 22 },
  bulletText: { fontSize: 14, lineHeight: 22 },
  rowCards: { flexDirection: 'row' },
  miniCard: { borderRadius: 12, borderWidth: 1, padding: Spacing.three, alignItems: 'center', gap: 6 },
  miniLabel: { fontSize: 11, fontWeight: '700', textTransform: 'uppercase', letterSpacing: 0.5 },
  colorDot: { width: 32, height: 32, borderRadius: 16 },
  miniEmoji: { fontSize: 24 },
  miniValue: { fontSize: 14, fontWeight: '600' },
});
