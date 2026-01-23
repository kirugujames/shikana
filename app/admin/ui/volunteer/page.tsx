"use client"

import { AppSidebar, NavItem } from "@/components/app-sidebar"
import { SiteHeader } from "@/components/site-header"
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar"
import { navMain, user } from "../../dashboard/nav-items"
import { VolunteerTable } from "./components/volunteer-table"

export default function VolunteerPage() {
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
                <SiteHeader title="Volunteer Applications" />
                <div className="flex flex-1 flex-col p-4">
                    <VolunteerTable />
                </div>
            </SidebarInset>
        </SidebarProvider>
    )
}
