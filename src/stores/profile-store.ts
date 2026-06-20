import { create } from 'zustand';
import type { Profile } from '@/types/cosmic';

interface ProfileState {
  profiles: Profile[];
  activeProfileId: string | null;
  activeProfile: Profile | null;
  setActiveProfile: (id: string) => void;
  addProfile: (profile: Profile) => void;
  updateProfile: (id: string, data: Partial<Profile>) => void;
  deleteProfile: (id: string) => void;
  getProfile: (id: string) => Profile | undefined;
}

export const useProfileStore = create<ProfileState>((set, get) => ({
  profiles: [],
  activeProfileId: null,
  activeProfile: null,

  setActiveProfile: (id) => {
    const profile = get().profiles.find((p) => p.id === id) ?? null;
    set({ activeProfileId: id, activeProfile: profile });
  },

  addProfile: (profile) =>
    set((state) => ({
      profiles: [...state.profiles, profile],
      activeProfileId: state.activeProfileId ?? profile.id,
      activeProfile: state.activeProfile ?? profile,
    })),

  updateProfile: (id, data) =>
    set((state) => {
      const profiles = state.profiles.map((p) =>
        p.id === id ? { ...p, ...data } : p
      );
      const activeProfile =
        state.activeProfileId === id
          ? { ...state.activeProfile, ...data } as Profile
          : state.activeProfile;
      return { profiles, activeProfile };
    }),

  deleteProfile: (id) =>
    set((state) => {
      const profiles = state.profiles.filter((p) => p.id !== id);
      const activeProfile =
        state.activeProfileId === id
          ? profiles[0] ?? null
          : state.activeProfile;
      const activeProfileId = activeProfile?.id ?? null;
      return { profiles, activeProfile, activeProfileId };
    }),

  getProfile: (id) => get().profiles.find((p) => p.id === id),
}));
