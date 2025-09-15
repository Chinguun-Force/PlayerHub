"use client"

import { useEffect, useState } from "react"
import { Input } from "@/components/ui/input"
import { Search, Trophy } from "lucide-react"
import TeamCard from "@/components/teams/TeamCard"
import { getTeams } from "@/lib/api"
import { Team } from "@/types/team"
import { TeamsPageSkeleton} from "@/components/skeletons/TeamSkeletons"

export default function TeamsPage() {
    const [searchTerm, setSearchTerm] = useState("")
//   const teams = useTeamStore((state) => state.teams)
    const [teams, setTeams] = useState<Team[]>([])
  useEffect(() => {
    const fetchTeams = async () => {
        try {
            const data = await getTeams()
            setTeams(data)
        } catch (error) {
            console.error("Failed to fetch teams:", error)
        }
    }
    fetchTeams()
  }, [])
  const filteredTeams = teams.filter((team) => team.teamNameEn.toLowerCase().includes(searchTerm.toLowerCase()))
  if (teams.length === 0) {
    return <TeamsPageSkeleton />
  }
  return (
    <div className="container py-8 mx-auto">
      <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Багууд</h1>
          <p className="text-muted-foreground">Монголын дээд лигийн багууд</p>
        </div>
      </div>

      <div className="mb-6 flex w-full max-w-sm items-center space-x-2">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search teams..."
            className="pl-8"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {filteredTeams.map((team) => (
            <TeamCard key={team._id} team={team} />
        ))}
        {filteredTeams.length === 0 && (
          <div className="col-span-full flex flex-col items-center justify-center py-12 text-center">
            <Trophy className="h-12 w-12 text-muted-foreground/50" />
            <h3 className="mt-4 text-lg font-medium">No teams found</h3>
            <p className="text-sm text-muted-foreground">Try adjusting your search criteria.</p>
          </div>
        )}
      </div>
    </div>
  )
}
