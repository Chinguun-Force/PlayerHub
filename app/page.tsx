import { DraftBoard } from "@/components/draft-board"
import { PlayerAnalysis } from "@/components/player-analysis"
import { TeamNeeds } from "@/components/team-needs"
import { DraftSimulation } from "@/components/draft-simulation"

export default function DraftPage() {
  return (
    <main className="min-h-screen bg-slate-50 dark:bg-slate-900">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-center mb-8">NBA Draft Evaluation System</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <DraftBoard />
            <DraftSimulation />
          </div>
          <div className="space-y-6">
            <TeamNeeds />
            <PlayerAnalysis />
          </div>
        </div>
      </div>
    </main>
  )
}
