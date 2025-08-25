import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { createProfileSlice, ProfileSlice } from '@/slices/profileSlice';
import { immer } from 'zustand/middleware/immer';

export type ProfileStoreState = ProfileSlice;

export const useProfileStore = create<ProfileStoreState>()(
  persist(
    immer((...a) => ({
      ...createProfileSlice(...a),
    })),
    {
      name: 'profile-storage',
      storage: createJSONStorage(() => localStorage),
    }
  )
);