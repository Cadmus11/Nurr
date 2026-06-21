import { useMemo, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Pressable } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useTheme } from '@/hooks/use-theme';
import { useProfileStore } from '@/stores/profile-store';
import { Spacing } from '@/constants/theme';
import { DEFAULT_LIFE_CYCLES, LIFE_CYCLE_TYPES } from '@/constants/cosmic/lifeCycles';
import { calculateLifePath, calculatePersonalYear } from '@/utils/calculations';

type CycleView = 'current' | 'growth' | 'destiny';

export default function LifeCyclesScreen() {
  const insets = useSafeAreaInsets();
  const theme = useTheme();
  const activeProfile = useProfileStore((s) => s.activeProfile);
  const [view, setView] = useState<CycleView>('current');

  const cycles = useMemo(() => {
    if (!activeProfile) return null;
    const lifePath = calculateLifePath(activeProfile.birthDate);
    const personalYear = calculatePersonalYear(activeProfile.birthDate);
    const cycleKeys = Object.keys(LIFE_CYCLE_TYPES);
    const cycleIndex = Math.abs((lifePath + personalYear)) % cycleKeys.length;
    const cycleType = cycleKeys[cycleIndex];
    return {
      ...LIFE_CYCLE_TYPES[cycleType],
      lifePath,
      personalYear,
      forecasts: DEFAULT_LIFE_CYCLES.forecasts,
    };
  }, [activeProfile]);

  const currentDisplay = useMemo(() => {
    if (!cycles) return null;
    switch (view) {
      case 'current': return { title: cycles.current, description: DEFAULT_LIFE_CYCLES.currentDescription };
      case 'growth': return { title: cycles.growth, description: DEFAULT_LIFE_CYCLES.growthDescription };
      case 'destiny': return { title: cycles.destiny, description: DEFAULT_LIFE_CYCLES.destinyDescription };
    }
  }, [cycles, view]);

  return (
    <ScrollView style={[styles.scroll, { backgroundColor: theme.background }]}
      contentContainerStyle={{ paddingBottom: insets.bottom + Spacing.six }}>
      <View style={styles.content}>
        <Text style={[styles.title, { color: theme.text }]}>Life Cycles</Text>
        <Text style={[styles.subtitle, { color: theme.textSecondary }]}>Current, growth & destiny cycle forecasts</Text>

        {!activeProfile ? (
          <View style={[styles.card, { backgroundColor: theme.card, borderColor: theme.cardBorder }]}>
            <Text style={[styles.cardTitle, { color: theme.text }]}>No Profile</Text>
            <Text style={[styles.cardDesc, { color: theme.textSecondary }]}>Create a profile to see your life cycles.</Text>
          </View>
        ) : cycles ? (
          <>
            <View style={styles.viewRow}>
              {(['current', 'growth', 'destiny'] as CycleView[]).map((v) => (
                <Pressable key={v} onPress={() => setView(v)}
                  style={[styles.viewBtn, { backgroundColor: view === v ? theme.accent : theme.surface, borderColor: view === v ? theme.accent : theme.border }]}>
                  <Text style={[styles.viewText, { color: view === v ? '#fff' : theme.text, fontWeight: view === v ? '700' : '500' }]}>{capitalize(v)}</Text>
                </Pressable>
              ))}
            </View>

            {currentDisplay && (
              <View style={[styles.cycleCard, { backgroundColor: theme.card, borderColor: theme.cardBorder }]}>
                <Text style={[styles.cyclePhase, { color: theme.textSecondary }]}>{capitalize(view)} Cycle</Text>
                <Text style={[styles.cycleTitle, { color: theme.accent }]}>{currentDisplay.title}</Text>
                <Text style={[styles.cycleDesc, { color: theme.text }]}>{currentDisplay.description}</Text>
              </View>
            )}

            <View style={[styles.card, { backgroundColor: theme.card, borderColor: theme.cardBorder }]}>
              <Text style={[styles.cardLabel, { color: theme.textSecondary }]}>Profile Info</Text>
              <Text style={[styles.statRow, { color: theme.text }]}>Life Path: {cycles.lifePath}</Text>
              <Text style={[styles.statRow, { color: theme.text }]}>Personal Year: {cycles.personalYear}</Text>
            </View>

            <Text style={[styles.sectionTitle, { color: theme.text }]}>Cycle Forecasts</Text>

            <View style={[styles.forecastCard, { backgroundColor: theme.card, borderColor: theme.cardBorder }]}>
              <Text style={[styles.forecastIcon, { color: theme.accent }]}>♥</Text>
              <Text style={[styles.forecastLabel, { color: theme.textSecondary }]}>Love</Text>
              <Text style={[styles.forecastText, { color: theme.text }]}>{cycles.forecasts.love}</Text>
            </View>

            <View style={[styles.forecastCard, { backgroundColor: theme.card, borderColor: theme.cardBorder }]}>
              <Text style={[styles.forecastIcon, { color: theme.accentGreen }]}>$</Text>
              <Text style={[styles.forecastLabel, { color: theme.textSecondary }]}>Wealth</Text>
              <Text style={[styles.forecastText, { color: theme.text }]}>{cycles.forecasts.wealth}</Text>
            </View>

            <View style={[styles.forecastCard, { backgroundColor: theme.card, borderColor: theme.cardBorder }]}>
              <Text style={[styles.forecastIcon, { color: theme.accentOrange }]}>⊙</Text>
              <Text style={[styles.forecastLabel, { color: theme.textSecondary }]}>Health</Text>
              <Text style={[styles.forecastText, { color: theme.text }]}>{cycles.forecasts.health}</Text>
            </View>

            <View style={[styles.forecastCard, { backgroundColor: theme.card, borderColor: theme.cardBorder }]}>
              <Text style={[styles.forecastIcon, { color: theme.accentBlue }]}>★</Text>
              <Text style={[styles.forecastLabel, { color: theme.textSecondary }]}>Opportunities</Text>
              <Text style={[styles.forecastText, { color: theme.text }]}>{cycles.forecasts.opportunities}</Text>
            </View>
          </>
        ) : null}
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
  card: { borderRadius: 14, borderWidth: 1, padding: Spacing.four, gap: 8 },
  cardTitle: { fontSize: 18, fontWeight: '700' },
  cardDesc: { fontSize: 14, textAlign: 'center' },
  viewRow: { flexDirection: 'row', gap: 8 },
  viewBtn: { flex: 1, paddingVertical: 10, borderRadius: 10, borderWidth: 1, alignItems: 'center' },
  viewText: { fontSize: 13, fontWeight: '600' },
  cycleCard: { borderRadius: 16, borderWidth: 1, padding: Spacing.four, alignItems: 'center', gap: 8 },
  cyclePhase: { fontSize: 12, fontWeight: '700', textTransform: 'uppercase', letterSpacing: 0.5 },
  cycleTitle: { fontSize: 22, fontWeight: '900', textAlign: 'center' },
  cycleDesc: { fontSize: 15, lineHeight: 22, textAlign: 'center' },
  cardLabel: { fontSize: 11, fontWeight: '700', textTransform: 'uppercase', letterSpacing: 0.5, marginBottom: 4 },
  statRow: { fontSize: 15, fontWeight: '500' },
  sectionTitle: { fontSize: 18, fontWeight: '700', marginTop: 8 },
  forecastCard: { borderRadius: 12, borderWidth: 1, padding: Spacing.three, gap: 6 },
  forecastIcon: { fontSize: 20, fontWeight: '900' },
  forecastLabel: { fontSize: 11, fontWeight: '700', textTransform: 'uppercase', letterSpacing: 0.5 },
  forecastText: { fontSize: 14, lineHeight: 20 },
});
