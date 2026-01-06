"use client"

import type React from "react"

import { useState } from "react"
import { Mail, Phone, MapPin, Send } from "lucide-react"

export function ContactForm() {
  const [submitted, setSubmitted] = useState(false)
  const [nationalId, setNationalId] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitted(true)
    setTimeout(() => setSubmitted(false), 3000)
  }

  return (
    <section className="w-full py-16 md:py-24 bg-background">
      <div className="max-w-6xl mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Contact Info */}
          <div className="space-y-8">
            <div>
              <h2 className="text-3xl font-bold text-foreground mb-6">Contact Information</h2>
              <p className="text-foreground/70">Have questions? We're here to help and would love to hear from you.</p>
            </div>

            <div className="space-y-6">
              <div className="flex gap-4">
                <Mail className="text-secondary flex-shrink-0 mt-1" size={24} />
                <div>
                  <h3 className="font-bold text-foreground mb-1">Email</h3>
                  <a href="mailto:info@sfup.org" className="text-foreground/70 hover:text-secondary transition-colors">
                    info@sfup.org
                  </a>
                </div>
              </div>
              <div className="flex gap-4">
                <Phone className="text-secondary flex-shrink-0 mt-1" size={24} />
                <div>
                  <h3 className="font-bold text-foreground mb-1">Phone</h3>
                  <a href="tel:+254700000000" className="text-foreground/70 hover:text-secondary transition-colors">
                    +254700000000
                  </a>
                </div>
              </div>
              <div className="flex gap-4">
                <MapPin className="text-secondary flex-shrink-0 mt-1" size={24} />
                <div>
                  <h3 className="font-bold text-foreground mb-1">Address</h3>
                  <p className="text-foreground/70">
                    National Headquarters
                    <br />
                    Nairobi, Kenya
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-2 bg-card border border-border rounded-lg p-8">
            <h3 className="text-2xl font-bold text-foreground mb-6">Send us a Message</h3>

            {submitted && (
              <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg text-green-800">
                ✓ Thank you for your message! We'll get back to you soon.
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">First Name *</label>
                  <input
                    type="text"
                    required
                    className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:border-secondary"
                    placeholder="First name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Last Name *</label>
                  <input
                    type="text"
                    required
                    className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:border-secondary"
                    placeholder="Last name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Email Address *</label>
                  <input
                    type="email"
                    required
                    className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:border-secondary"
                    placeholder="your@email.com"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Subject *</label>
                <input
                  type="text"
                  required
                  className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:border-secondary"
                  placeholder="How can we help?"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Message *</label>
                <textarea
                  rows={5}
                  required
                  className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:border-secondary"
                  placeholder="Your message..."
                />
              </div>

              {/* <button
                type="submit"
                className="w-full bg-secondary text-white py-3 rounded-lg font-bold hover:bg-secondary/90 transition-colors flex items-center justify-center gap-2"
              >
                <Send size={18} />
                Send Message
              </button> */}
              <button
                type="submit"
                disabled={!nationalId.trim()}
                className="w-full bg-secondary text-white py-3 rounded-lg font-bold
             hover:bg-secondary/90 transition-colors
             flex items-center justify-center gap-2
             disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Verify Status
              </button>


            </form>
          </div>
        </div>
      </div>
    </section>
  )
}
