import { MessageSquare } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export function MentorSuggestions() {
  const mentorSuggestions = [
    {
      id: 1,
      mentor: {
        name: "David Chen",
        role: "Senior Technical Recruiter",
        avatar: "/placeholder.svg?height=50&width=50",
      },
      suggestion:
        "Your technical skills are impressive, but I'd recommend highlighting more of your collaborative work. Technical recruiters like me look for team players who can communicate effectively with non-technical stakeholders.",
    },
    {
      id: 2,
      mentor: {
        name: "Sarah Williams",
        role: "Career Coach",
        avatar: "/placeholder.svg?height=50&width=50",
      },
      suggestion:
        "Consider adding a brief professional summary at the top that captures your unique value proposition. This gives recruiters an immediate sense of who you are and what you bring to the table.",
    },
  ]

  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold">Mentor Suggestions</h2>
        <Link href="/mentors">
          <Button
            variant="outline"
            className="text-purple-600 border-purple-200 hover:bg-purple-50 hover:text-purple-700"
          >
            View All Mentors
          </Button>
        </Link>
      </div>

      <div className="space-y-6">
        {mentorSuggestions.map((item) => (
          <div key={item.id} className="border border-gray-200 rounded-lg p-4">
            <div className="flex items-center mb-4">
              <img
                src={item.mentor.avatar || "/placeholder.svg"}
                alt={item.mentor.name}
                className="h-10 w-10 rounded-full mr-3"
              />
              <div>
                <h3 className="font-semibold">{item.mentor.name}</h3>
                <p className="text-sm text-gray-600">{item.mentor.role}</p>
              </div>
            </div>
            <p className="text-gray-700 mb-4">{item.suggestion}</p>
            <Link href={`/mentors/chat/${item.id}`}>
              <Button variant="outline" size="sm" className="flex items-center text-purple-600 hover:text-purple-700">
                <MessageSquare className="h-4 w-4 mr-2" />
                Chat with {item.mentor.name.split(" ")[0]}
              </Button>
            </Link>
          </div>
        ))}
      </div>

      <div className="mt-6 bg-purple-50 rounded-lg p-4 border border-purple-100">
        <div className="flex items-center mb-2">
          <MessageSquare className="h-5 w-5 text-purple-600 mr-2" />
          <h3 className="font-semibold text-purple-800">Get Personalized Feedback</h3>
        </div>
        <p className="text-gray-700 mb-4">
          Connect with our expert mentors for personalized advice on your resume and job search strategy.
        </p>
        <Link href="/mentors">
          <Button className="bg-purple-600 hover:bg-purple-700 text-white w-full">Find a Mentor</Button>
        </Link>
      </div>
    </div>
  )
}

