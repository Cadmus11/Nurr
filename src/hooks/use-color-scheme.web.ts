import { useSyncExternalStore } from 'react';
import { useColorScheme as useRNColorScheme } from 'react-native';

function getSnapshot() { return typeof document !== 'undefined'; }

export function useColorScheme() {
  const hasHydrated = useSyncExternalStore(
    (cb) => { window.addEventListener('load', cb); return () => window.removeEventListener('load', cb); },
    getSnapshot,
    () => false,
  );
  const colorScheme = useRNColorScheme();
  return hasHydrated ? colorScheme : 'light';
}
