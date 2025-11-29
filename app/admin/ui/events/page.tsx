"use client"
import { AppSidebar, DocumentItem, NavItem } from "@/components/app-sidebar"
import { DataTable } from "@/components/my-data-table"
import { SectionCards } from "@/components/section-cards"
import { SiteHeader } from "@/components/site-header"
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar"
import { documents, navMain, navSecondary, user } from "../../dashboard/nav-items"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
import { useEffect, useState } from "react"
import api from "@/lib/axios"
import EventsForm from "./components/form"
import EventsCategoryForm from "./components/add-event-category"
export default function Page() {
  const [fetchAllEvents, setFetchAllEvents] = useState<boolean>(false);
  const columns = [
    { key: "id", label: "ID" },
    { key: "event_type", label: "Event Type" },
    { key: "title", label: "Event Name" },
    { key: "event_date", label: "Event Date" },
    { key: "location", label: "Loaction" },
  ]
  const [data, setData] = useState<[]>([]);
  useEffect(() => {
    async function fetchAllEvent() {
      const response = await api.get("/api/events/all");
      setData(response.data?.data)
      console.log("my  all  events", response)
    }
    fetchAllEvent();
  }, [fetchAllEvents])
  const handleView = (row: any) => alert(`Viewing ${row.id}`)
  const onRefreshMyPage = (data: boolean) => setFetchAllEvents(data)
  const handleEdit = (row: any) => { alert(row.id) }
  const handleDelete = (row: any) => alert(`Deleting ${row.id}`)
  const sectionCardData = [
    {
      title: "Total Events",
      value: 2000
    },
    {
      title: "Total Booked Events",
      value: 2000
    },
    {
      title: "Total Approved Events",
      value: 2000
    }
    , {
      title: "Total Past Events",
      value: 2000
    }
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
        navSecondary={navSecondary}
      />
      <SidebarInset>
        <SiteHeader title="Events" />
        <div className="flex flex-1 flex-col">
          <div className="@container/main flex flex-1 flex-col gap-2">
            <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
              <SectionCards data={sectionCardData} />
              <div className="px-4 lg:px-6">
                <div className="flex justify-between">
                  <div className="flex w-full flex-col gap-6">
                    <Tabs defaultValue="allEvents" className="w-full bg-black-600">
                      <TabsList>
                        <TabsTrigger value="allEvents">All Events</TabsTrigger>
                        <TabsTrigger value="newEvent">New Event</TabsTrigger>
                        {/* <TabsTrigger value="bookedEvents">Events Category</TabsTrigger> */}
                      </TabsList>
                      <TabsContent value="allEvents" className="w-full">
                        <DataTable
                          title="Users"
                          columns={columns}
                          data={data}
                          onView={handleView}
                          onEdit={handleEdit}
                          onDelete={handleDelete}
                        />
                      </TabsContent>
                      <TabsContent value="bookedEvents">
                        <EventsCategoryForm />

                      </TabsContent>
                      <TabsContent value="newEvent">
                        <EventsForm />
                      </TabsContent>
                    </Tabs>
                  </div>
                </div>

              </div>
            </div>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
