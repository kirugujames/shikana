import { AppSidebar, DocumentItem, NavItem } from "@/components/app-sidebar"
import { ChartAreaInteractive } from "@/components/chart-area-interactive"
import { DataTable } from "@/components/data-table"
import { SectionCards } from "@/components/section-cards"
import { SiteHeader } from "@/components/site-header"
import cardData from "../../admin/dashboard/nav-card.json";
import {
  SidebarInset,
  SidebarProvider,
} from "@/components/ui/sidebar"

import data from "./data.json"

export default function Page() {
  const user = {
      name: "shadcn",
      email: "m@example.com",
      avatar: "/avatars/shadcn.jpg",
    }
  
    const navMain:NavItem[] = [
      { title: "Events", url: "#", icon: "list-details" },
      { title: "Blogs", url: "#", icon: "chart-bar" },
      { title: "Jobs", url: "#", icon: "folder" },
    ]
  
    const navSecondary:NavItem[] = [{ title: "Settings", url: "#", icon: "settings" }] as const
  
    const documents:DocumentItem[] = [
      // { name: "Roles", url: "#", icon: "database" },
      // { name: "Users Management", url: "#", icon: "report" },
    ]
  return (
    <SidebarProvider
      style={
        {
          "--sidebar-width": "calc(var(--spacing) * 72)",
          "--header-height": "calc(var(--spacing) * 12)",
        } as React.CSSProperties
      }
    >
      <AppSidebar 
       variant="inset"
       navItems={navMain}
        documents={documents}
        user={user}
        navSecondary={navSecondary} />
      <SidebarInset>
        <SiteHeader title="Dashboard"/>
        <div className="flex flex-1 flex-col">
          <div className="@container/main flex flex-1 flex-col gap-2">
            <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
              <SectionCards data={cardData}/>
              <div className="px-4 lg:px-6">
                <ChartAreaInteractive />
              </div>
              <DataTable data={data} />
            </div>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
