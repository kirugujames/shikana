"use client"

import { useState } from "react"
import { Document, Page, pdfjs } from "react-pdf"
import { X, ZoomIn, ZoomOut, ChevronLeft, ChevronRight } from "lucide-react"

// ✅ WORKING worker path for these versions
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`

type PdfReaderModalProps = {
  file: string
  title: string
  onClose: () => void
}

export function PdfReaderModal({ file, title, onClose }: PdfReaderModalProps) {
  const [numPages, setNumPages] = useState<number>()
  const [pageNumber, setPageNumber] = useState(1)
  const [scale, setScale] = useState(1.1)

  return (
    <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-2 sm:p-4">
      <div className="bg-background w-full max-w-6xl h-[95vh] rounded-xl flex flex-col overflow-hidden">

        {/* Header */}
        <div className="flex items-center justify-between px-4 py-3 border-b">
          <h3 className="font-bold truncate">{title}</h3>
          <button onClick={onClose} className="p-2 hover:bg-muted rounded-lg">
            <X />
          </button>
        </div>

        {/* Controls */}
        <div className="flex items-center justify-between px-3 py-2 border-b text-sm">
          <div className="flex items-center gap-2">
            <button onClick={() => setPageNumber(p => Math.max(p - 1, 1))}>
              <ChevronLeft />
            </button>
            <span>Page {pageNumber} / {numPages}</span>
            <button onClick={() => setPageNumber(p => Math.min(p + 1, numPages || 1))}>
              <ChevronRight />
            </button>
          </div>

          <div className="flex items-center gap-2">
            <button onClick={() => setScale(s => Math.max(s - 0.1, 0.6))}>
              <ZoomOut />
            </button>
            <button onClick={() => setScale(s => Math.min(s + 0.1, 2))}>
              <ZoomIn />
            </button>
          </div>
        </div>

        {/* PDF */}
        <div className="flex-1 overflow-auto flex justify-center bg-muted p-4 relative">
          <div className="pointer-events-none absolute inset-0 flex items-center justify-center opacity-10 text-5xl font-bold rotate-[-30deg]">
            Shikana Frontliners for Unity Party
          </div>

          <Document
            file={file}
            onLoadSuccess={({ numPages }) => setNumPages(numPages)}
            onLoadError={(e) => console.error("PDF load error:", e)}
          >
            <Page pageNumber={pageNumber} scale={scale} />
          </Document>
        </div>
      </div>
    </div>
  )
}
