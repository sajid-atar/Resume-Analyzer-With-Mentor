"use client"

import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { ResumeBuilder } from "@/components/resume-builder"

export default function CreateResumePage() {
  return (
    <main className="min-h-screen bg-gray-50 pb-20">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="container mx-auto max-w-6xl px-4 py-4 flex items-center">
          <Link href="/" className="flex items-center text-gray-800 hover:text-purple-600">
            <ArrowLeft className="h-5 w-5 mr-2" />
            <span>Back to Home</span>
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <div className="container mx-auto max-w-6xl px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-2">Create Your Resume</h1>
          <p className="text-gray-600">Follow the steps below to create a professional resume that stands out.</p>
        </div>

        <ResumeBuilder />
      </div>
    </main>
  )
}

