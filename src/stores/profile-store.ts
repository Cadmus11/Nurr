import { create } from 'zustand';
import type { Profile } from '@/types/cosmic';
import * as DB from '@/services/database';

interface ProfileState {
  profiles: Profile[];
  activeProfileId: string | null;
  activeProfile: Profile | null;
  loaded: boolean;
  loadProfiles: () => Promise<void>;
  setActiveProfile: (id: string) => void;
  addProfile: (profile: Profile) => Promise<void>;
  updateProfile: (id: string, data: Partial<Profile>) => Promise<void>;
  deleteProfile: (id: string) => Promise<void>;
  getProfile: (id: string) => Profile | undefined;
}

export const useProfileStore = create<ProfileState>((set, get) => ({
  profiles: [],
  activeProfileId: null,
  activeProfile: null,
  loaded: false,

  loadProfiles: async () => {
    const profiles = await DB.getAllProfiles();
    const activeProfileId = profiles[0]?.id ?? null;
    set({ profiles, activeProfileId, activeProfile: profiles[0] ?? null, loaded: true });
  },

  setActiveProfile: (id) => {
    const profile = get().profiles.find((p) => p.id === id) ?? null;
    set({ activeProfileId: id, activeProfile: profile });
  },

  addProfile: async (profile) => {
    await DB.addProfile(profile);
    set((state) => ({
      profiles: [...state.profiles, profile],
      activeProfileId: state.activeProfileId ?? profile.id,
      activeProfile: state.activeProfile ?? profile,
    }));
  },

  updateProfile: async (id, data) => {
    await DB.updateProfile(id, data);
    set((state) => {
      const profiles = state.profiles.map((p) =>
        p.id === id ? { ...p, ...data } : p
      );
      const activeProfile =
        state.activeProfileId === id
          ? { ...state.activeProfile, ...data } as Profile
          : state.activeProfile;
      return { profiles, activeProfile };
    });
  },

  deleteProfile: async (id) => {
    await DB.deleteProfile(id);
    set((state) => {
      const profiles = state.profiles.filter((p) => p.id !== id);
      const activeProfile =
        state.activeProfileId === id
          ? profiles[0] ?? null
          : state.activeProfile;
      const activeProfileId = activeProfile?.id ?? null;
      return { profiles, activeProfile, activeProfileId };
    });
  },

  getProfile: (id) => get().profiles.find((p) => p.id === id),
}));
