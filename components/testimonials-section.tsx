import { Quote } from "lucide-react"

export function TestimonialsSection() {
  const testimonials = [
    {
      id: 1,
      quote:
        "The Shikana Frontliners represent true leadership and a genuine commitment to unity. When we lift each other up and celebrate each other’s successes, we amplify our collective achievements.",
      author: "Nicholas Mutunga",
      role: "IT Expert",
      // image: "/communications-specialist.jpg",
    },
    {
      id: 2,
      quote:
        "This is the change we want for our country. The more we are, the greater our impact will be in our world.",
      author: "Grace Nyambura",
      role: "Local Business Owner",
      // image: "/government-official.jpg",
    },
    {
      id: 3,
      quote:
        "Finally, at Shikana, we’re proud to be a party that listens to young voices and amplify the voices of everyday Kenyans to fight for and invests in a better future. Shikana is a force to reckon with!",
      author: "Ber’nita Ammi’mor",
      role: "Youth Advocate",
      // image: "/political-leader.png",
    },
  ]

  return (
    <section className="py-8 md:py-12 px-4 bg-primary">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-bold text-white text-center mb-4">What Our Community Says</h2>
        <p className="text-lg text-white/80 text-center mb-16">Hear from our members and supporters across the counties and the country</p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial) => (
            <div key={testimonial.id} className="bg-white/10 backdrop-blur-sm p-8 rounded-lg border border-white/20">
              <Quote className="text-secondary mb-4" size={32} />
              <p className="text-white mb-6 text-lg leading-relaxed italic">"{testimonial.quote}"</p>
              <div className="flex items-center space-x-4">
                {/* <img
                  src={testimonial.image}
                  alt={testimonial.author}
                  className="w-12 h-12 rounded-full object-cover"
                /> */}
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
