"use client"

import { AppSidebar } from "@/components/app-sidebar"
import { SiteHeader } from "@/components/site-header"
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { navMain, user } from "../../dashboard/nav-items"
import { MembersTable } from "./components/member-table"

export default function Page() {
  return (
    <SidebarProvider
      style={
        {
          "--sidebar-width": "calc(var(--spacing) * 72)",
          "--header-height": "calc(var(--spacing) * 12)",
        } as React.CSSProperties
      }
    >
      {/* Sidebar */}
      <AppSidebar variant="inset" navItems={navMain} user={user} />

      {/* Main Content */}
      <SidebarInset>
        <SiteHeader title="Members" />

        <div className="flex flex-1 flex-col">
          <div className="@container/main flex flex-1 flex-col gap-2">
            <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
              <div className="px-4 lg:px-6">
                <Tabs defaultValue="allMembers" className="w-full">
                  {/* <TabsList>
                    <TabsTrigger value="allMembers">All Members</TabsTrigger>
                    <TabsTrigger value="addMember">Add Member</TabsTrigger>
                  </TabsList> */}

                  {/* All Members */}
                  <TabsContent value="allMembers" className="w-full">
                    <MembersTable />
                  </TabsContent>

                  {/* Add Member (future) */}
                  <TabsContent value="addMember">
                    <div className="rounded-lg border p-6 text-sm text-muted-foreground">
                      Add Member form coming soon.
                    </div>
                  </TabsContent>
                </Tabs>
              </div>
            </div>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
