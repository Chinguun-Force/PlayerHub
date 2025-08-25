import { ObjectId } from 'mongodb'

export interface User {
  _id?: ObjectId
  email: string
  password: string
  role: 'ADMIN' | 'FAN' | 'OWNER' | 'PLAYER'
  createdAt?: Date
  updatedAt?: Date
}

export interface Player {
  _id?: ObjectId
  userId?: ObjectId
  name: string
  email?: string
  profilePicture?: string
  age: number
  height?: number
  weight?: number
  position: string
  jerseyNumber?: number
  status: 'ACTIVE' | 'INJURED' | 'SUSPENDED' | 'INACTIVE'
  bio?: string
  teamId?: ObjectId
  stats?: PlayerStats[]
  careerHistory?: string[]
  achievements?: string[]
  socialLinks?: {
    twitter?: string
    instagram?: string
    facebook?: string
  }
  donationEnabled?: boolean
  createdAt?: Date
  updatedAt?: Date
}

export interface Team {
  _id?: ObjectId
  teamName: string
  teamNameEn?: string
  teamLogo?: string
  teamDescription?: string
  foundedYear?: number
  homeArena?: string
  coach?: string
  championships?: number
  teamMembers: ObjectId[]
  ownerId?: ObjectId
  teamAchievements?: string[]
  teamStats?: {
    pointsPerGame?: string
    twoFGP?: string
    threeFGP?: string
    freeThrowPercentage?: string
    offRebounds?: string
    defRebounds?: string
    totalRebounds?: string
    assistsPerGame?: string
    turnoversPerGame?: string
    stealsPerGame?: string
    blocksPerGame?: string
    pointsPerGameOfOpponent?: string
    opponentTwoFGP?: string
    opponentThreeFGP?: string
  }
  teamSocialLinks?: string[]
  isActive?: boolean
  games?: {
    date: string
    league: string
    round: number
    opponent: string
    result: string
    _id?: ObjectId
  }[]
  createdAt?: Date
  updatedAt?: Date
}

export interface Owner {
  _id?: ObjectId
  userId?: ObjectId
  name: string
  email?: string
  company?: string
  verified?: boolean
  createdAt?: Date
  updatedAt?: Date
}

export interface PlayerStats {
  _id?: ObjectId
  playerId: ObjectId
  season?: string
  gamesPlayed: number
  minutesPlayed?: number
  fieldGoals?: {
    made: number
    attempted: number
    percentage: number
  }
  threePoints?: {
    made: number
    attempted: number
    percentage: number
  }
  freeThrows?: {
    made: number
    attempted: number
    percentage: number
  }
  rebounds?: {
    offensive: number
    defensive: number
    total: number
  }
  assists: number
  steals?: number
  blocks?: number
  turnovers?: number
  personalFouls?: number
  points: number
  rating?: number
  createdAt?: Date
  updatedAt?: Date
}

export interface LeagueSummary {
  _id?: ObjectId
  teamId: ObjectId
  season: string
  wins: number
  losses: number
  winPercentage: number
  pointsFor: number
  pointsAgainst: number
  pointsDifference: number
  rank: number
  playoffPosition?: string
  createdAt?: Date
  updatedAt?: Date
}

export interface Contract {
  _id?: ObjectId
  playerId: ObjectId
  teamId: ObjectId
  ownerId: ObjectId
  contractTitle?: string
  salary: number
  duration_months: number
  startDate: string
  endDate: string
  status: 'active' | 'pending' | 'expired' | 'signed' | 'sent_for_signature'
  contract_file_url?: string
  additional_files?: string[]
  notes?: string
  contract_preview?: string
  createdAt?: Date
  updatedAt?: Date
}