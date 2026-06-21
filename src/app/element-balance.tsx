import { useMemo, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Pressable } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useTheme } from '@/hooks/use-theme';
import { useProfileStore } from '@/stores/profile-store';
import { Spacing } from '@/constants/theme';
import { ELEMENTS, ELEMENT_LIST } from '@/constants/cosmic/elements';
import { calculateSunSign } from '@/utils/calculations';
import { ZODIAC_SIGNS } from '@/constants/cosmic/zodiac';
import type { ZodiacElement } from '@/types/cosmic';

const ELEMENT_EMOJIS: Record<string, string> = { fire: '🔥', earth: '🌍', air: '💨', water: '🌊' };

export default function ElementBalanceScreen() {
  const insets = useSafeAreaInsets();
  const theme = useTheme();
  const activeProfile = useProfileStore((s) => s.activeProfile);
  const [selectedElement, setSelectedElement] = useState<ZodiacElement>('fire');

  const elementData = useMemo(() => ELEMENTS[selectedElement], [selectedElement]);

  const profileElement = useMemo(() => {
    if (!activeProfile) return null;
    const [y, m, d] = activeProfile.birthDate.split('-').map(Number);
    const sunSign = calculateSunSign(m, d);
    return ZODIAC_SIGNS[sunSign].element;
  }, [activeProfile]);

  const weakElement = useMemo(() => {
    if (!profileElement) return null;
    const order: ZodiacElement[] = ['fire', 'earth', 'air', 'water'];
    const idx = order.indexOf(profileElement);
    return order[(idx + 2) % 4];
  }, [profileElement]);

  return (
    <ScrollView style={[styles.scroll, { backgroundColor: theme.background }]}
      contentContainerStyle={{ paddingBottom: insets.bottom + Spacing.six }}>
      <View style={styles.content}>
        <Text style={[styles.title, { color: theme.text }]}>Element Balance</Text>
        <Text style={[styles.subtitle, { color: theme.textSecondary }]}>Western element analysis & balance suggestions</Text>

        {activeProfile && profileElement && (
          <View style={[styles.profileCard, { backgroundColor: theme.card, borderColor: theme.cardBorder }]}>
            <Text style={[styles.profileLabel, { color: theme.textSecondary }]}>Your Dominant Element</Text>
            <Text style={styles.profileEmoji}>{ELEMENT_EMOJIS[profileElement]}</Text>
            <Text style={[styles.profileName, { color: theme.accent }]}>{capitalize(profileElement)}</Text>
            {weakElement && (
              <Text style={[styles.profileWeak, { color: theme.accentOrange }]}>Weak Element: {capitalize(weakElement)}</Text>
            )}
          </View>
        )}

        <Text style={[styles.sectionLabel, { color: theme.textSecondary }]}>Explore Elements</Text>
        <View style={styles.elementRow}>
          {ELEMENT_LIST.map((el) => {
            const isActive = selectedElement === el.element;
            return (
              <Pressable key={el.element} onPress={() => setSelectedElement(el.element)}
                style={[styles.elementBtn, {
                  backgroundColor: isActive ? theme.accent : theme.surface,
                  borderColor: isActive ? theme.accent : theme.border,
                }]}>
                <Text style={styles.elementEmoji}>{ELEMENT_EMOJIS[el.element]}</Text>
                <Text style={[styles.elementLabel, { color: isActive ? '#fff' : theme.text, fontWeight: isActive ? '700' : '500' }]}>
                  {capitalize(el.element)}
                </Text>
              </Pressable>
            );
          })}
        </View>

        {elementData && (
          <View style={{ gap: 12 }}>
            <View style={[styles.card, { backgroundColor: theme.card, borderColor: theme.cardBorder }]}>
              <Text style={[styles.cardLabel, { color: theme.textSecondary }]}>Traits</Text>
              {elementData.traits.map((t, i) => (
                <Text key={i} style={[styles.bullet, { color: theme.text }]}>✦ {t}</Text>
              ))}
            </View>

            <View style={[styles.card, { backgroundColor: theme.card, borderColor: theme.cardBorder }]}>
              <Text style={[styles.cardLabel, { color: theme.accentGreen }]}>When Dominant</Text>
              {elementData.dominant.map((d, i) => (
                <Text key={i} style={[styles.bullet, { color: theme.text }]}>✦ {d}</Text>
              ))}
            </View>

            <View style={[styles.card, { backgroundColor: theme.card, borderColor: theme.cardBorder }]}>
              <Text style={[styles.cardLabel, { color: theme.accentOrange }]}>When Weak</Text>
              {elementData.weak.map((w, i) => (
                <Text key={i} style={[styles.bullet, { color: theme.text }]}>✦ {w}</Text>
              ))}
            </View>

            <View style={[styles.balanceCard, { backgroundColor: theme.accent + '10', borderColor: theme.accent + '30' }]}>
              <Text style={[styles.balanceLabel, { color: theme.textSecondary }]}>Balance Suggestions</Text>
              {elementData.balanceSuggestions.map((s, i) => (
                <Text key={i} style={[styles.balanceItem, { color: theme.text }]}>⊙ {s}</Text>
              ))}
            </View>

            <View style={[styles.card, { backgroundColor: theme.card, borderColor: theme.cardBorder }]}>
              <Text style={[styles.cardLabel, { color: theme.textSecondary }]}>Zodiac Signs</Text>
              <Text style={[styles.cardValue, { color: theme.text }]}>{elementData.signs.map((s) => capitalize(s)).join(', ')}</Text>
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
  profileCard: { borderRadius: 16, borderWidth: 1, padding: Spacing.four, alignItems: 'center', gap: 8 },
  profileLabel: { fontSize: 12, fontWeight: '700', textTransform: 'uppercase', letterSpacing: 0.5 },
  profileEmoji: { fontSize: 56 },
  profileName: { fontSize: 24, fontWeight: '900' },
  profileWeak: { fontSize: 14, fontWeight: '600' },
  elementRow: { flexDirection: 'row', gap: 8 },
  elementBtn: { flex: 1, alignItems: 'center', gap: 4, paddingVertical: 12, borderRadius: 10, borderWidth: 1 },
  elementEmoji: { fontSize: 24 },
  elementLabel: { fontSize: 12, fontWeight: '600' },
  card: { borderRadius: 12, borderWidth: 1, padding: Spacing.three, gap: 6 },
  cardLabel: { fontSize: 11, fontWeight: '700', textTransform: 'uppercase', letterSpacing: 0.5, marginBottom: 2 },
  cardValue: { fontSize: 15, lineHeight: 22 },
  bullet: { fontSize: 14, lineHeight: 22 },
  balanceCard: { borderRadius: 14, borderWidth: 1, padding: Spacing.four, gap: 8 },
  balanceLabel: { fontSize: 11, fontWeight: '700', textTransform: 'uppercase', letterSpacing: 0.5, marginBottom: 4 },
  balanceItem: { fontSize: 14, lineHeight: 22 },
});
