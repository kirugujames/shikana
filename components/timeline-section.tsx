"use client"

export function TimelineSection() {
  const milestones = [
    {
      year: "2024",
      title: "Coming Together of Like-Minded Citizens",
      description: "Shikana Frontliners for Unity Party started as a dream by like minded Kenyan driven by change and system the deliver for citizens.",
    },
    
    {
      year: "2025",
      title: "Party Registration",
      description: "Registration of SFU party and Launched national campaign focusing on unity, transparency, and inclusive governance.",
    },
    
  ]

  return (
    <section className="w-full py-16 md:py-24 bg-muted">
      <div className="max-w-4xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4 text-balance">Our Journey</h2>
          <p className="text-lg text-foreground/70">
            Key milestones in building the Shikana Frontliners for Unity Party.
          </p>
        </div>

        <div className="space-y-8">
          {milestones.map((milestone, index) => (
            <div key={index} className="flex gap-6">
              <div className="flex flex-col items-center">
                <div className="w-12 h-12 rounded-full bg-secondary text-white flex items-center justify-center font-bold text-lg">
                  {index + 1}
                </div>
                {index < milestones.length - 1 && <div className="w-1 h-20 bg-secondary/30 mt-2" />}
              </div>
              <div className="pb-8">
                <h3 className="text-2xl font-bold text-foreground">{milestone.year}</h3>
                <p className="text-xl font-semibold text-secondary mb-2">{milestone.title}</p>
                <p className="text-foreground/70 leading-relaxed">{milestone.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
