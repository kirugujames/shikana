import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { EventsHero } from "@/components/events-hero"
import { EventsGrid } from "@/components/events-grid"
import { UpcomingHighlight } from "@/components/upcoming-highlight"

export default function EventsPage() {
  return (
    <main className="w-full">
      <Header />
      <EventsHero />
      <UpcomingHighlight />
      <EventsGrid />
      {/* <EventsRegistration /> */}
      <Footer />
    </main>
  )
}
