import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ArrowRight, FileText, MessageSquare, BarChart4, CheckCircle } from "lucide-react"
import { Testimonials } from "@/components/testimonials"
import { Features } from "@/components/features"
import { HowItWorks } from "@/components/how-it-works"
import { FAQ } from "@/components/faq"

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col">
      {/* Hero Section */}
      <section className="w-full bg-gradient-to-r from-purple-700 to-indigo-800 py-24 px-4 md:px-6">
        <div className="container mx-auto max-w-6xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <div className="inline-block px-3 py-1 bg-purple-900/30 text-purple-100 rounded-full text-sm font-medium mb-2">
                All-in-one Resume Platform
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight">
                Create, Analyze & Perfect Your Resume
              </h1>
              <p className="text-lg text-purple-100">
                Build professional resumes, get AI-powered feedback, and connect with career mentors to land your dream
                job.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/create">
                  <Button
                    size="lg"
                    className="bg-white text-purple-800 hover:bg-purple-50 px-6 py-6 rounded-lg font-medium transition-colors"
                  >
                    Create Resume
                  </Button>
                </Link>
                <Link href="/analyze">
                  <Button
                    size="lg"
                    variant="outline"
                    className="bg-transparent border border-white text-white hover:bg-white/10 px-6 py-6 rounded-lg font-medium transition-colors"
                  >
                    Analyze Existing Resume
                  </Button>
                </Link>
              </div>
              <div className="flex items-center space-x-2 text-purple-100">
                <CheckCircle className="h-5 w-5" />
                <span>No credit card required</span>
              </div>
            </div>
            <div className="relative hidden md:block">
              <div className="absolute -top-12 -left-12 w-64 h-64 bg-gradient-to-br from-purple-500/20 to-indigo-500/20 rounded-full blur-3xl"></div>
              <div className="absolute -bottom-12 -right-12 w-64 h-64 bg-gradient-to-br from-indigo-500/20 to-purple-500/20 rounded-full blur-3xl"></div>
              <div className="relative bg-white p-4 rounded-xl shadow-2xl rotate-3 z-10">
                <img
                  src="/images/Home_page_images/Create_Analyze_&_Perfect_Your_Resume_image.jpg"
                  alt="Resume Builder Interface"
                  className="rounded-lg w-full"
                />
              </div>
              <div className="absolute -bottom-8 -left-8 bg-white p-4 rounded-xl shadow-xl -rotate-6 z-20">
                <div className="bg-gradient-to-r from-purple-100 to-indigo-100 p-4 rounded-lg">
                  <div className="flex items-center space-x-2 mb-2">
                    <BarChart4 className="h-5 w-5 text-purple-600" />
                    <h3 className="font-semibold text-purple-800">Resume Score</h3>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="text-3xl font-bold text-purple-800">92%</div>
                    <div className="text-green-600 text-sm font-medium bg-green-100 px-2 py-1 rounded">
                      +15% Improvement
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="w-full py-12 px-4 md:px-6 bg-white">
        <div className="container mx-auto max-w-6xl">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-purple-800 mb-2">10k+</div>
              <p className="text-gray-600">Resumes Created</p>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-purple-800 mb-2">85%</div>
              <p className="text-gray-600">Interview Rate</p>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-purple-800 mb-2">200+</div>
              <p className="text-gray-600">Expert Mentors</p>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-purple-800 mb-2">4.8/5</div>
              <p className="text-gray-600">User Rating</p>
            </div>
          </div>
        </div>
      </section>

      {/* Main Features */}
      <section className="w-full py-20 px-4 md:px-6 bg-gray-50">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Everything You Need to Land Your Dream Job</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Our all-in-one platform helps you create professional resumes, get AI-powered feedback, and connect with
              career mentors.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white rounded-xl shadow-sm p-8 border border-gray-100 hover:shadow-md transition-shadow">
              <div className="h-14 w-14 bg-purple-100 rounded-lg flex items-center justify-center mb-6">
                <FileText className="h-7 w-7 text-purple-600" />
              </div>
              <h3 className="text-xl font-bold mb-3">Resume Builder</h3>
              <p className="text-gray-600 mb-6">
                Create professional resumes with our easy-to-use builder. Choose from multiple templates and customize
                to your needs.
              </p>
              <Link href="/create" className="text-purple-600 font-medium flex items-center hover:text-purple-700">
                Create Resume <ArrowRight className="h-4 w-4 ml-2" />
              </Link>
            </div>

            <div className="bg-white rounded-xl shadow-sm p-8 border border-gray-100 hover:shadow-md transition-shadow">
              <div className="h-14 w-14 bg-purple-100 rounded-lg flex items-center justify-center mb-6">
                <BarChart4 className="h-7 w-7 text-purple-600" />
              </div>
              <h3 className="text-xl font-bold mb-3">AI Analysis</h3>
              <p className="text-gray-600 mb-6">
                Get detailed feedback on your resume with our AI-powered analysis. Improve your chances of getting past
                ATS systems.
              </p>
              <Link href="/analyze" className="text-purple-600 font-medium flex items-center hover:text-purple-700">
                Analyze Resume <ArrowRight className="h-4 w-4 ml-2" />
              </Link>
            </div>

            <div className="bg-white rounded-xl shadow-sm p-8 border border-gray-100 hover:shadow-md transition-shadow">
              <div className="h-14 w-14 bg-purple-100 rounded-lg flex items-center justify-center mb-6">
                <MessageSquare className="h-7 w-7 text-purple-600" />
              </div>
              <h3 className="text-xl font-bold mb-3">Mentor Chat</h3>
              <p className="text-gray-600 mb-6">
                Connect with career mentors and get personalized advice on your resume and job search strategy.
              </p>
              <Link href="/mentors" className="text-purple-600 font-medium flex items-center hover:text-purple-700">
                Find Mentors <ArrowRight className="h-4 w-4 ml-2" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Resume Builder Preview */}
      <section className="w-full py-20 px-4 md:px-6">
        <div className="container mx-auto max-w-6xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-block px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-sm font-medium mb-4">
                Resume Builder
              </div>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">Create Professional Resumes in Minutes</h2>
              <p className="text-lg text-gray-600 mb-8">
                Our intuitive resume builder makes it easy to create professional resumes that stand out. Choose from
                multiple templates, customize sections, and export to PDF.
              </p>
              <ul className="space-y-4 mb-8">
                {[
                  "Step-by-step guided process",
                  "Multiple professional templates",
                  "Real-time preview",
                  "Export to PDF, Word, or share online",
                  "ATS-friendly designs",
                ].map((item, i) => (
                  <li key={i} className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-3 flex-shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <Link href="/create">
                <Button className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-lg">
                  Try Resume Builder
                </Button>
              </Link>
            </div>
            <div className="relative">
              <div className="absolute -top-6 -left-6 -right-6 -bottom-6 bg-gradient-to-r from-purple-200 to-indigo-200 rounded-xl -z-10 blur-sm"></div>
              <img
                src="/images/Home_page_images/Create_Professional_Resumes_in_Minutes_image.jpg"
                alt="Resume Builder Interface"
                className="rounded-xl shadow-lg w-full border-8 border-white"
              />
            </div>
          </div>
        </div>
      </section>

      {/* AI Analysis Preview */}
      <section className="w-full py-20 px-4 md:px-6 bg-gray-50">
        <div className="container mx-auto max-w-6xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="order-2 md:order-1 relative">
              <div className="absolute -top-6 -left-6 -right-6 -bottom-6 bg-gradient-to-r from-indigo-200 to-purple-200 rounded-xl -z-10 blur-sm"></div>
              <img
                src="/images/Home_page_images/Get_Detailed_Feedback_image.jpg"
                alt="AI Analysis Dashboard"
                className="rounded-xl shadow-lg w-full border-8 border-white"
              />
            </div>
            <div className="order-1 md:order-2">
              <div className="inline-block px-3 py-1 bg-indigo-100 text-indigo-800 rounded-full text-sm font-medium mb-4">
                AI Analysis
              </div>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">Get Detailed Feedback on Your Resume</h2>
              <p className="text-lg text-gray-600 mb-8">
                Our AI-powered analysis provides detailed feedback on your resume, helping you improve your chances of
                getting past ATS systems and landing interviews.
              </p>
              <ul className="space-y-4 mb-8">
                {[
                  "Keyword analysis and optimization",
                  "ATS compatibility check",
                  "Grammar and style suggestions",
                  "Content improvement recommendations",
                  "Industry-specific feedback",
                ].map((item, i) => (
                  <li key={i} className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-3 flex-shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <Link href="/analyze">
                <Button className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-lg">
                  Analyze Your Resume
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Mentor Chat Preview */}
      <section className="w-full py-20 px-4 md:px-6">
        <div className="container mx-auto max-w-6xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-block px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-sm font-medium mb-4">
                Mentor Chat
              </div>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">Connect with Career Mentors</h2>
              <p className="text-lg text-gray-600 mb-8">
                Get personalized advice from career mentors who have been in your shoes. Our mentors provide feedback on
                your resume and help you with your job search strategy.
              </p>
              <ul className="space-y-4 mb-8">
                {[
                  "Connect with industry experts",
                  "Get personalized feedback",
                  "Real-time chat with mentors",
                  "Share your resume for review",
                  "Get advice on job search strategy",
                ].map((item, i) => (
                  <li key={i} className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-3 flex-shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <Link href="/mentors">
                <Button className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-lg">
                  Find Mentors
                </Button>
              </Link>
            </div>
            <div className="relative">
              <div className="absolute -top-6 -left-6 -right-6 -bottom-6 bg-gradient-to-r from-purple-200 to-indigo-200 rounded-xl -z-10 blur-sm"></div>
              <img
                src="/images/Home_page_images/Connect_with_career_mentor_image.jpg"
                alt="Mentor Chat Interface"
                className="rounded-xl shadow-lg w-full border-8 border-white"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <Features />

      {/* How It Works */}
      <HowItWorks />

      {/* Testimonials */}
      <Testimonials />

      {/* FAQ */}
      <FAQ />

      {/* CTA */}
      <section className="w-full py-20 px-4 md:px-6 bg-gradient-to-r from-purple-700 to-indigo-800 text-white">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Land Your Dream Job?</h2>
          <p className="text-xl text-purple-100 mb-8 max-w-2xl mx-auto">
            Join thousands of job seekers who have improved their resumes and landed more interviews with our platform.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/create">
              <Button
                size="lg"
                className="bg-white text-purple-800 hover:bg-purple-50 px-8 py-6 rounded-lg font-medium transition-colors"
              >
                Create Your Resume
              </Button>
            </Link>
            <Link href="/analyze">
              <Button
                size="lg"
                variant="outline"
                className="bg-transparent border border-white text-white hover:bg-white/10 px-8 py-6 rounded-lg font-medium transition-colors"
              >
                Analyze Existing Resume
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="w-full bg-gray-900 text-white py-12 px-4 md:px-6">
        <div className="container mx-auto max-w-6xl">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4">Resume Analyzer</h3>
              <p className="text-gray-400">
                Create, analyze, and perfect your resume with AI-powered tools and expert mentors.
              </p>
            </div>
            <div>
              <h4 className="font-medium mb-4">Product</h4>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <Link href="/create" className="hover:text-white transition-colors">
                    Resume Builder
                  </Link>
                </li>
                <li>
                  <Link href="/analyze" className="hover:text-white transition-colors">
                    Resume Analysis
                  </Link>
                </li>
                <li>
                  <Link href="/mentors" className="hover:text-white transition-colors">
                    Mentor Chat
                  </Link>
                </li>
                <li>
                  <Link href="/pricing" className="hover:text-white transition-colors">
                    Pricing
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium mb-4">Resources</h4>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <Link href="/blog" className="hover:text-white transition-colors">
                    Blog
                  </Link>
                </li>
                <li>
                  <Link href="/guides" className="hover:text-white transition-colors">
                    Resume Guides
                  </Link>
                </li>
                <li>
                  <Link href="/support" className="hover:text-white transition-colors">
                    Support
                  </Link>
                </li>
                <li>
                  <Link href="/api" className="hover:text-white transition-colors">
                    API
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium mb-4">Company</h4>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <Link href="/about" className="hover:text-white transition-colors">
                    About
                  </Link>
                </li>
                <li>
                  <Link href="/careers" className="hover:text-white transition-colors">
                    Careers
                  </Link>
                </li>
                <li>
                  <Link href="/privacy" className="hover:text-white transition-colors">
                    Privacy
                  </Link>
                </li>
                <li>
                  <Link href="/terms" className="hover:text-white transition-colors">
                    Terms
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400">
            <p>© {new Date().getFullYear()} Resume Analyzer. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </main>
  )
}

