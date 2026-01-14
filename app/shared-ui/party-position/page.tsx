import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { CareersHero } from "@/components/careers-hero"
import PartyPositionForm from "@/components/party-position-form"

export default function PartyPositionPage() {
    return (
        <main className="w-full">
            <Header />
            <CareersHero />
            <PartyPositionForm />
            <Footer />
        </main>
    )
}
