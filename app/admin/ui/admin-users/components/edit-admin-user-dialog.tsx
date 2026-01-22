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
    first_name: "",
    last_name: "",
    email: "",
    role_id: "",
  })

  useEffect(() => {
    if (user) {
      setForm({
        first_name: user.firstName,
        last_name: user.lastName,
        email: user.email,
        role_id: user.role_id?.toString() || ""
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
            placeholder="First Name"
            value={form.first_name}
            onChange={(e) => setForm({ ...form, first_name: e.target.value })}
          />
          <Input
            placeholder="Last Name"
            value={form.last_name}
            onChange={(e) => setForm({ ...form, last_name: e.target.value })}
          />
          <Input
            placeholder="Email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
          />
          <Input
            placeholder="Role"
            value={form.role_id}
            onChange={(e) => setForm({ ...form, role_id: e.target.value })}
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
