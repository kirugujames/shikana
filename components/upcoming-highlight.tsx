"use client"

import Link from "next/link"
import { Calendar, MapPin, Clock, ArrowRight } from "lucide-react"

export function UpcomingHighlight() {

  const fullText = `
    The biggest gathering of SFUP supporters and sympathizers for a day of inspiration, unity, and
    collective action. Join thousands of citizens in celebrating unity and progress. Featuring
    inspiring speeches from party leadership, live cultural performances, food stalls, and networking
    opportunities. Free admission for all supporters.
  `

  const preview = fullText.trim().split(/\s+/).slice(0, 20).join(" ")

  return (
    <section className="w-full py-16 md:py-24 bg-muted">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-8">Featured Event</h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          {/* Image */}
          <div className="rounded-lg overflow-hidden">
            <img src="/unity-rally-2025-political-event-thousands-support.jpg" alt="Unity Rally 2025" className="w-full h-96 object-cover" />
          </div>

          {/* Content */}
          <div className="space-y-6">
            <div>
              <span className="inline-block bg-secondary text-white px-4 py-2 rounded-full font-bold text-sm mb-4">
                MAIN EVENT
              </span>
              <h3 className="text-4xl font-bold text-foreground mb-2">Unity Rally 2025</h3>
            </div>

            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <Calendar className="text-secondary flex-shrink-0" size={20} />
                <span className="text-foreground font-medium">March 15, 2025</span>
              </div>
              <div className="flex items-center gap-3">
                <Clock className="text-secondary flex-shrink-0" size={20} />
                <span className="text-foreground font-medium">2:00 PM - 6:00 PM</span>
              </div>
              <div className="flex items-center gap-3">
                <MapPin className="text-secondary flex-shrink-0" size={20} />
                <span className="text-foreground font-medium">Central Stadium</span>
              </div>
            </div>

            <p className="text-foreground/80 leading-relaxed">
              {preview}...
            </p>

            <div className="flex gap-4 pt-4">
              <Link
                href="/register"
                className="inline-flex items-center gap-2 bg-secondary text-white px-6 py-3 rounded-lg font-bold hover:bg-secondary/90 transition-colors"
              >
                Register Now
                <ArrowRight size={18} />
              </Link>
              <Link
                href="/shared-ui/events/1"
                className="inline-flex items-center gap-2 border-2 border-secondary text-secondary px-6 py-3 rounded-lg font-bold hover:bg-secondary/10 transition-colors"
              >
                View Details
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
