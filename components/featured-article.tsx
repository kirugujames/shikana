"use client"

import Link from "next/link"
import { Calendar, User, ArrowRight } from "lucide-react"
import { useState } from "react"

export function FeaturedArticle() {
  const fullText = `
    Exploring how inclusive policies, community engagement, and transparent governance can strengthen our
    nation and create opportunities for all citizens. In this comprehensive article, we discuss the foundational 
    principles of unity that underpin the Shikana Frontliners for Unity Party. From grassroots initiatives 
    to national policies, we explore how diverse communities can work together toward shared goals and mutual prosperity.
  `

  const [expanded, setExpanded] = useState(false)

  const words = fullText.trim().split(/\s+/)
  const preview = words.slice(0, 40).join(" ")
  const remaining = words.slice(40).join(" ")

  return (
    <section className="w-full py-16 md:py-24 bg-muted">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-foreground mb-8">Featured Article</h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center bg-card border border-border rounded-lg overflow-hidden">

          <div>
            <img
              src="/placeholder.svg?key=featured-blog"
              alt="The Path to National Unity"
              className="w-full h-96 object-cover"
            />
          </div>


          <div className="p-8 space-y-6">
            <div>
              <span className="inline-block bg-secondary text-white px-4 py-1 rounded-full font-bold text-sm mb-3">
                FEATURED
              </span>
              <h3 className="text-4xl font-bold text-foreground mb-3">The Path to National Unity</h3>
              <div className="space-y-3 text-sm text-foreground/70">
                <div className="flex items-center gap-3">
                  <Calendar size={18} className="text-secondary" />
                  <span>March 10, 2025</span>
                </div>
                <div className="flex items-center gap-3">
                  <User size={18} className="text-secondary" />
                  <span>Party Communications Team</span>
                </div>
              </div>
            </div>


            <p className="text-foreground/80 leading-relaxed">
              {expanded ? (
                <>
                  {fullText}
                  <button
                    className="text-secondary font-semibold ml-2"
                    onClick={() => setExpanded(false)}
                  >
                    Read Less
                  </button>
                </>
              ) : (
                <>
                  {preview}
                  {words.length > 40 && (
                    <>
                      ...{" "}
                    </>
                  )}
                </>
              )}
            </p>

            <Link
              href="/blog/1"
              className="inline-flex items-center gap-2 bg-secondary text-white px-6 py-3 rounded-lg font-bold hover:bg-secondary/90 transition-colors"
            >
              Read Full Article
              <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
