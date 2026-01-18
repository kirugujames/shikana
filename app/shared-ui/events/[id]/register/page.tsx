import { use } from "react"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import EventsRegistration from "@/components/events-registration"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"

// Define Params type based on Next.js 15 conventions (used by your project version 16, typically params is a Promise)
type Props = {
    params: Promise<{ id: string }>
}

export default function RegisterEventPage({ params }: Props) {
    // Unwrap params using React.use()
    const { id } = use(params)

    return (
        <main className="w-full">
            <Header />
            <div className="py-8 md:py-12">
                <div className="max-w-4xl mx-auto px-4 mb-8">
                    <Link
                        href="/shared-ui/events"
                        className="inline-flex items-center gap-2 text-secondary font-bold hover:gap-3 transition-all"
                    >
                        <ArrowLeft size={20} />
                        Back to Events
                    </Link>
                </div>
                <EventsRegistration eventId={id} />
            </div>
            <Footer />
        </main>
    )
}
