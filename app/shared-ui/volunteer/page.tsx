import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { Volunteer } from "@/components/volunteer";
import { VolunteerHero } from "@/components/volunteer-hero";


export default function VolunteerPage() {
    return (
        <main className="w-full">
            <Header />
            <VolunteerHero />
            <Volunteer />
            <Footer />
        </main>
    )
}