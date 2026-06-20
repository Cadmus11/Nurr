import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useTheme } from '@/hooks/use-theme';
import { useProfileStore } from '@/stores/profile-store';
import { Spacing } from '@/constants/theme';

export default function BlueprintScreen() {
  const insets = useSafeAreaInsets();
  const theme = useTheme();
  const activeProfile = useProfileStore((s) => s.activeProfile);

  return (
    <ScrollView
      style={[styles.scroll, { backgroundColor: theme.background }]}
      contentContainerStyle={{ paddingBottom: insets.bottom + Spacing.six }}
    >
      <View style={styles.content}>
        <Text style={[styles.title, { color: theme.text }]}>Cosmic Blueprint</Text>
        <Text style={[styles.subtitle, { color: theme.textSecondary }]}>
          {activeProfile?.name ?? 'Create a profile to see your cosmic blueprint'}
        </Text>

        {!activeProfile ? (
          <View style={[styles.emptyCard, { backgroundColor: theme.card, borderColor: theme.cardBorder }]}>
            <Text style={[styles.emptyText, { color: theme.textSecondary }]}>
              No profile selected. Go to Profiles to create one.
            </Text>
          </View>
        ) : (
          <View style={styles.sections}>
            <BlueprintCard label="Sun Sign" value="—" theme={theme} />
            <BlueprintCard label="Moon Sign" value="—" theme={theme} />
            <BlueprintCard label="Rising Sign" value="—" theme={theme} />
            <BlueprintCard label="Life Path" value="—" theme={theme} />
            <BlueprintCard label="Destiny Number" value="—" theme={theme} />
            <BlueprintCard label="Chinese Zodiac" value="—" theme={theme} />
            <BlueprintCard label="Spirit Animal" value="—" theme={theme} />
            <BlueprintCard label="Dominant Planet" value="—" theme={theme} />
            <BlueprintCard label="Birthstone" value="—" theme={theme} />
          </View>
        )}
      </View>
    </ScrollView>
  );
}

function BlueprintCard({ label, value, theme }: { label: string; value: string; theme: Record<string, string> }) {
  return (
    <View style={[styles.card, { backgroundColor: theme.card, borderColor: theme.cardBorder }]}>
      <Text style={[styles.cardLabel, { color: theme.textSecondary }]}>{label}</Text>
      <Text style={[styles.cardValue, { color: theme.text }]}>{value}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  scroll: { flex: 1 },
  content: { padding: Spacing.four, gap: Spacing.three },
  title: { fontSize: 28, fontWeight: '800' },
  subtitle: { fontSize: 15, marginBottom: 8 },
  emptyCard: {
    borderRadius: 14,
    borderWidth: 1,
    padding: Spacing.five,
    alignItems: 'center',
  },
  emptyText: { fontSize: 15, textAlign: 'center' },
  sections: { gap: 10 },
  card: {
    borderRadius: 12,
    borderWidth: 1,
    padding: Spacing.three,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  cardLabel: { fontSize: 14, fontWeight: '500' },
  cardValue: { fontSize: 16, fontWeight: '700' },
});
