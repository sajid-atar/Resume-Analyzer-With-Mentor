import { Star, MessageSquare, Calendar } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

interface Mentor {
  id: number
  name: string
  role: string
  company: string
  avatar: string
  rating: number
  reviews: number
  specialties: string[]
  experience: number
  bio: string
  availability: string
  price: string
}

export function MentorCard({ mentor }: { mentor: Mentor }) {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow">
      <div className="p-6">
        <div className="flex items-start gap-4">
          <img
            src={mentor.avatar || "/placeholder.svg"}
            alt={mentor.name}
            className="h-16 w-16 rounded-full object-cover"
          />
          <div>
            <h3 className="font-bold text-lg">{mentor.name}</h3>
            <p className="text-gray-600">
              {mentor.role} at {mentor.company}
            </p>
            <div className="flex items-center mt-1">
              <div className="flex items-center text-yellow-400 mr-2">
                <Star className="h-4 w-4 fill-yellow-400" />
                <span className="ml-1 text-gray-700 text-sm">{mentor.rating}</span>
              </div>
              <span className="text-gray-500 text-sm">({mentor.reviews} reviews)</span>
            </div>
          </div>
        </div>

        <div className="mt-4">
          <p className="text-sm text-gray-700 line-clamp-3">{mentor.bio}</p>
        </div>

        <div className="mt-4 flex flex-wrap gap-2">
          {mentor.specialties.slice(0, 3).map((specialty, index) => (
            <span key={index} className="bg-purple-50 text-purple-700 px-2 py-1 rounded text-xs">
              {specialty}
            </span>
          ))}
        </div>

        <div className="mt-4 pt-4 border-t border-gray-100 flex items-center justify-between">
          <div className="flex items-center text-sm text-gray-600">
            <Calendar className="h-4 w-4 mr-1" />
            <span>{mentor.availability}</span>
          </div>
          <div className="text-sm font-medium text-green-600">{mentor.price}</div>
        </div>

        <div className="mt-4 grid grid-cols-2 gap-3">
          <Link href={`/mentors/${mentor.id}`}>
            <Button variant="outline" className="w-full">
              View Profile
            </Button>
          </Link>
          <Link href={`/mentors/chat/${mentor.id}`}>
            <Button className="w-full bg-purple-600 hover:bg-purple-700 text-white flex items-center justify-center">
              <MessageSquare className="h-4 w-4 mr-2" />
              Chat
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}

