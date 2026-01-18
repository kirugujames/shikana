import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { FAQHero } from "@/components/faq-hero"
import { FAQSection } from "@/components/faq-section"

export default function FAQPage() {
    return (
        <main className="w-full">
            <Header />
            <FAQHero />
            <FAQSection />
            <Footer />
        </main>
    )
}
