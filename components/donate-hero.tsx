"use client"

import Link from "next/link"
import { Heart, TrendingUp } from "lucide-react"
import { Herotext } from "./hero-text"

export function DonateHero() {
  return (
    <section className="relative w-full min-h-96 bg-primary overflow-hidden flex items-center justify-center py-20">
      <div className="absolute inset-0 bg-gradient-to-r from-primary to-primary/80 opacity-95" />
      <div className="relative z-10 max-w-4xl mx-auto px-4 text-center">
        <div className="flex justify-center mb-6">
          <Heart size={48} className="text-secondary" />
        </div>
       <Herotext title="Support Our Movement" />
        <p className="text-xl md:mt-2 md:text-2xl text-white/90 mb-8 max-w-2xl mx-auto text-balance">
          Your contribution helps us build a united, prosperous nation. Every donation makes a difference.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="#donation-options"
            className="inline-flex items-center justify-center gap-2 bg-secondary hover:bg-secondary/90 text-white px-8 py-4 rounded-lg font-bold transition-colors"
          >
            Make a Donation
            <TrendingUp size={20} />
          </Link>
        </div>
      </div>
    </section>
  )
}
