import { useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, Pressable } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { useTheme } from '@/hooks/use-theme';
import { useProfileStore } from '@/stores/profile-store';
import { Spacing } from '@/constants/theme';

const QUICK_ACTIONS = [
  { label: 'Cosmic Blueprint', icon: '✦', route: '/blueprint', color: '#3b82f6' },
  { label: 'Numerology', icon: '🔢', route: '/numerology', color: '#f97316' },
  { label: 'Tarot', icon: '▤', route: '/tarot', color: '#8b5cf6' },
  { label: 'Angel Numbers', icon: '✧', route: '/angel-numbers', color: '#22c55e' },
  { label: 'Compatibility', icon: '♥', route: '/compatibility', color: '#ec4899' },
  { label: 'Forecast', icon: '📈', route: '/forecast', color: '#14b8a6' },
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

      <View style={[styles.energyCard, { backgroundColor: theme.card, borderColor: theme.cardBorder }]}>
        <Text style={[styles.energyLabel, { color: theme.textSecondary }]}>
          Today's Energy
        </Text>
        <View style={styles.energyRow}>
          <Text style={[styles.energyScore, { color: theme.accent }]}>87</Text>
          <Text style={[styles.energyMax, { color: theme.textSecondary }]}>/100</Text>
        </View>
        <View style={styles.energyBars}>
          {[
            { label: 'Career', value: 0.85, color: theme.accentOrange },
            { label: 'Love', value: 0.6, color: theme.accent },
            { label: 'Finance', value: 0.75, color: theme.accentGreen },
          ].map((item) => (
            <View key={item.label} style={styles.energyBarItem}>
              <Text style={[styles.energyBarLabel, { color: theme.textSecondary }]}>
                {item.label}
              </Text>
              <View style={[styles.energyBarTrack, { backgroundColor: theme.border }]}>
                <View
                  style={[
                    styles.energyBarFill,
                    {
                      backgroundColor: item.color,
                      width: `${(item.value * 100)}%` as any,
                    },
                  ]}
                />
              </View>
            </View>
          ))}
        </View>
      </View>

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
  energyCard: {
    borderRadius: 16,
    borderWidth: 1,
    padding: Spacing.four,
    marginBottom: Spacing.five,
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
