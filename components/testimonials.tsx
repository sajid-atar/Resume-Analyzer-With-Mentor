import { Star } from "lucide-react"

export function Testimonials() {
  const testimonials = [
    {
      name: "Sarah Khan",
      role: "Software Engineer",
      company: "Tech Solutions Inc.",
      image: "/images/mentors/mentor_one.jpg",
      quote:
        "The resume builder and AI analysis helped me create a standout resume. I received 3 interview calls within a week!",
      stars: 5,
    },
    {
      name: "Jessica Sharma",
      role: "Marketing Specialist",
      company: "Global Brands",
      image: "/images/mentors/mentor2.jpg",
      quote:
        "The mentor chat feature was a game-changer. My mentor provided invaluable feedback that helped me land my dream job.",
      stars: 5,
    },
    {
      name: "Rajesh Kumar",
      role: "Project Manager",
      company: "Construction Partners",
      image: "/images/mentors/mentor3.jpg",
      quote:
        "I was skeptical at first, but the detailed feedback and mentor guidance helped me highlight achievements I hadn't considered.",
      stars: 4,
    },
  ]

  return (
    <section className="w-full py-20 px-4 md:px-6 bg-gray-50">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold mb-4">What Our Users Say</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Join thousands of job seekers who have improved their resumes and landed more interviews with our platform.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
              <div className="flex items-center mb-4">
                {Array(5)
                  .fill(0)
                  .map((_, i) => (
                    <Star
                      key={i}
                      className={`h-5 w-5 ${i < testimonial.stars ? "text-yellow-400 fill-yellow-400" : "text-gray-300"}`}
                    />
                  ))}
              </div>
              <p className="text-gray-700 mb-6 italic">"{testimonial.quote}"</p>
              <div className="flex items-center">
                <img
                  src={testimonial.image || "/placeholder.svg"}
                  alt={testimonial.name}
                  className="h-12 w-12 rounded-full mr-4"
                />
                <div>
                  <h4 className="font-semibold">{testimonial.name}</h4>
                  <p className="text-sm text-gray-600">
                    {testimonial.role}, {testimonial.company}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

