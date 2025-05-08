export type Player = {
  id: string
  name: string
  position: string
  team: string
  age: number
  height: string
  weight: string
  nationality: string
  jerseyNumber: number
  status: "Active" | "Injured" | "Suspended" | "Inactive"
  stats: {
    gamesPlayed: number
    goalsScored: number
    assists: number
    yellowCards: number
    redCards: number
  }
}

export const players: Player[] = [
  {
    id: "1",
    name: "Alex Johnson",
    position: "Forward",
    team: "Red Dragons",
    age: 24,
    height: "6'2\"",
    weight: "185 lbs",
    nationality: "USA",
    jerseyNumber: 10,
    status: "Active",
    stats: {
      gamesPlayed: 28,
      goalsScored: 15,
      assists: 7,
      yellowCards: 3,
      redCards: 0,
    },
  },
  {
    id: "2",
    name: "Carlos Rodriguez",
    position: "Midfielder",
    team: "Blue Eagles",
    age: 27,
    height: "5'10\"",
    weight: "170 lbs",
    nationality: "Spain",
    jerseyNumber: 8,
    status: "Active",
    stats: {
      gamesPlayed: 30,
      goalsScored: 5,
      assists: 12,
      yellowCards: 4,
      redCards: 0,
    },
  },
  {
    id: "3",
    name: "Marcus Williams",
    position: "Defender",
    team: "Green Lions",
    age: 29,
    height: "6'3\"",
    weight: "190 lbs",
    nationality: "England",
    jerseyNumber: 5,
    status: "Injured",
    stats: {
      gamesPlayed: 22,
      goalsScored: 1,
      assists: 2,
      yellowCards: 5,
      redCards: 1,
    },
  },
  {
    id: "4",
    name: "Hiroshi Tanaka",
    position: "Goalkeeper",
    team: "Red Dragons",
    age: 31,
    height: "6'4\"",
    weight: "195 lbs",
    nationality: "Japan",
    jerseyNumber: 1,
    status: "Active",
    stats: {
      gamesPlayed: 30,
      goalsScored: 0,
      assists: 0,
      yellowCards: 1,
      redCards: 0,
    },
  },
  {
    id: "5",
    name: "Ibrahim Diallo",
    position: "Midfielder",
    team: "Yellow Tigers",
    age: 25,
    height: "5'11\"",
    weight: "175 lbs",
    nationality: "Senegal",
    jerseyNumber: 14,
    status: "Active",
    stats: {
      gamesPlayed: 26,
      goalsScored: 8,
      assists: 6,
      yellowCards: 2,
      redCards: 0,
    },
  },
  {
    id: "6",
    name: "Sofia Martinez",
    position: "Forward",
    team: "Blue Eagles",
    age: 23,
    height: "5'8\"",
    weight: "145 lbs",
    nationality: "Argentina",
    jerseyNumber: 11,
    status: "Active",
    stats: {
      gamesPlayed: 29,
      goalsScored: 18,
      assists: 5,
      yellowCards: 2,
      redCards: 0,
    },
  },
  {
    id: "7",
    name: "Liam O'Connor",
    position: "Defender",
    team: "Green Lions",
    age: 28,
    height: "6'1\"",
    weight: "182 lbs",
    nationality: "Ireland",
    jerseyNumber: 4,
    status: "Suspended",
    stats: {
      gamesPlayed: 25,
      goalsScored: 0,
      assists: 1,
      yellowCards: 7,
      redCards: 2,
    },
  },
  {
    id: "8",
    name: "Yuki Nakamura",
    position: "Midfielder",
    team: "Red Dragons",
    age: 26,
    height: "5'9\"",
    weight: "165 lbs",
    nationality: "Japan",
    jerseyNumber: 17,
    status: "Active",
    stats: {
      gamesPlayed: 28,
      goalsScored: 4,
      assists: 9,
      yellowCards: 3,
      redCards: 0,
    },
  },
]
