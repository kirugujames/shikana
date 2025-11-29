import { AppSidebar, DocumentItem, NavItem } from "@/components/app-sidebar"
import { SiteHeader } from "@/components/site-header"
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar"
import { documents, navMain, navSecondary, user } from "../../dashboard/nav-items"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import AddNewBlog from "./components/add-blog"
import AddNewBlogCategory from "./components/new-category"

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
      <AppSidebar
        variant="inset"
        navItems={navMain}
        documents={documents}
        user={user}
        navSecondary={navSecondary}
      />
      <SidebarInset>
        <SiteHeader title="Dashboard" />
        <div className="flex flex-1 flex-col">
          <div className="@container/main flex flex-1 flex-col gap-2">
            <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
              <div className="px-4 lg:px-6">
                <Tabs defaultValue="newBlog" className="w-full bg-black-600">
                  <TabsList>
                    {/* <TabsTrigger value="allEvents">All Blogs</TabsTrigger> */}
                    <TabsTrigger value="newBlog">New Blog</TabsTrigger>
                    <TabsTrigger value="newCategory">New Category</TabsTrigger>
                    {/* <TabsTrigger value="bookedEvents">Events Category</TabsTrigger> */}
                  </TabsList>
                  <TabsContent value="allEvents" className="w-full">
                    {/* <DataTable
                          title="Users"
                          columns={columns}
                          data={data}
                          onView={handleView}
                          onEdit={handleEdit}
                          onDelete={handleDelete}
                        /> */}
                  </TabsContent>
                  <TabsContent value="bookedEvents">
                    {/* <EventsCategoryForm /> */}
                  </TabsContent>
                  <TabsContent value="newBlog">
                    <AddNewBlog />
                  </TabsContent>
                  <TabsContent value="newCategory">
                    <AddNewBlogCategory />
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
