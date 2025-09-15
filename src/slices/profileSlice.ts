import { StateCreator } from 'zustand';
import { PlayerProfile } from '@/types/player';
import { ProfileStoreState } from '@/store/useProfileStore';

export interface ProfileSlice {
  profile: PlayerProfile | null;
  setProfile: (profile: PlayerProfile | ((prev: PlayerProfile) => PlayerProfile)) => void;
  clearProfile: () => void;
}

export const createProfileSlice: StateCreator<
  ProfileStoreState,
  [],
  [],
  ProfileSlice
> = (set) => ({
  profile: null,
  setProfile: (profile) =>
    set((state) => ({
      profile:
        typeof profile === 'function'
          ? profile(state.profile as PlayerProfile)
          : profile,
    })),
  clearProfile: () => set({ profile: null }),
}); 