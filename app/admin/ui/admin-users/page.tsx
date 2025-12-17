"use client"

import { AppSidebar, NavItem } from "@/components/app-sidebar"
import { SiteHeader } from "@/components/site-header"
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar"
import { navMain, user } from "../../dashboard/nav-items"
import { AdminUsersTable, AdminUser } from "./components/admin-users"

export default function AdminUsersPage() {
  const handleEdit = (user: AdminUser) => {
    alert(`Edit user: ${user.username}`)
    // You can open a modal or navigate to edit page here
  }

  const handleDelete = (user: AdminUser) => {
    alert(`Delete user: ${user.username}`)
    // Call delete API here
  }

  return (
    <SidebarProvider
      style={
        {
          "--sidebar-width": "calc(var(--spacing) * 72)",
          "--header-height": "calc(var(--spacing) * 12)",
        } as React.CSSProperties
      }
    >
      <AppSidebar variant="inset" navItems={navMain} user={user} />
      <SidebarInset>
        <SiteHeader title="Admin Users" />
        <div className="flex flex-1 flex-col p-4">
          <AdminUsersTable onEdit={handleEdit} onDelete={handleDelete} />
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
