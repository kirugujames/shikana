"use client"

import Link from "next/link"
import { MapPin, Briefcase, Clock, ArrowRight } from "lucide-react"

export function JobListings() {
  const jobs = [
    {
      id: 1,
      title: "Senior Policy Analyst",
      // department: "Policy & Strategy",
      // location: "Dar es Salaam",
      type: "Full-time",
      postedDate: "March 1, 2025",
      // experience: "5+ years",
      description:
        "Lead policy research and development initiatives. Analyze policy impacts and provide recommendations.",
    },
    {
      id: 2,
      title: "Campaign Manager",
      // department: "Campaign Operations",
      // location: "Multiple Regions",
      type: "Full-time",
      postedDate: "March 2, 2025",
      // experience: "3+ years",
      description: "Coordinate campaign activities across regions. Manage teams and oversee campaign execution.",
    },
    {
      id: 3,
      title: "Communications Specialist",
      // department: "Communications",
      // location: "Dar es Salaam",
      type: "Full-time",
      postedDate: "February 28, 2025",
      // experience: "2+ years",
      description: "Create compelling content and manage communications strategy across platforms.",
    },
    {
      id: 4,
      title: "Community Organizer",
      // department: "Community Engagement",
      // location: "Regional",
      type: "Full-time",
      postedDate: "February 25, 2025",
      // experience: "1+ years",
      description: "Build grassroots support and organize community events and initiatives.",
    },
    {
      id: 5,
      title: "Finance Manager",
      // department: "Finance & Administration",
      // location: "Dar es Salaam",
      type: "Full-time",
      postedDate: "February 20, 2025",
      // experience: "4+ years",
      description: "Manage financial operations, budgeting, and ensure compliance with regulations.",
    },
    {
      id: 6,
      title: "Youth Engagement Coordinator",
      // department: "Youth Programs",
      // location: "Dar es Salaam",
      type: "Full-time",
      postedDate: "February 18, 2025",
      // experience: "2+ years",
      description: "Develop and implement youth engagement programs and initiatives.",
    },
    {
      id: 7,
      title: "Digital Marketing Specialist",
      // department: "Digital Strategy",
      // location: "Dar es Salaam",
      type: "Full-time",
      postedDate: "February 15, 2025",
      // experience: "2+ years",
      description: "Manage digital marketing campaigns, social media, and online presence.",
    },
    {
      id: 8,
      title: "Administrative Assistant",
      // department: "Administration",
      // location: "Dar es Salaam",
      type: "Full-time",
      postedDate: "February 10, 2025",
      // experience: "1+ years",
      description: "Provide administrative support to senior leadership and coordinate office operations.",
    },
  ]

  return (
    <section className="w-full py-16 md:py-24 bg-muted">
      <div className="max-w-6xl mx-auto px-4">
        <div className="mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4 text-balance">Open Positions</h2>
          <p className="text-lg text-foreground/70">View our current job openings and apply to join our team.</p>
        </div>

        <div className="space-y-4">
          {jobs.map((job) => (
            <div
              key={job.id}
              className="bg-card border border-border rounded-lg p-6 hover:border-secondary transition-colors hover:shadow-md"
            >
              <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-4">
                <div>
                  <h3 className="text-2xl font-bold text-foreground mb-2">{job.title}</h3>
                  {/* <p className="text-secondary font-semibold mb-3">{job.department}</p> */}

                  <div className="flex flex-wrap gap-4 text-sm text-foreground/70 mb-4">
                    {/* <div className="flex items-center gap-2">
                      <MapPin size={16} className="text-secondary" />
                      <span>{job.location}</span>
                    </div> */}
                    <div className="flex items-center gap-2">
                      <Briefcase size={16} className="text-secondary" />
                      <span>{job.type}</span>
                    </div>
                    {/* <div className="flex items-center gap-2">
                      <Clock size={16} className="text-secondary" />
                      <span>{job.experience}</span>
                    </div> */}
                  </div>

                  <p className="text-foreground/80 leading-relaxed">{job.description}</p>
                </div>

                <div className="flex flex-col gap-2 items-start md:items-end">
                  <span className="text-xs text-foreground/60">Posted {job.postedDate}</span>
                  <Link
                    href={`/job-application/${job.id}`}
                    className="inline-flex items-center gap-2 text-secondary font-bold hover:gap-3 transition-all"
                  >
                    Apply <ArrowRight size={16} />
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
