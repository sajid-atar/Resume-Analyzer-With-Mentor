"use client"

import { useState, useEffect } from "react"
import { UploadIcon, FileText, X, CheckCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { useRouter } from "next/navigation"
import { toast } from "sonner"

export function ResumeUploader() {
  const [file, setFile] = useState<File | null>(null)
  const [jobDescription, setJobDescription] = useState("")
  const [uploading, setUploading] = useState(false)
  const [uploadProgress, setUploadProgress] = useState(0)
  const [mounted, setMounted] = useState(false)
  const router = useRouter()

  useEffect(() => {
    setMounted(true)
  }, [])

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0]
      setFile(file)
    }
  }

  const handleRemoveFile = () => {
    setFile(null)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!file) return

    try {
      setUploading(true)
      setUploadProgress(10)

      // Read the file content
      const text = await readFileContent(file)
      setUploadProgress(30)

      // Send to analysis API
      const response = await fetch("/api/analyze", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          resumeText: text,
          jobDescription: jobDescription,
        }),
      })

      setUploadProgress(70)

      if (!response.ok) {
        throw new Error("Analysis failed")
      }

      const analysis = await response.json()
      setUploadProgress(100)

      // Store analysis results in localStorage
      localStorage.setItem("resumeAnalysis", JSON.stringify(analysis))
      localStorage.setItem("lastUploadedFile", file.name)
      localStorage.setItem("resumeText", text)
      localStorage.setItem("jobDescription", jobDescription)

      // Redirect to results page
      toast.success("Analysis complete!")
      router.push("/analysis/results")
    } catch (error) {
      console.error("Analysis error:", error)
      toast.error("Failed to analyze resume")
      setUploading(false)
      setUploadProgress(0)
    }
  }

  const readFileContent = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader()
      reader.onload = (e) => {
        if (e.target?.result) {
          resolve(e.target.result as string)
        } else {
          reject(new Error("Failed to read file"))
        }
      }
      reader.onerror = () => reject(reader.error)
      reader.readAsText(file)
    })
  }

  if (!mounted) {
    return null // Return null on server-side and first render
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      <div className="bg-white rounded-xl shadow-sm p-8">
        {/* File Upload Area */}
        <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center mb-6">
          {!file ? (
            <label className="cursor-pointer block">
              <input
                type="file"
                accept=".txt,.doc,.docx,.pdf"
                onChange={handleFileChange}
                className="hidden"
              />
              <UploadIcon className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium mb-2">Upload your resume</h3>
              <p className="text-sm text-gray-500">
                Drag and drop or click to upload (PDF, DOC, DOCX, TXT)
              </p>
            </label>
          ) : (
            <div>
              <div className="flex items-center justify-center space-x-3 mb-4">
                <FileText className="h-8 w-8 text-purple-600" />
                <span className="font-medium">{file.name}</span>
                <button
                  type="button"
                  onClick={handleRemoveFile}
                  className="text-red-500 hover:text-red-600"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Job Description Input */}
        <div className="space-y-4">
          <label className="block text-sm font-medium text-gray-700">
            Paste Job Description (Optional)
          </label>
          <textarea
            className="w-full h-40 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            placeholder="Paste the job description here to get tailored recommendations..."
            value={jobDescription}
            onChange={(e) => setJobDescription(e.target.value)}
          />
        </div>
      </div>

      {uploading && (
        <div className="mt-6 space-y-2">
          <div className="flex justify-between text-sm">
            <span>Analyzing resume...</span>
            <span>{uploadProgress}%</span>
          </div>
          <Progress value={uploadProgress} className="h-2" />
        </div>
      )}

      <div className="mt-8 flex justify-center">
        <Button
          type="submit"
          className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-2 rounded-lg"
          disabled={!file || uploading}
        >
          {uploading ? "Analyzing..." : "Analyze Resume"}
        </Button>
      </div>
    </form>
  )
}

