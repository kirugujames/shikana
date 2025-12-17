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
import api from "@/lib/axios"

type Member = {
  id: number
  first_name: string
  last_name: string
  member_code: string
  county: string
  email: string
  phone: string
}

export function MembersTable() {
  const [data, setData] = useState<Member[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchMembers = async () => {
      try {
        const response = await api.get("/api/members/get/all")
        setData(response.data.data)
      } catch (err) {
        setError("Unable to load members")
        console.error(err)
      } finally {
        setLoading(false)
      }
    }
    fetchMembers()
  }, [])

  if (loading) {
    return <div className="p-4 text-sm text-muted-foreground">Loading members…</div>
  }

  if (error) {
    return <div className="p-4 text-sm text-red-500">{error}</div>
  }

  // Mask email: show first 2 chars, mask middle, show domain fully
  const maskEmail = (email: string) => {
    const [local, domain] = email.split("@")
    if (local.length <= 2) return "*".repeat(local.length) + "@" + domain
    const masked = local.slice(0, 2) + "*".repeat(local.length - 2)
    return `${masked}@${domain}`
  }

  // Mask phone: show first 3 and last 2 digits
  const maskPhone = (phone: string) => {
    if (phone.length <= 5) return "*".repeat(phone.length)
    return phone.slice(0, 3) + "*".repeat(phone.length - 5) + phone.slice(-2)
  }

  return (
    <div className="rounded-lg border overflow-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>First Name</TableHead>
            <TableHead>Last Name</TableHead>
            <TableHead>Member No.</TableHead>
            <TableHead>County</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Phone</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {data.length === 0 ? (
            <TableRow>
              <TableCell colSpan={6} className="text-center text-muted-foreground">
                No members found
              </TableCell>
            </TableRow>
          ) : (
            data.map((member) => (
              <TableRow key={member.id}>
                <TableCell>{member.first_name}</TableCell>
                <TableCell>{member.last_name}</TableCell>
                <TableCell>{member.member_code}</TableCell>
                <TableCell>{member.county}</TableCell>
                <TableCell>
                  <span className="relative group cursor-pointer">
                    <span className="blur-[3px] transition-all group-hover:blur-0">
                      {maskEmail(member.email)}
                    </span>
                    <span className="absolute left-0 top-0 hidden group-hover:inline text-sm text-gray-700">
                      {member.email}
                    </span>
                  </span>
                </TableCell>
                <TableCell>
                  <span className="relative group cursor-pointer">
                    <span className="blur-[3px] transition-all group-hover:blur-0">
                      {maskPhone(member.phone)}
                    </span>
                    <span className="absolute left-0 top-0 hidden group-hover:inline text-sm text-gray-700">
                      {member.phone}
                    </span>
                  </span>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  )
}
