import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { AboutHero } from "@/components/about-hero"
import { MissionVision } from "@/components/mission-vision"
import { TeamSection } from "@/components/team-section"
import { ValuesSection } from "@/components/values-section"
import { TimelineSection } from "@/components/timeline-section"
import { PartyDocumentsSection } from "@/components/ui/documents"
import { ThematicAreas } from "@/components/thematic-areas"

export default function AboutPage() {
  return (
    <main className="w-full">
      <Header />
      <AboutHero />
      <div id="mission-vision" className="scroll-mt-24">
        <MissionVision />
        <ThematicAreas />
        <ValuesSection />
      </div>
      <div id="team" className="scroll-mt-24">
        <TeamSection />
      </div>
      <div id="timeline" className="scroll-mt-24">
        <TimelineSection />
      </div>
      <Footer />
    </main>
  )
}
