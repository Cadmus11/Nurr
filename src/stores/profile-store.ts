import { create } from 'zustand';
import type { Profile } from '@/types/cosmic';
import * as DB from '@/services/database';
import { mmkv, getCached, setCache } from '@/services/cache';

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

const PROFILES_KEY = 'cached_profiles';
const ACTIVE_ID_KEY = 'active_profile_id';

export const useProfileStore = create<ProfileState>((set, get) => ({
  profiles: [],
  activeProfileId: null,
  activeProfile: null,
  loaded: false,

  loadProfiles: async () => {
    const cached = getCached<Profile[]>(PROFILES_KEY);
    if (cached) {
      const activeProfileId = mmkv.getString(ACTIVE_ID_KEY) ?? cached[0]?.id ?? null;
      const activeProfile = cached.find((p) => p.id === activeProfileId) ?? cached[0] ?? null;
      set({ profiles: cached, activeProfileId, activeProfile, loaded: true });
    }
    const profiles = await DB.getAllProfiles();
    setCache(PROFILES_KEY, profiles);
    const activeProfileId = mmkv.getString(ACTIVE_ID_KEY) ?? profiles[0]?.id ?? null;
    const activeProfile = profiles.find((p) => p.id === activeProfileId) ?? profiles[0] ?? null;
    set({ profiles, activeProfileId, activeProfile, loaded: true });
  },

  setActiveProfile: (id) => {
    const profile = get().profiles.find((p) => p.id === id) ?? null;
    if (profile) mmkv.set(ACTIVE_ID_KEY, id);
    set({ activeProfileId: id, activeProfile: profile });
  },

  addProfile: async (profile) => {
    await DB.addProfile(profile);
    set((state) => {
      const profiles = [...state.profiles, profile];
      setCache(PROFILES_KEY, profiles);
      return {
        profiles,
        activeProfileId: state.activeProfileId ?? profile.id,
        activeProfile: state.activeProfile ?? profile,
      };
    });
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
      setCache(PROFILES_KEY, profiles);
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
      setCache(PROFILES_KEY, profiles);
      if (activeProfileId) mmkv.set(ACTIVE_ID_KEY, activeProfileId);
      return { profiles, activeProfile, activeProfileId };
    });
  },

  getProfile: (id) => get().profiles.find((p) => p.id === id),
}));
