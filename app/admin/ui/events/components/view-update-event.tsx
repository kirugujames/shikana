"use client"

import { useEffect, useState, useMemo } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Skeleton } from "@/components/ui/skeleton"
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { ArrowUpDown, ChevronLeft, ChevronRight, Search, MoreHorizontal, Eye, Pencil, Trash2 } from "lucide-react"
import api from "@/lib/axios"
import AddNewEvent from "./add-event"

type Event = {
  id: number
  event_type: string
  title: string
  event_date: string
  from_time: string
  to_time: string
  location: string
  description: string
  sub_title?: string
  image?: string
  is_main?: boolean
}

type SortField = keyof Event | null
type SortDirection = "asc" | "desc"

export function EventsTable() {
  const [data, setData] = useState<Event[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [searchTerm, setSearchTerm] = useState("")
  const [sortField, setSortField] = useState<SortField>(null)
  const [sortDirection, setSortDirection] = useState<SortDirection>("asc")
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 10
  const [openAddEvent, setOpenAddEvent] = useState(false)

  const fetchEvents = async () => {
    try {
      setLoading(true)
      const response = await api.get("/api/events/all")
      const eventsArray = Array.isArray(response.data)
        ? response.data
        : Array.isArray(response.data.data)
          ? response.data.data
          : []
      setData(eventsArray)
    } catch (err) {
      setError("Unable to load events")
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchEvents()
  }, [])

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc")
    } else {
      setSortField(field)
      setSortDirection("asc")
    }
  }

  const filteredAndSortedData = useMemo(() => {
    if (!Array.isArray(data)) return []

    let filtered = data.filter((event) => {
      const term = searchTerm.toLowerCase()
      return (
        event.title.toLowerCase().includes(term) ||
        event.event_type.toLowerCase().includes(term) ||
        event.location.toLowerCase().includes(term)
      )
    })

    if (sortField) {
      filtered = [...filtered].sort((a, b) => {
        const aVal = a[sortField]
        const bVal = b[sortField]

        if (typeof aVal === "string" && typeof bVal === "string") {
          return sortDirection === "asc" ? aVal.localeCompare(bVal) : bVal.localeCompare(aVal)
        }

        if (aVal === undefined || bVal === undefined) {
          return 0
        }

        return sortDirection === "asc" ? (aVal > bVal ? 1 : -1) : aVal < bVal ? 1 : -1
      })
    }

    return filtered
  }, [data, searchTerm, sortField, sortDirection])

  const totalPages = Math.ceil(filteredAndSortedData.length / itemsPerPage)
  const paginatedData = filteredAndSortedData.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)

  const handleMarkMain = async (event: Event) => {
    try {
      const response = await api.post(`/api/events/mark-main/${event.id}`, {
        is_main: !event.is_main,
      })
      setData((prev) => prev.map((e) => (e.id === event.id ? { ...e, is_main: !e.is_main } : e)))
    } catch (err) {
      console.error("Failed to update main status", err)
    }
  }

  const handleEventSuccess = () => {
    setOpenAddEvent(false)
    fetchEvents()
  }

  if (loading) {
    return (
      <div className="space-y-4">
        <Skeleton className="h-5 w-[200px] bg-gray-300" />
        <div className="rounded-lg border border-gray-200">
          <div className="p-4 space-y-3">
            {[...Array(5)].map((_, i) => (
              <Skeleton key={i} className="h-12 w-full bg-gray-300" />
            ))}
          </div>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="rounded-lg border border-gray-200 bg-gray-100 p-8 text-center">
        <p className="text-sm font-medium text-gray-700">{error}</p>
        <Button variant="outline" size="sm" className="mt-4 bg-transparent" onClick={() => window.location.reload()}>
          Try Again
        </Button>
      </div>
    )
  }

  const getStatus = (eventDate: string) => {
    const now = new Date()
    const eventDay = new Date(eventDate)
    if (eventDay > now) return "Active"
    if (eventDay.toDateString() === now.toDateString()) return "Ongoing"
    return "Passed"
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search events..."
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value)
              setCurrentPage(1)
            }}
            className="pl-9 border border-border rounded-lg bg-transparent outline-none focus:outline-none focus:border-secondary focus:ring-0 transition-colors"
          />
        </div>
        <div className="flex items-center gap-2">
          <Badge variant="secondary" className="h-9 px-3">
            {filteredAndSortedData.length} {filteredAndSortedData.length === 1 ? "event" : "events"}
          </Badge>
          <Dialog open={openAddEvent} onOpenChange={setOpenAddEvent}>
            <DialogTrigger asChild>
              <Button variant="default" size="sm">
                + New Event
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
              <AddNewEvent onSuccess={handleEventSuccess} />
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <div className="rounded-lg border bg-card overflow-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>#</TableHead>
              {["event_type", "title", "event_date", "from_time", "to_time", "location"].map((field, idx) => (
                <TableHead key={idx}>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-8 hover:bg-gray-100 hover:text-inherit focus:ring-0 focus:outline-none"
                    onClick={() => handleSort(field as SortField)}
                  >
                    {field === "event_type" && "Type"}
                    {field === "title" && "Title"}
                    {field === "event_date" && "Date"}
                    {field === "from_time" && "From"}
                    {field === "to_time" && "To"}
                    {field === "location" && "Location"}
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                  </Button>
                </TableHead>
              ))}
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {paginatedData.length === 0 ? (
              <TableRow>
                <TableCell colSpan={9} className="h-32 text-center">
                  <div className="flex flex-col items-center gap-2 text-muted-foreground">
                    <Search className="h-8 w-8 opacity-40" />
                    <p className="text-sm font-medium">No events found</p>
                    {searchTerm && <p className="text-xs">Try adjusting your search terms</p>}
                  </div>
                </TableCell>
              </TableRow>
            ) : (
              paginatedData.map((event, idx) => (
                <TableRow key={event.id} className="group hover:bg-muted/50 transition-colors">
                  <TableCell>{(currentPage - 1) * itemsPerPage + idx + 1}</TableCell>
                  <TableCell>
                    <Badge variant="outline">{event.event_type}</Badge>
                  </TableCell>
                  <TableCell className="max-w-xs truncate font-medium" title={event.title}>
                    {event.title}
                  </TableCell>
                  <TableCell>{event.event_date}</TableCell>
                  <TableCell>{event.from_time}</TableCell>
                  <TableCell>{event.to_time}</TableCell>
                  <TableCell className="max-w-xs truncate" title={event.location}>
                    {event.location}
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        getStatus(event.event_date) === "Passed"
                          ? "destructive"
                          : getStatus(event.event_date) === "Ongoing"
                            ? "secondary"
                            : "default"
                      }
                    >
                      {getStatus(event.event_date)}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuItem onClick={() => handleMarkMain(event)}>
                          {event.is_main ? "Unmark as Main" : "Mark as Main"}
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => alert("View details " + event.title)}>
                          <Eye className="mr-2 h-4 w-4" />
                          View
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => alert("Edit event " + event.title)}>
                          <Pencil className="mr-2 h-4 w-4" />
                          Edit
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem
                          className="text-destructive focus:text-destructive"
                          onClick={() => alert("Delete event " + event.title)}
                        >
                          <Trash2 className="mr-2 h-4 w-4" />
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      {totalPages > 1 && (
        <div className="flex items-center justify-between">
          <p className="text-sm text-muted-foreground">
            Showing {(currentPage - 1) * itemsPerPage + 1} to{" "}
            {Math.min(currentPage * itemsPerPage, filteredAndSortedData.length)} of {filteredAndSortedData.length}{" "}
            results
          </p>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              disabled={currentPage === 1}
            >
              <ChevronLeft className="h-4 w-4" />
              Previous
            </Button>
            <div className="flex items-center gap-1">
              {[...Array(totalPages)].map((_, i) => {
                const page = i + 1
                if (page === 1 || page === totalPages || (page >= currentPage - 1 && page <= currentPage + 1)) {
                  return (
                    <Button
                      key={page}
                      variant={currentPage === page ? "default" : "outline"}
                      size="sm"
                      className="h-8 w-8 p-0"
                      onClick={() => setCurrentPage(page)}
                    >
                      {page}
                    </Button>
                  )
                } else if (page === currentPage - 2 || page === currentPage + 2) {
                  return (
                    <span key={page} className="px-1 text-muted-foreground">
                      …
                    </span>
                  )
                }
                return null
              })}
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
            >
              Next
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}
