import { create } from 'zustand';
import type { CosmicModule, AppSettings, CosmicTheme } from '@/types/cosmic';
import * as DB from '@/services/database';

interface AppState {
  sidebarOpen: boolean;
  activeModule: CosmicModule;
  settings: AppSettings;
  loaded: boolean;
  loadSettings: () => Promise<void>;
  toggleSidebar: () => void;
  setSidebarOpen: (open: boolean) => void;
  setActiveModule: (module: CosmicModule) => void;
  updateSettings: (settings: Partial<AppSettings>) => Promise<void>;
}

const DEFAULT_SETTINGS: AppSettings = {
  theme: 'midnight' as CosmicTheme,
  defaultProfileId: null,
  notifications: true,
  haptics: true,
  soundEffects: true,
};

export const useAppStore = create<AppState>((set) => ({
  sidebarOpen: false,
  activeModule: 'home',
  settings: DEFAULT_SETTINGS,
  loaded: false,

  loadSettings: async () => {
    const saved = await DB.loadSettings();
    if (saved) {
      set({ settings: saved, loaded: true });
    } else {
      await DB.saveSettings(DEFAULT_SETTINGS);
      set({ loaded: true });
    }
  },

  toggleSidebar: () => set((state) => ({ sidebarOpen: !state.sidebarOpen })),
  setSidebarOpen: (open) => set({ sidebarOpen: open }),
  setActiveModule: (module) => set({ activeModule: module }),

  updateSettings: async (partial) => {
    const current = (await DB.loadSettings()) ?? DEFAULT_SETTINGS;
    const merged = { ...current, ...partial };
    await DB.saveSettings(merged);
    set({ settings: merged });
  },
}));
