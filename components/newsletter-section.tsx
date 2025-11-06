"use client"

import type React from "react"

import { useState } from "react"
import { Mail } from "lucide-react"
import { TextShimmer } from "./motion-primitives/text-shimmer"

export function NewsletterSection() {
  const [email, setEmail] = useState("")
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitted(true)
    setEmail("")
    setTimeout(() => setSubmitted(false), 3000)
  }

  return (
    <section className="py-16 md:py-24 px-4 bg-gray-50">
      <div className="max-w-2xl mx-auto text-center">
        <div className="inline-block p-4 bg-secondary/10 rounded-full mb-6">
          <Mail className="text-secondary" size={32} />
        </div>
        <h2 className=""></h2>

        <TextShimmer className='text-4xl md:text-5xl font-bold mb-4' duration={1}>
          Stay Connected
        </TextShimmer>
        <p className="text-lg text-muted-foreground mb-8">
          Subscribe to our newsletter for updates, announcements, and exclusive content from the Shikana Frontliners.
        </p>

        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 mb-4">
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="flex-1 px-4 py-3 rounded-lg border border-border bg-white text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-secondary"
          />
          <button
            type="submit"
            className="px-8 py-3 bg-secondary hover:bg-secondary/90 text-white font-bold rounded-lg transition-colors"
          >
            Subscribe
          </button>
        </form>

        {submitted && <p className="text-green-600 font-medium">Thank you for subscribing!</p>}
      </div>
    </section>
  )
}
