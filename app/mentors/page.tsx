import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ArrowLeft, Search, Filter } from "lucide-react"
import { Input } from "@/components/ui/input"
import { MentorCard } from "@/components/mentor-card"

export default function MentorsPage() {
  // Mock data for mentors
  const mentors = [
    {
      id: 1,
      name: "David Chen",
      role: "Senior Technical Recruiter",
      company: "Tech Innovations Inc.",
      avatar: "/placeholder.svg?height=100&width=100",
      rating: 4.9,
      reviews: 124,
      specialties: ["Software Engineering", "Tech Interviews", "Resume Review"],
      experience: 8,
      bio: "Former Google recruiter with 8+ years of experience hiring for technical roles. I help candidates optimize their resumes and prepare for interviews at top tech companies.",
      availability: "Available",
      price: "Free",
    },
    {
      id: 2,
      name: "Sarah Williams",
      role: "Career Coach",
      company: "Career Accelerator",
      avatar: "/placeholder.svg?height=100&width=100",
      rating: 4.8,
      reviews: 98,
      specialties: ["Career Transitions", "Personal Branding", "Interview Prep"],
      experience: 12,
      bio: "Certified career coach with experience helping 500+ professionals land their dream jobs. Specializing in career transitions and personal branding.",
      availability: "Available",
      price: "Free",
    },
    {
      id: 3,
      name: "Michael Johnson",
      role: "HR Director",
      company: "Global Finance Corp",
      avatar: "/placeholder.svg?height=100&width=100",
      rating: 4.7,
      reviews: 76,
      specialties: ["Finance Careers", "Executive Resumes", "Salary Negotiation"],
      experience: 15,
      bio: "HR Director with 15 years of experience in the finance industry. I help professionals craft executive-level resumes and prepare for high-stakes interviews.",
      availability: "Available in 2 days",
      price: "Free",
    },
    {
      id: 4,
      name: "Jennifer Lopez",
      role: "Marketing Director",
      company: "Brand Builders",
      avatar: "/placeholder.svg?height=100&width=100",
      rating: 4.9,
      reviews: 112,
      specialties: ["Marketing Careers", "Portfolio Review", "Personal Branding"],
      experience: 10,
      bio: "Marketing leader who has hired and mentored dozens of marketing professionals. I provide actionable feedback on resumes, portfolios, and interview techniques.",
      availability: "Available",
      price: "Free",
    },
    {
      id: 5,
      name: "Robert Kim",
      role: "Engineering Manager",
      company: "TechGiant",
      avatar: "/placeholder.svg?height=100&width=100",
      rating: 4.8,
      reviews: 89,
      specialties: ["Software Engineering", "Technical Interviews", "Career Growth"],
      experience: 12,
      bio: "Engineering manager who has conducted 500+ technical interviews. I help engineers optimize their resumes and prepare for technical interviews at top companies.",
      availability: "Available in 3 days",
      price: "Free",
    },
    {
      id: 6,
      name: "Emily Davis",
      role: "UX Design Lead",
      company: "Creative Solutions",
      avatar: "/placeholder.svg?height=100&width=100",
      rating: 4.9,
      reviews: 67,
      specialties: ["UX/UI Design", "Portfolio Review", "Design Interviews"],
      experience: 9,
      bio: "UX design leader who has hired and mentored dozens of designers. I provide actionable feedback on portfolios, resumes, and interview preparation.",
      availability: "Available",
      price: "Free",
    },
  ]

  const industries = ["All Industries", "Technology", "Finance", "Marketing", "Design", "Healthcare", "Education"]

  const specialties = [
    "Resume Review",
    "Interview Prep",
    "Career Transitions",
    "Salary Negotiation",
    "Personal Branding",
    "Technical Interviews",
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
        </div>
      </header>

      {/* Main Content */}
      <div className="container mx-auto max-w-6xl px-4 py-8">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold mb-4">Connect with Career Mentors</h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Get personalized advice from industry experts who can help you improve your resume and prepare for
            interviews.
          </p>
        </div>

        {/* Search and Filters */}
        <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <Input placeholder="Search mentors by name, role, or specialty" className="pl-10" />
            </div>
            <div className="flex gap-4">
              <div className="relative">
                <select className="appearance-none bg-white border border-gray-300 rounded-md py-2 pl-3 pr-10 text-gray-700 cursor-pointer focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent">
                  {industries.map((industry, index) => (
                    <option key={index}>{industry}</option>
                  ))}
                </select>
                <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                  <Filter className="h-4 w-4 text-gray-400" />
                </div>
              </div>
              <Button className="bg-purple-600 hover:bg-purple-700 text-white">Search</Button>
            </div>
          </div>

          <div className="mt-4 flex flex-wrap gap-2">
            {specialties.map((specialty, index) => (
              <div
                key={index}
                className="bg-purple-50 text-purple-700 px-3 py-1 rounded-full text-sm cursor-pointer hover:bg-purple-100"
              >
                {specialty}
              </div>
            ))}
          </div>
        </div>

        {/* Mentors Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {mentors.map((mentor) => (
            <MentorCard key={mentor.id} mentor={mentor} />
          ))}
        </div>
      </div>
    </main>
  )
}

