"use client"

import { useEffect, useMemo, useState } from "react"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Skeleton } from "@/components/ui/skeleton"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  ArrowUpDown,
  ChevronLeft,
  ChevronRight,
  MoreHorizontal,
  Search,
  Eye,
  Pencil,
  Trash2,
} from "lucide-react"
import api from "@/lib/axios"

type Job = {
  id: number
  title: string
  type: string
  postedDate: string
}

type SortField = keyof Job | null
type SortDirection = "asc" | "desc"

export function JobsTable() {
  const [data, setData] = useState<Job[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [searchTerm, setSearchTerm] = useState("")
  const [sortField, setSortField] = useState<SortField>(null)
  const [sortDirection, setSortDirection] = useState<SortDirection>("asc")
  const [currentPage, setCurrentPage] = useState(1)

  const itemsPerPage = 10

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const res = await api.get("/api/jobs/all")
        const jobsArray = Array.isArray(res.data)
          ? res.data
          : Array.isArray(res.data?.data)
          ? res.data.data
          : []
        setData(jobsArray)
      } catch (err) {
        console.error(err)
        setError("Failed to load jobs")
      } finally {
        setLoading(false)
      }
    }
    fetchJobs()
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

    let filtered = data.filter((job) => {
      const term = searchTerm.toLowerCase()
      return (
        job.job_title.toLowerCase().includes(term) ||
        job?.type.toLowerCase().includes(term)
      )
    })

    if (sortField) {
      filtered = [...filtered].sort((a, b) => {
        const aVal = a[sortField]
        const bVal = b[sortField]

        if (typeof aVal === "string" && typeof bVal === "string") {
          return sortDirection === "asc"
            ? aVal.localeCompare(bVal)
            : bVal.localeCompare(aVal)
        }

        return sortDirection === "asc"
          ? aVal > bVal
            ? 1
            : -1
          : aVal < bVal
          ? 1
          : -1
      })
    }

    return filtered
  }, [data, searchTerm, sortField, sortDirection])

  const totalPages = Math.ceil(filteredAndSortedData.length / itemsPerPage)
  const paginatedData = filteredAndSortedData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  )

  if (loading) {
    return (
      <div className="space-y-4">
        <Skeleton className="h-5 w-[200px] bg-gray-300" />
        <div className="rounded-lg border border-gray-200 p-4 space-y-3">
          {[...Array(5)].map((_, i) => (
            <Skeleton key={i} className="h-12 w-full bg-gray-300" />
          ))}
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="rounded-lg border bg-gray-100 p-8 text-center">
        <p className="text-sm font-medium text-gray-700">{error}</p>
        <Button
          variant="outline"
          size="sm"
          className="mt-4"
          onClick={() => window.location.reload()}
        >
          Retry
        </Button>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative max-w-sm flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search jobs..."
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value)
              setCurrentPage(1)
            }}
            className="pl-9 bg-transparent"
          />
        </div>

        <div className="flex items-center gap-2">
          <Badge variant="secondary" className="h-9 px-3">
            {filteredAndSortedData.length} jobs
          </Badge>
          <Button size="sm" onClick={() => alert("Open create job dialog")}>
            + New Job
          </Button>
        </div>
      </div>

      {/* Table */}
      <div className="rounded-lg border bg-card overflow-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>#</TableHead>

              <TableHead>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleSort("title")}
                  className="hover:bg-gray-100"
                >
                  Title <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
              </TableHead>

              <TableHead>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleSort("type")}
                  className="hover:bg-gray-100"
                >
                  Type <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
              </TableHead>

              <TableHead>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleSort("postedDate")}
                  className="hover:bg-gray-100"
                >
                  Posted Date <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
              </TableHead>

              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {paginatedData.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} className="h-32 text-center text-muted-foreground">
                  No jobs found
                </TableCell>
              </TableRow>
            ) : (
              paginatedData.map((job:any, idx:any) => (
                <TableRow
                  key={job.id}
                  className="hover:bg-muted/50 transition-colors"
                >
                  <TableCell>
                    {(currentPage - 1) * itemsPerPage + idx + 1}
                  </TableCell>

                  <TableCell
                    className="max-w-xs truncate"
                    title={job?.job_title}
                  >
                    {job?.job_title}
                  </TableCell>

                  <TableCell> {job?.job_title.slice(0, 20)}{job?.job_title.length > 20 ? "..." : ""}</TableCell>

                  <TableCell>
                    {new Date(job.createdAt).toLocaleDateString()}
                  </TableCell>

                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-8 w-8 p-0"
                        >
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>

                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuItem>
                          <Eye className="mr-2 h-4 w-4" />
                          View
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Pencil className="mr-2 h-4 w-4" />
                          Edit
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="text-destructive focus:text-destructive">
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

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between">
          <p className="text-sm text-muted-foreground">
            Showing {(currentPage - 1) * itemsPerPage + 1} to{" "}
            {Math.min(currentPage * itemsPerPage, filteredAndSortedData.length)} of{" "}
            {filteredAndSortedData.length} results
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
