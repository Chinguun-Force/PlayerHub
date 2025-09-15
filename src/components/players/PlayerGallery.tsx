"use client"
import PlayerCard from "./PlayerCard"
import { Player } from "@/types/player"

interface Props {
  players: Player[]
  getStatusColor: (status: Player["status"]) => string
}

export default function PlayerGallery({ players, getStatusColor }: Props) {
  return (
    <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      {players.map((player) => (
        <PlayerCard key={player._id} player={player} getStatusColor={getStatusColor} />
      ))}
    </div>
  )
}
