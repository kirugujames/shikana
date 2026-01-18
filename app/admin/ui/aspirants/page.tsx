"use client"

import { AppSidebar, NavItem } from "@/components/app-sidebar"
import { SiteHeader } from "@/components/site-header"
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar"
import { navMain, user } from "../../dashboard/nav-items"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { AspirantsTable } from "./components/aspirants-table"

export default function AspirantsPage() {
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
                <SiteHeader title="Aspirants" />
                <div className="flex flex-1 flex-col p-4">
                    <Tabs defaultValue="political" className="w-full">
                        <TabsList>
                            <TabsTrigger value="political">Political Positions</TabsTrigger>
                            <TabsTrigger value="party">Party Positions</TabsTrigger>
                        </TabsList>
                        <TabsContent value="political" className="mt-4">
                            <AspirantsTable type="political" />
                        </TabsContent>
                        <TabsContent value="party" className="mt-4">
                            <AspirantsTable type="party" />
                        </TabsContent>
                    </Tabs>
                </div>
            </SidebarInset>
        </SidebarProvider>
    )
}
