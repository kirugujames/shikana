import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { CareersHero } from "@/components/careers-hero"
import { CultureSection } from "@/components/culture-section"
import { JobListings } from "@/components/job-listings"
import { ApplicationForm } from "@/components/application-form"

export default function CareersPage() {
  return (
    <main className="w-full">
      <Header />
      <CareersHero />
      <CultureSection />
      <JobListings />
      <Footer />
    </main>
  )
}
