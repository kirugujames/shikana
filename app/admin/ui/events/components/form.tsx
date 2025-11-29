"use client"

import React, { useState } from "react"
import { CheckCircle } from "lucide-react"

// ==========================
// Snackbar Component
// ==========================
function Snackbar({
  message,
  type,
}: {
  message: string
  type: "success" | "error"
}) {
  return (
    <div
      className={`
        fixed top-1/2 left-1/2 
        -translate-x-1/2 -translate-y-1/2
        px-6 py-3 rounded-lg shadow-lg z-50 
        text-white text-center
        animate-fadeInOut
        ${type === "success" ? "bg-green-600" : "bg-red-600"}
      `}
    >
      {message}
    </div>
  )
}

export function RegisterForm() {
  // Snackbar state
  const [snackbar, setSnackbar] = useState<{
    message: string
    type: "success" | "error"
  } | null>(null)

  // Form data state
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    birthDate: "",
    sex: "",
    docType: "",
    docNumber: "",
    county: "",
    constituency: "",
    ward: "",
    interest: "",
  })

  // Handle input changes
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    try {
      const res = await fetch(
        "http://localhost:3001/api/members/register/member",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        }
      )

      if (!res.ok) {
        throw new Error("Registration failed. Please try again.")
      }

      // Show success snackbar
      setSnackbar({
        message: "Registration successful!",
        type: "success",
      })

      // Clear form
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        birthDate: "",
        sex: "",
        docType: "",
        docNumber: "",
        county: "",
        constituency: "",
        ward: "",
        interest: "",
      })

      setTimeout(() => setSnackbar(null), 3000)
    } catch (error: any) {
      // Show error snackbar
      setSnackbar({
        message: error.message,
        type: "error",
      })
      setTimeout(() => setSnackbar(null), 3000)
    }
  }

  return (
    <section className="w-full py-16 md:py-24 bg-background">
      <div className="max-w-7xl mx-auto px-4">

        {/* Snackbar handler */}
        {snackbar && (
          <Snackbar message={snackbar.message} type={snackbar.type} />
        )}

        <div className="flex md:flex-row flex-col gap-12 items-start">
          {/* LEFT COLUMN */}
          <div className="space-y-8 lg:ms-20 md:w-1/3 sm:w-full">
            <div>
              <h2 className="text-4xl font-bold text-foreground mb-4">
                Why Join SFUP?
              </h2>
              <p className="text-lg text-foreground/70">
                As a member, you'll be part of a growing movement dedicated to
                unity, progress, and inclusive governance.
              </p>
            </div>

            <div className="space-y-4">
              {[
                "Influence Party Decisions",
                "Access Exclusive Events",
                "Volunteer Opportunities",
                "Direct Communication",
              ].map((title, index) => (
                <div className="flex gap-4" key={index}>
                  <CheckCircle className="text-secondary mt-1" size={24} />
                  <div>
                    <h3 className="font-bold text-foreground mb-1">{title}</h3>
                    <p className="text-foreground/70">
                      {index === 0 &&
                        "Vote on policy priorities and party leadership"}
                      {index === 1 &&
                        "Attend member-only forums, seminars, and networking events"}
                      {index === 2 &&
                        "Participate in campaigns and community initiatives"}
                      {index === 3 &&
                        "Receive updates directly from party leadership"}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT COLUMN — FORM */}
          <div className="bg-muted border border-border rounded-lg p-8 md:w-2/3">
            <h3 className="text-2xl font-bold text-foreground mb-6">
              Registration Form
            </h3>

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Row 1 — First + Last Name */}
              <div className="md:flex gap-8">
                <div className="md:w-1/2">
                  <label className="form-label">First Name *</label>
                  <input
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    required
                    className="form-input"
                    placeholder="John"
                  />
                </div>

                <div className="md:w-1/2">
                  <label className="form-label">Last Name *</label>
                  <input
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    required
                    className="form-input"
                    placeholder="Doe"
                  />
                </div>
              </div>

              {/* Row 2 — Email + Phone */}
              <div className="md:flex gap-8">
                <div className="md:w-1/2">
                  <label className="form-label">Email *</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="form-input"
                    placeholder="john@example.com"
                  />
                </div>

                <div className="md:w-1/2">
                  <label className="form-label">Phone *</label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                    className="form-input"
                    placeholder="+254 712 345 678"
                  />
                </div>
              </div>

              {/* Row 3 — DOB + Gender */}
              <div className="md:flex gap-8">
                <div className="md:w-1/2">
                  <label className="form-label">Date of Birth *</label>
                  <input
                    type="date"
                    name="birthDate"
                    value={formData.birthDate}
                    onChange={handleChange}
                    required
                    className="form-input"
                  />
                </div>

                <div className="md:w-1/2">
                  <label className="form-label">Sex *</label>
                  <select
                    name="sex"
                    value={formData.sex}
                    onChange={handleChange}
                    required
                    className="form-input"
                  >
                    <option value="">Select Gender</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="No Preference">I prefer not to say</option>
                  </select>
                </div>
              </div>

              {/* Row 4 — Doc Type + Doc Number */}
              <div className="md:flex gap-8">
                <div className="md:w-1/2">
                  <label className="form-label">Document Type *</label>
                  <select
                    name="docType"
                    value={formData.docType}
                    onChange={handleChange}
                    required
                    className="form-input"
                  >
                    <option value="">Select Document Type</option>
                    <option value="Passport">Passport</option>
                    <option value="National ID">National ID</option>
                  </select>
                </div>

                <div className="md:w-1/2">
                  <label className="form-label">Identification Number *</label>
                  <input
                    name="docNumber"
                    value={formData.docNumber}
                    onChange={handleChange}
                    required
                    className="form-input"
                    placeholder="01234567"
                  />
                </div>
              </div>

              {/* Row 5 — County + Constituency */}
              <div className="md:flex gap-8">
                <div className="md:w-1/2">
                  <label className="form-label">County *</label>
                  <select
                    name="county"
                    value={formData.county}
                    onChange={handleChange}
                    required
                    className="form-input"
                  >
                    <option value="">Select County</option>
                    <option value="Nairobi">Nairobi</option>
                    <option value="Kitui">Kitui</option>
                    <option value="Mombasa">Mombasa</option>
                  </select>
                </div>

                <div className="md:w-1/2">
                  <label className="form-label">Constituency *</label>
                  <select
                    name="constituency"
                    value={formData.constituency}
                    onChange={handleChange}
                    required
                    className="form-input"
                  >
                    <option value="">Select Constituency</option>
                    <option value="Embakasi East">Embakasi East</option>
                    <option value="Kitui West">Kitui West</option>
                    <option value="Mathira">Mathira</option>
                  </select>
                </div>
              </div>

              {/* Row 6 — Ward + Interest */}
              <div className="md:flex gap-8">
                <div className="md:w-1/2">
                  <label className="form-label">Ward *</label>
                  <select
                    name="ward"
                    value={formData.ward}
                    onChange={handleChange}
                    required
                    className="form-input"
                  >
                    <option value="">Select Ward</option>
                    <option value="Township">Township</option>
                    <option value="Hospital">Hospital</option>
                    <option value="Market">Market</option>
                  </select>
                </div>

                <div className="md:w-1/2">
                  <label className="form-label">Area of Interest *</label>
                  <select
                    name="interest"
                    value={formData.interest}
                    onChange={handleChange}
                    required
                    className="form-input"
                  >
                    <option value="">Select Area</option>
                    <option value="Politics">Politics</option>
                    <option value="Community Work">Community Work</option>
                    <option value="Youth Engagement">Youth Engagement</option>
                    <option value="Policy Development">
                      Policy Development
                    </option>
                  </select>
                </div>
              </div>

              {/* SUBMIT BUTTON */}
              <button
                type="submit"
                className="w-full bg-secondary text-white py-3 rounded-lg font-bold hover:bg-secondary/90 transition-colors mt-6"
              >
                Complete Registration
              </button>

              <p className="text-xs text-foreground/60 text-center mt-4">
                By registering, you agree to receive updates and communications
                from SFUP.
              </p>
            </form>
          </div>
        </div>
      </div>

      {/* Animation for Snackbar */}
      <style>{`
        @keyframes fadeInOut {
          0% { opacity: 0; transform: translate(-50%, -55%); }
          10% { opacity: 1; transform: translate(-50%, -50%); }
          90% { opacity: 1; }
          100% { opacity: 0; transform: translate(-50%, -45%); }
        }
        .animate-fadeInOut {
          animation: fadeInOut 3s ease-in-out;
        }
      `}</style>
    </section>
  )
}
