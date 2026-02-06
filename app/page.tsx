import { Header } from "@/components/header"
import { HeroSection } from "@/components/hero-section"
import { WhyChooseUs } from "@/components/why-choose-us"
import { EventsPreview } from "@/components/events-preview"
import { BlogPreview } from "@/components/blog-preview"
import { TestimonialsSection } from "@/components/testimonials-section"
import { NewsletterSection } from "@/components/newsletter-section"
import { Footer } from "@/components/footer"
import { OurIdeology } from "@/components/ui/ourIdeology"

export default function Home() {
  return (
    <main className="w-full">
      <Header />
      <HeroSection />
      <OurIdeology />
      {/* <WhyChooseUs /> */}
      {/* <MissionVision /> */}
      <BlogPreview />
      <EventsPreview />
      <TestimonialsSection />
      <NewsletterSection />
      <Footer />
    </main>
  )
}
