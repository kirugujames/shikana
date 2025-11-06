"use client"

import type React from "react"

import { useState } from "react"
import { Send } from "lucide-react"

interface propsData{
  id:any;
}
export function ApplicationForm({id}: propsData) {
  const [submitted, setSubmitted] = useState(false)
  const [fullName, setFullName] = useState("")


  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitted(true)
    setTimeout(() => setSubmitted(false), 3000)
  }

  return (
    <section className="w-full py-16 md:py-24 bg-background">
      <div className="max-w-4xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4 text-balance">General Application</h2>
          <p className="text-lg text-foreground/70">
            Don't see the perfect position? Send us your CV and let us know how you'd like to contribute.
          </p>
        </div>

        <div className="bg-card border border-border rounded-lg p-8">
          {submitted && (
            <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg text-green-800">
              ✓ Thank you for your application! We'll review it and be in touch soon.
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Name */}
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Full Name *</label>
              <input
                type="text"
                required
                value={id}
                onChange={(e)=>setFullName(e.target.value)}
                className="w-full px-4 py-3 border border-border rounded-lg focus:outline-none focus:border-secondary"
                placeholder="Your full name"
              />
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Email Address *</label>
              <input
                type="email"
                required
                className="w-full px-4 py-3 border border-border rounded-lg focus:outline-none focus:border-secondary"
                placeholder="your@email.com"
              />
            </div>

            {/* Phone */}
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Phone Number *</label>
              <input
                type="tel"
                required
                className="w-full px-4 py-3 border border-border rounded-lg focus:outline-none focus:border-secondary"
                placeholder="+255 712 345 678"
              />
            </div>

            {/* Areas of Interest */}
            { id=="volunteer" ?
            <div>
              <label className="block text-sm font-medium text-foreground mb-3">Areas of Interest</label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {[
                  "Policy & Strategy",
                  "Campaign Operations",
                  "Communications",
                  "Community Engagement",
                  "Finance & Administration",
                  "Youth Programs",
                  "Digital Strategy",
                  "Other",
                ].map((area) => (
                  <label key={area} className="flex items-center gap-2 cursor-pointer">
                    <input type="checkbox" className="w-4 h-4 rounded" />
                    <span className="text-foreground">{area}</span>
                  </label>
                ))}
              </div>
            </div>
            :
            null
            }
            {/* CV Upload */}
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Upload CV/Resume *</label>
              <div className="border-2 border-dashed border-border rounded-lg p-6 text-center hover:border-secondary transition-colors cursor-pointer">
                <input type="file" accept=".pdf,.doc,.docx" required className="hidden" id="cv-upload" />
                <label htmlFor="cv-upload" className="cursor-pointer">
                  <p className="text-foreground font-medium">Click to upload or drag and drop</p>
                  <p className="text-sm text-foreground/60">PDF, DOC, or DOCX (max 5MB)</p>
                </label>
              </div>
            </div>

            {/* Cover Letter */}
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Cover Letter / Message</label>
              <textarea
                rows={6}
                className="w-full px-4 py-3 border border-border rounded-lg focus:outline-none focus:border-secondary"
                placeholder="Tell us why you're interested in joining SFUP..."
              />
            </div>

            {/* Consent */}
            <div className="flex items-start gap-3 p-4 bg-muted rounded-lg">
              <input type="checkbox" id="consent" required className="w-4 h-4 rounded mt-1" />
              <label htmlFor="consent" className="text-sm text-foreground cursor-pointer">
                I consent to having my application information stored and used for recruitment purposes, and I agree to
                SFUP's privacy policy.
              </label>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-secondary text-white py-4 rounded-lg font-bold hover:bg-secondary/90 transition-colors flex items-center justify-center gap-2"
            >
              <Send size={20} />
              Submit Application
            </button>
          </form>
        </div>
      </div>
    </section>
  )
}
