import EventsRegistration from "@/components/events-registration";
import { Footer } from "@/components/footer";
import { Header } from "@/components/header";


export default function RegisterEvent() {
    return (
        <main className="w-full">
            <Header />
            <EventsRegistration />
            <Footer /> 
        </main>
    )
}