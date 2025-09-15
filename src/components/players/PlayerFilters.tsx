"use client"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { Filter, Search, Grid, List } from "lucide-react"

interface Filters {
  search: string
  team: string
  position: string
  status: string
}

interface PlayerFiltersProps {
  filters: Filters
  setFilters: React.Dispatch<React.SetStateAction<Filters>>
  viewMode: "list" | "gallery"
  setViewMode: React.Dispatch<React.SetStateAction<"list" | "gallery">>
  isLoading?: boolean
}

export default function PlayerFilters({ filters, setFilters, viewMode, setViewMode, isLoading }: PlayerFiltersProps) {
  const hasActiveFilters = filters.search || filters.position !== "all" || filters.status !== "all"

  const clearFilters = () => {
    setFilters({ search: "", team: "", position: "all", status: "all" })
  }

  return (
    <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-center">
      <div className="relative flex-1">
        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Нэр, баг, байрлалаар хайх..."
          className="pl-8"
          value={filters.search}
          onChange={(e) => setFilters(prev => ({ ...prev, search: e.target.value }))}
          disabled={isLoading}
        />
      </div>
      <div className="flex gap-2">
        <div className="w-[180px]">
          <Select value={filters.position} onValueChange={(val) => setFilters(prev => ({ ...prev, position: val }))} disabled={isLoading}>
            <SelectTrigger>
              <div className="flex items-center gap-2">
                <Filter className="h-4 w-4" />
                <SelectValue placeholder="Position" />
              </div>
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Бүх байрлал</SelectItem>
              <SelectItem value="Goalkeeper">Goalkeeper</SelectItem>
              <SelectItem value="Forward">Forward</SelectItem>
              <SelectItem value="Midfielder">Midfielder</SelectItem>
              <SelectItem value="Defender">Defender</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="w-[180px]">
          <Select value={filters.status} onValueChange={(val) => setFilters(prev => ({ ...prev, status: val }))} disabled={isLoading}>
            <SelectTrigger>
              <div className="flex items-center gap-2">
                <Filter className="h-4 w-4" />
                <SelectValue placeholder="Status" />
              </div>
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Statuses</SelectItem>
              <SelectItem value="ACTIVE">Active</SelectItem>
              <SelectItem value="INJURED">Injured</SelectItem>
              <SelectItem value="SUSPENDED">Suspended</SelectItem>
              <SelectItem value="INACTIVE">Inactive</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {hasActiveFilters && (
          <Button variant="outline" onClick={clearFilters} disabled={isLoading}>
            Clear Filters
          </Button>
        )}

        <div className="flex items-center rounded-md bg-muted p-1">
          <Button variant={viewMode === 'list' ? 'secondary' : 'ghost'} size="sm" className="rounded-sm px-2" onClick={() => setViewMode('list')}>
            <List className="h-4 w-4" />
          </Button>
          <Button variant={viewMode === 'gallery' ? 'secondary' : 'ghost'} size="sm" className="rounded-sm px-2" onClick={() => setViewMode('gallery')}>
            <Grid className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
