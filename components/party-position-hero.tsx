"use client"

import { Herotext } from "./hero-text"

export function PartyPositionHero() {
    return (
        <section className="relative w-full min-h-96 bg-primary overflow-hidden flex items-center justify-center py-20">
            {/* Background Image */}
            <div
                className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                style={{ backgroundImage: 'url(/careers-hero.png)' }}
            />
            <div className="absolute inset-0 bg-gradient-to-r from-primary/90 to-primary/70" />
            <div className="relative z-10 max-w-6xl mx-auto px-4 text-center">
                <Herotext title="Step forward and serve!!" />
                <p className="text-xl md:text-2xl md:mt-2 text-white/90 mb-8 max-w-4xl mx-auto text-balance">
                    Your voice, your skills, your commitment can make a difference. Apply today to serve in a vacant Party position and be part of the team driving change from within.
                </p>
            </div>
        </section>
    )
}
