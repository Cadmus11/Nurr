import { useMemo, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Pressable } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useTheme } from '@/hooks/use-theme';
import { useProfileStore } from '@/stores/profile-store';
import { Spacing } from '@/constants/theme';
import { ZODIAC_SIGNS } from '@/constants/cosmic/zodiac';
import { MOON_SIGNS } from '@/constants/cosmic/moonSigns';
import { RISING_SIGNS } from '@/constants/cosmic/risingSigns';
import { ELEMENTS } from '@/constants/cosmic/elements';
import { calculateSunSign, calculateMoonSign, calculateRisingSign } from '@/utils/calculations';

type Tab = 'sun' | 'moon' | 'rising';

export default function AstrologyScreen() {
  const insets = useSafeAreaInsets();
  const theme = useTheme();
  const activeProfile = useProfileStore((s) => s.activeProfile);
  const [tab, setTab] = useState<Tab>('sun');

  const data = useMemo(() => {
    if (!activeProfile) return null;
    const [y, m, d] = activeProfile.birthDate.split('-').map(Number);
    const birthHour = activeProfile.birthTime ? parseInt(activeProfile.birthTime.split(':')[0], 10) : 12;
    const sunSign = calculateSunSign(m, d);
    const moonSign = calculateMoonSign(sunSign, y);
    const risingSign = calculateRisingSign(sunSign, birthHour);
    return { sunSign, moonSign, risingSign, sunData: ZODIAC_SIGNS[sunSign], moonData: MOON_SIGNS[moonSign], risingData: RISING_SIGNS[risingSign] };
  }, [activeProfile]);

  return (
    <ScrollView style={[styles.scroll, { backgroundColor: theme.background }]}
      contentContainerStyle={{ paddingBottom: insets.bottom + Spacing.six }}>
      <View style={styles.content}>
        <Text style={[styles.title, { color: theme.text }]}>Astrology</Text>
        <Text style={[styles.subtitle, { color: theme.textSecondary }]}>Sun signs, Moon signs, Rising signs & more</Text>

        {!activeProfile ? (
          <View style={[styles.card, { backgroundColor: theme.card, borderColor: theme.cardBorder }]}>
            <Text style={[styles.cardTitle, { color: theme.text }]}>No Profile</Text>
            <Text style={[styles.cardDesc, { color: theme.textSecondary }]}>Create a profile to see your astrology.</Text>
          </View>
        ) : data ? (
          <>
            <View style={styles.tabs}>
              {(['sun', 'moon', 'rising'] as Tab[]).map((t) => (
                <Pressable key={t} onPress={() => setTab(t)} style={[styles.tab, { backgroundColor: tab === t ? theme.accent : theme.surface, borderColor: tab === t ? theme.accent : theme.border }]}>
                  <Text style={[styles.tabText, { color: tab === t ? '#fff' : theme.text, fontWeight: tab === t ? '700' : '500' }]}>{capitalize(t)}</Text>
                </Pressable>
              ))}
            </View>

            {tab === 'sun' && <SunSignView data={data.sunData} theme={theme} />}
            {tab === 'moon' && <MoonSignView data={data.moonData} theme={theme} />}
            {tab === 'rising' && <RisingSignView data={data.risingData} theme={theme} />}
          </>
        ) : null}
      </View>
    </ScrollView>
  );
}

function SunSignView({ data, theme }: { data: typeof ZODIAC_SIGNS.aries; theme: any }) {
  const element = ELEMENTS[data.element];
  return (
    <View style={{ gap: 12 }}>
      <View style={[styles.signHeader, { backgroundColor: theme.card, borderColor: theme.cardBorder }]}>
        <Text style={[styles.signSymbol, { color: theme.accent }]}>{data.symbol}</Text>
        <Text style={[styles.signName, { color: theme.text }]}>{capitalize(data.sign)}</Text>
        <Text style={[styles.signDate, { color: theme.textSecondary }]}>{data.dateRange}</Text>
      </View>
      <InfoCard label="Element & Quality" value={`${capitalize(data.element)} · ${capitalize(data.quality)}`} theme={theme} />
      <InfoCard label="Ruling Planet" value={data.rulingPlanet} theme={theme} />
      {data.personality.slice(0, 3).map((p, i) => <BulletCard key={i} text={p} theme={theme} />)}
      <StrengthsCard label="Strengths" items={data.strengths} theme={theme} color={theme.accentGreen} />
      <StrengthsCard label="Weaknesses" items={data.weaknesses} theme={theme} color={theme.accentOrange} />
      <InfoCard label="Love Style" value={data.loveStyle} theme={theme} />
      <InfoCard label="Career Style" value={data.careerStyle} theme={theme} />
      <InfoCard label="Financial Habits" value={data.financialHabits} theme={theme} />
    </View>
  );
}

function MoonSignView({ data, theme }: { data: any; theme: any }) {
  return (
    <View style={{ gap: 12 }}>
      <View style={[styles.signHeader, { backgroundColor: theme.card, borderColor: theme.cardBorder }]}>
        <Text style={[styles.signSymbol, { color: theme.accent }]}>☽</Text>
        <Text style={[styles.signName, { color: theme.text }]}>{capitalize(data.sign)} Moon</Text>
      </View>
      <InfoCard label="Emotional Nature" value={data.emotionalNature} theme={theme} />
      <InfoCard label="Hidden Fears" value={data.hiddenFears} theme={theme} />
      <InfoCard label="Relationship Patterns" value={data.relationshipPatterns} theme={theme} />
      <StrengthsCard label="Emotional Strengths" items={data.emotionalStrengths} theme={theme} color={theme.accentGreen} />
      <InfoCard label="Intuition" value={data.intuition} theme={theme} />
      <InfoCard label="Subconscious" value={data.subconscious} theme={theme} />
    </View>
  );
}

function RisingSignView({ data, theme }: { data: any; theme: any }) {
  return (
    <View style={{ gap: 12 }}>
      <View style={[styles.signHeader, { backgroundColor: theme.card, borderColor: theme.cardBorder }]}>
        <Text style={[styles.signSymbol, { color: theme.accent }]}>⬆</Text>
        <Text style={[styles.signName, { color: theme.text }]}>{capitalize(data.sign)} Rising</Text>
      </View>
      <InfoCard label="First Impressions" value={data.firstImpressions} theme={theme} />
      <InfoCard label="Social Behavior" value={data.socialBehavior} theme={theme} />
      <StrengthsCard label="Appearance Traits" items={data.appearanceTraits} theme={theme} color={theme.accent} />
      <InfoCard label="Public Persona" value={data.publicPersona} theme={theme} />
    </View>
  );
}

function InfoCard({ label, value, theme }: { label: string; value: string; theme: any }) {
  return (
    <View style={[styles.infoCard, { backgroundColor: theme.card, borderColor: theme.cardBorder }]}>
      <Text style={[styles.infoLabel, { color: theme.textSecondary }]}>{label}</Text>
      <Text style={[styles.infoValue, { color: theme.text }]}>{value}</Text>
    </View>
  );
}

function BulletCard({ text, theme }: { text: string; theme: any }) {
  return (
    <View style={[styles.bulletCard, { backgroundColor: theme.card, borderColor: theme.cardBorder }]}>
      <Text style={[styles.bullet, { color: theme.accent }]}>✦</Text>
      <Text style={[styles.bulletText, { color: theme.text }]}>{text}</Text>
    </View>
  );
}

function StrengthsCard({ label, items, theme, color }: { label: string; items: string[]; theme: any; color: string }) {
  return (
    <View style={[styles.infoCard, { backgroundColor: theme.card, borderColor: theme.cardBorder }]}>
      <Text style={[styles.infoLabel, { color: theme.textSecondary }]}>{label}</Text>
      {items.map((item, i) => (
        <View key={i} style={styles.strengthRow}>
          <Text style={[styles.strengthDot, { color }]}>●</Text>
          <Text style={[styles.strengthText, { color: theme.text }]}>{item}</Text>
        </View>
      ))}
    </View>
  );
}

function capitalize(s: string): string { return s.charAt(0).toUpperCase() + s.slice(1); }

const styles = StyleSheet.create({
  scroll: { flex: 1 },
  content: { padding: Spacing.four, gap: Spacing.three },
  title: { fontSize: 28, fontWeight: '800' },
  subtitle: { fontSize: 15, marginBottom: 8 },
  card: { borderRadius: 14, borderWidth: 1, padding: Spacing.four, alignItems: 'center', gap: 8 },
  cardTitle: { fontSize: 18, fontWeight: '700' },
  cardDesc: { fontSize: 14, textAlign: 'center' },
  tabs: { flexDirection: 'row', gap: 8 },
  tab: { flex: 1, paddingVertical: 10, borderRadius: 10, borderWidth: 1, alignItems: 'center' },
  tabText: { fontSize: 13 },
  signHeader: { borderRadius: 14, borderWidth: 1, padding: Spacing.four, alignItems: 'center', gap: 4 },
  signSymbol: { fontSize: 48 },
  signName: { fontSize: 24, fontWeight: '800' },
  signDate: { fontSize: 14, fontWeight: '500' },
  infoCard: { borderRadius: 12, borderWidth: 1, padding: Spacing.three, gap: 8 },
  infoLabel: { fontSize: 11, fontWeight: '700', textTransform: 'uppercase', letterSpacing: 0.5 },
  infoValue: { fontSize: 15, lineHeight: 22 },
  bulletCard: { borderRadius: 12, borderWidth: 1, padding: Spacing.three, flexDirection: 'row', gap: 10 },
  bullet: { fontSize: 14, marginTop: 2 },
  bulletText: { fontSize: 14, lineHeight: 20, flex: 1 },
  strengthRow: { flexDirection: 'row', gap: 8 },
  strengthDot: { fontSize: 10, marginTop: 5 },
  strengthText: { fontSize: 14, flex: 1, lineHeight: 20 },
});
