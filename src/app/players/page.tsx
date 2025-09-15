"use client"
import { useState, useEffect } from "react"
import PlayerFilters from "@/components/players/PlayerFilters"
import PlayerTable from "@/components/players/PlayerTable"
import PlayerGallery from "@/components/players/PlayerGallery"
import PlayerPagination from "@/components/players/PlayerPagination"
import { Player } from "@/types/player"
import { getPlayers } from "@/lib/api" // таны API дуудлага энд байна гэж бодлоо
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { PlayersPageSkeleton } from "@/components/skeletons/PlayerSkeletons"
import { useLoadingState } from "@/hooks/useLoadingState"
export const dynamic = "force-dynamic";

export default function PlayersPage() {
  const [players, setPlayers] = useState<Player[]>([])
  const [viewMode, setViewMode] = useState<"list" | "gallery">("list")
  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage, setItemsPerPage] = useState(10)
  const [filters, setFilters] = useState({ search: "", team: "", position: "all", status: "all" })
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // Show skeleton loading with smooth transition
  useLoadingState(isLoading, { 
    delay: 100, // Small delay to prevent flash
    minLoadingTime: 500 // Minimum loading time for smooth UX
  })

  // data fetch
  useEffect(() => {
    const fetchPlayers = async () => {
      try {
        setIsLoading(true)
        setError(null)
        const data = await getPlayers()
        setPlayers(data)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load players')
      } finally {
        setIsLoading(false)
      }
    }
    
    fetchPlayers()
  }, [])

  // filter хийх
  const filteredPlayers = players.filter((p) => {
    return (
      (filters.search === "" || p.name.toLowerCase().includes(filters.search.toLowerCase())) &&
      (filters.team === "" || p.teamId === filters.team) &&
      (filters.position === "all" || p.position === filters.position) &&
      (filters.status === "all" || p.status === filters.status)
    )
  })

  // pagination
  const totalPages = Math.ceil(filteredPlayers.length / itemsPerPage)
  const paginatedPlayers = filteredPlayers.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  )

  const goToPage = (page: number) => {
    if (page >= 1 && page <= totalPages) setCurrentPage(page)
  }

  const handleItemsPerPageChange = (val: string) => {
    setItemsPerPage(parseInt(val))
    setCurrentPage(1)
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Active": return "bg-green-100 text-green-800"
      case "Injured": return "bg-red-100 text-red-800"
      case "Retired": return "bg-gray-100 text-gray-800"
      default: return "bg-blue-100 text-blue-800"
    }
  }
  // Show skeleton while loading
  if (players.length === 0) {
    return <PlayersPageSkeleton />
  }

  // Show error state
  if (error) {
    return (
      <div className="container py-8 mx-auto">
        <Card>
          <div className="p-6 text-center">
            <h2 className="text-xl font-semibold text-destructive mb-2">Error Loading Players</h2>
            <p className="text-muted-foreground mb-4">{error}</p>
            <button 
              onClick={() => window.location.reload()} 
              className="px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90"
            >
              Try Again
            </button>
          </div>
        </Card>
      </div>
    )
  }

  return (
    <div className="container py-8 mx-auto">
        <Card>
            <CardHeader>
          <CardTitle>Нийт тамирчид</CardTitle>
          <CardDescription>
            Нийт тамирчидын тоо: {players.length}
            {` (${filteredPlayers.length} / ${players.length} тамирчид)`}
          </CardDescription>
        </CardHeader>
       
      <div className="m-6">
        <PlayerFilters 
        filters={filters}
        setFilters={setFilters}
        viewMode={viewMode}
        setViewMode={setViewMode}/>

      {viewMode === "list" ? (
        <PlayerTable players={paginatedPlayers} getStatusColor={getStatusColor} />
      ) : (
        <PlayerGallery players={paginatedPlayers} getStatusColor={getStatusColor} />
      )}
      </div>
        <div className="px-6 border-t">
            <PlayerPagination
                currentPage={currentPage}
                totalPages={totalPages}
                goToPage={goToPage}
                itemsPerPage={itemsPerPage}
                handleItemsPerPageChange={handleItemsPerPageChange}
            />
        </div>
       </Card>
    </div>
  )
}
