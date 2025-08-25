export interface Team {
    teamNameEn: string
    teamName: string
    teamLogo: string
    teamDescription: string
    teamMembers: string[]
    teamAchievements: string[]
    teamStats: object
    teamSocialLinks: string[]
    createdAt: Date
    updatedAt: Date
    isActive: boolean
}