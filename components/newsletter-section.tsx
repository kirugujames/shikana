"use client"

import type React from "react"
import { useState } from "react"
import { Mail, CheckCircle } from "lucide-react"
import { TextShimmer } from "./motion-primitives/text-shimmer"

export function NewsletterSection() {
  const [email, setEmail] = useState("")
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    // simulate API call
    setTimeout(() => {
      setSubmitted(true)
      setLoading(false)
      setEmail("")

      setTimeout(() => setSubmitted(false), 4000)
    }, 1200)
  }

  return (
    <section className="py-10 md:py-14 px-4 bg-gray-50">
      <div className="max-w-2xl mx-auto text-center">

        {/* ICON */}
        <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-secondary/10 mb-4">
          <Mail className="text-secondary" size={28} />
        </div>

        <h2 className="text-primary text-4xl md:text-5xl font-bold mb-3 text-foreground">
          Stay Connected
        </h2>

        <p className="text-lg text-muted-foreground mb-2">
          Get updates, announcements, and exclusive content from Shikana Frontliners.
        </p>

        <p className="text-sm text-muted-foreground mb-6">
          We respect your privacy. No spam — unsubscribe anytime.
        </p>

        {/* FORM / SUCCESS */}
        {!submitted ? (
          <form
            onSubmit={handleSubmit}
            className="flex flex-col sm:flex-row gap-3 mb-4"
          >
            <div className="relative flex-1">
              <Mail
                size={18}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
              />
              <input
                type="email"
                placeholder="Enter your email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                disabled={loading}
                className="w-full pl-10 pr-4 py-3 rounded-lg border border-border bg-white text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-secondary disabled:opacity-60"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="px-8 py-3 bg-secondary hover:bg-secondary/90 text-white font-bold rounded-lg transition-all disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {loading ? "Subscribing..." : "Subscribe"}
            </button>
          </form>
        ) : (
          <div className="flex items-center justify-center gap-2 text-green-600 font-medium animate-slide-up">
            <CheckCircle size={20} />
            <span>Thank you for subscribing!</span>
          </div>
        )}
      </div>
    </section>
  )
}
