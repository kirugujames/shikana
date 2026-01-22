"use client"

import { AppSidebar, NavItem } from "@/components/app-sidebar"
import { SiteHeader } from "@/components/site-header"
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar"
import { navMain, user } from "../../dashboard/nav-items"
import { DonationsTable } from "./components/donation-table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"



export default function AdminUsersPage() {
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
        <SiteHeader title="Donations" />
        <div className="flex flex-1 flex-col p-4">
          <Tabs defaultValue="individual" className="w-full">
            <div className="flex items-center justify-between mb-4">
              <TabsList>
                <TabsTrigger value="individual">Individual Donations</TabsTrigger>
                <TabsTrigger value="organization">Organization Donations</TabsTrigger>
              </TabsList>
            </div>
            <TabsContent value="individual" className="mt-0">
              <DonationsTable type="individual" />
            </TabsContent>
            <TabsContent value="organization" className="mt-0">
              <DonationsTable type="organization" />
            </TabsContent>
          </Tabs>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
