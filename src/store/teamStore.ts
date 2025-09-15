import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

export interface Team {
  _id: string;
  teamName: string;
  teamNameEn: string;
  teamLogo: string;
  description: string;
  createdAt: string;
  updatedAt: string;
  members: string[]; 
  owner: string; 
  __v: number;
}
interface TeamState {
  teams: Team[];
  isLoading: boolean;
  error: string | null;
  fetchTeams: () => Promise<void>;
  createTeam: (teamData: Omit<Team, '_id' | 'createdAt' | 'updatedAt' | '__v'>) => Promise<void>;
}

export const useTeamStore = create<TeamState>()(
  persist(
    (set) => ({
      teams: [],
      isLoading: false,
      error: null,
      fetchTeams: async () => {
        set({ isLoading: true, error: null });
        try {
          const response = await fetch(`/api/teams`, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
            },
          });
          if (!response.ok) {
            throw new Error('Failed to fetch teams');
          }
          const data = await response.json();
          console.log('Fetched teams:', data.teams.length);
          set({ teams: data.teams, isLoading: false });
        } catch (error) {
          console.error('Error fetching teams:', error);
          set({ isLoading: false, error: error instanceof Error ? error.message : String(error) });
        }
      }
      ,
      createTeam: async (teamData) => {
        set({ isLoading: true, error: null });
        try {
          const response = await fetch('/api/teams', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(teamData),
          });
          if (!response.ok) {
            throw new Error('Failed to create team');
          }
          const newTeam = await response.json();
          set((state) => ({
            teams: [...state.teams, newTeam],
            isLoading: false,
          }));
        } catch (error) {
          set({ isLoading: false, error: error instanceof Error ? error.message : String(error) });
        }
      }
    }),
    {
      name: 'team-storage',
      storage: createJSONStorage(() => localStorage),
    }
  )
);