import { createMMKV } from 'react-native-mmkv';

export const storage = createMMKV({
  id: 'cosmic-oracle-cache',
});

const CACHE_PREFIX = 'cache_';
const CACHE_TTL_MS = 5 * 60 * 1000;

export function getCached<T>(key: string): T | null {
  try {
    const raw = storage.getString(CACHE_PREFIX + key);
    if (!raw) return null;
    const entry = JSON.parse(raw);
    if (Date.now() - entry.timestamp > CACHE_TTL_MS) {
      storage.remove(CACHE_PREFIX + key);
      return null;
    }
    return entry.data as T;
  } catch {
    return null;
  }
}

export function setCache<T>(key: string, data: T): void {
  try {
    storage.set(CACHE_PREFIX + key, JSON.stringify({ data, timestamp: Date.now() }));
  } catch {}
}

export function clearCache(): void {
  const keys = storage.getAllKeys();
  for (const k of keys) {
    if (k.startsWith(CACHE_PREFIX)) storage.remove(k);
  }
}

export { storage as mmkv };
