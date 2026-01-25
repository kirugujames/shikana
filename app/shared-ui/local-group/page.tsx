import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { LocalGroupHero } from "@/components/local-group-hero"
import { LocalGroupForm } from "@/components/local-group-form"

export default function FindLocalGroupPage() {
    return (
        <main className="w-full min-h-screen">
            <Header />
            <LocalGroupHero />
            <LocalGroupForm />
            <Footer />
        </main>
    )
}
