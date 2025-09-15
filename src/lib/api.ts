// lib/api.ts

import { Player } from "@/types/player"

export async function getPlayers(): Promise<Player[]> {
  try {
    const res = await fetch("/api/players", { cache: "no-store" }) // серверээс авна
    if (!res.ok) throw new Error("Failed to fetch players")

    const data = await res.json()
    return data.players as Player[]
  } catch (error) {
    console.error("Fetch players error:", error)
    return []
  }
}

import { Team } from "@/types/team"

export async function getTeams(): Promise<Team[]> {
  try {
    const res = await fetch("/api/teams", { cache: "no-store" }) // серверээс авна
    if (!res.ok) throw new Error("Failed to fetch teams")

    const data = await res.json()
    return data.teams as Team[]
  } catch (error) {
    console.error("Fetch teams error:", error)
    return []
  }
}

// Add other API functions as needed

