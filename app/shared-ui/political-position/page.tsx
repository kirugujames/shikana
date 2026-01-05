import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { CareersHero } from "@/components/careers-hero"
import PoliticalRegistrationForm from "@/components/political-form"

export default function ContactPage() {
  return (
    <main className="w-full">
      <Header />
      <CareersHero />
      <PoliticalRegistrationForm />
      <Footer />
    </main>
  )
}
