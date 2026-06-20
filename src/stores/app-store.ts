import { create } from 'zustand';
import type { CosmicModule, AppSettings, CosmicTheme } from '@/types/cosmic';

interface AppState {
  sidebarOpen: boolean;
  activeModule: CosmicModule;
  settings: AppSettings;
  toggleSidebar: () => void;
  setSidebarOpen: (open: boolean) => void;
  setActiveModule: (module: CosmicModule) => void;
  updateSettings: (settings: Partial<AppSettings>) => void;
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
  toggleSidebar: () => set((state) => ({ sidebarOpen: !state.sidebarOpen })),
  setSidebarOpen: (open) => set({ sidebarOpen: open }),
  setActiveModule: (module) => set({ activeModule: module }),
  updateSettings: (partial) =>
    set((state) => ({ settings: { ...state.settings, ...partial } })),
}));
