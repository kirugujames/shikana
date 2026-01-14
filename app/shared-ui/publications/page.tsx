import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { PublicationHero } from "@/components/publication-hero"
import { PublicationsSection } from "@/components/publications-section"
import { PartyDocumentsSection } from "@/components/ui/documents"

export default function PublicationsPage() {
    return (
        <main className="w-full">
            <Header />
            <PublicationHero />
            <PartyDocumentsSection />
            <PublicationsSection />
            <Footer />
        </main>
    )
}
