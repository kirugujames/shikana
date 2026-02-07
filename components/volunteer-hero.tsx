"use client"

import { Herotext } from "./hero-text"

export function VolunteerHero() {
    return (
        <section className="relative w-full min-h-96 bg-primary overflow-hidden flex items-center justify-center py-20">
            {/* Background Image */}
            <div
                className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                style={{ backgroundImage: 'url(/teamwork.jpg.jpeg)' }}
            />
            <div className="absolute inset-0 bg-gradient-to-r from-primary/90 to-primary/70" />
            <div className="relative z-10 max-w-6xl mx-auto px-4 text-center">
                <Herotext title="Volunteer" />
                <p className="text-xl md:mt-2 md:text-2xl text-white/90 mb-8 max-w-4xl mx-auto text-balance">
                    Our country needs builders, organizers, and dreamers. Step forward and share your interests, and become part of a team that changes the nation from the ground up.                </p>
            </div>
        </section>
    )
}
