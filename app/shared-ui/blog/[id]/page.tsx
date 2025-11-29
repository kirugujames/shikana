'use client'

import { use, useEffect, useState } from 'react'
import Link from 'next/link'
import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { BlogPostDetail } from '@/components/blog-post-detail'
import { CommentsSection } from '@/components/comments-section'
import { RelatedArticles } from '@/components/related-articles'
import { ArrowLeft } from 'lucide-react'
import api from '@/lib/axios'

export default function BlogPostPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params)

  const [article, setArticle] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)

  useEffect(() => {
    async function fetchArticle() {
      try {
        const res = await api.get(`/blog/get-by-id/${id}`)

        if (res.data.statusCode === 200) {
          setArticle(res.data.data)
        } else {
          setError(true)
        }
      } catch (err) {
        console.error(err)
        setError(true)
      } finally {
        setLoading(false)
      }
    }

    fetchArticle()
  }, [id])

  if (loading) {
    return (
      <main className="w-full">
        <Header />
        <div className="max-w-4xl mx-auto px-4 py-20">
          <p className="text-center text-xl text-foreground/60">Loading article...</p>
        </div>
        <Footer />
      </main>
    )
  }

  if (error || !article) {
    return (
      <main className="w-full">
        <Header />
        <div className="max-w-4xl mx-auto px-4 py-20">
          <Link href="/blog" className="inline-flex items-center gap-2 text-secondary font-bold mb-8 hover:gap-3 transition-all">
            <ArrowLeft size={20} />
            Back to Blog
          </Link>
          <div className="text-center py-20">
            <h1 className="text-4xl font-bold text-foreground mb-4">Article Not Found</h1>
            <p className="text-foreground/60 mb-8">Sorry, we couldn't find the article you're looking for.</p>
            <Link href="/blog" className="inline-flex items-center bg-secondary text-white px-6 py-3 rounded-lg font-bold hover:bg-secondary/90">
              Back to Blog
            </Link>
          </div>
        </div>
        <Footer />
      </main>
    )
  }

  return (
    <main className="w-full">
      <Header />
      <article className="w-full">
        <div className="bg-muted py-8 md:py-12">
          <div className="max-w-4xl mx-auto px-4">
            <Link href="/shared-ui/blog" className="inline-flex items-center gap-2 text-secondary font-bold mb-8 hover:gap-3 transition-all">
              <ArrowLeft size={20} />
              Back to Blog
            </Link>
          </div>
        </div>
        <BlogPostDetail article={article} />
        <CommentsSection articleId={article.id} />
        <RelatedArticles currentArticleId={article.id} />
      </article>
      <Footer />
    </main>
  )
}
