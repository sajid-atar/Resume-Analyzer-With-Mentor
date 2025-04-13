import { ArrowRight } from "lucide-react"

export function HowItWorks() {
  const steps = [
    {
      number: "01",
      title: "Create Your Resume",
      description:
        "Use our intuitive builder to create a professional resume. Choose from multiple templates and customize to your needs.",
    },
    {
      number: "02",
      title: "Get AI Analysis",
      description: "Our AI analyzes your resume for keywords, structure, grammar, and compatibility with ATS systems.",
    },
    {
      number: "03",
      title: "Connect with Mentors",
      description:
        "Chat with career mentors who provide personalized feedback and advice on your resume and job search.",
    },
    {
      number: "04",
      title: "Apply with Confidence",
      description:
        "With an optimized resume and expert advice, apply to jobs with confidence and increase your chances of landing interviews.",
    },
  ]

  return (
    <section className="w-full py-20 px-4 md:px-6">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold mb-4">How It Works</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Our simple 4-step process helps you create, optimize, and perfect your resume with expert guidance.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <div key={index} className="relative">
              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 h-full">
                <div className="text-3xl font-bold text-purple-600 mb-4">{step.number}</div>
                <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
                <p className="text-gray-600">{step.description}</p>
              </div>

              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-1/2 -right-4 transform -translate-y-1/2">
                  <ArrowRight className="h-8 w-8 text-gray-300" />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

