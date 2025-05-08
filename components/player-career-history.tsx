import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import type { Player } from "@/lib/data"
import { Calendar, MapPin } from "lucide-react"

interface PlayerCareerHistoryProps {
  player: Player
}

export function PlayerCareerHistory({ player }: PlayerCareerHistoryProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Career History</CardTitle>
        <CardDescription>Timeline of {player.name}'s professional career</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="relative border-l border-muted pl-6 pb-6">
          {player.careerHistory.map((entry, index) => (
            <div key={index} className="mb-10 last:mb-0">
              <div className="absolute -left-1.5 mt-1.5 h-3 w-3 rounded-full border border-primary bg-background"></div>
              <div className="flex flex-col space-y-2">
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <time className="text-sm font-medium">{entry.season}</time>
                </div>
                <h3 className="text-lg font-semibold">{entry.teamName}</h3>
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm text-muted-foreground">{entry.role}</span>
                </div>
                <p className="text-sm text-muted-foreground">
                  {entry.startDate} - {entry.endDate || "Present"}
                </p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
