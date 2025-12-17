import { NavItem } from "@/components/app-sidebar"

export const user = {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
}

export const navMain: NavItem[] = [
    { title: "Dashboard", url: "#", icon: "dashboard" }, 
    { title: "Members", url: "/admin/ui/members", icon: "users" }, 
    { title: "Admin Users", url: "/admin/ui/admin-users", icon: "user-cog" }, 
    { title: "Events", url: "/admin/ui/members", icon: "calendar" }, 
    { title: "Blogs", url: "/admin/ui/blogs", icon: "file-text" }, 
    { title: "Jobs", url: "/admin/ui/blogs", icon: "briefcase" }, 
    { title: "Merchandise", url: "/admin/ui/blogs", icon: "shopping-bag" }, 
    { title: "Audit Trail", url: "/admin/ui/blogs", icon: "scroll-text" }, 
]

