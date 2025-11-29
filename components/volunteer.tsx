"use client"

import type React from "react"
import { useState } from "react"
import { Send, ChevronDown } from 'lucide-react'

const AREAS_OF_INTEREST = [
  "Policy & Strategy",
  "Campaign Operations",
  "Communications",
  "Community Engagement",
  "Finance & Administration",
  "Youth Programs",
  "Digital Strategy",
  "Other",
]

const EVENTS = [
  { id: 1, name: "Community Cleanup Drive - November 2025" },
  { id: 2, name: "Youth Mentorship Program - Ongoing" },
  { id: 3, name: "Food Bank Distribution - Monthly" },
  { id: 4, name: "Environmental Conservation Project - December 2025" },
  { id: 5, name: "Senior Care Visit Program - Weekly" },
]

export function Volunteer() {
  const [volunteerType, setVolunteerType] = useState<"event" | "general">("general")
  const [selectedEvent, setSelectedEvent] = useState<string>("")
  const [fullName, setFullName] = useState("")
  const [email, setEmail] = useState("")
  const [areasOfInterest, setAreasOfInterest] = useState<string[]>([])
  const [consent, setConsent] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  const handleAreaToggle = (area: string) => {
    setAreasOfInterest((prev) =>
      prev.includes(area) ? prev.filter((a) => a !== area) : [...prev, area]
    )
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const formData = {
      fullName,
      email,
      areasOfInterest,
      volunteerType,
      event: volunteerType === "event" ? selectedEvent : "General Volunteering",
      consent,
    }
    console.log("Application submitted:", formData)
    setSubmitted(true)
    setTimeout(() => setSubmitted(false), 3000)
    // Reset form
    setFullName("")
    setEmail("")
    setAreasOfInterest([])
    setSelectedEvent("")
    setConsent(false)
  }

  return (
    <section className="w-full py-16 md:py-24 bg-background">
      <div className="max-w-6xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4 text-balance">
            Volunteer Application
          </h2>
          <p className="text-lg text-foreground/70">
            Join our team and make a difference! Tell us about yourself and your interests.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-1 gap-8">
          {/* Left Column - Volunteer Type Selection */}
          <div className="bg-card border border-border rounded-lg p-8">
            <div className="mb-8">
              <h3 className="text-2xl font-bold text-foreground mb-2">
                Select Volunteer Type
              </h3>
              <p className="text-sm text-foreground/70">
                Choose how you'd like to volunteer
              </p>
            </div>

            <div className="space-y-3">
              {/* General Volunteering Option */}
              <label className="flex items-start gap-3 p-4 border border-border rounded-lg cursor-pointer hover:bg-muted transition-colors"
                style={{ 
                  borderColor: volunteerType === "general" ? "hsl(var(--secondary))" : undefined,
                  backgroundColor: volunteerType === "general" ? "hsl(var(--secondary)/.1)" : undefined 
                }}>
                <input
                  type="radio"
                  name="volunteerType"
                  value="general"
                  checked={volunteerType === "general"}
                  onChange={(e) => {
                    setVolunteerType("general")
                    setSelectedEvent("")
                  }}
                  className="w-4 h-4 rounded-full mt-1"
                />
                <div>
                  <p className="font-medium text-foreground">General Volunteer</p>
                  <p className="text-sm text-foreground/60">
                    Apply to become a general volunteer and we'll match you with opportunities
                  </p>
                </div>
              </label>

              {/* Event-Specific Option */}
              <label className="flex items-start gap-3 p-4 border border-border rounded-lg cursor-pointer hover:bg-muted transition-colors"
                style={{ 
                  borderColor: volunteerType === "event" ? "hsl(var(--secondary))" : undefined,
                  backgroundColor: volunteerType === "event" ? "hsl(var(--secondary)/.1)" : undefined 
                }}>
                <input
                  type="radio"
                  name="volunteerType"
                  value="event"
                  checked={volunteerType === "event"}
                  onChange={() => setVolunteerType("event")}
                  className="w-4 h-4 rounded-full mt-1"
                />
                <div>
                  <p className="font-medium text-foreground">Volunteer for a Specific Event</p>
                  <p className="text-sm text-foreground/60">
                    Select an upcoming event you'd like to volunteer for
                  </p>
                </div>
              </label>
            </div>

            {/* Event Dropdown (conditional) */}
            {volunteerType === "event" && (
              <div className="mt-6">
                <label className="block text-sm font-medium text-foreground mb-2">
                  Select Event *
                </label>
                <div className="relative">
                  <select
                    value={selectedEvent}
                    onChange={(e) => setSelectedEvent(e.target.value)}
                    required={volunteerType === "event"}
                    className="w-full px-4 py-3 border border-border rounded-lg focus:outline-none focus:border-secondary appearance-none bg-background text-foreground"
                  >
                    <option value="">-- Choose an event --</option>
                    {EVENTS.map((event) => (
                      <option key={event.id} value={event.name}>
                        {event.name}
                      </option>
                    ))}
                  </select>
                  <ChevronDown className="absolute right-3 top-3.5 w-5 h-5 text-foreground/60 pointer-events-none" />
                </div>
              </div>
            )}

            {/* Summary */}
            <div className="mt-6 p-4 bg-muted rounded-lg border border-border">
              <p className="text-sm text-foreground">
                <strong>Type:</strong>{" "}
                {volunteerType === "general"
                  ? "General Volunteer"
                  : selectedEvent
                    ? selectedEvent
                    : "Please select an event"}
              </p>
            </div>
          </div>

          {/* Right Column - Volunteer Application Form */}
          <div className="bg-card border border-border rounded-lg p-8">
            {submitted && (
              <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg text-green-800">
                ✓ Thank you for your application! We'll review it and be in touch soon.
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Full Name */}
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Full Name *
                </label>
                <input
                  type="text"
                  required
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="w-full px-4 py-3 border border-border rounded-lg focus:outline-none focus:border-secondary"
                  placeholder="Your full name"
                />
              </div>

              {/* Email */}
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Email Address *
                </label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-3 border border-border rounded-lg focus:outline-none focus:border-secondary"
                  placeholder="your@email.com"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-3">
                  Areas of Interest *
                </label>
                <div className="grid grid-cols-1 gap-3">
                  {AREAS_OF_INTEREST.map((area) => (
                    <label key={area} className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={areasOfInterest.includes(area)}
                        onChange={() => handleAreaToggle(area)}
                        className="w-4 h-4 rounded"
                      />
                      <span className="text-foreground">{area}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Consent */}
              <div className="flex items-start gap-3 p-4 bg-muted rounded-lg">
                <input
                  type="checkbox"
                  id="consent"
                  required
                  checked={consent}
                  onChange={(e) => setConsent(e.target.checked)}
                  className="w-4 h-4 rounded mt-1"
                />
                <label htmlFor="consent" className="text-sm text-foreground cursor-pointer">
                  I consent to having my application information stored and used for volunteer
                  recruitment purposes, and I agree to the privacy policy.
                </label>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full bg-secondary text-white py-4 rounded-lg font-bold hover:bg-secondary/90 transition-colors flex items-center justify-center gap-2"
              >
                <Send size={20} />
                Submit Registration
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}
