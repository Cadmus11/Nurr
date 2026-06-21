import { useState, useMemo, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TextInput, Pressable } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useTheme } from '@/hooks/use-theme';
import { Spacing } from '@/constants/theme';
import { useProfileStore } from '@/stores/profile-store';
import * as DB from '@/services/database';
import type { JournalEntry, JournalCategory } from '@/types/cosmic';

const CATEGORIES: { key: JournalCategory; label: string }[] = [
  { key: 'dream', label: 'Dream' },
  { key: 'manifestation', label: 'Manifestation' },
  { key: 'goal', label: 'Goal' },
  { key: 'meditation', label: 'Meditation' },
  { key: 'tarot', label: 'Tarot' },
  { key: 'life-event', label: 'Life Event' },
  { key: 'general', label: 'General' },
];

export default function JournalScreen() {
  const insets = useSafeAreaInsets();
  const theme = useTheme();
  const activeProfile = useProfileStore((s) => s.activeProfile);
  const [entries, setEntries] = useState<JournalEntry[]>([]);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [category, setCategory] = useState<JournalCategory>('general');
  const [mood, setMood] = useState('');
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    if (!activeProfile) return;
    (async () => {
      try {
        const data = await DB.getAllJournalEntries(activeProfile.id);
        setEntries(data);
      } catch { /* ignore */ }
    })();
  }, [activeProfile]);

  const canSave = title.trim().length > 0 && content.trim().length > 0;

  const handleSave = async () => {
    if (!canSave || !activeProfile) return;
    const entry: JournalEntry = {
      id: Date.now().toString(36) + Math.random().toString(36).slice(2, 6),
      profileId: activeProfile.id,
      title: title.trim(),
      content: content.trim(),
      category,
      tags: [],
      date: new Date().toISOString(),
      mood: mood.trim() || undefined,
    };
    try {
      await DB.addJournalEntry(entry);
      setEntries((prev) => [entry, ...prev]);
    } catch { /* ignore */ }
    setTitle('');
    setContent('');
    setMood('');
    setCategory('general');
    setShowForm(false);
  };

  const filtered = useMemo(() => {
    return entries.filter((e) => !activeProfile || e.profileId === activeProfile.id);
  }, [entries, activeProfile]);

  if (!activeProfile) {
    return (
      <View style={[styles.container, { backgroundColor: theme.background }]}>
        <View style={[styles.emptyCard, { backgroundColor: theme.card, borderColor: theme.cardBorder }]}>
          <Text style={[styles.emptyTitle, { color: theme.text }]}>No Profile</Text>
          <Text style={[styles.emptyDesc, { color: theme.textSecondary }]}>Create a profile to start journaling.</Text>
        </View>
      </View>
    );
  }

  return (
    <ScrollView style={[styles.scroll, { backgroundColor: theme.background }]}
      keyboardShouldPersistTaps="handled"
      contentContainerStyle={{ paddingBottom: insets.bottom + Spacing.six }}>
      <View style={styles.content}>
        <View style={styles.headerRow}>
          <View style={{ flex: 1 }}>
            <Text style={[styles.title, { color: theme.text }]}>Journal</Text>
            <Text style={[styles.subtitle, { color: theme.textSecondary }]}>Record dreams, manifestations, and reflections</Text>
          </View>
          <Pressable onPress={() => setShowForm(!showForm)}
            style={[styles.addBtn, { backgroundColor: theme.accent }]}>
            <Text style={styles.addBtnText}>{showForm ? '✕' : '+'}</Text>
          </Pressable>
        </View>

        {showForm && (
          <View style={[styles.formCard, { backgroundColor: theme.card, borderColor: theme.cardBorder }]}>
            <TextInput
              style={[styles.input, { backgroundColor: theme.inputBg, borderColor: theme.inputBorder, color: theme.text }]}
              placeholder="Entry title"
              placeholderTextColor={theme.placeholder}
              value={title}
              onChangeText={setTitle}
            />
            <TextInput
              style={[styles.textArea, { backgroundColor: theme.inputBg, borderColor: theme.inputBorder, color: theme.text }]}
              placeholder="Write your entry..."
              placeholderTextColor={theme.placeholder}
              value={content}
              onChangeText={setContent}
              multiline
              numberOfLines={5}
            />
            <View style={styles.catRow}>
              {CATEGORIES.map((c) => (
                <Pressable key={c.key} onPress={() => setCategory(c.key)}
                  style={[styles.catBtn, { backgroundColor: category === c.key ? theme.accent : theme.surface, borderColor: category === c.key ? theme.accent : theme.border }]}>
                  <Text style={[styles.catText, { color: category === c.key ? '#fff' : theme.text, fontWeight: category === c.key ? '700' : '500' }]}>{c.label}</Text>
                </Pressable>
              ))}
            </View>
            <TextInput
              style={[styles.input, { backgroundColor: theme.inputBg, borderColor: theme.inputBorder, color: theme.text }]}
              placeholder="Mood (optional)"
              placeholderTextColor={theme.placeholder}
              value={mood}
              onChangeText={setMood}
            />
            <Pressable onPress={handleSave} disabled={!canSave}
              style={[styles.saveBtn, { backgroundColor: canSave ? theme.accent : theme.textTertiary }]}>
              <Text style={styles.saveBtnText}>Save Entry</Text>
            </Pressable>
          </View>
        )}

        {filtered.length === 0 ? (
          <View style={[styles.emptyCard, { backgroundColor: theme.card, borderColor: theme.cardBorder }]}>
            <Text style={[styles.emptyTitle, { color: theme.text }]}>No Entries Yet</Text>
            <Text style={[styles.emptyDesc, { color: theme.textSecondary }]}>Tap + to create your first journal entry.</Text>
          </View>
        ) : (
          filtered.map((entry) => (
            <View key={entry.id} style={[styles.entryCard, { backgroundColor: theme.card, borderColor: theme.cardBorder }]}>
              <View style={styles.entryHeader}>
                <Text style={[styles.entryCategory, { color: theme.accent }]}>{entry.category}</Text>
                <Text style={[styles.entryDate, { color: theme.textTertiary }]}>{new Date(entry.date).toLocaleDateString()}</Text>
              </View>
              <Text style={[styles.entryTitle, { color: theme.text }]}>{entry.title}</Text>
              <Text style={[styles.entryContent, { color: theme.textSecondary }]}>{entry.content}</Text>
              {entry.mood && <Text style={[styles.entryMood, { color: theme.textTertiary }]}>Mood: {entry.mood}</Text>}
            </View>
          ))
        )}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: Spacing.four },
  scroll: { flex: 1 },
  content: { padding: Spacing.four, gap: Spacing.three },
  title: { fontSize: 28, fontWeight: '800' },
  subtitle: { fontSize: 15 },
  headerRow: { flexDirection: 'row', alignItems: 'flex-start', gap: 12 },
  addBtn: { width: 44, height: 44, borderRadius: 22, alignItems: 'center', justifyContent: 'center' },
  addBtnText: { color: '#fff', fontSize: 24, fontWeight: '700', lineHeight: 26 },
  formCard: { borderRadius: 14, borderWidth: 1, padding: Spacing.three, gap: 10 },
  input: { borderWidth: 1, borderRadius: 10, paddingHorizontal: 14, paddingVertical: 12, fontSize: 15 },
  textArea: { borderWidth: 1, borderRadius: 10, paddingHorizontal: 14, paddingVertical: 12, fontSize: 15, minHeight: 100, textAlignVertical: 'top' },
  catRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 6 },
  catBtn: { paddingVertical: 6, paddingHorizontal: 12, borderRadius: 8, borderWidth: 1 },
  catText: { fontSize: 12 },
  saveBtn: { paddingVertical: 14, borderRadius: 12, alignItems: 'center' },
  saveBtnText: { color: '#fff', fontSize: 15, fontWeight: '700' },
  emptyCard: { borderRadius: 14, borderWidth: 1, padding: Spacing.four, alignItems: 'center', gap: 8 },
  emptyTitle: { fontSize: 18, fontWeight: '700' },
  emptyDesc: { fontSize: 14, textAlign: 'center' },
  entryCard: { borderRadius: 14, borderWidth: 1, padding: Spacing.three, gap: 6 },
  entryHeader: { flexDirection: 'row', justifyContent: 'space-between' },
  entryCategory: { fontSize: 11, fontWeight: '700', textTransform: 'uppercase', letterSpacing: 0.5 },
  entryDate: { fontSize: 12 },
  entryTitle: { fontSize: 16, fontWeight: '700' },
  entryContent: { fontSize: 14, lineHeight: 20 },
  entryMood: { fontSize: 12, fontStyle: 'italic' },
});
