import * as SQLite from 'expo-sqlite';
import type { Profile, JournalEntry, JournalCategory, AppSettings, CosmicTheme } from '@/types/cosmic';

let db: SQLite.SQLiteDatabase | null = null;

export async function initDatabase(): Promise<void> {
  db = await SQLite.openDatabaseAsync('cosmic-oracle.db');
  
  await db.execAsync(`
    CREATE TABLE IF NOT EXISTS profiles (
      id TEXT PRIMARY KEY,
      name TEXT NOT NULL,
      birthDate TEXT NOT NULL,
      birthTime TEXT,
      birthLocation TEXT,
      notes TEXT,
      avatar TEXT,
      type TEXT NOT NULL DEFAULT 'self',
      createdAt TEXT NOT NULL
    );
    
    CREATE TABLE IF NOT EXISTS journal_entries (
      id TEXT PRIMARY KEY,
      profileId TEXT NOT NULL,
      title TEXT NOT NULL,
      content TEXT NOT NULL,
      category TEXT NOT NULL DEFAULT 'general',
      tags TEXT NOT NULL DEFAULT '[]',
      date TEXT NOT NULL,
      mood TEXT,
      FOREIGN KEY (profileId) REFERENCES profiles(id) ON DELETE CASCADE
    );
    
    CREATE TABLE IF NOT EXISTS settings (
      key TEXT PRIMARY KEY,
      value TEXT NOT NULL
    );
    
    CREATE TABLE IF NOT EXISTS tarot_readings (
      id TEXT PRIMARY KEY,
      profileId TEXT NOT NULL,
      spread TEXT NOT NULL,
      cards TEXT NOT NULL,
      positions TEXT NOT NULL,
      date TEXT NOT NULL,
      notes TEXT,
      FOREIGN KEY (profileId) REFERENCES profiles(id) ON DELETE CASCADE
    );
  `);
}

// --- Profiles ---

export async function getAllProfiles(): Promise<Profile[]> {
  if (!db) await initDatabase();
  const rows = await db!.getAllAsync<Profile>('SELECT * FROM profiles ORDER BY createdAt DESC');
  return rows;
}

export async function getProfileById(id: string): Promise<Profile | null> {
  if (!db) await initDatabase();
  const row = await db!.getFirstAsync<Profile>('SELECT * FROM profiles WHERE id = ?', id);
  return row ?? null;
}

export async function addProfile(profile: Profile): Promise<void> {
  if (!db) await initDatabase();
  await db!.runAsync(
    'INSERT INTO profiles (id, name, birthDate, birthTime, birthLocation, notes, avatar, type, createdAt) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)',
    profile.id,
    profile.name,
    profile.birthDate,
    profile.birthTime ?? null,
    profile.birthLocation ?? null,
    profile.notes ?? null,
    profile.avatar ?? null,
    profile.type,
    profile.createdAt
  );
}

export async function updateProfile(id: string, data: Partial<Profile>): Promise<void> {
  if (!db) await initDatabase();
  const fields: string[] = [];
  const values: any[] = [];
  
  if (data.name !== undefined) { fields.push('name = ?'); values.push(data.name); }
  if (data.birthDate !== undefined) { fields.push('birthDate = ?'); values.push(data.birthDate); }
  if (data.birthTime !== undefined) { fields.push('birthTime = ?'); values.push(data.birthTime); }
  if (data.birthLocation !== undefined) { fields.push('birthLocation = ?'); values.push(data.birthLocation); }
  if (data.notes !== undefined) { fields.push('notes = ?'); values.push(data.notes); }
  if (data.avatar !== undefined) { fields.push('avatar = ?'); values.push(data.avatar); }
  if (data.type !== undefined) { fields.push('type = ?'); values.push(data.type); }
  
  if (fields.length === 0) return;
  
  values.push(id);
  await db!.runAsync(
    `UPDATE profiles SET ${fields.join(', ')} WHERE id = ?`,
    ...values
  );
}

export async function deleteProfile(id: string): Promise<void> {
  if (!db) await initDatabase();
  await db!.runAsync('DELETE FROM journal_entries WHERE profileId = ?', id);
  await db!.runAsync('DELETE FROM tarot_readings WHERE profileId = ?', id);
  await db!.runAsync('DELETE FROM profiles WHERE id = ?', id);
}

// --- Journal Entries ---

export async function getAllJournalEntries(profileId?: string): Promise<JournalEntry[]> {
  if (!db) await initDatabase();
  if (profileId) {
    const rows = await db!.getAllAsync<any>(
      'SELECT * FROM journal_entries WHERE profileId = ? ORDER BY date DESC', 
      profileId
    );
    return rows.map(parseJournalRow);
  }
  const rows = await db!.getAllAsync<any>('SELECT * FROM journal_entries ORDER BY date DESC');
  return rows.map(parseJournalRow);
}

export async function getJournalEntryById(id: string): Promise<JournalEntry | null> {
  if (!db) await initDatabase();
  const row = await db!.getFirstAsync<any>('SELECT * FROM journal_entries WHERE id = ?', id);
  return row ? parseJournalRow(row) : null;
}

export async function addJournalEntry(entry: JournalEntry): Promise<void> {
  if (!db) await initDatabase();
  await db!.runAsync(
    'INSERT INTO journal_entries (id, profileId, title, content, category, tags, date, mood) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
    entry.id,
    entry.profileId,
    entry.title,
    entry.content,
    entry.category,
    JSON.stringify(entry.tags),
    entry.date,
    entry.mood ?? null
  );
}

export async function updateJournalEntry(id: string, data: Partial<JournalEntry>): Promise<void> {
  if (!db) await initDatabase();
  const fields: string[] = [];
  const values: any[] = [];
  
  if (data.title !== undefined) { fields.push('title = ?'); values.push(data.title); }
  if (data.content !== undefined) { fields.push('content = ?'); values.push(data.content); }
  if (data.category !== undefined) { fields.push('category = ?'); values.push(data.category); }
  if (data.tags !== undefined) { fields.push('tags = ?'); values.push(JSON.stringify(data.tags)); }
  if (data.mood !== undefined) { fields.push('mood = ?'); values.push(data.mood); }
  
  if (fields.length === 0) return;
  values.push(id);
  await db!.runAsync(
    `UPDATE journal_entries SET ${fields.join(', ')} WHERE id = ?`,
    ...values
  );
}

export async function deleteJournalEntry(id: string): Promise<void> {
  if (!db) await initDatabase();
  await db!.runAsync('DELETE FROM journal_entries WHERE id = ?', id);
}

export async function searchJournalEntries(query: string, profileId?: string): Promise<JournalEntry[]> {
  if (!db) await initDatabase();
  const searchPattern = `%${query}%`;
  let sql = 'SELECT * FROM journal_entries WHERE (title LIKE ? OR content LIKE ?)';
  const params: any[] = [searchPattern, searchPattern];
  
  if (profileId) {
    sql += ' AND profileId = ?';
    params.push(profileId);
  }
  sql += ' ORDER BY date DESC';
  
  const rows = await db!.getAllAsync<any>(sql, ...params);
  return rows.map(parseJournalRow);
}

function parseJournalRow(row: any): JournalEntry {
  return {
    ...row,
    tags: typeof row.tags === 'string' ? JSON.parse(row.tags) : (row.tags ?? []),
  };
}

// --- Settings ---

export async function getSetting(key: string): Promise<string | null> {
  if (!db) await initDatabase();
  const row = await db!.getFirstAsync<{ value: string }>('SELECT value FROM settings WHERE key = ?', key);
  return row?.value ?? null;
}

export async function setSetting(key: string, value: string): Promise<void> {
  if (!db) await initDatabase();
  await db!.runAsync(
    'INSERT OR REPLACE INTO settings (key, value) VALUES (?, ?)',
    key, value
  );
}

export async function saveSettings(settings: AppSettings): Promise<void> {
  await setSetting('theme', settings.theme);
  await setSetting('defaultProfileId', settings.defaultProfileId ?? '');
  await setSetting('notifications', String(settings.notifications));
  await setSetting('haptics', String(settings.haptics));
  await setSetting('soundEffects', String(settings.soundEffects));
}

export async function loadSettings(): Promise<AppSettings | null> {
  const theme = await getSetting('theme');
  const defaultProfileId = await getSetting('defaultProfileId');
  const notifications = await getSetting('notifications');
  const haptics = await getSetting('haptics');
  const soundEffects = await getSetting('soundEffects');
  
  if (!theme) return null;
  
  return {
    theme: (theme as CosmicTheme) ?? 'midnight',
    defaultProfileId: defaultProfileId || null,
    notifications: notifications === 'true',
    haptics: haptics === 'true',
    soundEffects: soundEffects === 'true',
  };
}

// --- Search ---

export interface SearchResult {
  type: 'profile' | 'journal' | 'tarot';
  id: string;
  title: string;
  subtitle: string;
  date: string;
}

export async function globalSearch(query: string): Promise<SearchResult[]> {
  if (!db) await initDatabase();
  const pattern = `%${query}%`;
  const results: SearchResult[] = [];
  
  const profiles = await db!.getAllAsync<any>(
    'SELECT id, name, birthDate FROM profiles WHERE name LIKE ?', pattern
  );
  for (const p of profiles) {
    results.push({ type: 'profile', id: p.id, title: p.name, subtitle: `Born: ${p.birthDate}`, date: '' });
  }
  
  const journals = await db!.getAllAsync<any>(
    'SELECT id, title, content, date FROM journal_entries WHERE title LIKE ? OR content LIKE ?', pattern, pattern
  );
  for (const j of journals) {
    results.push({ type: 'journal', id: j.id, title: j.title, subtitle: j.content.slice(0, 80), date: j.date });
  }
  
  results.sort((a, b) => a.title.localeCompare(b.title));
  return results;
}

export async function clearDatabase(): Promise<void> {
  if (!db) await initDatabase();
  await db!.execAsync(`
    DELETE FROM journal_entries;
    DELETE FROM tarot_readings;
    DELETE FROM profiles;
    DELETE FROM settings;
  `);
}
