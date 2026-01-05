"use client"

import { useEffect, useState } from "react"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import api from "@/lib/axios"
import { AdminUser } from "./admin-users"

type Props = {
  open: boolean
  onOpenChange: (open: boolean) => void
  user: AdminUser | null
  onSuccess: () => void
}

export function EditAdminUserDialog({
  open,
  onOpenChange,
  user,
  onSuccess,
}: Props) {
  const [loading, setLoading] = useState(false)
  const [form, setForm] = useState({
    username: "",
    email: "",
  })

  useEffect(() => {
    if (user) {
      setForm({
        username: user.username,
        email: user.email,
      })
    }
  }, [user])

  if (!user) return null

  const handleUpdate = async () => {
    try {
      setLoading(true)
      await api.put(`/api/users/update/${user.id}`, form)
      onSuccess()
      onOpenChange(false)
    } catch (err) {
      console.error(err)
      alert("Failed to update user")
    } finally {
      setLoading(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Admin User</DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <Input
            placeholder="Username"
            value={form.username}
            onChange={(e) => setForm({ ...form, username: e.target.value })}
          />
          <Input
            placeholder="Email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
          />
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={handleUpdate} disabled={loading}>
            {loading ? "Saving..." : "Save Changes"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
