"use client"

import type React from "react"

import { useState } from "react"
import { CheckCircle } from "lucide-react"

export function RegisterForm() {
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitted(true)
    setTimeout(() => setSubmitted(false), 3000)
  }

  return (
    <section className="w-full py-16 md:py-24 bg-background">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex md:flex-row flex-col  gap-12 items-start">
          {/* Left Column - Info */}
          <div className="space-y-8 lg:ms-20 md:w-1/3 sm:w-full">
            <div>
              <h2 className="text-4xl font-bold text-foreground mb-4 text-balance">Why Join SFUP?</h2>
              <p className="text-lg text-foreground/70">
                As a member, you'll be part of a growing movement dedicated to unity, progress, and inclusive
                governance.
              </p>
            </div>

            <div className="space-y-4">
              <div className="flex gap-4">
                <CheckCircle className="text-secondary flex-shrink-0 mt-1" size={24} />
                <div>
                  <h3 className="font-bold text-foreground mb-1">Influence Party Decisions</h3>
                  <p className="text-foreground/70">Vote on policy priorities and party leadership</p>
                </div>
              </div>
              <div className="flex gap-4">
                <CheckCircle className="text-secondary flex-shrink-0 mt-1" size={24} />
                <div>
                  <h3 className="font-bold text-foreground mb-1">Access Exclusive Events</h3>
                  <p className="text-foreground/70">Attend member-only forums, seminars, and networking events</p>
                </div>
              </div>
              <div className="flex gap-4">
                <CheckCircle className="text-secondary flex-shrink-0 mt-1" size={24} />
                <div>
                  <h3 className="font-bold text-foreground mb-1">Volunteer Opportunities</h3>
                  <p className="text-foreground/70">Participate in campaigns and community initiatives</p>
                </div>
              </div>
              <div className="flex gap-4">
                <CheckCircle className="text-secondary flex-shrink-0 mt-1" size={24} />
                <div>
                  <h3 className="font-bold text-foreground mb-1">Direct Communication</h3>
                  <p className="text-foreground/70">Receive updates directly from party leadership</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Form */}
          <div className="bg-muted border border-border rounded-lg p-8 md:w-2/3">
            <h3 className="text-2xl font-bold text-foreground mb-6">Registration Form</h3>

            {submitted && (
              <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg text-green-800">
                ✓ Thank you for registering! We'll be in touch soon.
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4 flex flex-col">
              <div className="md:flex">
                {/* Full Name */}
                <div className="md:w-1/2">
                  <label className="block text-sm font-medium text-foreground mb-2">First Name *</label>
                  <input
                    type="text"
                    required
                    className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:border-secondary"
                    placeholder="John"
                  />
                </div>
                <div className="md:w-1/2 md:ms-8">
                  <label className="block text-sm font-medium text-foreground mb-2">Last Name *</label>
                  <input
                    type="text"
                    required
                    className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:border-secondary"
                    placeholder="Doe"
                  />
                </div>
              </div>

              <div className="md:flex">
                
                {/* Email */}
                <div className="md:w-1/2">
                  <label className="block text-sm font-medium text-foreground mb-2">Email Address *</label>
                  <input
                    type="email"
                    required
                    className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:border-secondary"
                    placeholder="john@example.com"
                  />
                </div>
                {/* Phone */}
                <div className="md:w-1/2 md:ms-8">
                  <label className="block text-sm font-medium text-foreground mb-2">Phone Number *</label>
                  <input
                    type="tel"
                    required
                    className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:border-secondary"
                    placeholder="+254 712 345 678"
                  />
                </div>
              </div>
              <div className="md:flex">
                {/* Date of birth */}
                <div className="md:w-1/2">
                  <label className="block text-sm font-medium text-foreground mb-2">Date of Birth *</label>
                  <input
                    type="date"
                    required
                    className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:border-secondary"
                    placeholder="+254 712 345 678"
                  />
                </div>
                {/* National ID */}
                <div className="md:w-1/2 md:ms-8">
                  <label className="block text-sm font-medium text-foreground mb-2">Sex *</label>
                  <select
                    required
                    className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:border-secondary"
                  >
                    <option value="">Select Gender</option>
                    <option value="dar-es-salaam">Male</option>
                    <option value="arusha">Female</option>
                    <option value="arusha">I don't prefer </option>
                  </select>
                </div>
              </div>
              <div className="md:flex">
                {/* Identification Document Type */}
                <div className="md:w-1/2">
                  <label className="block text-sm font-medium text-foreground mb-2">Document Type *</label>
                  <select
                    required
                    className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:border-secondary"
                  >
                    <option value="">Select Document Type</option>
                    <option value="passport">Passport</option>
                    <option value="National ID">National ID</option>
                  </select>
                </div>
                {/* National ID */}
                <div className="md:w-1/2 md:ms-8">
                  <label className="block text-sm font-medium text-foreground mb-2">Identification Number *</label>
                  <input
                    type="number"
                    required
                    className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:border-secondary"
                    placeholder="01234567"
                  />
                </div>
              </div>

              <div className="md:flex">
                {/* County */}
                <div className="md:w-1/2">
                  <label className="block text-sm font-medium text-foreground mb-2">County *</label>
                  <select
                    required
                    className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:border-secondary"
                  >
                    <option value="">Select County</option>
                    <option value="dar-es-salaam">Dar es Salaam</option>
                    <option value="arusha">Arusha</option>
                    <option value="mbeya">Mbeya</option>
                    <option value="dodoma">Dodoma</option>
                    <option value="mwanza">Mwanza</option>
                    <option value="other">Other</option>
                  </select>
                </div>
                <div className="md:w-1/2 md:ms-8">
                  <label className="block text-sm font-medium text-foreground mb-2">Consituency *</label>
                  <select
                    required
                    className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:border-secondary"
                  >
                    <option value="">Select Consituency</option>
                    <option value="dar-es-salaam">Dar es Salaam</option>
                    <option value="arusha">Arusha</option>
                    <option value="mbeya">Mbeya</option>
                    <option value="dodoma">Dodoma</option>
                    <option value="mwanza">Mwanza</option>
                    <option value="other">Other</option>
                  </select>
                </div>
              </div>
              <div className="md:flex">
                {/* County */}
                <div className="md:w-1/2">
                  <label className="block text-sm font-medium text-foreground mb-2">Ward *</label>
                  <select
                    required
                    className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:border-secondary"
                  >
                    <option value="">Select Ward</option>
                    <option value="dar-es-salaam">Dar es Salaam</option>
                    <option value="arusha">Arusha</option>
                    <option value="mbeya">Mbeya</option>
                    <option value="dodoma">Dodoma</option>
                    <option value="mwanza">Mwanza</option>
                    <option value="other">Other</option>
                  </select>
                </div>
                <div className="md:w-1/2 md:ms-8">
                  <label className="block text-sm font-medium text-foreground mb-2">Area of Interest *</label>
                  <select
                    required
                    className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:border-secondary"
                  >
                    <option value="">Select Consituency</option>
                    <option value="politics">Politics</option>
                    <option value="community work">Community Work</option>
                    <option value="youth engagement">Youth Engagement</option>
                    <option value="policy development">Policy Development</option>
                  </select>
                </div>
              </div>

            



              {/* Submit Button */}
              <button
                type="submit"
                className="w-full bg-secondary text-white py-3 rounded-lg font-bold hover:bg-secondary/90 transition-colors mt-6"
              >
                Complete Registration
              </button>

              <p className="text-xs text-foreground/60 text-center mt-4">
                By registering, you agree to receive updates and communications from SFUP.
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}
