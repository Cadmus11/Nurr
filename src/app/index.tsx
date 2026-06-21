import { useEffect, useMemo } from 'react';
import { View, Text, StyleSheet, ScrollView, Pressable } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { useTheme } from '@/hooks/use-theme';
import { useProfileStore } from '@/stores/profile-store';
import { Spacing } from '@/constants/theme';
import { getDailyMessage, calculateEnergyScore } from '@/utils/calculations';

const QUICK_ACTIONS = [
  { label: 'Cosmic Blueprint', icon: '✦', route: '/blueprint', color: '#3b82f6' },
  { label: 'Numerology', icon: '🔢', route: '/numerology', color: '#f97316' },
  { label: 'Tarot', icon: '▤', route: '/tarot', color: '#8b5cf6' },
  { label: 'Widgets', icon: '🔲', route: '/widgets', color: '#14b8a6' },
  { label: 'Analytics', icon: '📊', route: '/analytics', color: '#6366f1' },
  { label: 'Forecast', icon: '📈', route: '/forecast', color: '#f59e0b' },
];

export default function HomeScreen() {
  const insets = useSafeAreaInsets();
  const theme = useTheme();
  const profiles = useProfileStore((s) => s.profiles);
  const activeProfile = useProfileStore((s) => s.activeProfile);
  const setActiveProfile = useProfileStore((s) => s.setActiveProfile);

  useEffect(() => {
    if (profiles.length > 0 && !activeProfile) {
      setActiveProfile(profiles[0].id);
    }
  }, [profiles, activeProfile, setActiveProfile]);

  const dailyMessage = useMemo(() => {
    if (!activeProfile) return null;
    try {
      return getDailyMessage(activeProfile.birthDate, activeProfile.name);
    } catch {
      return null;
    }
  }, [activeProfile]);

  const energy = useMemo(() => {
    if (!activeProfile) return null;
    try {
      return calculateEnergyScore(activeProfile.birthDate);
    } catch {
      return null;
    }
  }, [activeProfile]);

  function getLevelValue(level: 'high' | 'moderate' | 'low'): number {
    switch (level) {
      case 'high': return 0.85;
      case 'moderate': return 0.55;
      case 'low': return 0.25;
    }
  }

  function getLevelColor(level: 'high' | 'moderate' | 'low'): string {
    switch (level) {
      case 'high': return theme.accentGreen;
      case 'moderate': return theme.accentOrange;
      case 'low': return theme.accent;
    }
  }

  return (
    <ScrollView
      style={[styles.scroll, { backgroundColor: theme.background }]}
      contentContainerStyle={[
        styles.content,
        { paddingBottom: insets.bottom + Spacing.four },
      ]}
    >
      <View style={styles.header}>
        <Text style={[styles.greeting, { color: theme.textSecondary }]}>
          Welcome back
        </Text>
        <Text style={[styles.name, { color: theme.text }]}>
          {activeProfile?.name ?? 'Cosmic Seeker'}
        </Text>
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
          <Text style={[styles.focus, { color: theme.textSecondary }]}>🎯 {dailyMessage.focus}</Text>
        </View>
      )}

      {energy && (
        <View style={[styles.energyCard, { backgroundColor: theme.card, borderColor: theme.cardBorder }]}>
          <Text style={[styles.energyLabel, { color: theme.textSecondary }]}>
            Today&apos;s Energy
          </Text>
          <View style={styles.energyRow}>
            <Text style={[styles.energyScore, { color: theme.accent }]}>{energy.overall}</Text>
            <Text style={[styles.energyMax, { color: theme.textSecondary }]}>/100</Text>
          </View>
          <View style={styles.energyBars}>
            {(['career', 'love', 'finance', 'health', 'spiritual'] as const).map((cat) => (
              <View key={cat} style={styles.energyBarItem}>
                <Text style={[styles.energyBarLabel, { color: theme.textSecondary }]}>
                  {capitalize(cat)}
                </Text>
                <View style={[styles.energyBarTrack, { backgroundColor: theme.border }]}>
                  <View
                    style={[
                      styles.energyBarFill,
                      {
                        backgroundColor: getLevelColor(energy[cat]),
                        width: `${getLevelValue(energy[cat]) * 100}%` as any,
                      },
                    ]}
                  />
                </View>
              </View>
            ))}
          </View>
        </View>
      )}

      {dailyMessage && (
        <View style={[styles.card, { backgroundColor: theme.card, borderColor: theme.cardBorder }]}>
          <Text style={[styles.guidanceLabel, { color: theme.textSecondary }]}>Daily Guidance</Text>
          <Text style={[styles.guidanceText, { color: theme.text }]}>{dailyMessage.guidance}</Text>
        </View>
      )}

      <Text style={[styles.sectionTitle, { color: theme.text }]}>
        Explore
      </Text>

      <View style={styles.grid}>
        {QUICK_ACTIONS.map((action) => (
          <Pressable
            key={action.route}
            onPress={() => router.navigate(action.route)}
            style={({ pressed }) => [
              styles.gridItem,
              {
                backgroundColor: theme.card,
                borderColor: theme.cardBorder,
                opacity: pressed ? 0.8 : 1,
              },
            ]}
          >
            <View style={[styles.gridIcon, { backgroundColor: action.color + '20' }]}>
              <Text style={[styles.gridIconText, { color: action.color }]}>
                {action.icon}
              </Text>
            </View>
            <Text style={[styles.gridLabel, { color: theme.text }]}>
              {action.label}
            </Text>
          </Pressable>
        ))}
      </View>

      {profiles.length === 0 && (
        <Pressable
          onPress={() => router.navigate('/profile-create')}
          style={({ pressed }) => [
            styles.createBtn,
            {
              backgroundColor: theme.accent,
              opacity: pressed ? 0.8 : 1,
            },
          ]}
        >
          <Text style={styles.createBtnText}>Create Your Profile</Text>
        </Pressable>
      )}
    </ScrollView>
  );
}

function capitalize(s: string): string { return s.charAt(0).toUpperCase() + s.slice(1); }

const styles = StyleSheet.create({
  scroll: {
    flex: 1,
  },
  content: {
    padding: Spacing.four,
  },
  header: {
    marginBottom: Spacing.four,
  },
  greeting: {
    fontSize: 15,
    fontWeight: '500',
  },
  name: {
    fontSize: 28,
    fontWeight: '800',
    marginTop: 4,
  },
  messageCard: {
    borderRadius: 16,
    borderWidth: 1,
    padding: Spacing.four,
    marginBottom: Spacing.three,
    gap: 10,
  },
  messageHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  messageLabel: {
    fontSize: 12,
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  themeBadge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  themeText: {
    fontSize: 13,
    fontWeight: '700',
  },
  affirmation: {
    fontSize: 17,
    fontWeight: '600',
    lineHeight: 24,
    fontStyle: 'italic',
  },
  mantra: {
    fontSize: 14,
    fontWeight: '700',
    textAlign: 'center',
    paddingVertical: 6,
  },
  focus: {
    fontSize: 13,
    fontWeight: '500',
    lineHeight: 18,
  },
  card: {
    borderRadius: 14,
    borderWidth: 1,
    padding: Spacing.four,
    marginBottom: Spacing.four,
    gap: 8,
  },
  guidanceLabel: {
    fontSize: 12,
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  guidanceText: {
    fontSize: 14,
    lineHeight: 20,
    fontWeight: '500',
  },
  energyCard: {
    borderRadius: 16,
    borderWidth: 1,
    padding: Spacing.four,
    marginBottom: Spacing.three,
  },
  energyLabel: {
    fontSize: 13,
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  energyRow: {
    flexDirection: 'row',
    alignItems: 'baseline',
    marginTop: 8,
  },
  energyScore: {
    fontSize: 48,
    fontWeight: '800',
  },
  energyMax: {
    fontSize: 20,
    fontWeight: '600',
    marginLeft: 4,
  },
  energyBars: {
    marginTop: Spacing.three,
    gap: 12,
  },
  energyBarItem: {
    gap: 4,
  },
  energyBarLabel: {
    fontSize: 13,
    fontWeight: '500',
  },
  energyBarTrack: {
    height: 6,
    borderRadius: 3,
  },
  energyBarFill: {
    height: 6,
    borderRadius: 3,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    marginBottom: Spacing.three,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  gridItem: {
    width: '47%',
    borderRadius: 14,
    borderWidth: 1,
    padding: Spacing.three,
    gap: 12,
  },
  gridIcon: {
    width: 44,
    height: 44,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  gridIconText: {
    fontSize: 22,
  },
  gridLabel: {
    fontSize: 15,
    fontWeight: '600',
  },
  createBtn: {
    marginTop: Spacing.four,
    paddingVertical: 16,
    borderRadius: 14,
    alignItems: 'center',
  },
  createBtnText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '700',
  },
});
