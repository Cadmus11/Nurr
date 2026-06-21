import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { useAppStore } from '@/stores/app-store';
import type { CosmicTheme } from '@/types/cosmic';

const THEME_ACCENTS: Record<CosmicTheme, Partial<Record<keyof typeof Colors.light, string>>> = {
  midnight: {},
  galaxy: {
    accent: '#7c3aed',
    accentOrange: '#8b5cf6',
    accentGreen: '#a78bfa',
    accentBlue: '#7c3aed',
    badgeBg: '#7c3aed',
    link: '#a78bfa',
    highlight: '#1e1b4b',
  },
  nebula: {
    accent: '#8b5cf6',
    accentOrange: '#a78bfa',
    accentGreen: '#c4b5fd',
    accentBlue: '#8b5cf6',
    badgeBg: '#8b5cf6',
    link: '#c4b5fd',
    highlight: '#2e1065',
  },
  solar: {
    accent: '#ea580c',
    accentOrange: '#f97316',
    accentGreen: '#fbbf24',
    accentBlue: '#ea580c',
    badgeBg: '#ea580c',
    link: '#fbbf24',
    highlight: '#431407',
  },
  'golden-mystic': {
    accent: '#b45309',
    accentOrange: '#d97706',
    accentGreen: '#f59e0b',
    accentBlue: '#b45309',
    badgeBg: '#b45309',
    link: '#f59e0b',
    highlight: '#292524',
  },
  emerald: {
    accent: '#059669',
    accentOrange: '#10b981',
    accentGreen: '#34d399',
    accentBlue: '#059669',
    badgeBg: '#059669',
    link: '#34d399',
    highlight: '#022c22',
  },
  'cosmic-purple': {
    accent: '#6d28d9',
    accentOrange: '#7c3aed',
    accentGreen: '#8b5cf6',
    accentBlue: '#6d28d9',
    badgeBg: '#6d28d9',
    link: '#8b5cf6',
    highlight: '#1e1b4b',
  },
};

export function useTheme() {
  const scheme = useColorScheme();
  const theme = scheme === 'unspecified' ? 'light' : scheme;
  const base = Colors[theme];
  const selectedTheme = useAppStore((s) => s.settings.theme);

  if (selectedTheme === 'midnight') return base;

  const overrides = THEME_ACCENTS[selectedTheme] ?? {};
  return { ...base, ...overrides };
}
