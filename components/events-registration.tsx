"use client"

import Link from "next/link"
import { Bell, Calendar, AlertCircle } from "lucide-react"

export function EventsRegistration() {
  return (
    <section className="w-full py-16 md:py-24 bg-muted">
      <div className="max-w-6xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Register */}
          <div className="text-center">
            <div className="bg-black/10 p-4 rounded-lg mb-4 w-fit mx-auto">
              <Calendar size={32} className="text-black" />
            </div>
            <h3 className="text-2xl font-bold text-black mb-2">Register for Events</h3>
            <p className="text-black/80 mb-6">Sign up for any of our upcoming events and be part of the movement.</p>
            <Link
              href="/register"
              className="inline-flex items-center gap-2 bg-secondary text-white px-6 py-2 rounded-lg font-bold hover:bg-secondary/90 transition-colors"
            >
              Register Now
            </Link>
          </div>

          {/* Notifications */}
          <div className="text-center">
            <div className="bg-black/10 p-4 rounded-lg mb-4 w-fit mx-auto">
              <Bell size={32} className="text-black" />
            </div>
            <h3 className="text-2xl font-bold text-black mb-2">Get Notifications</h3>
            <p className="text-black/80 mb-6">
              Subscribe to our newsletter to receive updates about new events and activities.
            </p>
            <Link
              href="/#newsletter"
              className="inline-flex items-center gap-2 bg-primary text-white px-6 py-2 rounded-lg font-bold hover:bg-black/90 transition-colors"
            >
              Subscribe
            </Link>
          </div>

          {/* Volunteer */}
          <div className="text-center">
            <div className="bg-black/10 p-4 rounded-lg mb-4 w-fit mx-auto">
              <AlertCircle size={32} className="text-black" />
            </div>
            <h3 className="text-2xl font-bold text-black mb-2">Volunteer</h3>
            <p className="text-black/80 mb-6">Help organize events and engage with the community as a volunteer.</p>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 bg-secondary text-white px-6 py-2 rounded-lg font-bold hover:bg-secondary/90 transition-colors"
            >
              Get Involved
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
