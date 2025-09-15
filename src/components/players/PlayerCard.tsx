"use client"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import Image from "next/image"
import { ChevronRight, Users } from "lucide-react"
import { useTeamStore } from "@/store/teamStore"
import { Player } from "@/types/player"

interface Props {
  player: Player
  getStatusColor: (status: Player["status"]) => string
}

export default function PlayerCard({ player, getStatusColor }: Props) {
  const team = useTeamStore.getState().teams.find((t) => t._id === player.teamId)

  return (
    <Card className="group relative overflow-hidden hover:shadow-xl transition-all duration-500 ease-in-out hover:-translate-y-1">
      <div className="relative">
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent z-10 transition-opacity duration-500 group-hover:opacity-90" />
        <div className="h-40 bg-muted relative overflow-hidden">
          {player.profilePicture ? (
            <Image src={player.profilePicture} alt={player.name} width={400} height={160} className="w-full h-full object-cover transform transition-transform duration-700 ease-in-out group-hover:scale-105" />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 flex items-center justify-center transition-all duration-500 group-hover:brightness-110">
              <Users className="w-16 h-16 text-white/30 transition-transform duration-500 group-hover:scale-110" />
            </div>
          )}
        </div>
        <div className="absolute bottom-0 left-0 right-0 p-4 z-20 transform transition-transform duration-500 group-hover:translate-y-[-4px]">
          <div className="flex items-center justify-between">
            <div className="transform transition-all duration-500 group-hover:translate-x-1">
              <h3 className="text-lg font-bold text-white tracking-tight transition-all duration-500 group-hover:text-white/90">{player.name}</h3>
              <p className="text-white/90 text-xs mt-0.5 transition-all duration-500 group-hover:text-white/80">{player.position}</p>
            </div>
            <Badge className={`${getStatusColor(player.status)} backdrop-blur-sm transition-all duration-500 group-hover:scale-105 text-xs`} variant="outline">{player.status}</Badge>
          </div>
        </div>
      </div>
      <CardContent className="p-4">
        <div className="grid grid-cols-2 gap-2 text-xs">
          <div className="bg-black/5 dark:bg-white/5 p-2 rounded-lg">
            <div className="font-medium text-muted-foreground mb-0.5">Team</div>
            <div className="font-semibold text-sm">{team?.teamName || 'Free Agent'}</div>
          </div>
          <div className="bg-black/5 dark:bg-white/5 p-2 rounded-lg">
            <div className="font-medium text-muted-foreground mb-0.5">Age</div>
            <div className="font-semibold text-sm">{player.age}</div>
          </div>
          <div className="bg-black/5 dark:bg-white/5 p-2 rounded-lg">
            <div className="font-medium text-muted-foreground mb-0.5">Jersey</div>
            <div className="font-semibold text-sm">#{player.jerseyNumber}</div>
          </div>
          <div className="bg-black/5 dark:bg-white/5 p-2 rounded-lg">
            <div className="font-medium text-muted-foreground mb-0.5">Nationality</div>
            <div className="font-semibold text-sm">{player.nationality}</div>
          </div>
        </div>
        <div className="mt-3 flex justify-end">
          <Button variant="ghost" size="sm" asChild>
            <Link href={`/players/${player._id}`} className="flex items-center gap-1">
              <span>View Profile</span>
              <ChevronRight className="h-3 w-3" />
            </Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
