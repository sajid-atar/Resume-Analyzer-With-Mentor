"use client"

import type React from "react"

import { useState } from "react"
import { UploadIcon, FileText, X, CheckCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"

export function Upload() {
  const [file, setFile] = useState<File | null>(null)
  const [jobDescription, setJobDescription] = useState("")
  const [uploading, setUploading] = useState(false)
  const [uploadProgress, setUploadProgress] = useState(0)
  const [uploadComplete, setUploadComplete] = useState(false)

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0])
    }
  }

  const handleRemoveFile = () => {
    setFile(null)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!file) return

    setUploading(true)

    // Simulate upload progress
    let progress = 0
    const interval = setInterval(() => {
      progress += 10
      setUploadProgress(progress)

      if (progress >= 100) {
        clearInterval(interval)
        setUploading(false)
        setUploadComplete(true)
        // Here you would redirect to results page in a real app
        setTimeout(() => {
          window.location.href = "/analysis"
        }, 1500)
      }
    }, 300)
  }

  return (
    <section className="w-full py-20 px-4 md:px-6 bg-gray-50">
      <div className="container mx-auto max-w-4xl">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Upload Your Resume</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Upload your resume and paste a job description to get personalized feedback and suggestions to improve your
            chances of landing an interview.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="bg-white p-8 rounded-xl shadow-md">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Resume Upload */}
            <div className="space-y-4">
              <label className="block text-sm font-medium text-gray-700">Upload Resume (PDF or DOCX)</label>

              {!file ? (
                <div
                  className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center cursor-pointer hover:bg-gray-50 transition-colors"
                  onClick={() => document.getElementById("resume-upload")?.click()}
                >
                  <UploadIcon className="mx-auto h-12 w-12 text-gray-400" />
                  <p className="mt-2 text-sm text-gray-500">Click to upload or drag and drop</p>
                  <p className="text-xs text-gray-400 mt-1">PDF, DOCX up to 5MB</p>
                  <input
                    id="resume-upload"
                    type="file"
                    accept=".pdf,.docx"
                    className="hidden"
                    onChange={handleFileChange}
                  />
                </div>
              ) : (
                <div className="border border-gray-200 rounded-lg p-4 flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <FileText className="h-8 w-8 text-purple-600" />
                    <div>
                      <p className="text-sm font-medium">{file.name}</p>
                      <p className="text-xs text-gray-500">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
                    </div>
                  </div>
                  <button type="button" onClick={handleRemoveFile} className="text-gray-400 hover:text-gray-500">
                    <X className="h-5 w-5" />
                  </button>
                </div>
              )}
            </div>

            {/* Job Description */}
            <div className="space-y-4">
              <label className="block text-sm font-medium text-gray-700">Paste Job Description (Optional)</label>
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
                <span>Uploading...</span>
                <span>{uploadProgress}%</span>
              </div>
              <Progress value={uploadProgress} className="h-2" />
            </div>
          )}

          {uploadComplete && (
            <div className="mt-6 flex items-center justify-center text-green-600 space-x-2">
              <CheckCircle className="h-5 w-5" />
              <span>Upload complete! Redirecting to analysis...</span>
            </div>
          )}

          <div className="mt-8 flex justify-center">
            <Button
              type="submit"
              className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-2 rounded-lg"
              disabled={!file || uploading || uploadComplete}
            >
              Analyze Resume
            </Button>
          </div>
        </form>
      </div>
    </section>
  )
}

