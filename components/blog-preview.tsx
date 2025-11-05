import Link from "next/link"
import { ArrowRight } from "lucide-react"

export function BlogPreview() {
  const blogs = [
    {
      id: 1,
      title: "The Path to National Unity",
      excerpt: "Exploring how inclusive policies and community engagement can strengthen our nation.",
      date: "March 10, 2025",
      image: "/national-unity-diversity.jpg",
      category: "Politics",
    },
    {
      id: 2,
      title: "Economic Growth Through Progress",
      excerpt: "How strategic investments in infrastructure and education drive sustainable development.",
      date: "March 8, 2025",
      image: "/economic-growth-development.jpg",
      category: "Economy",
    },
    {
      id: 3,
      title: "Leadership for Tomorrow",
      excerpt: "Meet our party leaders and learn about their vision for a brighter future.",
      date: "March 5, 2025",
      image: "/leadership-vision-future.jpg",
      category: "Leadership",
    },
  ]

  return (
    <section className="py-16 md:py-24 px-4 bg-white">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-bold text-primary mb-4">Latest News & Insights</h2>
        <p className="text-lg text-muted-foreground mb-16">Stay updated with our latest articles and announcements</p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {blogs.map((blog) => (
            <article key={blog.id} className="bg-muted rounded-lg overflow-hidden hover:shadow-lg transition-shadow">
              <img src={blog.image || "/placeholder.svg"} alt={blog.title} className="w-full h-48 object-cover" />
              <div className="p-6">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-bold text-secondary uppercase">{blog.category}</span>
                  <span className="text-sm text-muted-foreground">{blog.date}</span>
                </div>
                <h3 className="text-xl font-bold text-primary mb-3">{blog.title}</h3>
                <p className="text-muted-foreground mb-4 line-clamp-2">{blog.excerpt}</p>
                <Link
                  href="/blog"
                  className="inline-flex items-center gap-2 text-secondary font-bold hover:gap-3 transition-all"
                >
                  Read More <ArrowRight size={16} />
                </Link>
              </div>
            </article>
          ))}
        </div>

        <div className="text-center">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 bg-primary text-white px-8 py-3 rounded-lg font-bold hover:bg-primary/90 transition-colors"
          >
            View All Articles <ArrowRight size={20} />
          </Link>
        </div>
      </div>
    </section>
  )
}
