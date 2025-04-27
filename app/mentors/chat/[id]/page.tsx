import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { ChatInterface } from "@/components/chat-interface"

export default function MentorChatPage({ params }: { params: { id: string } }) {
  // In a real app, you would fetch the mentor data based on the ID
  const mentorId = Number.parseInt(params.id)

  // Mock data for the mentor
  const mentor = {
    id: mentorId,
    name: mentorId === 1 ? "David Chen" : "Sarah Williams",
    role: mentorId === 1 ? "Senior Technical Recruiter" : "Career Coach",
    company: mentorId === 1 ? "Tech Innovations Inc." : "Career Accelerator",
    avatar: "/images/mentors/mentor_one.jpg",
    status: "Online",
  }

  return (
    <main className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="container mx-auto max-w-6xl px-4 py-4 flex items-center justify-between">
          <Link href="/mentors" className="flex items-center text-gray-800 hover:text-purple-600">
            <ArrowLeft className="h-5 w-5 mr-2" />
            <span>Back to Mentors</span>
          </Link>
          <div className="flex items-center">
            <img src={mentor.avatar || "/placeholder.svg"} alt={mentor.name} className="h-8 w-8 rounded-full mr-2" />
            <div>
              <div className="font-medium">{mentor.name}</div>
              <div className="text-xs text-gray-500">{mentor.status}</div>
            </div>
          </div>
        </div>
      </header>

      {/* Chat Interface */}
      <ChatInterface mentor={mentor} />
    </main>
  )
}

