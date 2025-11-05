"use client"

import { HeroSection } from "./hero-section"
import { Herotext } from "./hero-text"

export function ContactHero() {
  return (
    <section className="relative w-full min-h-96 bg-primary overflow-hidden flex items-center justify-center py-20">
      <div className="absolute inset-0 bg-gradient-to-r from-primary to-primary/80 opacity-95" />
      <div className="relative z-10 max-w-4xl mx-auto px-4 text-center">
        <Herotext title="Get in Touch"/>
        <p className="text-xl md:text-2xl text-white/90 mb-8 max-w-2xl mx-auto text-balance">
          We'd love to hear from you. Reach out with questions, feedback, or partnership inquiries.
        </p>
      </div>
    </section>
  )
}
