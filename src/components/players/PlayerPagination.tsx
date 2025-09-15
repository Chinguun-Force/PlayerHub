"use client"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface Props {
  currentPage: number
  totalPages: number
  goToPage: (page: number) => void
  itemsPerPage: number
  handleItemsPerPageChange: (val: string) => void
}

export default function PlayerPagination({
  currentPage,
  totalPages,
  goToPage,
  itemsPerPage,
  handleItemsPerPageChange
}: Props) {
  return (
    <div className="flex justify-between items-center pt-4">
      <Select onValueChange={handleItemsPerPageChange} defaultValue={String(itemsPerPage)}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Items per page" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="5">5 per page</SelectItem>
          <SelectItem value="10">10 per page</SelectItem>
          <SelectItem value="20">20 per page</SelectItem>
        </SelectContent>
      </Select>

      <div className="flex items-center gap-2">
        <Button variant="outline" size="sm" onClick={() => goToPage(currentPage - 1)} disabled={currentPage === 1}>Previous</Button>
        <span className="text-sm text-muted-foreground">Page {currentPage} of {totalPages}</span>
        <Button variant="outline" size="sm" onClick={() => goToPage(currentPage + 1)} disabled={currentPage === totalPages}>Next</Button>
      </div>
    </div>
  )
}
