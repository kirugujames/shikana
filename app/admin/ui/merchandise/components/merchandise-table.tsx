"use client"

import { useEffect, useMemo, useState } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Search, MoreHorizontal, Eye, Pencil, Trash2, Plus } from "lucide-react"
import api from "@/lib/axios"
import { AddNewMerchandise } from "./add-merchandise"

type Merchandise = {
  id: number
  name: string
  category: string
  price: number
  stock: number
  status: "ACTIVE" | "INACTIVE"
  image: string
  createdDate: string
}

export function MerchandiseTable() {
  const [data, setData] = useState<Merchandise[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  const fetchMerchandise = async () => {
    try {
      setLoading(true)
      const res = await api.get("/api/merchandise/get-all")
      const items = Array.isArray(res.data) ? res.data : (res.data?.data ?? [])
      setData(items)
    } catch (err) {
      console.error(err)
      setError("Failed to load merchandise")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchMerchandise()
  }, [])

  const filteredData = useMemo(() => {
    if (!Array.isArray(data)) return []
    return data.filter(
      (item) =>
        item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.category.toLowerCase().includes(searchTerm.toLowerCase()),
    )
  }, [data, searchTerm])

  const handleMerchandiseAdded = () => {
    setIsDialogOpen(false)
    fetchMerchandise()
  }

  if (loading) {
    return <div className="p-4 text-sm text-muted-foreground">Loading merchandise…</div>
  }

  if (error) {
    return <div className="rounded-lg border bg-gray-100 p-6 text-center text-sm text-gray-700">{error}</div>
  }

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative max-w-sm flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search merchandise..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-9 bg-transparent"
          />
        </div>

        <Button onClick={() => setIsDialogOpen(true)}>
          <Plus className="mr-2 h-4 w-4" />
          New Merchandise
        </Button>
      </div>

      {/* Table */}
      <div className="rounded-lg border bg-card overflow-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>#</TableHead>
              <TableHead>Image</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Price</TableHead>
              <TableHead>Stock</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {filteredData.length === 0 ? (
              <TableRow>
                <TableCell colSpan={8} className="h-32 text-center text-muted-foreground">
                  No merchandise found
                </TableCell>
              </TableRow>
            ) : (
              filteredData.map((item, idx) => (
                <TableRow key={item.id} className="hover:bg-muted/50 transition-colors">
                  <TableCell>{idx + 1}</TableCell>

                  <TableCell>
                    <img
                      src={item.image || "/placeholder.svg?height=40&width=40"}
                      alt={item.name}
                      className="h-10 w-10 rounded-md object-cover border"
                    />
                  </TableCell>

                  <TableCell className="max-w-xs truncate font-medium" title={item.name}>
                    {item.name}
                  </TableCell>

                  <TableCell>{item.category}</TableCell>

                  <TableCell>KES {item.price.toLocaleString()}</TableCell>

                  <TableCell>
                    {item.stock === 0 ? (
                      <Badge variant="destructive">Out of Stock</Badge>
                    ) : item.stock < 10 ? (
                      <Badge variant="secondary">Low ({item.stock})</Badge>
                    ) : (
                      <Badge variant="outline">In Stock</Badge>
                    )}
                  </TableCell>

                  <TableCell>
                    <Badge variant={item.status === "ACTIVE" ? "default" : "secondary"}>{item.status}</Badge>
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

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-h-[90vh] overflow-y-auto max-w-2xl">
          <DialogHeader>
            <DialogTitle className="sr-only">Add New Merchandise</DialogTitle>
          </DialogHeader>
          <AddNewMerchandise onSuccess={handleMerchandiseAdded} onCancel={() => setIsDialogOpen(false)} />
        </DialogContent>
      </Dialog>
    </div>
  )
}
