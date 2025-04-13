import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { ArrowLeft, Download, FileText, CheckCircle, AlertCircle, BarChart4, Zap, Search } from "lucide-react"
import Link from "next/link"

export default function AnalysisPage() {
  // Mock data for the analysis results
  const overallScore = 78
  const scores = [
    { name: "ATS Compatibility", score: 85, icon: <FileText className="h-5 w-5" /> },
    { name: "Keyword Match", score: 72, icon: <Search className="h-5 w-5" /> },
    { name: "Content Quality", score: 80, icon: <BarChart4 className="h-5 w-5" /> },
    { name: "Grammar & Style", score: 92, icon: <CheckCircle className="h-5 w-5" /> },
    { name: "Impact Statements", score: 65, icon: <Zap className="h-5 w-5" /> },
  ]

  const suggestions = [
    {
      category: "Missing Keywords",
      items: ["Project Management", "Agile Methodology", "Stakeholder Communication"],
      priority: "high",
    },
    {
      category: "Grammar Issues",
      items: ["Passive voice in experience section", "Inconsistent tense usage"],
      priority: "medium",
    },
    {
      category: "Content Improvements",
      items: [
        "Add quantifiable achievements to your role at XYZ Corp",
        "Expand on your leadership experience",
        "Include relevant certifications in a dedicated section",
      ],
      priority: "high",
    },
    {
      category: "Formatting Suggestions",
      items: [
        "Use bullet points consistently across experience section",
        "Consider a more scannable layout for skills",
      ],
      priority: "low",
    },
  ]

  return (
    <main className="min-h-screen bg-gray-50 pb-20">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="container mx-auto max-w-6xl px-4 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center text-gray-800 hover:text-purple-600">
            <ArrowLeft className="h-5 w-5 mr-2" />
            <span>Back to Home</span>
          </Link>
          <div className="flex items-center space-x-4">
            <Button variant="outline" className="flex items-center">
              <Download className="h-4 w-4 mr-2" />
              Export Report
            </Button>
            <Button className="bg-purple-600 hover:bg-purple-700 text-white">Apply Suggestions</Button>
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
                    strokeDasharray={`${overallScore}, 100`}
                  />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center flex-col">
                  <span className="text-3xl font-bold">{overallScore}%</span>
                  <span className="text-sm text-gray-500">Overall</span>
                </div>
              </div>

              <div className="space-y-4">
                {scores.map((score, index) => (
                  <div key={index}>
                    <div className="flex items-center justify-between mb-1">
                      <div className="flex items-center">
                        <div className="mr-2 text-purple-600">{score.icon}</div>
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
                  <p className="font-medium">resume-john-smith.pdf</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Uploaded</p>
                  <p className="font-medium">April 4, 2025</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Job Match</p>
                  <p className="font-medium">Software Engineer</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Word Count</p>
                  <p className="font-medium">542 words</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Suggestions */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
              <h2 className="text-xl font-bold mb-6">Key Suggestions</h2>

              <div className="space-y-6">
                {suggestions.map((suggestion, index) => (
                  <div key={index} className="border-b border-gray-100 pb-6 last:border-0 last:pb-0">
                    <div className="flex items-center mb-3">
                      <div
                        className={`p-1.5 rounded-full mr-3 ${
                          suggestion.priority === "high"
                            ? "bg-red-100 text-red-600"
                            : suggestion.priority === "medium"
                              ? "bg-yellow-100 text-yellow-600"
                              : "bg-blue-100 text-blue-600"
                        }`}
                      >
                        <AlertCircle className="h-4 w-4" />
                      </div>
                      <h3 className="font-semibold">{suggestion.category}</h3>
                      <span
                        className={`ml-auto text-xs font-medium px-2 py-1 rounded-full ${
                          suggestion.priority === "high"
                            ? "bg-red-100 text-red-600"
                            : suggestion.priority === "medium"
                              ? "bg-yellow-100 text-yellow-600"
                              : "bg-blue-100 text-blue-600"
                        }`}
                      >
                        {suggestion.priority.charAt(0).toUpperCase() + suggestion.priority.slice(1)} Priority
                      </span>
                    </div>

                    <ul className="space-y-2 pl-9">
                      {suggestion.items.map((item, i) => (
                        <li key={i} className="text-gray-700 list-disc">
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm p-6">
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
          </div>
        </div>
      </div>
    </main>
  )
}

