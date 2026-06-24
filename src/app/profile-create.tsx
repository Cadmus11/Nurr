import { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Pressable,
  TextInput,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { useTheme } from '@/hooks/use-theme';
import { useProfileStore } from '@/stores/profile-store';
import { Spacing } from '@/constants/theme';
import { CosmicIcon, type CosmicIconName } from '@/components/cosmic-icon';
import type { Profile, ProfileType } from '@/types/cosmic';

const PROFILE_TYPES: { key: ProfileType; label: string; icon: CosmicIconName }[] = [
  { key: 'self', label: 'Self', icon: 'Profile' },
  { key: 'partner', label: 'Partner', icon: 'Heart' },
  { key: 'friend', label: 'Friend', icon: 'Profile2User' },
  { key: 'child', label: 'Child', icon: 'UserOctagon' },
  { key: 'family', label: 'Family', icon: 'Home2' },
  { key: 'client', label: 'Client', icon: 'Briefcase' },
];

export default function ProfileCreateScreen() {
  const insets = useSafeAreaInsets();
  const theme = useTheme();
  const addProfile = useProfileStore((s) => s.addProfile);

  const [name, setName] = useState('');
  const [birthDate, setBirthDate] = useState('');
  const [birthTime, setBirthTime] = useState('');
  const [birthLocation, setBirthLocation] = useState('');
  const [notes, setNotes] = useState('');
  const [type, setType] = useState<ProfileType>('self');

  const canSave = name.trim().length > 0 && birthDate.trim().length > 0;

  const handleSave = () => {
    if (!canSave) return;
    const profile: Profile = {
      id: Date.now().toString(36) + Math.random().toString(36).slice(2, 6),
      name: name.trim(),
      birthDate: birthDate.trim(),
      birthTime: birthTime.trim() || undefined,
      birthLocation: birthLocation.trim() || undefined,
      notes: notes.trim() || undefined,
      avatar: PROFILE_TYPES.find((t) => t.key === type)?.icon,
      type,
      createdAt: new Date().toISOString(),
    };
    addProfile(profile);
    router.back();
  };

  return (
    <ScrollView
      style={[styles.scroll, { backgroundColor: theme.background }]}
      keyboardShouldPersistTaps="handled"
      contentContainerStyle={{ paddingBottom: insets.bottom + Spacing.six }}
    >
      <View style={styles.content}>
        <Text style={[styles.title, { color: theme.text }]}>Create Profile</Text>

        <View style={styles.field}>
          <Text style={[styles.label, { color: theme.textSecondary }]}>Name *</Text>
          <TextInput
            style={[
              styles.input,
              {
                backgroundColor: theme.inputBg,
                borderColor: theme.inputBorder,
                color: theme.text,
              },
            ]}
            placeholder="Enter name"
            placeholderTextColor={theme.placeholder}
            value={name}
            onChangeText={setName}
          />
        </View>

        <View style={styles.field}>
          <Text style={[styles.label, { color: theme.textSecondary }]}>Birth Date * (YYYY-MM-DD)</Text>
          <TextInput
            style={[
              styles.input,
              {
                backgroundColor: theme.inputBg,
                borderColor: theme.inputBorder,
                color: theme.text,
              },
            ]}
            placeholder="e.g. 1990-04-15"
            placeholderTextColor={theme.placeholder}
            value={birthDate}
            onChangeText={setBirthDate}
          />
        </View>

        <View style={styles.field}>
          <Text style={[styles.label, { color: theme.textSecondary }]}>Birth Time (HH:MM)</Text>
          <TextInput
            style={[
              styles.input,
              {
                backgroundColor: theme.inputBg,
                borderColor: theme.inputBorder,
                color: theme.text,
              },
            ]}
            placeholder="e.g. 14:30"
            placeholderTextColor={theme.placeholder}
            value={birthTime}
            onChangeText={setBirthTime}
          />
        </View>

        <View style={styles.field}>
          <Text style={[styles.label, { color: theme.textSecondary }]}>Birth Location</Text>
          <TextInput
            style={[
              styles.input,
              {
                backgroundColor: theme.inputBg,
                borderColor: theme.inputBorder,
                color: theme.text,
              },
            ]}
            placeholder="e.g. New York, USA"
            placeholderTextColor={theme.placeholder}
            value={birthLocation}
            onChangeText={setBirthLocation}
          />
        </View>

        <View style={styles.field}>
          <Text style={[styles.label, { color: theme.textSecondary }]}>Profile Type</Text>
          <View style={styles.typeGrid}>
            {PROFILE_TYPES.map((pt) => (
              <Pressable
                key={pt.key}
                onPress={() => setType(pt.key)}
                style={[
                  styles.typeItem,
                  {
                    borderColor: type === pt.key ? theme.accent : theme.border,
                    backgroundColor:
                      type === pt.key ? theme.accent + '15' : 'transparent',
                  },
                ]}
              >
                <CosmicIcon name={pt.icon} size={20} color={type === pt.key ? theme.accent : theme.textSecondary} />
                <Text
                  style={[
                    styles.typeLabel,
                    {
                      color: type === pt.key ? theme.accent : theme.text,
                      fontWeight: type === pt.key ? '700' : '500',
                    },
                  ]}
                >
                  {pt.label}
                </Text>
              </Pressable>
            ))}
          </View>
        </View>

        <View style={styles.field}>
          <Text style={[styles.label, { color: theme.textSecondary }]}>Notes</Text>
          <TextInput
            style={[
              styles.input,
              styles.textArea,
              {
                backgroundColor: theme.inputBg,
                borderColor: theme.inputBorder,
                color: theme.text,
              },
            ]}
            placeholder="Optional notes..."
            placeholderTextColor={theme.placeholder}
            value={notes}
            onChangeText={setNotes}
            multiline
            numberOfLines={3}
          />
        </View>

        <Pressable
          onPress={handleSave}
          disabled={!canSave}
          style={({ pressed }) => [
            styles.saveBtn,
            {
              backgroundColor: canSave ? theme.accent : theme.textTertiary,
              opacity: pressed ? 0.8 : 1,
            },
          ]}
        >
          <Text style={styles.saveBtnText}>Save Profile</Text>
        </Pressable>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scroll: { flex: 1 },
  content: { padding: Spacing.four, gap: Spacing.four },
  title: { fontSize: 28, fontWeight: '800', marginBottom: 8 },
  field: { gap: 8 },
  label: { fontSize: 13, fontWeight: '600', textTransform: 'uppercase', letterSpacing: 0.3 },
  input: {
    borderWidth: 1,
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 14,
    fontSize: 16,
  },
  textArea: {
    minHeight: 80,
    textAlignVertical: 'top',
  },
  typeGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  typeItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    borderWidth: 1.5,
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 10,
  },

  typeLabel: { fontSize: 14 },
  saveBtn: {
    marginTop: Spacing.two,
    paddingVertical: 16,
    borderRadius: 14,
    alignItems: 'center',
  },
  saveBtnText: { color: '#ffffff', fontSize: 16, fontWeight: '700' },
});
