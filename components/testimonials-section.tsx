import { Quote } from "lucide-react"

export function TestimonialsSection() {
  const testimonials = [
    {
      id: 1,
      quote:
        "The Shikana Frontliners represent true leadership and a genuine commitment to unity. I've never felt more hopeful about our future.",
      author: "Sarah Johnson",
      role: "Community Leader",
      image: "/communications-specialist.jpg",
    },
    {
      id: 2,
      quote:
        "Their transparent governance approach and focus on grassroots development has transformed our neighborhood.",
      author: "Michael Chen",
      role: "Local Business Owner",
      image: "/government-official.jpg",
    },
    {
      id: 3,
      quote:
        "Finally, a party that listens to young voices and invests in our future. This is the change we've been waiting for.",
      author: "Ade Adeleke",
      role: "Youth Advocate",
      image: "/political-leader.png",
    },
  ]

  return (
    <section className="py-8 md:py-12 px-4 bg-primary">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-bold text-white text-center mb-4">What Our Community Says</h2>
        <p className="text-lg text-white/80 text-center mb-16">Hear from members and supporters across the nation</p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial) => (
            <div key={testimonial.id} className="bg-white/10 backdrop-blur-sm p-8 rounded-lg border border-white/20">
              <Quote className="text-secondary mb-4" size={32} />
              <p className="text-white mb-6 text-lg leading-relaxed italic">"{testimonial.quote}"</p>
              <div className="flex items-center space-x-4"> 
                <img
                  src={testimonial.image}
                  alt={testimonial.author}
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div>
                  <p className="text-white font-bold">{testimonial.author}</p>
                  <p className="text-white/70 text-sm">{testimonial.role}</p>
                </div>
              </div>
              {/* <div>
                <p className="text-white font-bold">{testimonial.author}</p>
                <p className="text-white/70 text-sm">{testimonial.role}</p>
              </div> */}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
