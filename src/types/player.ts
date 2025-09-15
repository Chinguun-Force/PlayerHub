export interface PlayerStats {
  gamesPlayed: number;
  minutes: number;
  fieldGoals: {
    made: number;
    attempted: number;
    percentage: number;
  };
  threePoints: {
    made: number;
    attempted: number;
    percentage: number;
  };
  freeThrows: {
    made: number;
    attempted: number;
    percentage: number;
  };
  rebounds: {
    offensive: number;
    defensive: number;
    total: number;
  };
  assists: number;
  personalFouls: number;
  steals: number;
  blocks: number;
  turnovers: number;
  points: number;
  rank: number;
}

export interface PlayerProfile {
  id: string;
  name: string;
  profilePicture: string;
  position: string;
  teamId: string;
  age: number;
  height: string;
  weight: string;
  nationality: string;
  jerseyNumber: number;
  status: string;
  bio: string;
  careerHistory: Array<unknown>;
  achievements: Array<unknown>;
  stats?: PlayerStats;
  socialLinks: {
    twitter?: string;
    instagram?: string;
    facebook?: string;
  };
  donationEnabled: boolean;
} 
// types/types.ts
export interface Player {
  _id: string;
  profilePicture: string;
  name: string;
  position: string;
  teamId: string;
  nationality: string;
  age: number;
  jerseyNumber: number;
  status: "ACTIVE" | "INJURED" | "SUSPENDED" | "INACTIVE";
  height: number;
  weight: number;
  marketValue: number;
}

export interface ApiResponse {
  players: Player[];
  total: number;
}
