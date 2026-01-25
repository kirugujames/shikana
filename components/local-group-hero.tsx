"use client"

import { Herotext } from "./hero-text"

export function LocalGroupHero() {
    return (
        <section className="relative w-full min-h-96 bg-primary overflow-hidden flex items-center justify-center py-20">
            {/* Background Image - Using teamwork image as a placeholder for community */}
            <div
                className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                style={{ backgroundImage: 'url(/teamwork.jpg.jpeg)' }}
            />
            <div className="absolute inset-0 bg-gradient-to-r from-primary/90 to-primary/70" />
            <div className="relative z-10 max-w-4xl mx-auto px-4 text-center">
                <Herotext title="Find Your Local Group" />
                <p className="text-xl md:text-2xl md:mt-2 text-white/90 mb-8 max-w-2xl mx-auto text-balance">
                    Connect with fellow members in your area, lead initiatives, and build a stronger nation from the ground up.
                </p>
            </div>
        </section>
    )
}
