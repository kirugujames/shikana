"use client"
import React, { useState, useEffect } from "react"
import { Send, CheckCircle, AlertCircle, Lock } from "lucide-react"
import { useAuth } from "@/context/auth-context"
import Link from "next/link"
import api from "@/lib/axios"
import toast from "react-hot-toast"
import { Button } from "./ui/button"
import { Spinner } from "./ui/spinner"

export default function PoliticalRegistrationForm() {
  const { user } = useAuth()
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
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
        phone: user.phone || prev.phone,
      }))
    }
  }, [user])

  // Kenyan political positions
  const kenyanPositions = [
    { value: "", label: "Select Position" },
    { value: "president", label: "President" },
    { value: "governor", label: "Governor" },
    { value: "senator", label: "Senator" },
    { value: "mp", label: "Member of Parliament (MP)" },
    { value: "mca", label: "Member of County Assembly (MCA)" },
    { value: "woman_rep", label: "Woman Representative" },

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

    // Validate form
    if (!validateForm()) {
      setStatus("idle") // Reset to idle so user can retry, validateForm handles error toast if we updated it, but current one uses setErrorMessage.
      // Wait, I removed setErrorMessage. usage in validateForm needs update.
      return
    }

    try {
      const response = await api.post("/api/political-positions/apply", {
        first_name: formData.firstName,
        last_name: formData.lastName,
        email: formData.email,
        phone: formData.phone,
        membership_number: formData.membershipNumber, // Ensure this matches API expectation
        position: formData.position,
      })

      if (response.status === 200 || response.status === 201) {
        toast.success("Application submitted successfully!")
        setStatus("success")
        // Reset form logic if needed, but maybe keep status success
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

  // Update validateForm to use toast
  const validateForm = () => {
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(formData.email)) {
      toast.error("Please enter a valid email address")
      return false
    }

    // Phone validation (Kenyan format)
    const phoneRegex = /^(\+254|0)[17]\d{8}$/
    if (!phoneRegex.test(formData.phone.replace(/\s/g, ""))) {
      toast.error("Please enter a valid Kenyan phone number")
      return false
    }

    // Check all fields are filled
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

          {/* Empty space on the left */}
          <div className="hidden lg:block"></div>

          {/* Registration Form */}
          <div className="lg:col-span-2 bg-card border border-border rounded-lg p-8">
            <h3 className="text-2xl font-bold text-foreground mb-6">Political Party Registration</h3>

            {!user ? (
              <div className="flex flex-col items-center justify-center py-12 text-center space-y-4">
                <div className="bg-secondary/10 p-4 rounded-full">
                  <Lock className="w-12 h-12 text-secondary" />
                </div>
                <h4 className="text-xl font-semibold">Login Required</h4>
                <p className="text-muted-foreground max-w-md">
                  You must be logged in to apply for a political position. Please login to continue.
                </p>
                <Link href="/login">
                  <Button className="bg-secondary hover:bg-secondary/90 text-white min-w-[150px]">
                    Login
                  </Button>
                </Link>
              </div>
            ) : (
              <>
                {/* Success Message */}
                {status === "success" && (
                  <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg flex items-start gap-3">
                    <CheckCircle className="text-green-600 flex-shrink-0 mt-0.5" size={20} />
                    <div className="text-green-800">
                      <p className="font-semibold">Application Successful!</p>
                      <p className="text-sm">Your application has been submitted successfully.</p>
                    </div>
                  </div>
                )}

                <div className="space-y-4">
                  {/* First Name and Last Name */}
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

                  {/* Email Address */}
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

                  {/* Phone Number */}
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">Phone Number *</label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      required
                      disabled={status === "loading" || status === "success"}
                      className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:border-secondary disabled:bg-gray-100 disabled:cursor-not-allowed"
                      placeholder="+254712345678 or 0712345678"
                    />
                  </div>

                  {/* Membership Number */}
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

                  {/* Position Dropdown */}
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">Position *</label>
                    <select
                      name="position"
                      value={formData.position}
                      onChange={handleChange}
                      required
                      disabled={status === "loading" || status === "success"}
                      className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:border-secondary disabled:bg-gray-100 disabled:cursor-not-allowed"
                    >
                      {kenyanPositions.map(pos => (
                        <option key={pos.value} value={pos.value}>
                          {pos.label}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Submit Button */}
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