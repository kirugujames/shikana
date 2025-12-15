import Link from "next/link"
import { Calendar, MapPin, ArrowRight } from "lucide-react"

export function EventsPreview() {
  const events = [
    {
      id: 1,
      title: "Unity Rally 2025",
      date: "March 15, 2025",
      location: "Central Stadium",
      image: "/political-rally-event.jpg",
      description: "Join thousands of supporters for an inspiring day of unity and progress.",
    },
    {
      id: 2,
      title: "Youth Leadership Forum",
      date: "March 22, 2025",
      location: "Convention Center",
      image: "/youth-conference-leadership.jpg",
      description: "Empower the next generation with skills and vision for tomorrow.",
    },
    {
      id: 3,
      title: "Community Development Workshop",
      date: "April 5, 2025",
      location: "Community Hall",
      image: "/community-workshop-development.jpg",
      description: "Learn about grassroots initiatives and community impact programs.",
    },
  ]

  return (
    <section className="py-8 md:py-12 px-4 bg-gray-50">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-bold text-primary mb-4">Upcoming Events</h2>
        <p className="text-lg text-muted-foreground mb-16">Be part of our journey and connect with the community</p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {events.map((event) => (
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
                  href="/events"
                  className="inline-flex items-center gap-2 text-secondary font-bold hover:gap-3 transition-all"
                >
                  Learn More <ArrowRight size={16} />
                </Link>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center">
          <Link
            href="/events"
            className="inline-flex items-center gap-2 bg-primary text-white px-8 py-3 rounded-lg font-bold hover:bg-primary/90 transition-colors"
          >
            View All Events <ArrowRight size={20} />
          </Link>
        </div>
      </div>
    </section>
  )
}
