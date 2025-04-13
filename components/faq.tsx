"use client"

import { useState } from "react"
import { ChevronDown, ChevronUp } from "lucide-react"

export function FAQ() {
  const faqs = [
    {
      question: "How does the resume builder work?",
      answer:
        "Our resume builder guides you through a step-by-step process to create a professional resume. You can choose from multiple templates, customize sections, and add your information. The builder provides real-time preview so you can see how your resume looks as you build it. Once you're satisfied, you can export your resume as a PDF, Word document, or share it online.",
    },
    {
      question: "How accurate is the AI analysis?",
      answer:
        "Our AI-powered analysis is highly accurate, using advanced NLP models to identify keywords, assess grammar, and evaluate structure. However, we recommend using it as a guide alongside your own judgment and industry knowledge. The AI continuously improves as it learns from more resumes and feedback.",
    },
    {
      question: "Who are the mentors on the platform?",
      answer:
        "Our mentors are industry professionals with extensive experience in hiring and career development. They include HR professionals, recruiters, career coaches, and industry experts across various fields. All mentors go through a rigorous vetting process to ensure they can provide valuable guidance to our users.",
    },
    {
      question: "Is my resume data secure?",
      answer:
        "Yes, we take data security seriously. Your resume data is encrypted in transit and at rest. We do not share your personal information with third parties without your consent, and you can request deletion of your data at any time. Our platform complies with GDPR and other privacy regulations.",
    },
    {
      question: "How does the job description matching work?",
      answer:
        "When you paste a job description, our AI analyzes the key requirements, skills, and qualifications mentioned. It then compares these with the content of your resume to identify matches and gaps, providing a match percentage and suggestions for improvement. This helps you tailor your resume for specific job applications.",
    },
    {
      question: "Can I use this for different industries?",
      answer:
        "Yes, our system is designed to work across various industries. The AI adapts to different resume formats and job requirements, providing relevant suggestions based on the specific context of your industry and role. We also have industry-specific templates and mentors to provide tailored guidance.",
    },
  ]

  const [openIndex, setOpenIndex] = useState<number | null>(null)

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  return (
    <section className="w-full py-20 px-4 md:px-6">
      <div className="container mx-auto max-w-4xl">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold mb-4">Frequently Asked Questions</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Find answers to common questions about our Resume Analyzer platform.
          </p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div key={index} className="border border-gray-200 rounded-lg overflow-hidden">
              <button
                className="w-full flex items-center justify-between p-4 text-left bg-white hover:bg-gray-50 transition-colors"
                onClick={() => toggleFAQ(index)}
              >
                <span className="font-medium">{faq.question}</span>
                {openIndex === index ? (
                  <ChevronUp className="h-5 w-5 text-gray-500" />
                ) : (
                  <ChevronDown className="h-5 w-5 text-gray-500" />
                )}
              </button>

              {openIndex === index && (
                <div className="p-4 bg-gray-50 border-t border-gray-200">
                  <p className="text-gray-600">{faq.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <p className="text-gray-600 mb-4">Still have questions?</p>
          <button className="text-purple-600 hover:text-purple-700 font-medium">Contact our support team</button>
        </div>
      </div>
    </section>
  )
}

