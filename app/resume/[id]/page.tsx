"use client"

import { useEffect, useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ArrowLeft, Download, Globe } from "lucide-react"
import { ResumePreview } from "@/components/resume-preview"
import { generatePDF } from '@/lib/generateDocument'
import { toast } from "sonner"

type Resume = {
  id: string
  title: string
  content: any
  createdAt: string
  updatedAt: string
  isPublic: boolean
}

export default function ResumePage({ params }: { params: { id: string } }) {
  const [resume, setResume] = useState<Resume | null>(null)
  const [loading, setLoading] = useState(true)
  const [downloading, setDownloading] = useState(false)
  const resumeRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    fetchResume()
  }, [])

  const fetchResume = async () => {
    try {
      const response = await fetch(`/api/resumes/${params.id}`)
      if (!response.ok) throw new Error('Failed to fetch resume')
      const data = await response.json()
      setResume(data)
    } catch (error) {
      console.error('Fetch resume error:', error)
      toast.error('Failed to load resume')
    } finally {
      setLoading(false)
    }
  }

  const handleDownloadPDF = async () => {
    if (!resume || !resumeRef.current) return

    try {
      setDownloading(true)
      
      // Generate and download PDF
      const pdfDataUri = await generatePDF(resumeRef.current)
      const link = document.createElement('a')
      link.href = pdfDataUri
      link.download = `${resume.title || 'resume'}.pdf`
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
      
      toast.success('PDF downloaded successfully!')
    } catch (error) {
      console.error('PDF generation error:', error)
      toast.error('Failed to generate PDF')
    } finally {
      setDownloading(false)
    }
  }

  if (loading) {
    return <div className="text-center py-12">Loading...</div>
  }

  if (!resume) {
    return (
      <div className="text-center py-12">
        <h1 className="text-2xl font-bold mb-4">Resume not found</h1>
        <Link href="/dashboard">
          <Button variant="outline">Back to Dashboard</Button>
        </Link>
      </div>
    )
  }

  return (
    <main className="min-h-screen bg-gray-50 pb-20">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="container mx-auto max-w-6xl px-4 py-4 flex items-center justify-between">
          <Link href="/dashboard" className="flex items-center text-gray-800 hover:text-purple-600">
            <ArrowLeft className="h-5 w-5 mr-2" />
            <span>Back to Dashboard</span>
          </Link>
          <div className="flex items-center space-x-4">
            <Button
              variant="outline"
              className="flex items-center"
              onClick={handleDownloadPDF}
              disabled={downloading}
            >
              <Download className="h-4 w-4 mr-2" />
              {downloading ? 'Downloading...' : 'Download PDF'}
            </Button>
            {resume.isPublic && (
              <Button
                className="bg-purple-600 hover:bg-purple-700 text-white flex items-center"
                onClick={async () => {
                  const shareUrl = window.location.href
                  await navigator.clipboard.writeText(shareUrl)
                  toast.success('Share link copied to clipboard!')
                }}
              >
                <Globe className="h-4 w-4 mr-2" />
                Share
              </Button>
            )}
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="container mx-auto max-w-4xl px-4 py-8">
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h1 className="text-2xl font-bold mb-6">{resume.title}</h1>
          <div className="border border-gray-200 rounded-lg overflow-hidden" ref={resumeRef}>
            <ResumePreview resumeData={resume.content} />
          </div>
        </div>
      </div>
    </main>
  )
} 