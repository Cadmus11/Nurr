import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useTheme } from '@/hooks/use-theme';
import { Spacing } from '@/constants/theme';

const WIDGET_FEATURES = [
  { icon: '🖥', title: 'Desktop App', desc: 'A full desktop version of Cosmic Oracle for macOS, Windows, and Linux, with expanded screen real estate and advanced analytics.' },
  { icon: '📱', title: 'Home Screen Widgets', desc: 'Daily energy score, moon phase, and angel number widgets for your home screen. Quick access to your cosmic data at a glance.' },
  { icon: '🎙', title: 'Voice Guidance', desc: 'Voice-guided meditations, tarot readings, and daily forecasts. Listen to your cosmic guidance hands-free.' },
  { icon: '📊', title: 'Advanced Analytics', desc: 'Interactive charts, birth chart wheels, and detailed progress tracking across all your profiles.' },
  { icon: '🔔', title: 'Notifications', desc: 'Get notified of significant astrological events, personal year changes, full moons, and optimal manifestation windows.' },
  { icon: '☁', title: 'Cloud Backup', desc: 'Optional encrypted cloud backup to sync your profiles and journals across all your devices.' },
];

export default function DesktopWidgetsScreen() {
  const insets = useSafeAreaInsets();
  const theme = useTheme();

  return (
    <ScrollView style={[styles.scroll, { backgroundColor: theme.background }]}
      contentContainerStyle={{ paddingBottom: insets.bottom + Spacing.six }}>
      <View style={styles.content}>
        <Text style={[styles.title, { color: theme.text }]}>Desktop & Widgets</Text>
        <Text style={[styles.subtitle, { color: theme.textSecondary }]}>Desktop app, home screen widgets & voice guidance</Text>

        <View style={[styles.comingCard, { backgroundColor: theme.card, borderColor: theme.cardBorder }]}>
          <Text style={styles.comingEmoji}>🚀</Text>
          <Text style={[styles.comingTitle, { color: theme.text }]}>Coming in a Future Update</Text>
          <Text style={[styles.comingDesc, { color: theme.textSecondary }]}>These features are planned for future releases. Your feedback helps prioritize what comes next.</Text>
        </View>

        <Text style={[styles.sectionTitle, { color: theme.text }]}>Planned Features</Text>

        {WIDGET_FEATURES.map((feature) => (
          <View key={feature.title} style={[styles.featureCard, { backgroundColor: theme.card, borderColor: theme.cardBorder }]}>
            <Text style={styles.featureIcon}>{feature.icon}</Text>
            <Text style={[styles.featureTitle, { color: theme.text }]}>{feature.title}</Text>
            <Text style={[styles.featureDesc, { color: theme.textSecondary }]}>{feature.desc}</Text>
          </View>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scroll: { flex: 1 },
  content: { padding: Spacing.four, gap: Spacing.three },
  title: { fontSize: 28, fontWeight: '800' },
  subtitle: { fontSize: 15, marginBottom: 8 },
  comingCard: { borderRadius: 14, borderWidth: 1, padding: Spacing.four, alignItems: 'center', gap: 8 },
  comingEmoji: { fontSize: 48 },
  comingTitle: { fontSize: 18, fontWeight: '700', textAlign: 'center' },
  comingDesc: { fontSize: 14, textAlign: 'center', lineHeight: 20 },
  sectionTitle: { fontSize: 18, fontWeight: '700', marginTop: 8 },
  featureCard: { borderRadius: 14, borderWidth: 1, padding: Spacing.three, gap: 8 },
  featureIcon: { fontSize: 32 },
  featureTitle: { fontSize: 16, fontWeight: '700' },
  featureDesc: { fontSize: 14, lineHeight: 20 },
});
