import { useMemo, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Pressable } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useTheme } from '@/hooks/use-theme';
import { useProfileStore } from '@/stores/profile-store';
import { Spacing } from '@/constants/theme';
import { calculateSunSign, calculateLifePath, calculatePersonalYear, calculateChineseZodiac } from '@/utils/calculations';

type Period = 'daily' | 'weekly' | 'monthly' | 'yearly';

export default function ForecastScreen() {
  const insets = useSafeAreaInsets();
  const theme = useTheme();
  const activeProfile = useProfileStore((s) => s.activeProfile);
  const [period, setPeriod] = useState<Period>('daily');

  const forecast = useMemo(() => {
    if (!activeProfile) return null;
    const [y, m, d] = activeProfile.birthDate.split('-').map(Number);
    const sunSign = calculateSunSign(m, d);
    const lifePath = calculateLifePath(activeProfile.birthDate);
    const personalYear = calculatePersonalYear(activeProfile.birthDate);
    const chineseAnimal = calculateChineseZodiac(y);
    const today = new Date();
    const dayOfYear = Math.floor((today.getTime() - new Date(today.getFullYear(), 0, 0).getTime()) / 86400000);
    const energyBase = (lifePath + personalYear + dayOfYear) % 100;

    const getLevel = (val: number): 'high' | 'moderate' | 'low' => val > 66 ? 'high' : val > 33 ? 'moderate' : 'low';

    const career = (lifePath * 3 + personalYear * 2 + dayOfYear % 7) % 100;
    const love = (sunSign === 'taurus' || sunSign === 'libra' || sunSign === 'pisces' ? 70 : 50) + (dayOfYear % 30);
    const finance = (lifePath * 2 + personalYear * 3 + dayOfYear % 5) % 100;
    const health = (sunSign === 'virgo' ? 60 : 50) + (dayOfYear % 25);
    const spiritual = (lifePath * 4 + personalYear + dayOfYear % 10) % 100;

    const clamp = (n: number) => Math.max(15, Math.min(99, Math.round(n)));

    const readings: Record<string, string> = {
      daily: 'The energy today supports focused action. Trust your instincts and move forward with confidence.',
      weekly: 'This week brings opportunities for growth. Stay open to unexpected messages from the universe.',
      monthly: 'A period of reflection and planning. What you set in motion now will bear fruit in the coming months.',
      yearly: 'A year of transformation and expansion. The cosmos is aligning to support your highest evolution.',
    };

    return {
      energy: clamp(energyBase),
      categories: [
        { label: 'Career', value: clamp(career), level: getLevel(career) },
        { label: 'Love', value: clamp(love), level: getLevel(love) },
        { label: 'Finance', value: clamp(finance), level: getLevel(finance) },
        { label: 'Health', value: clamp(health), level: getLevel(health) },
        { label: 'Spiritual', value: clamp(spiritual), level: getLevel(spiritual) },
      ],
      reading: readings[period],
      sunSign: capitalize(sunSign),
      lifePath,
      personalYear,
      chineseAnimal: capitalize(chineseAnimal),
    };
  }, [activeProfile, period]);

  return (
    <ScrollView style={[styles.scroll, { backgroundColor: theme.background }]}
      contentContainerStyle={{ paddingBottom: insets.bottom + Spacing.six }}>
      <View style={styles.content}>
        <Text style={[styles.title, { color: theme.text }]}>Forecast</Text>
        <Text style={[styles.subtitle, { color: theme.textSecondary }]}>Daily, weekly, monthly & yearly predictions</Text>

        {!activeProfile ? (
          <View style={[styles.card, { backgroundColor: theme.card, borderColor: theme.cardBorder }]}>
            <Text style={[styles.cardTitle, { color: theme.text }]}>No Profile</Text>
            <Text style={[styles.cardDesc, { color: theme.textSecondary }]}>Create a profile to see your forecast.</Text>
          </View>
        ) : forecast ? (
          <>
            <View style={styles.periodRow}>
              {(['daily', 'weekly', 'monthly', 'yearly'] as Period[]).map((p) => (
                <Pressable key={p} onPress={() => setPeriod(p)}
                  style={[styles.periodBtn, { backgroundColor: period === p ? theme.accent : theme.surface, borderColor: period === p ? theme.accent : theme.border }]}>
                  <Text style={[styles.periodText, { color: period === p ? '#fff' : theme.text, fontWeight: period === p ? '700' : '500' }]}>{capitalize(p)}</Text>
                </Pressable>
              ))}
            </View>

            <View style={[styles.energyCard, { backgroundColor: theme.card, borderColor: theme.cardBorder }]}>
              <Text style={[styles.energyLabel, { color: theme.textSecondary }]}>Today's Energy</Text>
              <Text style={[styles.energyScore, { color: theme.accent }]}>{forecast.energy}</Text>
              <Text style={[styles.energyMax, { color: theme.textSecondary }]}>/100</Text>
            </View>

            <View style={[styles.card, { backgroundColor: theme.card, borderColor: theme.cardBorder }]}>
              <Text style={[styles.statLabel, { color: theme.textSecondary }]}>Profile Info</Text>
              <Text style={[styles.statRow, { color: theme.text }]}>Sun Sign: {forecast.sunSign}</Text>
              <Text style={[styles.statRow, { color: theme.text }]}>Life Path: {forecast.lifePath}</Text>
              <Text style={[styles.statRow, { color: theme.text }]}>Personal Year: {forecast.personalYear}</Text>
              <Text style={[styles.statRow, { color: theme.text }]}>Chinese Zodiac: {forecast.chineseAnimal}</Text>
            </View>

            <View style={[styles.card, { backgroundColor: theme.card, borderColor: theme.cardBorder }]}>
              <Text style={[styles.statLabel, { color: theme.textSecondary }]}>{capitalize(period)} Reading</Text>
              <Text style={[styles.reading, { color: theme.text }]}>{forecast.reading}</Text>
            </View>

            <View style={[styles.card, { backgroundColor: theme.card, borderColor: theme.cardBorder }]}>
              <Text style={[styles.statLabel, { color: theme.textSecondary }]}>Category Scores</Text>
              {forecast.categories.map((cat) => (
                <View key={cat.label} style={styles.catRow}>
                  <Text style={[styles.catLabel, { color: theme.text }]}>{cat.label}</Text>
                  <View style={[styles.catTrack, { backgroundColor: theme.border }]}>
                    <View style={[styles.catFill, {
                      backgroundColor: cat.level === 'high' ? theme.accentGreen : cat.level === 'moderate' ? theme.accentOrange : theme.accent,
                      width: `${cat.value}%` as any,
                    }]} />
                  </View>
                  <Text style={[styles.catValue, { color: theme.textSecondary }]}>{cat.value}%</Text>
                </View>
              ))}
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
  periodRow: { flexDirection: 'row', gap: 8 },
  periodBtn: { flex: 1, paddingVertical: 10, borderRadius: 10, borderWidth: 1, alignItems: 'center' },
  periodText: { fontSize: 12 },
  energyCard: { borderRadius: 14, borderWidth: 1, padding: Spacing.four, alignItems: 'center', gap: 4 },
  energyLabel: { fontSize: 12, fontWeight: '700', textTransform: 'uppercase', letterSpacing: 0.5 },
  energyScore: { fontSize: 56, fontWeight: '900' },
  energyMax: { fontSize: 20, fontWeight: '600', marginTop: -8 },
  statLabel: { fontSize: 12, fontWeight: '700', textTransform: 'uppercase', letterSpacing: 0.5, marginBottom: 4 },
  statRow: { fontSize: 15, fontWeight: '500' },
  reading: { fontSize: 15, lineHeight: 22, fontStyle: 'italic' },
  catRow: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  catLabel: { fontSize: 13, fontWeight: '600', width: 70 },
  catTrack: { flex: 1, height: 8, borderRadius: 4 },
  catFill: { height: 8, borderRadius: 4 },
  catValue: { fontSize: 13, fontWeight: '700', width: 36, textAlign: 'right' },
});
