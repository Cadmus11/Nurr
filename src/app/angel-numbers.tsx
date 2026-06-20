import { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TextInput } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useTheme } from '@/hooks/use-theme';
import { Spacing } from '@/constants/theme';
import { findAngelNumber } from '@/constants/cosmic/angelNumbers';

export default function AngelNumbersScreen() {
  const insets = useSafeAreaInsets();
  const theme = useTheme();
  const [input, setInput] = useState('');
  const result = input ? findAngelNumber(input) : null;

  return (
    <ScrollView style={[styles.scroll, { backgroundColor: theme.background }]}
      keyboardShouldPersistTaps="handled"
      contentContainerStyle={{ paddingBottom: insets.bottom + Spacing.six }}>
      <View style={styles.content}>
        <Text style={[styles.title, { color: theme.text }]}>Angel Numbers</Text>
        <Text style={[styles.subtitle, { color: theme.textSecondary }]}>
          Enter a number to discover its angelic meaning
        </Text>

        <TextInput
          style={[styles.input, { backgroundColor: theme.inputBg, borderColor: theme.inputBorder, color: theme.text }]}
          placeholder="e.g. 111, 444, 777"
          placeholderTextColor={theme.placeholder}
          value={input}
          onChangeText={setInput}
          keyboardType="number-pad"
        />

        {result && (
          <View style={[styles.card, { backgroundColor: theme.card, borderColor: theme.cardBorder }]}>
            <Text style={[styles.number, { color: theme.accent }]}>{result.number}</Text>
            <Text style={[styles.meaning, { color: theme.text }]}>{result.meaning}</Text>
            <Text style={[styles.message, { color: theme.textSecondary }]}>{result.message}</Text>
            <View style={[styles.divider, { backgroundColor: theme.border }]} />
            <Text style={[styles.affLabel, { color: theme.textSecondary }]}>Affirmation</Text>
            <Text style={[styles.affirmation, { color: theme.text }]}>{result.affirmation}</Text>
          </View>
        )}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scroll: { flex: 1 },
  content: { padding: Spacing.four, gap: Spacing.three },
  title: { fontSize: 28, fontWeight: '800' },
  subtitle: { fontSize: 15, marginBottom: 8 },
  input: { borderWidth: 1, borderRadius: 12, paddingHorizontal: 16, paddingVertical: 14, fontSize: 20, fontWeight: '700', textAlign: 'center' },
  card: { borderRadius: 14, borderWidth: 1, padding: Spacing.four, gap: 12 },
  number: { fontSize: 40, fontWeight: '900', textAlign: 'center' },
  meaning: { fontSize: 18, fontWeight: '700', textAlign: 'center' },
  message: { fontSize: 15, textAlign: 'center', lineHeight: 22 },
  divider: { height: 1, marginVertical: 4 },
  affLabel: { fontSize: 12, fontWeight: '700', textTransform: 'uppercase', letterSpacing: 0.5 },
  affirmation: { fontSize: 15, fontStyle: 'italic', lineHeight: 22 },
});
