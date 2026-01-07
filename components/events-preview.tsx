"use client"
import Link from "next/link"
import { Calendar, MapPin, ArrowRight } from "lucide-react"
import { useEffect, useState } from "react"
import api from "@/lib/axios"

export function EventsPreview() {

  const [events, setEvents] = useState<any[]>([])
  useEffect(() => {
    async function fetchEvents() {
      try {
        const res = await api.get("api/events/all?limit=3")
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
  return (
    <section className="py-8 md:py-12 px-4 bg-gray-50">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-bold text-primary mb-4">Upcoming Events</h2>
        <p className="text-lg text-muted-foreground mb-16">Be part of our journey and connect with the community</p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {
            events.length === 0 ? (<p className="col-span-full text-center text-muted-foreground">No events available</p>) : (
              events.map((event) => (
                <div
                  key={event.id}
                  className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow"
                >
                  <img src={event.image || "/placeholder.svg"} alt={event.title} className="w-full h-48 object-cover" />
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-primary mb-3">{event.title}</h3>
                    <p className="text-muted-foreground mb-4 line-clamp-2">{event.description}</p>
                    <div className="space-y-2 mb-4 text-sm">
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <Calendar size={16} />
                        {event.date}
                      </div>
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <MapPin size={16} />
                        {event.location}
                      </div>
                    </div>
                    <Link
                      href={`/shared-ui/events/${event.id}`}
                      className="inline-flex items-center gap-2 text-secondary font-bold hover:gap-3 transition-all"
                    >
                      Learn More <ArrowRight size={16} />
                    </Link>
                  </div>
                </div>
              ))
            )
          }
        </div>
        {events.length > 0 && (

          <div className="text-center">
            <Link
              href="/shared-ui/events"
              className="inline-flex items-center gap-2 bg-primary text-white px-8 py-3 rounded-lg font-bold hover:bg-primary/90 transition-colors"
            >
              View All Events <ArrowRight size={20} />
            </Link>
          </div>
        )}
      </div>
    </section>
  )
}
