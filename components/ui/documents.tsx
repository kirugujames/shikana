"use client"

import { useState } from "react"
import dynamic from "next/dynamic"
import { FileText, Eye } from "lucide-react"

type DocumentItem = {
  title: string
  description: string
  category: string
  file: string
}

// ✅ Dynamic import — SSR OFF
const PdfReaderModal = dynamic(
  () => import("@/components/ui/PdfReaderModal").then(mod => mod.PdfReaderModal),
  { ssr: false }
)

const documents: DocumentItem[] = [
  {
    title: "Party Constitution",
    description: "The foundational principles and governing structure of the party.",
    category: "Legal",
    file: "/documents/constitution.pdf",
  },
  {
    title: "Party Manifesto",
    description: "Our vision, commitments, and roadmap for national transformation.",
    category: "Manifesto",
    file: "/documents/manifesto.pdf",
  },
  {
    title: "Policy Framework",
    description: "Detailed policy positions across key sectors.",
    category: "Policy",
    file: "/documents/party-policy.pdf",
  },
]

export function PartyDocumentsSection() {
  const [activeDoc, setActiveDoc] = useState<DocumentItem | null>(null)

  return (
    <section className="py-16 px-4 bg-background">
      <div className="max-w-6xl mx-auto">

        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Party Documents
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Access official documents that define our vision, principles, and policies.
            All documents can be read directly in your browser.
          </p>
        </div>

        {/* Documents Grid */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {documents.map((doc, index) => (
            <div
              key={index}
              className="group bg-card border border-border rounded-xl p-6 hover:shadow-lg transition-all"
            >
              <div className="flex items-start gap-4 mb-4">
                <div className="p-3 bg-secondary/10 rounded-lg">
                  <FileText className="text-secondary" />
                </div>
                <div>
                  <span className="text-xs uppercase tracking-wide text-secondary font-semibold">
                    {doc.category}
                  </span>
                  <h3 className="text-xl font-bold mt-1">
                    {doc.title}
                  </h3>
                </div>
              </div>

              <p className="text-muted-foreground mb-6">
                {doc.description}
              </p>

              <button
                onClick={() => setActiveDoc(doc)}
                className="inline-flex items-center gap-2 font-semibold text-secondary hover:text-secondary/80 transition"
              >
                <Eye size={18} />
                Read Document
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* PDF Reader Modal */}
      {activeDoc && (
        <PdfReaderModal
          file={activeDoc.file}
          title={activeDoc.title}
          onClose={() => setActiveDoc(null)}
        />
      )}
    </section>
  )
}
