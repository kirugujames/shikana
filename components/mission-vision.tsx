"use client"

import { Target, Eye } from "lucide-react"

export function MissionVision() {
  return (
    <section className="w-full py-16 md:py-24 bg-background">
      <div className="max-w-6xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Mission */}
          <div className="space-y-4">
            <div className="flex items-center gap-3 mb-6">
              <div className="bg-secondary p-3 rounded-lg">
                <Target size={28} className="text-white" />
              </div>
              <h2 className="text-3xl font-bold text-foreground">Our Mission</h2>
            </div>
            <p className="text-lg text-foreground/80 leading-relaxed">
              To unite citizens across all demographics and regions, fostering genuine dialogue and collaborative
              solutions that prioritize the wellbeing of every Kenyan. We are committed to transparent, accountable
              governance that serves the people.
            </p>
            <ul className="space-y-3 mt-6">
              <li className="flex items-start gap-3">
                <span className="text-secondary font-bold mt-1">✓</span>
                <span className="text-foreground/80">Transparent and accountable leadership</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-secondary font-bold mt-1">✓</span>
                <span className="text-foreground/80">Inclusive policy-making processes</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-secondary font-bold mt-1">✓</span>
                <span className="text-foreground/80">Economic growth and equality</span>
              </li>
            </ul>
          </div>

          {/* Vision */}
          <div className="space-y-4">
            <div className="flex items-center gap-3 mb-6">
              <div className="bg-primary p-3 rounded-lg">
                <Eye size={28} className="text-white" />
              </div>
              <h2 className="text-3xl font-bold text-foreground">Our Vision</h2>
            </div>
            <p className="text-lg text-foreground/80 leading-relaxed">
              A prosperous, unified nation where every citizen has equal opportunities, healthcare, education, and
              economic advancement regardless of background. A Kenya that leads the region in innovation, stability,
              and democratic excellence.
            </p>
            <ul className="space-y-3 mt-6">
              <li className="flex items-start gap-3">
                <span className="text-secondary font-bold mt-1">✓</span>
                <span className="text-foreground/80">Universal quality education access</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-secondary font-bold mt-1">✓</span>
                <span className="text-foreground/80">Healthcare for all communities</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-secondary font-bold mt-1">✓</span>
                <span className="text-foreground/80">Regional economic leadership</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}
