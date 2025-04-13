import {
  Search,
  FileText,
  BarChart4,
  Zap,
  CheckCircle,
  Edit,
  MessageSquare,
  Users,
  Download,
  Shield,
} from "lucide-react"

export function Features() {
  const features = [
    {
      icon: <FileText className="h-6 w-6 text-purple-600" />,
      title: "Professional Templates",
      description: "Choose from multiple professional templates designed to impress employers and pass ATS systems.",
    },
    {
      icon: <Search className="h-6 w-6 text-purple-600" />,
      title: "Keyword Analysis",
      description: "Identify missing keywords and skills from job descriptions to improve your match rate.",
    },
    {
      icon: <BarChart4 className="h-6 w-6 text-purple-600" />,
      title: "Detailed Scoring",
      description: "Get a comprehensive score breakdown across multiple categories with actionable feedback.",
    },
    {
      icon: <Zap className="h-6 w-6 text-purple-600" />,
      title: "AI Suggestions",
      description: "Receive AI-powered suggestions to improve clarity, structure, and impact of your content.",
    },
    {
      icon: <MessageSquare className="h-6 w-6 text-purple-600" />,
      title: "Mentor Chat",
      description: "Connect with career mentors for personalized advice and feedback on your resume.",
    },
    {
      icon: <Users className="h-6 w-6 text-purple-600" />,
      title: "Expert Network",
      description: "Access our network of industry experts who can provide insights specific to your field.",
    },
    {
      icon: <CheckCircle className="h-6 w-6 text-purple-600" />,
      title: "Grammar & Style",
      description: "Identify and fix grammar issues, passive voice, and improve overall readability.",
    },
    {
      icon: <Edit className="h-6 w-6 text-purple-600" />,
      title: "Content Optimization",
      description: "Transform generic statements into powerful, achievement-focused bullet points.",
    },
    {
      icon: <Download className="h-6 w-6 text-purple-600" />,
      title: "Multiple Export Options",
      description: "Export your resume as PDF, Word, or share a link to your online resume.",
    },
    {
      icon: <Shield className="h-6 w-6 text-purple-600" />,
      title: "Privacy Protection",
      description: "Your data is secure with our encrypted storage and privacy-first approach.",
    },
  ]

  return (
    <section className="w-full py-20 px-4 md:px-6 bg-gray-50">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold mb-4">Powerful Features to Boost Your Career</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Our comprehensive platform provides all the tools you need to create a standout resume and connect with
            career mentors.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
            >
              <div className="h-12 w-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

