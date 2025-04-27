"use client"
import { Check } from "lucide-react"

export function ResumeTemplates({
  selectedTemplate,
  onSelectTemplate,
}: {
  selectedTemplate: string
  onSelectTemplate: (template: string) => void
}) {
  const templates = [
    {
      id: "modern",
      name: "Modern",
      image: "/images/interfaces/modern-template.jpg",
      description: "Clean and professional design with a modern touch.",
    },
    {
      id: "classic",
      name: "Classic",
      image: "/images/interfaces/classic-template.jpg",
      description: "Traditional layout that works well for conservative industries.",
    },
    {
      id: "creative",
      name: "Creative",
      image: "/images/interfaces/creative-template.jpg",
      description: "Bold design for creative professionals and designers.",
    },
    {
      id: "minimal",
      name: "Minimal",
      image: "/images/interfaces/minimal-template.jpg",
      description: "Simple and elegant design with minimal elements.",
    },
    {
      id: "executive",
      name: "Executive",
      image: "/placeholder.svg?height=200&width=150",
      description: "Sophisticated design for senior professionals and executives.",
    },
    {
      id: "technical",
      name: "Technical",
      image: "/images/interfaces/technical-template.jpg",
      description: "Optimized for technical roles with skills emphasis.",
    },
  ]

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
      {templates.map((template) => (
        <div
          key={template.id}
          className={`border rounded-lg overflow-hidden cursor-pointer transition-all ${
            selectedTemplate === template.id
              ? "border-purple-600 ring-2 ring-purple-200"
              : "border-gray-200 hover:border-purple-300"
          }`}
          onClick={() => onSelectTemplate(template.id)}
        >
          <div className="relative">
            <img src={template.image || "/placeholder.svg"} alt={template.name} className="w-full h-auto" />
            {selectedTemplate === template.id && (
              <div className="absolute top-2 right-2 bg-purple-600 text-white rounded-full p-1">
                <Check className="h-4 w-4" />
              </div>
            )}
          </div>
          <div className="p-3">
            <h3 className="font-medium text-sm">{template.name}</h3>
            <p className="text-xs text-gray-500 mt-1">{template.description}</p>
          </div>
        </div>
      ))}
    </div>
  )
}

