"use client"

import Link from "next/link"
import { Calendar, User, ArrowRight } from "lucide-react"
import { useEffect, useState } from "react"
import api from "@/lib/axios";
import { toast } from "sonner";
import { Toaster } from "react-hot-toast";

export function FeaturedArticle() {
  const [mainActiveBlogs,setMainActiveBlogs] = useState<any[]>([]);
  useEffect(()=>{
    async function getActiveBlogs() {
      try {
        const response  =  await api.get("/blog/getMainBlog?isMain=Y");
        setMainActiveBlogs(response.data.data ?? []);
      } catch (error) {
        setMainActiveBlogs([]);
        toast.error("Failed to fetch featured article.");
      }
    }
    getActiveBlogs();
  },[])
  const [expanded, setExpanded] = useState(false)

  const words = mainActiveBlogs[0]?.content.trim().split(/\s+/)
  // const preview = words.slice(0, 20).join(" ")
  // const remaining = words.slice(40).join(" ")

  return (
    <section className="w-full py-16 md:py-24 bg-muted">
      <Toaster  position="top-center"/>
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-foreground mb-8">Featured Article</h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center bg-card border border-border rounded-lg overflow-hidden">

          <div>
            <img
              src={mainActiveBlogs[0]?.image || "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80"}
              alt="The Path to National Unity"
              className="w-full h-96 object-cover"
            />
          </div>


          <div className="p-8 space-y-6">
            <div>
              <span className="inline-block bg-secondary text-white px-4 py-1 rounded-full font-bold text-sm mb-3">
                {mainActiveBlogs[0]?.category || "Politics"}
              </span>
              <h3 className="text-4xl font-bold text-foreground mb-3">{mainActiveBlogs[0]?.title}</h3>
              <div className="space-y-3 text-sm text-foreground/70">
                <div className="flex items-center gap-3">
                  <Calendar size={18} className="text-secondary" />
                  <span>{mainActiveBlogs[0]?.createdAt}</span>
                </div>
                <div className="flex items-center gap-3">
                  <User size={18} className="text-secondary" />
                  <span>{mainActiveBlogs[0]?.posted_by}</span>
                </div>
              </div>
            </div>


            <p className="text-foreground/80 leading-relaxed">
              {expanded ? (
                <>
                  {mainActiveBlogs[0]?.content}
                  <button
                    className="text-secondary font-semibold ml-2"
                    onClick={() => setExpanded(false)}
                  >
                    Read Less
                  </button>
                </>
              ) : (
                <>
                  {words}
                  {words && (
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
