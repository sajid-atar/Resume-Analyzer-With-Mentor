"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ArrowLeft, Plus, FileText, Download, Globe, Trash2 } from "lucide-react"
import { toast } from "sonner"
import { useRouter } from 'next/navigation'
import { generatePDF } from '@/lib/generateDocument'

type Resume = {
  id: string
  title: string
  content: any
  createdAt: string
  updatedAt: string
  isPublic: boolean
}

export default function DashboardPage() {
  const [resumes, setResumes] = useState<Resume[]>([])
  const [loading, setLoading] = useState(true)
  const [downloading, setDownloading] = useState<string | null>(null)
  const router = useRouter()

  useEffect(() => {
    fetchResumes()
  }, [])

  const fetchResumes = async () => {
    try {
      const response = await fetch('/api/resumes')
      if (!response.ok) throw new Error('Failed to fetch resumes')
      const data = await response.json()
      setResumes(data)
    } catch (error) {
      console.error('Fetch resumes error:', error)
      toast.error('Failed to load resumes')
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (id: string) => {
    try {
      const response = await fetch(`/api/resumes/${id}`, {
        method: 'DELETE',
      })
      if (!response.ok) throw new Error('Failed to delete resume')
      
      // Remove the deleted resume from state
      setResumes(resumes.filter(resume => resume.id !== id))
      toast.success('Resume deleted successfully')
    } catch (error) {
      console.error('Delete resume error:', error)
      toast.error('Failed to delete resume')
    }
  }

  const handleDownloadPDF = async (resume: Resume) => {
    try {
      setDownloading(resume.id)
      
      // Create a temporary div for PDF generation
      const tempDiv = document.createElement('div')
      tempDiv.style.position = 'absolute'
      tempDiv.style.left = '-9999px'
      document.body.appendChild(tempDiv)
      
      // Render the resume preview
      const ResumePreview = (await import('@/components/resume-preview')).ResumePreview
      const root = document.createElement('div')
      root.innerHTML = '<div class="p-8 bg-white">' + ResumePreview({ resumeData: resume.content }).props.children + '</div>'
      tempDiv.appendChild(root)
      
      // Generate and download PDF
      const pdfDataUri = await generatePDF(tempDiv)
      const link = document.createElement('a')
      link.href = pdfDataUri
      link.download = `${resume.title || 'resume'}.pdf`
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
      
      // Clean up
      document.body.removeChild(tempDiv)
      toast.success('PDF downloaded successfully!')
    } catch (error) {
      console.error('PDF generation error:', error)
      toast.error('Failed to generate PDF')
    } finally {
      setDownloading(null)
    }
  }

  const handleEdit = (resume: Resume) => {
    // Store the resume data in localStorage for the editor
    localStorage.setItem('editResume', JSON.stringify(resume))
    router.push(`/create?resumeId=${resume.id}`)
  }

  return (
    <main className="min-h-screen bg-gray-50 pb-20">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="container mx-auto max-w-6xl px-4 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center text-gray-800 hover:text-purple-600">
            <ArrowLeft className="h-5 w-5 mr-2" />
            <span>Back to Home</span>
          </Link>
          <Link href="/create">
            <Button className="bg-purple-600 hover:bg-purple-700 text-white flex items-center">
              <Plus className="h-4 w-4 mr-2" />
              Create New Resume
            </Button>
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <div className="container mx-auto max-w-6xl px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">My Resumes</h1>
        </div>

        {loading ? (
          <div className="text-center py-12">Loading...</div>
        ) : resumes.length === 0 ? (
          <div className="text-center py-12">
            <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">No Resumes Yet</h3>
            <p className="text-gray-600 mb-4">Create your first resume to get started</p>
            <Link href="/create">
              <Button className="bg-purple-600 hover:bg-purple-700 text-white">
                Create Resume
              </Button>
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {resumes.map((resume) => (
              <div key={resume.id} className="bg-white rounded-xl shadow-sm p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center">
                    <FileText className="h-8 w-8 text-purple-600 mr-3" />
                    <div>
                      <h3 className="font-semibold">{resume.title}</h3>
                      <p className="text-sm text-gray-500">
                        Last updated: {new Date(resume.updatedAt).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={() => handleDelete(resume.id)}
                    className="text-gray-400 hover:text-red-500"
                  >
                    <Trash2 className="h-5 w-5" />
                  </button>
                </div>
                <div className="space-y-3">
                  <Link href={`/resume/${resume.id}`}>
                    <Button variant="outline" className="w-full flex items-center justify-center">
                      <FileText className="h-4 w-4 mr-2" />
                      View
                    </Button>
                  </Link>
                  <Button 
                    variant="outline" 
                    className="w-full flex items-center justify-center"
                    onClick={() => handleEdit(resume)}
                  >
                    Edit
                  </Button>
                  <div className="flex space-x-2">
                    <Button
                      variant="outline"
                      className="flex-1 flex items-center justify-center"
                      onClick={() => handleDownloadPDF(resume)}
                      disabled={downloading === resume.id}
                    >
                      <Download className="h-4 w-4 mr-2" />
                      {downloading === resume.id ? 'Downloading...' : 'PDF'}
                    </Button>
                    {resume.isPublic ? (
                      <Button
                        variant="outline"
                        className="flex-1 flex items-center justify-center"
                        onClick={async () => {
                          const shareUrl = `${window.location.origin}/resume/${resume.id}`
                          await navigator.clipboard.writeText(shareUrl)
                          toast.success('Share link copied to clipboard!')
                        }}
                      >
                        <Globe className="h-4 w-4 mr-2" />
                        Share
                      </Button>
                    ) : null}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  )
} 