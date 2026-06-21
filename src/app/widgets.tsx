import { useMemo } from 'react';
import { View, Text, StyleSheet, ScrollView, Pressable } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { useTheme } from '@/hooks/use-theme';
import { useSpeech } from '@/hooks/use-speech';
import { useProfileStore } from '@/stores/profile-store';
import { Spacing } from '@/constants/theme';
import { getDailyMessage, calculateEnergyScore, generateForecast } from '@/utils/calculations';
import { getMoonPhase } from '@/utils/calculations/lunarPhase';
import { MOON_PHASES } from '@/constants/cosmic/moonPhases';
import { findAngelNumber } from '@/constants/cosmic/angelNumbers';
import type { MoonPhase } from '@/types/cosmic';

const PHASE_SYMBOLS: Record<MoonPhase, string> = {
  'new-moon': '🌑', 'waxing-crescent': '🌒', 'first-quarter': '🌓', 'waxing-gibbous': '🌔',
  'full-moon': '🌕', 'waning-gibbous': '🌖', 'last-quarter': '🌗', 'waning-crescent': '🌘',
};

function getLevelColor(level: 'high' | 'moderate' | 'low', theme: any): string {
  switch (level) {
    case 'high': return theme.accentGreen;
    case 'moderate': return theme.accentOrange;
    case 'low': return theme.accent;
  }
}

function getLevelValue(level: 'high' | 'moderate' | 'low'): number {
  switch (level) {
    case 'high': return 0.85;
    case 'moderate': return 0.55;
    case 'low': return 0.25;
  }
}

function getLevelLabel(level: 'high' | 'moderate' | 'low'): string {
  switch (level) {
    case 'high': return 'Strong';
    case 'moderate': return 'Moderate';
    case 'low': return 'Low';
  }
}

export default function WidgetsScreen() {
  const insets = useSafeAreaInsets();
  const theme = useTheme();
  const activeProfile = useProfileStore((s) => s.activeProfile);
  const { speak, isSpeaking } = useSpeech();

  const today = useMemo(() => {
    const now = new Date();
    return {
      date: now.toISOString().split('T')[0],
      dayName: now.toLocaleDateString('en-US', { weekday: 'long' }),
      formatted: now.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }),
    };
  }, []);

  const energy = useMemo(() => {
    if (!activeProfile) return null;
    return calculateEnergyScore(activeProfile.birthDate);
  }, [activeProfile]);

  const dailyMessage = useMemo(() => {
    if (!activeProfile) return null;
    return getDailyMessage(activeProfile.birthDate, activeProfile.name);
  }, [activeProfile]);

  const moon = useMemo(() => {
    const phase = getMoonPhase(new Date());
    return { phase, data: MOON_PHASES[phase] };
  }, []);

  const angel = useMemo(() => {
    if (!activeProfile) return null;
    const now = new Date();
    const seed = (now.getDate() + now.getMonth() + now.getFullYear()) % 18;
    const numbers = ['111', '222', '333', '444', '555', '666', '777', '888', '999', '1111', '2222', '3333', '4444', '5555', '7777', '8888', '9999', '000'];
    return findAngelNumber(numbers[seed]);
  }, [activeProfile]);

  const forecast = useMemo(() => {
    if (!activeProfile) return null;
    return generateForecast(activeProfile.birthDate, 'daily');
  }, [activeProfile]);

  if (!activeProfile) {
    return (
      <ScrollView style={[styles.scroll, { backgroundColor: theme.background }]}
        contentContainerStyle={{ paddingBottom: insets.bottom + Spacing.six }}>
        <View style={styles.content}>
          <Text style={[styles.title, { color: theme.text }]}>Widgets</Text>
          <Text style={[styles.subtitle, { color: theme.textSecondary }]}>Cosmic insights at a glance</Text>
          <View style={[styles.card, { backgroundColor: theme.card, borderColor: theme.cardBorder }]}>
            <Text style={[styles.emptyText, { color: theme.textSecondary }]}>Create a profile to see your widgets.</Text>
          </View>
        </View>
      </ScrollView>
    );
  }

  const readWidgets = () => {
    if (!dailyMessage || !energy || !forecast) return;
    const text = `Today is ${today.formatted}. ${dailyMessage.theme} energy. ${dailyMessage.affirmation}. Energy score ${energy.overall} out of 100. The moon is in ${moon.data.title}. Your angel number is ${angel?.number ?? 'not available'}. ${forecast.love}. ${forecast.career}.`;
    speak(text);
  };

  return (
    <ScrollView style={[styles.scroll, { backgroundColor: theme.background }]}
      contentContainerStyle={{ paddingBottom: insets.bottom + Spacing.six }}>
      <View style={styles.content}>
        <View style={styles.headerRow}>
          <View style={{ flex: 1 }}>
            <Text style={[styles.title, { color: theme.text }]}>Widgets</Text>
            <Text style={[styles.subtitle, { color: theme.textSecondary }]}>Today&apos;s cosmic snapshot</Text>
          </View>
          <Pressable
            onPress={readWidgets}
            style={({ pressed }) => [styles.speakBtn, { backgroundColor: isSpeaking ? theme.accent + '30' : theme.card, borderColor: theme.cardBorder, opacity: pressed ? 0.7 : 1 }]}
          >
            <Text style={[styles.speakIcon, { color: theme.accent }]}>{isSpeaking ? '⏹' : '🔊'}</Text>
          </Pressable>
        </View>

        <Text style={[styles.dateLabel, { color: theme.textTertiary }]}>{today.dayName}, {today.formatted}</Text>

        <View style={[styles.energyCard, { backgroundColor: theme.card, borderColor: theme.cardBorder }]}>
            <Text style={[styles.cardLabel, { color: theme.textSecondary }]}>Today&apos;s Energy</Text>
          <View style={styles.energyRow}>
            <Text style={[styles.energyScore, { color: theme.accent }]}>{energy?.overall ?? '—'}</Text>
            <Text style={[styles.energyMax, { color: theme.textSecondary }]}>/100</Text>
          </View>
          <View style={styles.energyBars}>
            {(['career', 'love', 'finance', 'health', 'spiritual'] as const).map((cat) => (
              <View key={cat} style={styles.energyBarItem}>
                <View style={styles.energyBarLabelRow}>
                  <Text style={[styles.energyBarLabel, { color: theme.textSecondary }]}>{capitalize(cat)}</Text>
                  <Text style={[styles.energyBarValue, { color: getLevelColor(energy?.[cat] ?? 'moderate', theme) }]}>{getLevelLabel(energy?.[cat] ?? 'moderate')}</Text>
                </View>
                <View style={[styles.energyBarTrack, { backgroundColor: theme.border }]}>
                  <View style={[styles.energyBarFill, { backgroundColor: getLevelColor(energy?.[cat] ?? 'moderate', theme), width: `${getLevelValue(energy?.[cat] ?? 'moderate') * 100}%` as any }]} />
                </View>
              </View>
            ))}
          </View>
        </View>

        <View style={styles.widgetGrid}>
          <View style={[styles.widgetCard, { backgroundColor: theme.card, borderColor: theme.cardBorder }]}>
            <Text style={styles.widgetEmoji}>{PHASE_SYMBOLS[moon.phase]}</Text>
            <Text style={[styles.widgetLabel, { color: theme.textSecondary }]}>Moon Phase</Text>
            <Text style={[styles.widgetValue, { color: theme.text }]}>{moon.data.title}</Text>
            <Text style={[styles.widgetSub, { color: theme.textTertiary }]}>{moon.data.energy}</Text>
          </View>

          <View style={[styles.widgetCard, { backgroundColor: theme.card, borderColor: theme.cardBorder }]}>
            <Text style={styles.widgetEmoji}>✧</Text>
            <Text style={[styles.widgetLabel, { color: theme.textSecondary }]}>Angel Number</Text>
            <Text style={[styles.widgetValue, { color: theme.accent }]}>{angel?.number ?? '—'}</Text>
            <Text style={[styles.widgetSub, { color: theme.textTertiary }]} numberOfLines={2}>{angel?.meaning ?? ''}</Text>
          </View>

          <View style={[styles.widgetCard, { backgroundColor: theme.card, borderColor: theme.cardBorder }]}>
            <Text style={styles.widgetEmoji}>💼</Text>
            <Text style={[styles.widgetLabel, { color: theme.textSecondary }]}>Career Forecast</Text>
            <Text style={[styles.widgetValueSm, { color: theme.text }]} numberOfLines={2}>{forecast?.career ?? ''}</Text>
          </View>

          <View style={[styles.widgetCard, { backgroundColor: theme.card, borderColor: theme.cardBorder }]}>
            <Text style={styles.widgetEmoji}>❤</Text>
            <Text style={[styles.widgetLabel, { color: theme.textSecondary }]}>Love Forecast</Text>
            <Text style={[styles.widgetValueSm, { color: theme.text }]} numberOfLines={2}>{forecast?.love ?? ''}</Text>
          </View>
        </View>

        {dailyMessage && (
          <View style={[styles.messageCard, { backgroundColor: theme.card, borderColor: theme.accent + '60' }]}>
            <View style={styles.messageHeader}>
              <Text style={[styles.messageLabel, { color: theme.textSecondary }]}>Today&apos;s Theme</Text>
              <View style={[styles.themeBadge, { backgroundColor: theme.accent + '20' }]}>
                <Text style={[styles.themeText, { color: theme.accent }]}>{dailyMessage.theme}</Text>
              </View>
            </View>
            <Text style={[styles.affirmation, { color: theme.text }]}>&ldquo;{dailyMessage.affirmation}&rdquo;</Text>
            <Text style={[styles.mantra, { color: theme.accent }]}>✦ {dailyMessage.mantra}</Text>
          </View>
        )}

        <Pressable
          onPress={() => router.navigate('/forecast')}
          style={({ pressed }) => [styles.viewMore, { backgroundColor: theme.accent, opacity: pressed ? 0.8 : 1 }]}
        >
          <Text style={styles.viewMoreText}>View Full Forecast →</Text>
        </Pressable>
      </View>
    </ScrollView>
  );
}

function capitalize(s: string): string { return s.charAt(0).toUpperCase() + s.slice(1); }

const styles = StyleSheet.create({
  scroll: { flex: 1 },
  content: { padding: Spacing.four, gap: Spacing.three },
  title: { fontSize: 28, fontWeight: '800' },
  subtitle: { fontSize: 15, marginBottom: 4 },
  headerRow: { flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'space-between' },
  dateLabel: { fontSize: 13, fontWeight: '500', marginTop: -4 },
  speakBtn: { width: 44, height: 44, borderRadius: 12, borderWidth: 1, alignItems: 'center', justifyContent: 'center' },
  speakIcon: { fontSize: 20 },
  card: { borderRadius: 14, borderWidth: 1, padding: Spacing.four, alignItems: 'center' },
  emptyText: { fontSize: 15, textAlign: 'center' },
  energyCard: { borderRadius: 16, borderWidth: 1, padding: Spacing.four, gap: 8 },
  cardLabel: { fontSize: 12, fontWeight: '700', textTransform: 'uppercase', letterSpacing: 0.5 },
  energyRow: { flexDirection: 'row', alignItems: 'baseline' },
  energyScore: { fontSize: 48, fontWeight: '800' },
  energyMax: { fontSize: 20, fontWeight: '600', marginLeft: 4 },
  energyBars: { gap: 10 },
  energyBarItem: { gap: 4 },
  energyBarLabelRow: { flexDirection: 'row', justifyContent: 'space-between' },
  energyBarLabel: { fontSize: 13, fontWeight: '500' },
  energyBarValue: { fontSize: 12, fontWeight: '700' },
  energyBarTrack: { height: 6, borderRadius: 3 },
  energyBarFill: { height: 6, borderRadius: 3 },
  widgetGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 10 },
  widgetCard: { width: '47.5%', borderRadius: 14, borderWidth: 1, padding: Spacing.three, gap: 6 },
  widgetEmoji: { fontSize: 28 },
  widgetLabel: { fontSize: 11, fontWeight: '700', textTransform: 'uppercase', letterSpacing: 0.3 },
  widgetValue: { fontSize: 18, fontWeight: '800' },
  widgetValueSm: { fontSize: 13, lineHeight: 18, fontWeight: '600' },
  widgetSub: { fontSize: 12, lineHeight: 16 },
  messageCard: { borderRadius: 16, borderWidth: 1, padding: Spacing.four, gap: 10 },
  messageHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  messageLabel: { fontSize: 12, fontWeight: '700', textTransform: 'uppercase', letterSpacing: 0.5 },
  themeBadge: { paddingHorizontal: 10, paddingVertical: 4, borderRadius: 12 },
  themeText: { fontSize: 13, fontWeight: '700' },
  affirmation: { fontSize: 17, fontWeight: '600', lineHeight: 24, fontStyle: 'italic' },
  mantra: { fontSize: 14, fontWeight: '700', textAlign: 'center', paddingVertical: 6 },
  viewMore: { paddingVertical: 14, borderRadius: 14, alignItems: 'center' },
  viewMoreText: { color: '#ffffff', fontSize: 16, fontWeight: '700' },
});
