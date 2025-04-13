import { Check } from "lucide-react"
import { Button } from "@/components/ui/button"

export function Pricing() {
  const plans = [
    {
      name: "Free",
      price: "$0",
      description: "Basic resume analysis for job seekers",
      features: ["1 resume analysis per month", "Basic keyword matching", "Grammar check", "ATS compatibility score"],
      cta: "Get Started",
      highlighted: false,
    },
    {
      name: "Pro",
      price: "$9.99",
      period: "per month",
      description: "Advanced analysis for serious job seekers",
      features: [
        "Unlimited resume analyses",
        "Advanced keyword optimization",
        "AI-powered content suggestions",
        "Job description matching",
        "Resume version history",
        "Export to multiple formats",
      ],
      cta: "Upgrade to Pro",
      highlighted: true,
    },
    {
      name: "Teams",
      price: "$49",
      period: "per month",
      description: "For career coaches and small teams",
      features: [
        "Everything in Pro",
        "5 team members",
        "Client management",
        "Branded reports",
        "Analytics dashboard",
        "Priority support",
      ],
      cta: "Contact Sales",
      highlighted: false,
    },
  ]

  return (
    <section className="w-full py-20 px-4 md:px-6 bg-gray-50">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold mb-4">Simple, Transparent Pricing</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Choose the plan that fits your needs. All plans include our core resume analysis features.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {plans.map((plan, index) => (
            <div
              key={index}
              className={`rounded-xl overflow-hidden ${
                plan.highlighted
                  ? "ring-2 ring-purple-600 bg-white shadow-xl"
                  : "bg-white shadow-sm border border-gray-100"
              }`}
            >
              {plan.highlighted && (
                <div className="bg-purple-600 text-white text-center py-2 text-sm font-medium">Most Popular</div>
              )}
              <div className="p-6">
                <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                <div className="mb-4">
                  <span className="text-3xl font-bold">{plan.price}</span>
                  {plan.period && <span className="text-gray-500 ml-1">{plan.period}</span>}
                </div>
                <p className="text-gray-600 mb-6">{plan.description}</p>

                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-start">
                      <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>

                <Button
                  className={`w-full ${
                    plan.highlighted
                      ? "bg-purple-600 hover:bg-purple-700 text-white"
                      : "bg-white border border-gray-300 hover:bg-gray-50 text-gray-800"
                  }`}
                >
                  {plan.cta}
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

