'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Calendar, Clock, MapPin, Users, Share2, Heart, ArrowRight } from 'lucide-react'
import { events } from '@/lib/events-data'

interface Event {
  id: number
  title: string
  date: string
  time: string
  location: string
  capacity: string
  image: string
  description: string
  category: string
  content: string
  speakers: string[]
  activities: string[]
  venueFacilities: string[]
}

export function EventDetail({ event }: { event: Event }) {
  const [isLiked, setIsLiked] = useState(false)

  // Get related events (same category, different event)
  const relatedEvents = events
    .filter((e) => e.category === event.category && e.id !== event.id)
    .slice(0, 3)

  return (
    <section className="w-full py-12 md:py-20 bg-background">
      <div className="max-w-4xl mx-auto px-4">
        {/* Header with Image */}
        <div className="mb-12">
          <div className="relative rounded-lg overflow-hidden mb-8">
            <img
              src={event.image || '/placeholder.svg'}
              alt={event.title}
              className="w-full h-96 object-cover"
            />
            <div className="absolute top-4 left-4">
              <span className="inline-block bg-secondary text-white px-4 py-2 rounded-full font-bold text-sm">
                {event.category}
              </span>
            </div>
          </div>

          <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6 mb-8">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4 text-balance">{event.title}</h1>
              <p className="text-lg text-foreground/70">{event.description}</p>
            </div>
            <div className="flex gap-3">
              <button
                onClick={() => setIsLiked(!isLiked)}
                className={`p-3 rounded-lg transition-colors ${
                  isLiked
                    ? 'bg-secondary text-white'
                    : 'bg-muted text-foreground hover:bg-secondary/20'
                }`}
              >
                <Heart size={20} fill={isLiked ? 'currentColor' : 'none'} />
              </button>
              <button className="p-3 rounded-lg bg-muted text-foreground hover:bg-secondary/20 transition-colors">
                <Share2 size={20} />
              </button>
            </div>
          </div>

          {/* Event Details Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-card border border-border rounded-lg p-4">
              <div className="flex items-center gap-3 mb-2">
                <Calendar className="text-secondary" size={20} />
                <span className="text-sm text-foreground/60 font-medium">Date</span>
              </div>
              <p className="text-lg font-bold text-foreground">{event.date}</p>
            </div>
            <div className="bg-card border border-border rounded-lg p-4">
              <div className="flex items-center gap-3 mb-2">
                <Clock className="text-secondary" size={20} />
                <span className="text-sm text-foreground/60 font-medium">Time</span>
              </div>
              <p className="text-lg font-bold text-foreground">{event.time}</p>
            </div>
            <div className="bg-card border border-border rounded-lg p-4">
              <div className="flex items-center gap-3 mb-2">
                <MapPin className="text-secondary" size={20} />
                <span className="text-sm text-foreground/60 font-medium">Location</span>
              </div>
              <p className="text-lg font-bold text-foreground">{event.location}</p>
            </div>
            <div className="bg-card border border-border rounded-lg p-4">
              <div className="flex items-center gap-3 mb-2">
                <Users className="text-secondary" size={20} />
                <span className="text-sm text-foreground/60 font-medium">Capacity</span>
              </div>
              <p className="text-lg font-bold text-foreground">{event.capacity}</p>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 mb-16">
          <div className="lg:col-span-2">
            {/* Main Content */}
            <div className="prose prose-lg max-w-none mb-12">
              <div className="text-foreground/80 leading-relaxed space-y-6">
                {event.content.split('\n\n').map((paragraph, index) => (
                  <p key={index}>{paragraph}</p>
                ))}
              </div>
            </div>

            {/* Speakers Section */}
            {event.speakers && event.speakers.length > 0 && (
              <div className="mb-12">
                <h2 className="text-2xl font-bold text-foreground mb-6">Speakers & Participants</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {event.speakers.map((speaker, index) => (
                    <div
                      key={index}
                      className="bg-card border border-border rounded-lg p-4 flex items-center gap-4"
                    >
                      <div className="w-12 h-12 rounded-full bg-secondary/20 flex items-center justify-center flex-shrink-0">
                        <span className="text-secondary font-bold">{speaker.charAt(0)}</span>
                      </div>
                      <span className="font-medium text-foreground">{speaker}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Activities Section */}
            {event.activities && event.activities.length > 0 && (
              <div className="mb-12">
                <h2 className="text-2xl font-bold text-foreground mb-6">Event Activities</h2>
                <div className="bg-muted rounded-lg p-8">
                  <ul className="space-y-3">
                    {event.activities.map((activity, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <span className="text-secondary font-bold text-lg mt-1">✓</span>
                        <span className="text-foreground font-medium">{activity}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div>
            {/* Venue Facilities */}
            {event.venueFacilities && event.venueFacilities.length > 0 && (
              <div className="bg-card border border-border rounded-lg p-6 mb-6">
                <h3 className="text-lg font-bold text-foreground mb-4">Venue Facilities</h3>
                <ul className="space-y-3">
                  {event.venueFacilities.map((facility, index) => (
                    <li key={index} className="flex items-center gap-3 text-foreground/80">
                      <span className="w-2 h-2 bg-secondary rounded-full"></span>
                      {facility}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* CTA Buttons */}
            <div className="space-y-3 mb-8">
              <Link
                href="/register"
                className="block w-full bg-secondary text-white px-6 py-3 rounded-lg font-bold hover:bg-secondary/90 transition-colors text-center"
              >
                Register Now
              </Link>
              <button className="w-full border-2 border-secondary text-secondary px-6 py-3 rounded-lg font-bold hover:bg-secondary/10 transition-colors">
                Add to Calendar
              </button>
            </div>

            {/* Share Section */}
            <div className="bg-muted rounded-lg p-6">
              <h3 className="font-bold text-foreground mb-3">Share Event</h3>
              <div className="flex gap-2">
                <button className="flex-1 bg-background text-foreground hover:bg-secondary hover:text-white px-3 py-2 rounded transition-colors text-sm font-medium">
                  Facebook
                </button>
                <button className="flex-1 bg-background text-foreground hover:bg-secondary hover:text-white px-3 py-2 rounded transition-colors text-sm font-medium">
                  Twitter
                </button>
                <button className="flex-1 bg-background text-foreground hover:bg-secondary hover:text-white px-3 py-2 rounded transition-colors text-sm font-medium">
                  Email
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Related Events */}
        {relatedEvents.length > 0 && (
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-foreground mb-8">Related Events</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {relatedEvents.map((relatedEvent) => (
                <Link
                  key={relatedEvent.id}
                  href={`/events/${relatedEvent.id}`}
                  className="group bg-card border border-border rounded-lg overflow-hidden hover:shadow-lg transition-shadow"
                >
                  <div className="relative overflow-hidden h-40">
                    <img
                      src={relatedEvent.image || '/placeholder.svg'}
                      alt={relatedEvent.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                    />
                  </div>
                  <div className="p-4">
                    <span className="text-xs font-bold bg-secondary text-white px-2 py-1 rounded mb-2 inline-block">
                      {relatedEvent.category}
                    </span>
                    <h3 className="font-bold text-foreground mb-2 group-hover:text-secondary transition-colors">
                      {relatedEvent.title}
                    </h3>
                    <div className="flex items-center gap-2 text-sm text-foreground/60 mb-4">
                      <Calendar size={16} />
                      {relatedEvent.date}
                    </div>
                    <div className="inline-flex items-center gap-2 text-secondary font-bold group-hover:gap-3 transition-all text-sm">
                      View Event <ArrowRight size={14} />
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  )
}
