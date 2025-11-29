'use client'

import { use } from 'react'
import Link from 'next/link'
import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { EventDetail } from '@/components/event-detail'
import { events } from '@/lib/events-data'
import { ArrowLeft } from 'lucide-react'

export default function EventPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params)
  const event = events.find((e) => e.id === parseInt(id))

  if (!event) {
    return (
      <main className="w-full">
        <Header />
        <div className="max-w-4xl mx-auto px-4 py-20">
          <Link href="/events" className="inline-flex items-center gap-2 text-secondary font-bold mb-8 hover:gap-3 transition-all">
            <ArrowLeft size={20} />
            Back to Events
          </Link>
          <div className="text-center py-20">
            <h1 className="text-4xl font-bold text-foreground mb-4">Event Not Found</h1>
            <p className="text-foreground/60 mb-8">Sorry, we couldn't find the event you're looking for.</p>
            <Link href="/events" className="inline-flex items-center gap-2 bg-secondary text-white px-6 py-3 rounded-lg font-bold hover:bg-secondary/90 transition-colors">
              Back to Events
            </Link>
          </div>
        </div>
        <Footer />
      </main>
    )
  }

  return (
    <main className="w-full">
      <Header />
      <article className="w-full">
        <div className="bg-muted py-8 md:py-12">
          <div className="max-w-4xl mx-auto px-4">
            <Link href="/events" className="inline-flex items-center gap-2 text-secondary font-bold mb-8 hover:gap-3 transition-all">
              <ArrowLeft size={20} />
              Back to Events
            </Link>
          </div>
        </div>
        <EventDetail event={event} />
      </article>
      <Footer />
    </main>
  )
}
