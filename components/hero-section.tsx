"use client"

import Link from "next/link"
import { ArrowRight } from "lucide-react"
import GradientText from './GradientText'
import { Herotext } from "./hero-text"


export function HeroSection() {
  return (
    <section className="relative w-full h-screen overflow:hidden flex items-center justify-center">
      <div className="absolute inset-0">
        <img
          src="/deer.gif"
          alt="Background animation"
          className="w-full h-full object-cover"
        />
      </div>

      <div className="absolute inset-0 bg-primary/80" />
      <div className="relative z-10 max-w-4xl mx-auto px-4 text-center">
       <Herotext  title="Together We Rise for a United Tomorrow"/>

        <p className="text-xl md:text-2xl mt-2 text-white/90 mb-8 max-w-2xl mx-auto text-balance">
          Join the Shikana Frontliners for Unity Party in building a stronger, more prosperous nation through unity and
          progress.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/register"
            className="inline-flex items-center justify-center gap-2 bg-secondary hover:bg-secondary/90 text-white px-8 py-4 rounded-lg font-bold transition-colors"
          >
            Join the Movement
            <ArrowRight size={20} />
          </Link>
          <Link
            href="/donate"
            className="inline-flex items-center justify-center gap-2 border-2 border-white text-white hover:bg-white/10 px-8 py-4 rounded-lg font-bold transition-colors"
          >
            Support Us Today
          </Link>
        </div>
      </div>
    </section>
  )
}
