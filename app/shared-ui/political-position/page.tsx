import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { AspirantHero } from "@/components/aspirant-hero"
import PoliticalRegistrationForm from "@/components/political-form"

export default function ContactPage() {
  return (
    <main className="w-full">
      <Header />
      <AspirantHero />
      <PoliticalRegistrationForm />
      <Footer />
    </main>
  )
}
