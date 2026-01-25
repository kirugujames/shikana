import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { PartyPositionHero } from "@/components/party-position-hero"
import PartyPositionForm from "@/components/party-position-form"

export default function PartyPositionPage() {
    return (
        <main className="w-full">
            <Header />
            <PartyPositionHero />
            <PartyPositionForm />
            <Footer />
        </main>
    )
}
