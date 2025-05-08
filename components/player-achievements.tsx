import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import type { Player } from "@/lib/data"
import { Award, Calendar, Trophy } from "lucide-react"

interface PlayerAchievementsProps {
  player: Player
}

export function PlayerAchievements({ player }: PlayerAchievementsProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Achievements</CardTitle>
        <CardDescription>Awards, trophies, and milestones</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4">
          {player.achievements.map((achievement) => (
            <div key={achievement.id} className="flex items-start gap-4 rounded-lg border p-4">
              <div className="rounded-full bg-primary/10 p-2">
                {achievement.type === "Award" ? (
                  <Award className="h-5 w-5 text-primary" />
                ) : (
                  <Trophy className="h-5 w-5 text-primary" />
                )}
              </div>
              <div className="flex-1">
                <h3 className="font-medium">{achievement.title}</h3>
                <p className="text-sm text-muted-foreground">{achievement.description}</p>
                <div className="mt-2 flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <span className="text-xs text-muted-foreground">{achievement.date}</span>
                </div>
              </div>
            </div>
          ))}
          {player.achievements.length === 0 && (
            <div className="flex flex-col items-center justify-center py-8 text-center">
              <Trophy className="h-12 w-12 text-muted-foreground/50" />
              <h3 className="mt-4 text-lg font-medium">No achievements yet</h3>
              <p className="text-sm text-muted-foreground">This player hasn't recorded any achievements yet.</p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
