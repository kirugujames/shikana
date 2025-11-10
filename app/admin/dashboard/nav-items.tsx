import { DocumentItem, NavItem } from "@/components/app-sidebar"

export const user = {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
}

export const navMain: NavItem[] = [
    {title:"Dashboard", url:"/admin/dashboard", icon:"dashboard"},
    { title: "Events", url: "/admin/ui/events", icon: "list-details" },
    { title: "Blogs", url: "/admin/ui/blogs", icon: "chart-bar" },
    { title: "Jobs", url: "/admin/ui/jobs", icon: "folder" },
]

export const navSecondary: NavItem[] = 
[{ title: "Settings", url: "/admin/ui/settings", icon: "settings" }] as const

export const documents: DocumentItem[] = [
    { name: "Roles", url: "/admin/ui/roles", icon: "database" },
    { name: "Users Management", url: "/admin/ui/users", icon: "report" },
]