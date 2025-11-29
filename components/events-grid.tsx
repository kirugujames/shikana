"use client"

import Link from "next/link"
import { Calendar, MapPin, ArrowRight } from "lucide-react"

export function EventsGrid() {
  const events = [
    {
      id: 1,
      title: "Unity Rally 2025",
      date: "March 15, 2025",
      time: "2:00 PM - 6:00 PM",
      location: "Central Stadium",
      capacity: "15,000+",
      image: "/political-rally-event-with-crowds.jpg",
      description:
        "Join thousands of supporters for an inspiring day of unity and progress. Featuring speeches from party leaders, live entertainment, and community engagement activities.",
      category: "Rally",
    },
    {
      id: 2,
      title: "Youth Leadership Forum",
      date: "March 22, 2025",
      time: "9:00 AM - 1:00 PM",
      location: "Convention Center",
      capacity: "500",
      image: "/youth-conference-leadership-workshop.jpg",
      description:
        "Empower the next generation with skills and vision for tomorrow. Interactive workshops on governance, civic engagement, and policy development.",
      category: "Workshop",
    },
    {
      id: 3,
      title: "Community Development Workshop",
      date: "April 5, 2025",
      time: "10:00 AM - 2:00 PM",
      location: "Community Hall",
      capacity: "200",
      image: "/community-workshop-development-planning.jpg",
      description:
        "Learn about grassroots initiatives and community impact programs. Network with community leaders and discover volunteer opportunities.",
      category: "Workshop",
    },
    {
      id: 4,
      title: "Policy Dialogue Series - Education",
      date: "April 12, 2025",
      time: "3:00 PM - 5:30 PM",
      location: "National Education Institute",
      capacity: "300",
      image: "/education-policy-dialogue-discussion.jpg",
      description:
        "Discuss comprehensive education reform and national development priorities. Hear from education experts and policymakers.",
      category: "Dialogue",
    },
    {
      id: 5,
      title: "Regional Campaign Tour - Central Region",
      date: "April 20, 2025",
      time: "All Day Event",
      location: "Multiple Venues",
      capacity: "Unlimited",
      image: "/campaign-tour-regional-visit.jpg",
      description:
        "Campaign tour across central region with town halls, meet and greets, and community engagement events throughout the day.",
      category: "Campaign",
    },
    {
      id: 6,
      title: "Donor Appreciation Gala",
      date: "May 1, 2025",
      time: "6:00 PM - 10:00 PM",
      location: "Presidential Ballroom",
      capacity: "800",
      image: "/gala-dinner-appreciation-event.jpg",
      description:
        "Evening celebration honoring our committed supporters and donors. Fine dining, networking, and special presentations.",
      category: "Gala",
    },
  ]

  const categories = ["All", "Rally", "Workshop", "Dialogue", "Campaign", "Gala"]

  return (
    <section className="w-full py-16 md:py-24 bg-background">
      <div className="max-w-6xl mx-auto px-4">
        <div className="mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-8 text-balance">All Events</h2>

          {/* Category Filter */}
          <div className="flex flex-wrap gap-3">
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
          </div>
        </div>

        {/* Events Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {events.map((event) => (
            <div
              key={event.id}
              className="bg-card border border-border rounded-lg overflow-hidden hover:shadow-lg transition-shadow"
            >
              <img src={event.image || "/placeholder.svg"} alt={event.title} className="w-full h-48 object-cover" />
              <div className="p-6">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-bold bg-secondary text-white px-3 py-1 rounded-full">
                    {event.category}
                  </span>
                  <span className="text-xs font-bold text-secondary">{event.capacity}</span>
                </div>

                <h3 className="text-xl font-bold text-foreground mb-3">{event.title}</h3>

                <p className="text-sm text-foreground/70 mb-4 line-clamp-2">{event.description}</p>

                <div className="space-y-2 mb-6 text-sm text-foreground/70">
                  <div className="flex items-center gap-2">
                    <Calendar size={16} className="text-secondary flex-shrink-0" />
                    <span>{event.date}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar size={16} className="text-secondary flex-shrink-0" />
                    <span>{event.time}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin size={16} className="text-secondary flex-shrink-0" />
                    <span>{event.location}</span>
                  </div>
                </div>

                <Link
                  href={`shared-ui/events/${event.id}`}
                  className="inline-flex items-center gap-2 text-secondary font-bold hover:gap-3 transition-all"
                >
                  Learn More <ArrowRight size={16} />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
