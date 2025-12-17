"use client"

import { useEffect, useState } from "react"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import api from "@/lib/axios"

export type AdminUser = {
  id: number
  username: string
  email: string
}

type AdminUsersTableProps = {
  onEdit: (user: AdminUser) => void
  onDelete: (user: AdminUser) => void
}

export function AdminUsersTable({ onEdit, onDelete }: AdminUsersTableProps) {
  const [data, setData] = useState<AdminUser[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await api.get("/api/users/get-all-users")
        setData(response.data.data)
      } catch (err) {
        setError("Unable to load admin users")
        console.error(err)
      } finally {
        setLoading(false)
      }
    }
    fetchUsers()
  }, [])

  if (loading) return <div className="p-4 text-sm text-muted-foreground">Loading users…</div>
  if (error) return <div className="p-4 text-sm text-red-500">{error}</div>

  return (
    <div className="rounded-lg border overflow-auto">
      {/* New User Button */}
      <div className="flex justify-end p-4">
        <Button onClick={() => alert("Open create user modal")}>+ New User</Button>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Username</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {data.length === 0 ? (
            <TableRow>
              <TableCell colSpan={3} className="text-center text-muted-foreground">
                No admin users found
              </TableCell>
            </TableRow>
          ) : (
            data.map((user) => (
              <TableRow key={user.id}>
                <TableCell>{user.username}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell className="flex gap-2">
                  <Button size="sm" variant="outline" onClick={() => onEdit(user)}>
                    Edit
                  </Button>
                  <Button size="sm" variant="destructive" onClick={() => onDelete(user)}>
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  )
}
