import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { CareersHero } from "@/components/careers-hero"
import PoliticalRegistrationForm from "@/components/political-form"
import { ListingHero } from "@/components/listing-hero"
import ProductsGrid from "@/components/listing-grid"

export default function ContactPage() {
  return (
    <main className="w-full">
      <Header />
      <ListingHero />
      <ProductsGrid />
      <Footer />
    </main>
  )
}
