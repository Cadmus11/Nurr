import { useMemo } from 'react';
import { View, Text, StyleSheet, ScrollView, Pressable } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useTheme } from '@/hooks/use-theme';
import { useProfileStore } from '@/stores/profile-store';
import { Spacing } from '@/constants/theme';
import {
  calculateSunSign, calculateMoonSign, calculateRisingSign,
  calculateLifePath, calculateDestinyNumber, calculateChineseZodiac, calculateChineseElement,
  calculateAllNumerology,
} from '@/utils/calculations';
import { ZODIAC_SIGNS } from '@/constants/cosmic/zodiac';
import { CHINESE_ZODIAC, ELEMENT_MEANINGS } from '@/constants/cosmic/chineseZodiac';
import { findBirthstone } from '@/constants/cosmic/birthstones';

type ReportType = 'blueprint' | 'numerology' | 'astrology';

export default function ReportsScreen() {
  const insets = useSafeAreaInsets();
  const theme = useTheme();
  const activeProfile = useProfileStore((s) => s.activeProfile);

  const reportData = useMemo(() => {
    if (!activeProfile) return null;
    const [y, m, d] = activeProfile.birthDate.split('-').map(Number);
    const sunSign = calculateSunSign(m, d);
    const moonSign = calculateMoonSign(sunSign, y);
    const risingSign = calculateRisingSign(sunSign, activeProfile.birthTime ? parseInt(activeProfile.birthTime.split(':')[0]) : 12);
    const sunData = ZODIAC_SIGNS[sunSign];
    const chineseAnimal = calculateChineseZodiac(y);
    const chineseElement = calculateChineseElement(y);
    const chineseData = CHINESE_ZODIAC[chineseAnimal];
    const elementData = ELEMENT_MEANINGS[chineseElement];
    const lifePath = calculateLifePath(activeProfile.birthDate);
    const destiny = calculateDestinyNumber(activeProfile.name);
    const numerology = calculateAllNumerology(activeProfile.birthDate, activeProfile.name);
    const birthstone = findBirthstone(m);
    return {
      name: activeProfile.name,
      sunSign, moonSign, risingSign, sunData,
      chineseAnimal, chineseElement, elementData, chineseData,
      lifePath, destiny, numerology, birthstone,
    };
  }, [activeProfile]);

  return (
    <ScrollView style={[styles.scroll, { backgroundColor: theme.background }]}
      contentContainerStyle={{ paddingBottom: insets.bottom + Spacing.six }}>
      <View style={styles.content}>
        <Text style={[styles.title, { color: theme.text }]}>Reports</Text>
        <Text style={[styles.subtitle, { color: theme.textSecondary }]}>Generate & export comprehensive reports</Text>

        {!activeProfile ? (
          <View style={[styles.card, { backgroundColor: theme.card, borderColor: theme.cardBorder }]}>
            <Text style={[styles.cardTitle, { color: theme.text }]}>No Profile</Text>
            <Text style={[styles.cardDesc, { color: theme.textSecondary }]}>Create a profile to generate reports.</Text>
          </View>
        ) : reportData ? (
          <>
            <View style={[styles.reportCard, { backgroundColor: theme.card, borderColor: theme.cardBorder }]}>
              <Text style={[styles.reportTitle, { color: theme.accent }]}>Cosmic Blueprint Report</Text>
              <Text style={[styles.reportSub, { color: theme.textSecondary }]}>For {reportData.name}</Text>
              <View style={styles.divider} />
              <ReportRow label="Sun Sign" value={`${reportData.sunData.symbol} ${capitalize(reportData.sunSign)}`} theme={theme} />
              <ReportRow label="Moon Sign" value={capitalize(reportData.moonSign)} theme={theme} />
              <ReportRow label="Rising Sign" value={capitalize(reportData.risingSign)} theme={theme} />
              <ReportRow label="Chinese Zodiac" value={`${capitalize(reportData.chineseAnimal)} · ${reportData.elementData.name}`} theme={theme} />
              <ReportRow label="Life Path" value={String(reportData.lifePath)} theme={theme} />
              <ReportRow label="Destiny Number" value={String(reportData.destiny)} theme={theme} />
              <ReportRow label="Birthstone" value={reportData.birthstone.stone} theme={theme} />
              <ReportRow label="Ruling Planet" value={reportData.sunData.rulingPlanet} theme={theme} />
            </View>

            <View style={[styles.reportCard, { backgroundColor: theme.card, borderColor: theme.cardBorder }]}>
              <Text style={[styles.reportTitle, { color: theme.accent }]}>Numerology Report</Text>
              {reportData.numerology && (
                <>
                  <ReportRow label="Life Path" value={String(reportData.numerology.lifePath)} theme={theme} />
                  <ReportRow label="Destiny" value={String(reportData.numerology.destiny)} theme={theme} />
                  <ReportRow label="Soul Urge" value={String(reportData.numerology.soulUrge)} theme={theme} />
                  <ReportRow label="Personality" value={String(reportData.numerology.personality)} theme={theme} />
                  <ReportRow label="Personal Year" value={String(reportData.numerology.personalYear)} theme={theme} />
                  {reportData.numerology.karmicDebt && (
                    <ReportRow label="Karmic Debt" value={String(reportData.numerology.karmicDebt)} theme={theme} />
                  )}
                </>
              )}
            </View>

            <View style={[styles.reportCard, { backgroundColor: theme.card, borderColor: theme.cardBorder }]}>
              <Text style={[styles.reportTitle, { color: theme.accent }]}>Chinese Zodiac Report</Text>
              <ReportRow label="Animal" value={capitalize(reportData.chineseAnimal)} theme={theme} />
              <ReportRow label="Element" value={reportData.elementData.name} theme={theme} />
              <ReportRow label="Direction" value={reportData.elementData.direction} theme={theme} />
              <ReportRow label="Traits" value={reportData.chineseData.traits} theme={theme} />
            </View>

            <Pressable style={[styles.exportBtn, { backgroundColor: theme.accent }]}>
              <Text style={styles.exportBtnText}>📄 Export as PDF</Text>
            </Pressable>
          </>
        ) : null}
      </View>
    </ScrollView>
  );
}

function ReportRow({ label, value, theme }: { label: string; value: string; theme: any }) {
  return (
    <View style={styles.reportRow}>
      <Text style={[styles.rLabel, { color: theme.textSecondary }]}>{label}</Text>
      <Text style={[styles.rValue, { color: theme.text }]}>{value}</Text>
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
  reportCard: { borderRadius: 14, borderWidth: 1, padding: Spacing.four, gap: 6 },
  reportTitle: { fontSize: 16, fontWeight: '800', marginBottom: 6 },
  reportSub: { fontSize: 13, marginBottom: 4 },
  divider: { height: 1, backgroundColor: 'transparent', marginVertical: 4 },
  reportRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingVertical: 4 },
  rLabel: { fontSize: 12, fontWeight: '600', textTransform: 'uppercase', letterSpacing: 0.3, flex: 1 },
  rValue: { fontSize: 14, fontWeight: '700', textAlign: 'right', flex: 1 },
  exportBtn: { paddingVertical: 16, borderRadius: 14, alignItems: 'center', marginTop: 8 },
  exportBtnText: { color: '#fff', fontSize: 16, fontWeight: '700' },
});
