"use client"

import Link from "next/link"
import { Calendar, MapPin, ArrowRight } from "lucide-react"
import { useEffect, useState } from "react";
import api from "@/lib/axios";

export function EventsGrid() {
  const [events, setEvents] = useState<any[]>([]);

   useEffect(() => {
    async function fetchEvents() {
      try {
        const res = await api.get("api/events/all")
        const eventsArray = Array.isArray(res.data)
          ? res.data
          : Array.isArray(res.data?.data)
            ? res.data.data
            : []
        setEvents(eventsArray)
      } catch (error) {
        console.error("Error fetching events:", error)
      }
    }
    fetchEvents();
  }, [])
  // const categories = ["All", "Rally", "Workshop", "Dialogue", "Campaign", "Gala"]

  return (
    <section className="w-full py-8 md:py-12 bg-background">
      <div className="max-w-6xl mx-auto px-4">
        <div className="mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-8 text-balance">All Events</h2>

          {/* Category Filter */}
          {/* <div className="flex flex-wrap gap-3">
            {categories.map((category) => (
              <button
                key={category}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  category === "All"
                    ? "bg-secondary text-white"
                    : "bg-muted text-foreground hover:bg-secondary hover:text-white"
                }`}
              >
                {category}
              </button>
            ))}
          </div> */}
        </div>


        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {events.map((event) => (
            <div
              key={event?.id}
              className="bg-card border border-border rounded-lg overflow-hidden hover:shadow-lg transition-shadow flex flex-col"
            >
              <img
                src={event?.image || "/placeholder.svg"}
                alt={event?.title}
                className="w-full h-48 object-cover"
              />

              <div className="p-6 flex flex-col flex-1">
                {/* Category & Capacity */}
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-bold bg-secondary text-white px-3 py-1 rounded-full">
                    {event?.event_type}
                  </span>
                  <span className="text-xs font-bold text-secondary">
                    {event?.capacity}
                  </span>
                </div>

                {/* Title */}
                <h3 className="text-xl font-bold text-foreground mb-3">
                  {event?.title}
                </h3>

                {/* Description */}
                <p className="text-sm text-foreground/70 mb-4 line-clamp-2">
                  {event?.description}
                </p>

                {/* Event Meta */}
                <div className="space-y-2 mb-6 text-sm text-foreground/70">
                  <div className="flex items-center gap-2">
                    <Calendar size={16} className="text-secondary" />
                    <span>{event?.event_date}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar size={16} className="text-secondary" />
                    <span>{event?.from_time} - {event?.to_time}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin size={16} className="text-secondary" />
                    <span>{event?.location}</span>
                  </div>
                </div>

                {/* Actions */}
                <div className="mt-auto flex items-center justify-between gap-4">
                  <Link
                    href={`/shared-ui/events/${event?.id}`}
                    className="inline-flex items-center gap-2 text-secondary font-bold hover:gap-3 transition-all"
                  >
                    Learn More <ArrowRight size={16} />
                  </Link>

                  <Link
                    href={`/shared-ui/events/${event?.id}/register`}
                    className="inline-flex items-center justify-center px-4 py-2 text-sm font-bold
             border border-primary text-primary rounded-md
             hover:bg-primary hover:text-white transition-colors"
                  >
                    Register
                  </Link>

                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}
