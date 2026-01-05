"use client"
import React, { useState } from "react"
import { Send, CheckCircle, AlertCircle } from "lucide-react"

export default function PoliticalRegistrationForm() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    membershipNumber: "",
    position: ""
  })
  
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle")
  const [errorMessage, setErrorMessage] = useState("")

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

  const validateForm = () => {
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(formData.email)) {
      setErrorMessage("Please enter a valid email address")
      return false
    }

    // Phone validation (Kenyan format)
    const phoneRegex = /^(\+254|0)[17]\d{8}$/
    if (!phoneRegex.test(formData.phone.replace(/\s/g, ""))) {
      setErrorMessage("Please enter a valid Kenyan phone number (e.g., +254712345678 or 0712345678)")
      return false
    }

    // Check all fields are filled
    if (!formData.firstName || !formData.lastName || !formData.membershipNumber || !formData.position) {
      setErrorMessage("Please fill in all required fields")
      return false
    }

    return true
  }

  const handleSubmit = async () => {
    setStatus("loading")
    setErrorMessage("")

    // Validate form
    if (!validateForm()) {
      setStatus("error")
      return
    }

    try {
      // Replace with your actual API endpoint
      const API_ENDPOINT = "https://api.yourparty.co.ke/v1/register"
      
      const response = await fetch(API_ENDPOINT, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          // Add authentication if needed
          // "Authorization": `Bearer ${YOUR_API_KEY}`
        },
        body: JSON.stringify({
          first_name: formData.firstName,
          last_name: formData.lastName,
          email: formData.email,
          phone: formData.phone,
          membership_number: formData.membershipNumber,
          position: formData.position,
          registered_at: new Date().toISOString()
        })
      })

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}))
        throw new Error(errorData.message || `Registration failed: ${response.statusText}`)
      }

      const data = await response.json()
      console.log("Registration successful:", data)
      
      setStatus("success")
      
      // Reset form after 3 seconds
      setTimeout(() => {
        setFormData({
          firstName: "",
          lastName: "",
          email: "",
          phone: "",
          membershipNumber: "",
          position: ""
        })
        setStatus("idle")
      }, 3000)

    } catch (error) {
      console.error("Registration error:", error)
      setStatus("error")
      setErrorMessage(error instanceof Error ? error.message : "Registration failed. Please try again.")
      
      // Reset error after 5 seconds
      setTimeout(() => {
        setStatus("idle")
        setErrorMessage("")
      }, 5000)
    }
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
            
            {/* Success Message */}
            {status === "success" && (
              <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg flex items-start gap-3">
                <CheckCircle className="text-green-600 flex-shrink-0 mt-0.5" size={20} />
                <div className="text-green-800">
                  <p className="font-semibold">Registration Successful!</p>
                  <p className="text-sm">Your details have been submitted successfully.</p>
                </div>
              </div>
            )}

            {/* Error Message */}
            {status === "error" && (
              <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-start gap-3">
                <AlertCircle className="text-red-600 flex-shrink-0 mt-0.5" size={20} />
                <div className="text-red-800">
                  <p className="font-semibold">Registration Failed</p>
                  <p className="text-sm">{errorMessage}</p>
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
                    disabled={status === "loading"}
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
                    disabled={status === "loading"}
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
                  disabled={status === "loading"}
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
                  disabled={status === "loading"}
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
                  disabled={status === "loading"}
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
                  disabled={status === "loading"}
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
                disabled={status === "loading"}
                className="w-full bg-secondary text-white py-3 rounded-lg font-bold hover:bg-secondary/90 transition-colors flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {status === "loading" ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Registering...
                  </>
                ) : (
                  <>
                    <Send size={18} />
                    Register Now
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}