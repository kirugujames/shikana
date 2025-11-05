"use client"

import { Herotext } from "./hero-text"

export function AboutHero() {
  return (
    <section className="relative w-full min-h-96 bg-primary overflow-hidden flex items-center justify-center py-20">
      {/* Background gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-primary to-primary/80 opacity-95" />

      {/* Content */}
      <div className="relative z-10 max-w-4xl mx-auto px-4 text-center">
       <Herotext  title="About Shikana Frontliners for Unity Party"/>
        <p className="text-xl md:text-2xl md:mt-3 text-white/90 mb-8 max-w-2xl mx-auto text-balance">
          Dedicated to building a stronger, more united nation through transparent leadership and inclusive governance.
        </p>
      </div>
    </section>
  )
}
