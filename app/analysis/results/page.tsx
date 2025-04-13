"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import {
  ArrowLeft,
  Download,
  FileText,
  CheckCircle,
  AlertCircle,
  BarChart4,
  Zap,
  Search,
  MessageSquare,
  X,
} from "lucide-react"
import Link from "next/link"
import { MentorSuggestions } from "@/components/mentor-suggestions"
import { useRouter } from "next/navigation"
import { toast } from "sonner"

type Analysis = {
  overallScore: number
  scores: Array<{
    name: string
    score: number
  }>
  suggestions: Array<{
    category: string
    items: string[]
    priority: string
  }>
  resumeDetails?: {
    filename: string
    uploadDate: string
    jobMatch: string
    wordCount: number
  }
}

export default function AnalysisResultsPage() {
  const [analysis, setAnalysis] = useState<Analysis | null>(null)
  const [showMentorChat, setShowMentorChat] = useState(false)
  const router = useRouter()

  useEffect(() => {
    // Get analysis results from localStorage
    const storedAnalysis = localStorage.getItem("resumeAnalysis")
    if (!storedAnalysis) {
      router.push("/analyze")
      return
    }

    try {
      const parsedAnalysis = JSON.parse(storedAnalysis)
      // Add resume details if not present
      if (!parsedAnalysis.resumeDetails) {
        const uploadDate = new Date().toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'long',
          day: 'numeric'
        })
        parsedAnalysis.resumeDetails = {
          filename: localStorage.getItem("lastUploadedFile") || "resume.pdf",
          uploadDate: uploadDate,
          jobMatch: localStorage.getItem("jobDescription") ? "Custom Job Description" : "Software Engineer",
          wordCount: countWords(localStorage.getItem("resumeText") || "")
        }
      }
      setAnalysis(parsedAnalysis)
    } catch (error) {
      console.error("Error parsing analysis:", error)
      router.push("/analyze")
    }
  }, [router])

  const countWords = (text: string): number => {
    return text.trim().split(/\s+/).length
  }

  const handleExportReport = async () => {
    try {
      const response = await fetch("/api/export-report", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(analysis),
      })

      // Check if response is ok and is of type application/pdf
      const contentType = response.headers.get('content-type')
      if (!response.ok || !contentType?.includes('application/pdf')) {
        const errorData = await response.json()
        throw new Error(errorData.error || "Export failed")
      }

      // Get the filename from the Content-Disposition header or use a default
      const contentDisposition = response.headers.get('content-disposition')
      const filename = contentDisposition?.split('filename=')[1]?.replace(/["']/g, '') || 
                      `resume-analysis-${new Date().toISOString().split("T")[0]}.pdf`

      const blob = await response.blob()
      const url = window.URL.createObjectURL(blob)
      const a = document.createElement("a")
      a.href = url
      a.download = filename
      document.body.appendChild(a)
      a.click()
      window.URL.revokeObjectURL(url)
      document.body.removeChild(a)
      
      toast.success("Report exported successfully!")
    } catch (error) {
      console.error("Export error:", error)
      toast.error(error instanceof Error ? error.message : "Failed to export report. Please try again.")
    }
  }

  const handleChatWithMentor = () => {
    setShowMentorChat(true)
  }

  if (!analysis) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-xl font-semibold mb-2">Loading analysis...</h2>
          <p className="text-gray-600">Please wait while we load your results.</p>
        </div>
      </div>
    )
  }

  const getScoreIcon = (name: string) => {
    switch (name) {
      case "ATS Compatibility":
        return <FileText className="h-5 w-5" />
      case "Keyword Match":
        return <Search className="h-5 w-5" />
      case "Content Quality":
        return <BarChart4 className="h-5 w-5" />
      case "Grammar & Style":
        return <CheckCircle className="h-5 w-5" />
      case "Impact Statements":
        return <Zap className="h-5 w-5" />
      default:
        return <CheckCircle className="h-5 w-5" />
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority.toLowerCase()) {
      case "high":
        return "bg-red-50 text-red-700 border-red-200"
      case "medium":
        return "bg-yellow-50 text-yellow-700 border-yellow-200"
      case "low":
        return "bg-green-50 text-green-700 border-green-200"
      default:
        return "bg-gray-50 text-gray-700 border-gray-200"
    }
  }

  return (
    <main className="min-h-screen bg-gray-50 pb-20">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="container mx-auto max-w-6xl px-4 py-4 flex items-center justify-between">
          <Link href="/analyze" className="flex items-center text-gray-800 hover:text-purple-600">
            <ArrowLeft className="h-5 w-5 mr-2" />
            <span>Back to Upload</span>
          </Link>
          <div className="flex items-center space-x-4">
            <Button 
              variant="outline" 
              className="flex items-center space-x-2"
              onClick={handleExportReport}
            >
              <Download className="h-4 w-4" />
              <span>Export Report</span>
            </Button>
            <Button 
              className="bg-purple-600 hover:bg-purple-700 text-white flex items-center space-x-2"
              onClick={handleChatWithMentor}
            >
              <MessageSquare className="h-4 w-4" />
              <span>Chat with Mentor</span>
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="container mx-auto max-w-6xl px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Score Overview */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
              <h2 className="text-xl font-bold mb-4">Resume Score</h2>

              <div className="relative flex items-center justify-center mb-6">
                <svg className="w-32 h-32" viewBox="0 0 36 36">
                  <path
                    d="M18 2.0845
                      a 15.9155 15.9155 0 0 1 0 31.831
                      a 15.9155 15.9155 0 0 1 0 -31.831"
                    fill="none"
                    stroke="#E5E7EB"
                    strokeWidth="3"
                    strokeDasharray="100, 100"
                  />
                  <path
                    d="M18 2.0845
                      a 15.9155 15.9155 0 0 1 0 31.831
                      a 15.9155 15.9155 0 0 1 0 -31.831"
                    fill="none"
                    stroke="#8B5CF6"
                    strokeWidth="3"
                    strokeDasharray={`${analysis.overallScore}, 100`}
                  />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center flex-col">
                  <span className="text-3xl font-bold">{analysis.overallScore}%</span>
                  <span className="text-sm text-gray-500">Overall</span>
                </div>
              </div>

              <div className="space-y-4">
                {analysis.scores.map((score, index) => (
                  <div key={index}>
                    <div className="flex items-center justify-between mb-1">
                      <div className="flex items-center">
                        <div className="mr-2 text-purple-600">{getScoreIcon(score.name)}</div>
                        <span className="text-sm font-medium">{score.name}</span>
                      </div>
                      <span className="text-sm font-semibold">{score.score}%</span>
                    </div>
                    <Progress value={score.score} className="h-2" />
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm p-6">
              <h2 className="text-xl font-bold mb-4">Resume Details</h2>
              <div className="space-y-4">
                <div>
                  <p className="text-sm text-gray-500">Filename</p>
                  <p className="font-medium">{analysis?.resumeDetails?.filename}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Uploaded</p>
                  <p className="font-medium">{analysis?.resumeDetails?.uploadDate}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Job Match</p>
                  <p className="font-medium">{analysis?.resumeDetails?.jobMatch}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Word Count</p>
                  <p className="font-medium">{analysis?.resumeDetails?.wordCount} words</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Suggestions */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
              <h2 className="text-xl font-bold mb-4">Key Suggestions</h2>
              <div className="space-y-6">
                {analysis.suggestions.map((suggestion, index) => (
                  <div key={index} className="space-y-3">
                    <div className="flex items-center justify-between">
                      <h3 className="font-semibold text-gray-900">{suggestion.category}</h3>
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(
                          suggestion.priority
                        )}`}
                      >
                        {suggestion.priority} Priority
                      </span>
                    </div>
                    <ul className="space-y-2">
                      {suggestion.items.map((item, itemIndex) => (
                        <li key={itemIndex} className="flex items-start">
                          <AlertCircle className="h-5 w-5 text-purple-600 mr-2 flex-shrink-0 mt-0.5" />
                          <span className="text-gray-700">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
              <h2 className="text-xl font-bold mb-4">AI-Powered Improvements</h2>
              <p className="text-gray-600 mb-6">
                Here are some AI-generated suggestions to improve specific sections of your resume.
              </p>

              <div className="space-y-6">
                <div className="border border-gray-200 rounded-lg p-4">
                  <h3 className="font-semibold mb-2">Work Experience - Software Developer at XYZ Corp</h3>
                  <div className="mb-4">
                    <p className="text-sm text-gray-500 mb-1">Original</p>
                    <p className="bg-gray-50 p-3 rounded text-gray-700">
                      Developed web applications using React and Node.js. Worked with team members on various projects.
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 mb-1">Suggested Improvement</p>
                    <p className="bg-green-50 p-3 rounded text-gray-700 border-l-4 border-green-500">
                      Engineered responsive web applications using React and Node.js, reducing load times by 40%.
                      Collaborated with cross-functional teams to deliver 5 major projects with an average of 20% faster
                      time-to-market than company benchmarks.
                    </p>
                  </div>
                </div>

                <div className="border border-gray-200 rounded-lg p-4">
                  <h3 className="font-semibold mb-2">Skills Section</h3>
                  <div className="mb-4">
                    <p className="text-sm text-gray-500 mb-1">Original</p>
                    <p className="bg-gray-50 p-3 rounded text-gray-700">JavaScript, React, CSS, HTML, Node.js</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 mb-1">Suggested Improvement</p>
                    <p className="bg-green-50 p-3 rounded text-gray-700 border-l-4 border-green-500">
                      <strong>Frontend:</strong> JavaScript (ES6+), React, Redux, TypeScript, HTML5, CSS3, Tailwind CSS
                      <br />
                      <strong>Backend:</strong> Node.js, Express, RESTful APIs, GraphQL
                      <br />
                      <strong>Tools & Methods:</strong> Git, CI/CD, Agile/Scrum, Jest, Webpack
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <MentorSuggestions />
          </div>
        </div>
      </div>

      {/* Mentor Chat Modal */}
      {showMentorChat && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 w-full max-w-2xl max-h-[80vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">Chat with AI Mentor</h2>
              <button
                onClick={() => setShowMentorChat(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <X className="h-6 w-6" />
              </button>
            </div>
            <MentorSuggestions />
          </div>
        </div>
      )}
    </main>
  )
}

