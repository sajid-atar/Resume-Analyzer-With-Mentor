import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ArrowLeft, FileText } from "lucide-react"
import { ResumeUploader } from "@/components/resume-uploader"

export default function AnalyzePage() {
  return (
    <main className="min-h-screen bg-gray-50 pb-20">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="container mx-auto max-w-6xl px-4 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center text-gray-800 hover:text-purple-600">
            <ArrowLeft className="h-5 w-5 mr-2" />
            <span>Back to Home</span>
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <div className="container mx-auto max-w-4xl px-4 py-12">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold mb-4">Analyze Your Resume</h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Upload your resume and optionally paste a job description to get personalized feedback and suggestions to
            improve your chances of landing an interview.
          </p>
        </div>

        <ResumeUploader />

        <div className="mt-16 bg-white rounded-xl shadow-sm p-8 text-center">
          <FileText className="h-16 w-16 text-purple-600 mx-auto mb-4" />
          <h2 className="text-2xl font-bold mb-2">Don't have a resume yet?</h2>
          <p className="text-gray-600 mb-6">
            Create a professional resume with our easy-to-use builder. Choose from multiple templates and customize to
            your needs.
          </p>
          <Link href="/create">
            <Button className="bg-purple-600 hover:bg-purple-700 text-white">Create Resume</Button>
          </Link>
        </div>
      </div>
    </main>
  )
}

