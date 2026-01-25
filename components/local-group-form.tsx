"use client"

import React, { useState, useEffect } from "react"
import { Search, MapPin, Send, CheckCircle, ChevronDown, Check } from "lucide-react"
import api from "@/lib/axios"
import toast from "react-hot-toast"
import { Button } from "./ui/button"
import { Spinner } from "./ui/spinner"
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "./ui/command"
import { cn } from "@/lib/utils"

export function LocalGroupForm() {
    const [formData, setFormData] = useState({
        membershipNumber: "",
        groupId: "",
    })
    const [groups, setGroups] = useState<any[]>([])
    const [loading, setLoading] = useState(false)
    const [loadingGroups, setLoadingGroups] = useState(false)
    const [popoverOpen, setPopoverOpen] = useState(false)
    const [status, setStatus] = useState<"idle" | "success" | "loading">("idle")

    useEffect(() => {
        const fetchGroups = async () => {
            try {
                setLoadingGroups(true)
                const res = await api.get("/api/local-groups/all")
                setGroups(Array.isArray(res.data?.data) ? res.data.data : [])
            } catch (err) {
                console.error("Failed to fetch local groups", err)
                // Fallback mock data if API fails or doesn't exist yet
                setGroups([
                    { id: 1, name: "Nairobi Central Group", county: "Nairobi", constituency: "Starehe" },
                    { id: 2, name: "Kiambu Unity Group", county: "Kiambu", constituency: "Kiambu Town" },
                    { id: 3, name: "Mombasa Coastal Front", county: "Mombasa", constituency: "Mvita" },
                ])
            } finally {
                setLoadingGroups(false)
            }
        }
        fetchGroups()
    }, [])

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        if (!formData.membershipNumber || !formData.groupId) {
            toast.error("Please fill in all fields")
            return
        }

        try {
            setStatus("loading")
            await api.post("/api/local-groups/join", {
                membership_number: formData.membershipNumber,
                group_id: formData.groupId
            })
            toast.success("Application to join group submitted!")
            setStatus("success")
            setFormData({ membershipNumber: "", groupId: "" })
        } catch (error: any) {
            console.error("Join group error:", error)
            toast.error(error.response?.data?.message || "Failed to submit application")
            setStatus("idle")
        }
    }

    const selectedGroupLabel = groups.find(g => g.id.toString() === formData.groupId)
        ? `${groups.find(g => g.id.toString() === formData.groupId).county} - ${groups.find(g => g.id.toString() === formData.groupId).constituency}`
        : "Select local group..."

    return (
        <section className="w-full py-16 md:py-24 bg-background">
            <div className="max-w-6xl mx-auto px-4">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">

                    {/* Descriptive Text Section */}
                    <div className="hidden lg:block text-foreground/70 leading-relaxed">
                        <h2 className="text-3xl font-bold text-foreground mb-6">Connecting Communities</h2>
                        <p className="mb-4">
                            Local groups are the heartbeat of our movement. By organizing at the grassroots level, we ensure that every voice is heard and every community is represented.
                        </p>
                        <p className="mb-4">
                            Joining a local group means participating in local decision-making, coordinating events in your area, and working directly with your neighbors to bring about the change we want for our nation.
                        </p>
                        <p className="mb-4">
                            It's about collective action, local leadership, and fostering unity within our constituencies. Together, we can build a stronger foundation for our country, one village and one town at a time.
                        </p>
                        <ul className="space-y-3 list-disc pl-5 mt-6">
                            <li>Grassroots engagement</li>
                            <li>Community leadership</li>
                            <li>Local impact</li>
                            <li>Unity in action</li>
                        </ul>
                    </div>

                    <div className="lg:col-span-2 bg-card border border-border rounded-xl p-8 shadow-sm">
                        <div className="flex items-center gap-3 mb-8">
                            <div className="p-3 bg-secondary/10 rounded-lg">
                                <MapPin className="text-secondary w-6 h-6" />
                            </div>
                            <div>
                                <h2 className="text-2xl font-bold">Join a Local Group</h2>
                                <p className="text-muted-foreground text-sm">Find and connect with your local community</p>
                            </div>
                        </div>

                        {status === "success" && (
                            <div className="mb-8 p-4 bg-green-50 border border-green-200 rounded-lg flex items-start gap-3 animate-slide-up">
                                <CheckCircle className="text-green-600 flex-shrink-0 mt-0.5" size={20} />
                                <div className="text-green-800">
                                    <p className="font-semibold">Request Submitted!</p>
                                    <p className="text-sm">Your request to join the group has been received and is being processed.</p>
                                </div>
                            </div>
                        )}

                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div>
                                <label className="block text-sm font-medium text-foreground mb-2">Membership Number *</label>
                                <input
                                    type="text"
                                    value={formData.membershipNumber}
                                    onChange={(e) => setFormData(prev => ({ ...prev, membershipNumber: e.target.value }))}
                                    required
                                    placeholder="SFU-2024-XXXXX"
                                    className="w-full px-4 py-3 border border-border rounded-lg bg-background focus:outline-none focus:border-secondary transition-colors"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-foreground mb-2">Select Your Group *</label>
                                <Popover open={popoverOpen} onOpenChange={setPopoverOpen}>
                                    <PopoverTrigger asChild>
                                        <Button
                                            variant="outline"
                                            role="combobox"
                                            aria-expanded={popoverOpen}
                                            className="w-full justify-between px-4 py-3 h-auto border-border rounded-lg text-foreground bg-background hover:bg-muted font-normal text-left focus:ring-0 focus:border-secondary transition-colors shadow-none"
                                        >
                                            {selectedGroupLabel}
                                            <ChevronDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                                        </Button>
                                    </PopoverTrigger>
                                    <PopoverContent className="w-[var(--radix-popover-trigger-width)] p-0" align="start">
                                        <Command className="w-full">
                                            <CommandInput placeholder="Search by county or constituency..." className="h-9" />
                                            <CommandList className="max-h-[300px]">
                                                <CommandEmpty>No group found.</CommandEmpty>
                                                <CommandGroup>
                                                    {groups.map((group) => (
                                                        <CommandItem
                                                            key={group.id}
                                                            value={`${group.county} ${group.constituency}`}
                                                            onSelect={() => {
                                                                setFormData(prev => ({ ...prev, groupId: group.id.toString() }))
                                                                setPopoverOpen(false)
                                                            }}
                                                        >
                                                            <div className="flex flex-col">
                                                                <span className="font-medium">{group.county}</span>
                                                                <span className="text-xs text-muted-foreground">{group.constituency}</span>
                                                            </div>
                                                            <Check
                                                                className={cn(
                                                                    "ml-auto h-4 w-4",
                                                                    formData.groupId === group.id.toString() ? "opacity-100" : "opacity-0"
                                                                )}
                                                            />
                                                        </CommandItem>
                                                    ))}
                                                </CommandGroup>
                                            </CommandList>
                                        </Command>
                                    </PopoverContent>
                                </Popover>
                            </div>

                            <div className="pt-4">
                                <Button
                                    type="submit"
                                    disabled={status === "loading"}
                                    className="w-full bg-secondary hover:bg-secondary/90 text-white h-12 rounded-lg font-bold flex items-center justify-center gap-2"
                                >
                                    {status === "loading" ? (
                                        <>
                                            <Spinner />
                                            <span>Submitting...</span>
                                        </>
                                    ) : (
                                        <>
                                            <Send size={18} />
                                            <span>Join This Group</span>
                                        </>
                                    )}
                                </Button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    )
}
