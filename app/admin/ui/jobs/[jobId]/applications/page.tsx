"use client"

import { AppSidebar } from "@/components/app-sidebar"
import { SiteHeader } from "@/components/site-header"
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar"
import { navMain, user } from "../../../../dashboard/nav-items"
import { ApplicationsTable } from "./components/applications-table"
import { useParams } from "next/navigation"

export default function JobApplicationsPage() {
    const params = useParams()
    const jobId = params.jobId as string

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
                <SiteHeader title="Job Applications" />
                <div className="flex flex-1 flex-col p-4">
                    <ApplicationsTable jobId={jobId} />
                </div>
            </SidebarInset>
        </SidebarProvider>
    )
}
