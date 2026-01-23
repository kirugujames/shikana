"use client"
import React, { useState, useEffect } from "react"
import { Send, CheckCircle, Lock } from "lucide-react"
import { useAuth } from "@/context/auth-context"
import Link from "next/link"
import api from "@/lib/axios"
import toast from "react-hot-toast"
import { Button } from "./ui/button"
import { Spinner } from "./ui/spinner"

export default function PartyPositionForm() {
    const { user } = useAuth()
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        // phone: "",
        membershipNumber: "",
        position: ""
    })

    const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle")

    useEffect(() => {
        if (user) {
            setFormData(prev => ({
                ...prev,
                firstName: user.first_name || "",
                lastName: user.last_name || "",
                email: user.email || "",
                // phone: user.phone || prev.phone,
            }))
        }
    }, [user])

    // Party leadership positions
    const partyPositions = [
        { value: "", label: "Select Party Position" },
        { value: "national_chairperson", label: "National Chairperson" },
        { value: "secretary_general", label: "Secretary General" },
        { value: "treasurer", label: "Treasurer" },
        { value: "organizing_secretary", label: "Organizing Secretary" },
        { value: "youth_leader", label: "Youth Leader" },
        { value: "women_leader", label: "Women Leader" },
        { value: "regional_coordinator", label: "Regional Coordinator" },
        { value: "delegate", label: "Delegate" },
    ]

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target
        setFormData(prev => ({
            ...prev,
            [name]: value
        }))
    }

    const handleSubmit = async () => {
        setStatus("loading")

        if (!validateForm()) {
            setStatus("idle")
            return
        }

        try {
            const response = await api.post("/api/party-positions/apply", {
                first_name: formData.firstName,
                last_name: formData.lastName,
                email: formData.email,
                // phone: formData.phone,
                membership_number: formData.membershipNumber,
                position: formData.position,
            })

            if (response.status === 200 || response.status === 201) {
                toast.success("Application submitted successfully!")
                setStatus("success")
            } else {
                throw new Error(response.data?.message || "Submission failed")
            }

        } catch (error: any) {
            console.error("Registration error:", error)
            setStatus("error")
            toast.error(error.response?.data?.message || error.message || "Registration failed")
        } finally {
            if (status !== "success") setStatus("idle")
        }
    }

    const validateForm = () => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        if (!emailRegex.test(formData.email)) {
            toast.error("Please enter a valid email address")
            return false
        }

        // const phoneRegex = /^(\+254|0)[17]\d{8}$/
        // if (!phoneRegex.test(formData.phone.replace(/\s/g, ""))) {
        //     toast.error("Please enter a valid Kenyan phone number")
        //     return false
        // }

        if (!formData.firstName || !formData.lastName || !formData.membershipNumber || !formData.position) {
            toast.error("Please fill in all required fields")
            return false
        }

        return true
    }

    return (
        <section className="w-full py-16 md:py-24 bg-background">
            <div className="max-w-6xl mx-auto px-4">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">

                    <div className="hidden lg:block text-foreground/70">
                        <h2 className="text-3xl font-bold text-foreground mb-6">Drive the Vision</h2>
                        <p className="mb-4">
                            Apply for a leadership position within the Shikana Frontliners for Unity Party. We are looking for dedicated individuals to help shape our future.
                        </p>
                        <ul className="space-y-3 list-disc pl-5">
                            <li>Lead with integrity</li>
                            <li>Shape party strategy</li>
                            <li>Engage with the community</li>
                            <li>Represent the people</li>
                        </ul>
                    </div>

                    <div className="lg:col-span-2 bg-card border border-border rounded-lg p-8">
                        <h3 className="text-2xl font-bold text-foreground mb-6">Party Position Application</h3>

                        {!user ? (
                            <div className="flex flex-col items-center justify-center py-12 text-center space-y-4">
                                <div className="bg-secondary/10 p-4 rounded-full">
                                    <Lock className="w-12 h-12 text-secondary" />
                                </div>
                                <h4 className="text-xl font-semibold">Login Required</h4>
                                <p className="text-muted-foreground max-w-md">
                                    You must be logged in to apply for a party leadership position.
                                </p>
                                <Link href="/login">
                                    <Button className="bg-secondary hover:bg-secondary/90 text-white min-w-[150px]">
                                        Login
                                    </Button>
                                </Link>
                            </div>
                        ) : (
                            <>
                                {status === "success" && (
                                    <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg flex items-start gap-3">
                                        <CheckCircle className="text-green-600 flex-shrink-0 mt-0.5" size={20} />
                                        <div className="text-green-800">
                                            <p className="font-semibold">Application Successful!</p>
                                            <p className="text-sm">Your application for a party position has been submitted successfully.</p>
                                        </div>
                                    </div>
                                )}

                                <div className="space-y-4">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-sm font-medium text-foreground mb-2">First Name *</label>
                                            <input
                                                type="text"
                                                name="firstName"
                                                value={formData.firstName}
                                                onChange={handleChange}
                                                required
                                                disabled={status === "loading" || status === "success"}
                                                className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:border-secondary disabled:bg-gray-100 disabled:cursor-not-allowed"
                                                placeholder="John"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-foreground mb-2">Last Name *</label>
                                            <input
                                                type="text"
                                                name="lastName"
                                                value={formData.lastName}
                                                onChange={handleChange}
                                                required
                                                disabled={status === "loading" || status === "success"}
                                                className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:border-secondary disabled:bg-gray-100 disabled:cursor-not-allowed"
                                                placeholder="Steve"
                                            />
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-foreground mb-2">Email Address *</label>
                                        <input
                                            type="email"
                                            name="email"
                                            value={formData.email}
                                            onChange={handleChange}
                                            required
                                            disabled={status === "loading" || status === "success"}
                                            className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:border-secondary disabled:bg-gray-100 disabled:cursor-not-allowed"
                                            placeholder="your@email.com"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-foreground mb-2">Membership Number *</label>
                                        <input
                                            type="text"
                                            name="membershipNumber"
                                            value={formData.membershipNumber}
                                            onChange={handleChange}
                                            required
                                            disabled={status === "loading" || status === "success"}
                                            className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:border-secondary disabled:bg-gray-100 disabled:cursor-not-allowed"
                                            placeholder="SFU-2024-12345"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-foreground mb-2">Party Position *</label>
                                        <select
                                            name="position"
                                            value={formData.position}
                                            onChange={handleChange}
                                            required
                                            disabled={status === "loading" || status === "success"}
                                            className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:border-secondary disabled:bg-gray-100 disabled:cursor-not-allowed"
                                        >
                                            {partyPositions.map(pos => (
                                                <option key={pos.value} value={pos.value}>
                                                    {pos.label}
                                                </option>
                                            ))}
                                        </select>
                                    </div>

                                    <div className="flex items-start gap-3 p-4 bg-muted rounded-lg">
                                        <input type="checkbox" id="party-consent" required className="w-4 h-4 rounded mt-1 cursor-pointer" />
                                        <label htmlFor="party-consent" className="text-sm text-foreground cursor-pointer">
                                            I agree to the <Link href="/shared-ui/terms" className="text-secondary hover:underline">Terms & Conditions</Link> and <Link href="/shared-ui/privacy" className="text-secondary hover:underline">Privacy Policy</Link>.
                                        </label>
                                    </div>

                                    <button
                                        onClick={handleSubmit}
                                        disabled={status === "loading" || status === "success"}
                                        className="w-full bg-secondary text-white py-3 rounded-lg font-bold hover:bg-secondary/90 transition-colors flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                                    >
                                        {status === "loading" ? (
                                            <>
                                                <Spinner className="mr-2" />
                                                <span>Submitting...</span>
                                            </>
                                        ) : (
                                            <>
                                                <Send size={18} />
                                                Submit Application
                                            </>
                                        )}
                                    </button>
                                </div>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </section>
    )
}
