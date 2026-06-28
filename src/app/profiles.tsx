import { View, Text, StyleSheet, ScrollView, Pressable } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { useTheme } from '@/hooks/use-theme';
import { useProfileStore } from '@/stores/profile-store';
import { Spacing } from '@/constants/theme';
import { CosmicIcon, type CosmicIconName } from '@/components/cosmic-icon';
import type { Profile } from '@/types/cosmic';

const TYPE_ICONS: Record<string, CosmicIconName> = {
  self: 'Profile',
  partner: 'Heart',
  friend: 'Profile2User',
  child: 'UserOctagon',
  family: 'Home2',
  client: 'Briefcase',
};

export default function ProfilesScreen() {
  const insets = useSafeAreaInsets();
  const theme = useTheme();
  const profiles = useProfileStore((s) => s.profiles);
  const activeProfileId = useProfileStore((s) => s.activeProfileId);
  const setActiveProfile = useProfileStore((s) => s.setActiveProfile);
  const deleteProfile = useProfileStore((s) => s.deleteProfile);

  return (
    <ScrollView
      style={[styles.scroll, { backgroundColor: theme.background }]}
      contentContainerStyle={{ paddingBottom: insets.bottom + Spacing.six }}
    >
      <View style={styles.content}>
        <View style={styles.header}>
          <Text style={[styles.title, { color: theme.text }]}>Profiles</Text>
          <Pressable
            onPress={() => router.navigate('/profile-create')}
            style={({ pressed }) => [
              styles.addBtn,
              { backgroundColor: pressed ? theme.accent + 'cc' : theme.accent },
            ]}
          >
            <Text style={styles.addBtnText}>+ New</Text>
          </Pressable>
        </View>

        {profiles.length === 0 ? (
          <View style={[styles.emptyCard, { backgroundColor: theme.card, borderColor: theme.cardBorder }]}>
            <Text style={[styles.emptyText, { color: theme.textSecondary }]}>
              No profiles yet. Create your first one to unlock your cosmic blueprint.
            </Text>
          </View>
        ) : (
          <View style={styles.list}>
            {profiles.map((profile) => (
              <ProfileCard
                key={profile.id}
                profile={profile}
                isActive={profile.id === activeProfileId}
                onSelect={() => setActiveProfile(profile.id)}
                onDelete={() => deleteProfile(profile.id)}
                theme={theme}
              />
            ))}
          </View>
        )}
      </View>
    </ScrollView>
  );
}

function ProfileCard({
  profile,
  isActive,
  onSelect,
  onDelete,
  theme,
}: {
  profile: Profile;
  isActive: boolean;
  onSelect: () => void;
  onDelete: () => void;
  theme: Record<string, string>;
}) {
  return (
    <Pressable
      onPress={onSelect}
      style={({ pressed }) => [
        styles.profileCard,
        {
          backgroundColor: theme.card,
          borderColor: isActive ? theme.accent : theme.cardBorder,
          opacity: pressed ? 0.8 : 1,
        },
      ]}
    >
      <View style={styles.avatar}>
        <CosmicIcon
          name={(profile.avatar as CosmicIconName) ?? TYPE_ICONS[profile.type]}
          size={28}
          color={theme.accent}
        />
      </View>
      <View style={styles.profileInfo}>
        <Text style={[styles.profileName, { color: theme.text }]}>{profile.name}</Text>
        <Text style={[styles.profileMeta, { color: theme.textSecondary }]}>
          {profile.birthDate}
        </Text>
      </View>
      {isActive && (
        <View style={[styles.activeBadge, { backgroundColor: theme.accent }]}>
          <Text style={styles.activeText}>Active</Text>
        </View>
      )}
      <Pressable onPress={onDelete} style={styles.deleteBtn} hitSlop={8}>
        <Text style={{ color: theme.textTertiary, fontSize: 18 }}>✕</Text>
      </Pressable>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  scroll: { flex: 1 },
  content: { padding: Spacing.four, gap: Spacing.four },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: { fontSize: 28, fontWeight: '800' },
  addBtn: {
    paddingHorizontal: 18,
    paddingVertical: 10,
    borderRadius: 10,
  },
  addBtnText: { color: '#ffffff', fontWeight: '700', fontSize: 15 },
  emptyCard: {
    borderRadius: 14,
    borderWidth: 1,
    padding: Spacing.five,
    alignItems: 'center',
  },
  emptyText: { fontSize: 15, textAlign: 'center' },
  list: { gap: 10 },
  profileCard: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 14,
    borderWidth: 1,
    padding: Spacing.three,
    gap: 12,
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: 'rgba(180, 130, 255, 0.12)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  profileInfo: { flex: 1 },
  profileName: { fontSize: 16, fontWeight: '700' },
  profileMeta: { fontSize: 13, marginTop: 2 },
  activeBadge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
  },
  activeText: { color: '#ffffff', fontSize: 11, fontWeight: '700' },
  deleteBtn: { padding: 4 },
});
