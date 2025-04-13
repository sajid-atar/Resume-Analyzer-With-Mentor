"use client"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import {
  User,
  Mail,
  Phone,
  MapPin,
  Globe,
  Briefcase,
  GraduationCap,
  Plus,
  Trash2,
  ChevronRight,
  ChevronLeft,
  FileText,
  Download,
} from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ResumePreview } from "@/components/resume-preview"
import { ResumeTemplates } from "@/components/resume-templates"
import { generatePDF, generateDOCX } from '@/lib/generateDocument'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'

type ResumeData = {
  personalInfo: {
    fullName: string
    email: string
    phone: string
    location: string
    website: string
    summary: string
  }
  workExperience: Array<{
    id: string
    title: string
    company: string
    location: string
    startDate: string
    endDate: string
    current: boolean
    description: string
  }>
  education: Array<{
    id: string
    degree: string
    institution: string
    location: string
    startDate: string
    endDate: string
    description: string
  }>
  skills: Array<{
    id: string
    name: string
    level: number
  }>
  certifications: Array<{
    id: string
    name: string
    issuer: string
    date: string
  }>
  languages: Array<{
    id: string
    name: string
    proficiency: string
  }>
  template: string
}

const initialResumeData: ResumeData = {
  personalInfo: {
    fullName: "",
    email: "",
    phone: "",
    location: "",
    website: "",
    summary: "",
  },
  workExperience: [
    {
      id: "exp1",
      title: "",
      company: "",
      location: "",
      startDate: "",
      endDate: "",
      current: false,
      description: "",
    },
  ],
  education: [
    {
      id: "edu1",
      degree: "",
      institution: "",
      location: "",
      startDate: "",
      endDate: "",
      description: "",
    },
  ],
  skills: [
    { id: "skill1", name: "", level: 3 },
    { id: "skill2", name: "", level: 3 },
    { id: "skill3", name: "", level: 3 },
  ],
  certifications: [{ id: "cert1", name: "", issuer: "", date: "" }],
  languages: [{ id: "lang1", name: "", proficiency: "Intermediate" }],
  template: "modern",
}

export function ResumeBuilder() {
  const [activeStep, setActiveStep] = useState(0)
  const [resumeData, setResumeData] = useState<ResumeData>(initialResumeData)
  const resumeRef = useRef<HTMLDivElement>(null)
  const [isSaving, setIsSaving] = useState(false)
  const [isExporting, setIsExporting] = useState(false)
  const [resumeId, setResumeId] = useState<string | null>(null)
  const router = useRouter()

  useEffect(() => {
    // Check if we're editing an existing resume
    const searchParams = new URLSearchParams(window.location.search)
    const editResumeId = searchParams.get('resumeId')
    
    if (editResumeId) {
      // Get resume data from localStorage
      const storedResume = localStorage.getItem('editResume')
      if (storedResume) {
        try {
          const resume = JSON.parse(storedResume)
          setResumeData(resume.content)
          setResumeId(resume.id)
          // Clean up localStorage
          localStorage.removeItem('editResume')
        } catch (error) {
          console.error('Error parsing stored resume:', error)
          toast.error('Failed to load resume data')
        }
      } else {
        // Fetch resume data from API if not in localStorage
        fetchResumeData(editResumeId)
      }
    }
  }, [])

  const fetchResumeData = async (id: string) => {
    try {
      const response = await fetch(`/api/resumes/${id}`)
      if (!response.ok) throw new Error('Failed to fetch resume')
      const resume = await response.json()
      setResumeData(resume.content)
      setResumeId(resume.id)
    } catch (error) {
      console.error('Fetch resume error:', error)
      toast.error('Failed to load resume')
      router.push('/dashboard')
    }
  }

  const steps = [
    { id: "template", title: "Choose Template" },
    { id: "personal", title: "Personal Information" },
    { id: "experience", title: "Work Experience" },
    { id: "education", title: "Education" },
    { id: "skills", title: "Skills & Languages" },
    { id: "certifications", title: "Certifications" },
    { id: "preview", title: "Preview & Export" },
  ]

  const handleNext = () => {
    if (activeStep < steps.length - 1) {
      setActiveStep(activeStep + 1)
    }
  }

  const handleBack = () => {
    if (activeStep > 0) {
      setActiveStep(activeStep - 1)
    }
  }

  const updatePersonalInfo = (field: string, value: string) => {
    setResumeData({
      ...resumeData,
      personalInfo: {
        ...resumeData.personalInfo,
        [field]: value,
      },
    })
  }

  const addWorkExperience = () => {
    const newId = `exp${resumeData.workExperience.length + 1}`
    setResumeData({
      ...resumeData,
      workExperience: [
        ...resumeData.workExperience,
        {
          id: newId,
          title: "",
          company: "",
          location: "",
          startDate: "",
          endDate: "",
          current: false,
          description: "",
        },
      ],
    })
  }

  const updateWorkExperience = (id: string, field: string, value: string | boolean) => {
    setResumeData({
      ...resumeData,
      workExperience: resumeData.workExperience.map((exp) => (exp.id === id ? { ...exp, [field]: value } : exp)),
    })
  }

  const removeWorkExperience = (id: string) => {
    setResumeData({
      ...resumeData,
      workExperience: resumeData.workExperience.filter((exp) => exp.id !== id),
    })
  }

  const addEducation = () => {
    const newId = `edu${resumeData.education.length + 1}`
    setResumeData({
      ...resumeData,
      education: [
        ...resumeData.education,
        {
          id: newId,
          degree: "",
          institution: "",
          location: "",
          startDate: "",
          endDate: "",
          description: "",
        },
      ],
    })
  }

  const updateEducation = (id: string, field: string, value: string) => {
    setResumeData({
      ...resumeData,
      education: resumeData.education.map((edu) => (edu.id === id ? { ...edu, [field]: value } : edu)),
    })
  }

  const removeEducation = (id: string) => {
    setResumeData({
      ...resumeData,
      education: resumeData.education.filter((edu) => edu.id !== id),
    })
  }

  const addSkill = () => {
    const newId = `skill${resumeData.skills.length + 1}`
    setResumeData({
      ...resumeData,
      skills: [...resumeData.skills, { id: newId, name: "", level: 3 }],
    })
  }

  const updateSkill = (id: string, field: string, value: string | number) => {
    setResumeData({
      ...resumeData,
      skills: resumeData.skills.map((skill) => (skill.id === id ? { ...skill, [field]: value } : skill)),
    })
  }

  const removeSkill = (id: string) => {
    setResumeData({
      ...resumeData,
      skills: resumeData.skills.filter((skill) => skill.id !== id),
    })
  }

  const addLanguage = () => {
    const newId = `lang${resumeData.languages.length + 1}`
    setResumeData({
      ...resumeData,
      languages: [...resumeData.languages, { id: newId, name: "", proficiency: "Intermediate" }],
    })
  }

  const updateLanguage = (id: string, field: string, value: string) => {
    setResumeData({
      ...resumeData,
      languages: resumeData.languages.map((lang) => (lang.id === id ? { ...lang, [field]: value } : lang)),
    })
  }

  const removeLanguage = (id: string) => {
    setResumeData({
      ...resumeData,
      languages: resumeData.languages.filter((lang) => lang.id !== id),
    })
  }

  const addCertification = () => {
    const newId = `cert${resumeData.certifications.length + 1}`
    setResumeData({
      ...resumeData,
      certifications: [...resumeData.certifications, { id: newId, name: "", issuer: "", date: "" }],
    })
  }

  const updateCertification = (id: string, field: string, value: string) => {
    setResumeData({
      ...resumeData,
      certifications: resumeData.certifications.map((cert) => (cert.id === id ? { ...cert, [field]: value } : cert)),
    })
  }

  const removeCertification = (id: string) => {
    setResumeData({
      ...resumeData,
      certifications: resumeData.certifications.filter((cert) => cert.id !== id),
    })
  }

  const selectTemplate = (template: string) => {
    setResumeData({
      ...resumeData,
      template,
    })
  }

  const handleSaveDraft = async () => {
    try {
      setIsSaving(true)
      const method = resumeId ? 'PUT' : 'POST'
      const url = resumeId ? `/api/resumes/${resumeId}` : '/api/resumes'
      
      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title: resumeData.personalInfo.fullName || 'Untitled Resume',
          content: resumeData,
          template: resumeData.template,
        }),
      })

      const data = await response.json()
      
      if (!response.ok) {
        throw new Error(data.error || 'Failed to save draft')
      }
      
      toast.success(resumeId ? 'Resume updated successfully!' : 'Draft saved successfully!')
      return data
    } catch (error) {
      console.error('Save draft error:', error)
      toast.error(resumeId ? 'Failed to update resume' : 'Failed to save draft')
      throw error
    } finally {
      setIsSaving(false)
    }
  }

  const handleDownloadPDF = async () => {
    try {
      setIsExporting(true)
      if (!resumeRef.current) return

      const pdfDataUri = await generatePDF(resumeRef.current)
      
      // Create a link element and trigger download
      const link = document.createElement('a')
      link.href = pdfDataUri
      link.download = `${resumeData.personalInfo.fullName || 'resume'}.pdf`
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
      
      toast.success('PDF downloaded successfully!')
    } catch (error) {
      console.error('PDF generation error:', error)
      toast.error('Failed to generate PDF')
    } finally {
      setIsExporting(false)
    }
  }

  const handleDownloadDOCX = async () => {
    try {
      setIsExporting(true)
      const docxBlob = await generateDOCX(resumeData)
      
      // Create a link element and trigger download
      const url = window.URL.createObjectURL(docxBlob)
      const link = document.createElement('a')
      link.href = url
      link.download = `${resumeData.personalInfo.fullName || 'resume'}.docx`
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
      window.URL.revokeObjectURL(url)
      
      toast.success('DOCX downloaded successfully!')
    } catch (error) {
      console.error('DOCX generation error:', error)
      toast.error('Failed to generate DOCX')
    } finally {
      setIsExporting(false)
    }
  }

  const handleShareOnline = async () => {
    try {
      setIsSaving(true)
      const response = await fetch('/api/resumes', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title: resumeData.personalInfo.fullName || 'Untitled Resume',
          content: resumeData,
          template: resumeData.template,
          userId: 'temp-user-id', // Replace with actual user ID after authentication
          isPublic: true,
        }),
      })

      if (!response.ok) throw new Error('Failed to share resume')
      
      const result = await response.json()
      const shareUrl = `${window.location.origin}/resume/${result.id}`
      
      // Copy share URL to clipboard
      await navigator.clipboard.writeText(shareUrl)
      toast.success('Share link copied to clipboard!')
    } catch (error) {
      console.error('Share online error:', error)
      toast.error('Failed to share resume')
    } finally {
      setIsSaving(false)
    }
  }

  const handleFinish = async () => {
    try {
      const savedResume = await handleSaveDraft()
      if (savedResume) {
        router.push('/dashboard')
      }
    } catch (error) {
      console.error('Finish error:', error)
      // Error toast is already shown by handleSaveDraft
    }
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      {/* Left Column - Form */}
      <div className="lg:col-span-2">
        <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
          {/* Steps Progress */}
          <div className="mb-8">
            <div className="flex justify-between items-center mb-2">
              {steps.map((step, index) => (
                <div key={step.id} className={`flex-1 ${index < steps.length - 1 ? "relative" : ""}`}>
                  <div
                    className={`h-2 ${
                      index < steps.length - 1 ? "w-full" : "w-0"
                    } absolute top-1/2 transform -translate-y-1/2 ${
                      index < activeStep ? "bg-purple-600" : "bg-gray-200"
                    }`}
                  ></div>
                  <div className="flex flex-col items-center relative z-10">
                    <div
                      className={`w-6 h-6 rounded-full flex items-center justify-center ${
                        index < activeStep
                          ? "bg-purple-600 text-white"
                          : index === activeStep
                            ? "bg-purple-600 text-white"
                            : "bg-gray-200 text-gray-500"
                      }`}
                    >
                      {index < activeStep ? "✓" : index + 1}
                    </div>
                    <span className="text-xs mt-1 hidden md:block">{step.title}</span>
                  </div>
                </div>
              ))}
            </div>
            <h2 className="text-xl font-bold mt-4">{steps[activeStep].title}</h2>
          </div>

          {/* Step Content */}
          <div>
            {/* Step 1: Choose Template */}
            {activeStep === 0 && (
              <div>
                <p className="text-gray-600 mb-6">Choose a template for your resume. You can change it anytime.</p>
                <ResumeTemplates selectedTemplate={resumeData.template} onSelectTemplate={selectTemplate} />
              </div>
            )}

            {/* Step 2: Personal Information */}
            {activeStep === 1 && (
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="fullName">Full Name</Label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-gray-400">
                        <User className="h-5 w-5" />
                      </div>
                      <Input
                        id="fullName"
                        placeholder="John Doe"
                        className="pl-10"
                        value={resumeData.personalInfo.fullName}
                        onChange={(e) => updatePersonalInfo("fullName", e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-gray-400">
                        <Mail className="h-5 w-5" />
                      </div>
                      <Input
                        id="email"
                        type="email"
                        placeholder="john.doe@example.com"
                        className="pl-10"
                        value={resumeData.personalInfo.email}
                        onChange={(e) => updatePersonalInfo("email", e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone</Label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-gray-400">
                        <Phone className="h-5 w-5" />
                      </div>
                      <Input
                        id="phone"
                        placeholder="+1 (555) 123-4567"
                        className="pl-10"
                        value={resumeData.personalInfo.phone}
                        onChange={(e) => updatePersonalInfo("phone", e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="location">Location</Label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-gray-400">
                        <MapPin className="h-5 w-5" />
                      </div>
                      <Input
                        id="location"
                        placeholder="New York, NY"
                        className="pl-10"
                        value={resumeData.personalInfo.location}
                        onChange={(e) => updatePersonalInfo("location", e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="website">Website (Optional)</Label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-gray-400">
                        <Globe className="h-5 w-5" />
                      </div>
                      <Input
                        id="website"
                        placeholder="www.johndoe.com"
                        className="pl-10"
                        value={resumeData.personalInfo.website}
                        onChange={(e) => updatePersonalInfo("website", e.target.value)}
                      />
                    </div>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="summary">Professional Summary</Label>
                  <Textarea
                    id="summary"
                    placeholder="Write a short summary about yourself and your professional experience..."
                    rows={4}
                    value={resumeData.personalInfo.summary}
                    onChange={(e) => updatePersonalInfo("summary", e.target.value)}
                  />
                </div>
              </div>
            )}

            {/* Step 3: Work Experience */}
            {activeStep === 2 && (
              <div className="space-y-8">
                {resumeData.workExperience.map((exp, index) => (
                  <div key={exp.id} className="border border-gray-200 rounded-lg p-6 relative">
                    {resumeData.workExperience.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeWorkExperience(exp.id)}
                        className="absolute top-4 right-4 text-gray-400 hover:text-red-500"
                      >
                        <Trash2 className="h-5 w-5" />
                      </button>
                    )}
                    <h3 className="text-lg font-semibold mb-4 flex items-center">
                      <Briefcase className="h-5 w-5 mr-2 text-purple-600" />
                      Work Experience {index + 1}
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor={`jobTitle-${exp.id}`}>Job Title</Label>
                        <Input
                          id={`jobTitle-${exp.id}`}
                          placeholder="Software Engineer"
                          value={exp.title}
                          onChange={(e) => updateWorkExperience(exp.id, "title", e.target.value)}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor={`company-${exp.id}`}>Company</Label>
                        <Input
                          id={`company-${exp.id}`}
                          placeholder="Acme Inc."
                          value={exp.company}
                          onChange={(e) => updateWorkExperience(exp.id, "company", e.target.value)}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor={`location-${exp.id}`}>Location</Label>
                        <Input
                          id={`location-${exp.id}`}
                          placeholder="New York, NY"
                          value={exp.location}
                          onChange={(e) => updateWorkExperience(exp.id, "location", e.target.value)}
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor={`startDate-${exp.id}`}>Start Date</Label>
                          <Input
                            id={`startDate-${exp.id}`}
                            placeholder="MM/YYYY"
                            value={exp.startDate}
                            onChange={(e) => updateWorkExperience(exp.id, "startDate", e.target.value)}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor={`endDate-${exp.id}`}>End Date</Label>
                          <Input
                            id={`endDate-${exp.id}`}
                            placeholder="MM/YYYY or Present"
                            value={exp.endDate}
                            onChange={(e) => updateWorkExperience(exp.id, "endDate", e.target.value)}
                            disabled={exp.current}
                          />
                        </div>
                      </div>
                    </div>
                    <div className="mt-4 flex items-center">
                      <input
                        type="checkbox"
                        id={`current-${exp.id}`}
                        checked={exp.current}
                        onChange={(e) => {
                          updateWorkExperience(exp.id, "current", e.target.checked)
                          if (e.target.checked) {
                            updateWorkExperience(exp.id, "endDate", "Present")
                          } else {
                            updateWorkExperience(exp.id, "endDate", "")
                          }
                        }}
                        className="mr-2"
                      />
                      <Label htmlFor={`current-${exp.id}`}>I currently work here</Label>
                    </div>
                    <div className="mt-4 space-y-2">
                      <Label htmlFor={`description-${exp.id}`}>Description</Label>
                      <Textarea
                        id={`description-${exp.id}`}
                        placeholder="Describe your responsibilities and achievements..."
                        rows={4}
                        value={exp.description}
                        onChange={(e) => updateWorkExperience(exp.id, "description", e.target.value)}
                      />
                    </div>
                  </div>
                ))}
                <Button
                  type="button"
                  variant="outline"
                  onClick={addWorkExperience}
                  className="w-full flex items-center justify-center"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Add Another Experience
                </Button>
              </div>
            )}

            {/* Step 4: Education */}
            {activeStep === 3 && (
              <div className="space-y-8">
                {resumeData.education.map((edu, index) => (
                  <div key={edu.id} className="border border-gray-200 rounded-lg p-6 relative">
                    {resumeData.education.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeEducation(edu.id)}
                        className="absolute top-4 right-4 text-gray-400 hover:text-red-500"
                      >
                        <Trash2 className="h-5 w-5" />
                      </button>
                    )}
                    <h3 className="text-lg font-semibold mb-4 flex items-center">
                      <GraduationCap className="h-5 w-5 mr-2 text-purple-600" />
                      Education {index + 1}
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor={`degree-${edu.id}`}>Degree</Label>
                        <Input
                          id={`degree-${edu.id}`}
                          placeholder="Bachelor of Science in Computer Science"
                          value={edu.degree}
                          onChange={(e) => updateEducation(edu.id, "degree", e.target.value)}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor={`institution-${edu.id}`}>Institution</Label>
                        <Input
                          id={`institution-${edu.id}`}
                          placeholder="University of California"
                          value={edu.institution}
                          onChange={(e) => updateEducation(edu.id, "institution", e.target.value)}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor={`location-${edu.id}`}>Location</Label>
                        <Input
                          id={`location-${edu.id}`}
                          placeholder="Berkeley, CA"
                          value={edu.location}
                          onChange={(e) => updateEducation(edu.id, "location", e.target.value)}
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor={`startDate-${edu.id}`}>Start Date</Label>
                          <Input
                            id={`startDate-${edu.id}`}
                            placeholder="MM/YYYY"
                            value={edu.startDate}
                            onChange={(e) => updateEducation(edu.id, "startDate", e.target.value)}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor={`endDate-${edu.id}`}>End Date</Label>
                          <Input
                            id={`endDate-${edu.id}`}
                            placeholder="MM/YYYY or Expected"
                            value={edu.endDate}
                            onChange={(e) => updateEducation(edu.id, "endDate", e.target.value)}
                          />
                        </div>
                      </div>
                    </div>
                    <div className="mt-4 space-y-2">
                      <Label htmlFor={`description-${edu.id}`}>Description (Optional)</Label>
                      <Textarea
                        id={`description-${edu.id}`}
                        placeholder="Relevant coursework, honors, activities..."
                        rows={3}
                        value={edu.description}
                        onChange={(e) => updateEducation(edu.id, "description", e.target.value)}
                      />
                    </div>
                  </div>
                ))}
                <Button
                  type="button"
                  variant="outline"
                  onClick={addEducation}
                  className="w-full flex items-center justify-center"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Add Another Education
                </Button>
              </div>
            )}

            {/* Step 5: Skills & Languages */}
            {activeStep === 4 && (
              <div>
                <Tabs defaultValue="skills">
                  <TabsList className="mb-6">
                    <TabsTrigger value="skills">Skills</TabsTrigger>
                    <TabsTrigger value="languages">Languages</TabsTrigger>
                  </TabsList>
                  <TabsContent value="skills" className="space-y-8">
                    {resumeData.skills.map((skill, index) => (
                      <div key={skill.id} className="flex items-center space-x-4">
                        <div className="flex-1">
                          <Input
                            placeholder="Skill (e.g., JavaScript, Project Management)"
                            value={skill.name}
                            onChange={(e) => updateSkill(skill.id, "name", e.target.value)}
                          />
                        </div>
                        <div className="flex-1">
                          <select
                            className="w-full border border-gray-300 rounded-md p-2"
                            value={skill.level}
                            onChange={(e) => updateSkill(skill.id, "level", Number.parseInt(e.target.value))}
                          >
                            <option value="1">Beginner</option>
                            <option value="2">Intermediate</option>
                            <option value="3">Advanced</option>
                            <option value="4">Expert</option>
                            <option value="5">Master</option>
                          </select>
                        </div>
                        {resumeData.skills.length > 1 && (
                          <button
                            type="button"
                            onClick={() => removeSkill(skill.id)}
                            className="text-gray-400 hover:text-red-500"
                          >
                            <Trash2 className="h-5 w-5" />
                          </button>
                        )}
                      </div>
                    ))}
                    <Button
                      type="button"
                      variant="outline"
                      onClick={addSkill}
                      className="w-full flex items-center justify-center"
                    >
                      <Plus className="h-4 w-4 mr-2" />
                      Add Another Skill
                    </Button>
                  </TabsContent>
                  <TabsContent value="languages" className="space-y-8">
                    {resumeData.languages.map((language, index) => (
                      <div key={language.id} className="flex items-center space-x-4">
                        <div className="flex-1">
                          <Input
                            placeholder="Language (e.g., English, Spanish)"
                            value={language.name}
                            onChange={(e) => updateLanguage(language.id, "name", e.target.value)}
                          />
                        </div>
                        <div className="flex-1">
                          <select
                            className="w-full border border-gray-300 rounded-md p-2"
                            value={language.proficiency}
                            onChange={(e) => updateLanguage(language.id, "proficiency", e.target.value)}
                          >
                            <option value="Elementary">Elementary</option>
                            <option value="Limited Working">Limited Working</option>
                            <option value="Professional Working">Professional Working</option>
                            <option value="Full Professional">Full Professional</option>
                            <option value="Native/Bilingual">Native/Bilingual</option>
                          </select>
                        </div>
                        {resumeData.languages.length > 1 && (
                          <button
                            type="button"
                            onClick={() => removeLanguage(language.id)}
                            className="text-gray-400 hover:text-red-500"
                          >
                            <Trash2 className="h-5 w-5" />
                          </button>
                        )}
                      </div>
                    ))}
                    <Button
                      type="button"
                      variant="outline"
                      onClick={addLanguage}
                      className="w-full flex items-center justify-center"
                    >
                      <Plus className="h-4 w-4 mr-2" />
                      Add Another Language
                    </Button>
                  </TabsContent>
                </Tabs>
              </div>
            )}

            {/* Step 6: Certifications */}
            {activeStep === 5 && (
              <div className="space-y-8">
                {resumeData.certifications.map((cert, index) => (
                  <div key={cert.id} className="flex items-center space-x-4">
                    <div className="flex-1">
                      <Label htmlFor={`certName-${cert.id}`} className="sr-only">
                        Certification Name
                      </Label>
                      <Input
                        id={`certName-${cert.id}`}
                        placeholder="Certification Name"
                        value={cert.name}
                        onChange={(e) => updateCertification(cert.id, "name", e.target.value)}
                      />
                    </div>
                    <div className="flex-1">
                      <Label htmlFor={`certIssuer-${cert.id}`} className="sr-only">
                        Issuing Organization
                      </Label>
                      <Input
                        id={`certIssuer-${cert.id}`}
                        placeholder="Issuing Organization"
                        value={cert.issuer}
                        onChange={(e) => updateCertification(cert.id, "issuer", e.target.value)}
                      />
                    </div>
                    <div className="flex-1">
                      <Label htmlFor={`certDate-${cert.id}`} className="sr-only">
                        Date
                      </Label>
                      <Input
                        id={`certDate-${cert.id}`}
                        placeholder="Date (MM/YYYY)"
                        value={cert.date}
                        onChange={(e) => updateCertification(cert.id, "date", e.target.value)}
                      />
                    </div>
                    {resumeData.certifications.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeCertification(cert.id)}
                        className="text-gray-400 hover:text-red-500"
                      >
                        <Trash2 className="h-5 w-5" />
                      </button>
                    )}
                  </div>
                ))}
                <Button
                  type="button"
                  variant="outline"
                  onClick={addCertification}
                  className="w-full flex items-center justify-center"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Add Another Certification
                </Button>
              </div>
            )}

            {/* Step 7: Preview & Export */}
            {activeStep === 6 && (
              <div className="text-center">
                <div className="mb-6">
                  <FileText className="h-16 w-16 text-purple-600 mx-auto mb-4" />
                  <h3 className="text-xl font-bold mb-2">Your Resume is Ready!</h3>
                  <p className="text-gray-600">
                    Preview your resume below. You can share it online or go back to make changes.
                  </p>
                </div>
                <div className="flex justify-center">
                  <Button
                    className="bg-purple-600 hover:bg-purple-700 text-white flex items-center"
                    onClick={handleShareOnline}
                    disabled={isSaving}
                  >
                    <Globe className="h-4 w-4 mr-2" />
                    Share Online
                  </Button>
                </div>
              </div>
            )}
          </div>

          {/* Navigation Buttons */}
          <div className="mt-8 flex justify-between">
            <Button
              type="button"
              variant="outline"
              onClick={handleBack}
              disabled={activeStep === 0}
              className="flex items-center"
            >
              <ChevronLeft className="h-4 w-4 mr-2" />
              Back
            </Button>
            {activeStep === steps.length - 1 ? (
              <Button
                type="button"
                onClick={handleFinish}
                disabled={isSaving}
                className="bg-purple-600 hover:bg-purple-700 text-white"
              >
                Finish
              </Button>
            ) : (
              <Button
                type="button"
                onClick={handleNext}
                className="bg-purple-600 hover:bg-purple-700 text-white flex items-center"
              >
                Next
                <ChevronRight className="h-4 w-4 ml-2" />
              </Button>
            )}
          </div>
        </div>
      </div>

      {/* Right Column - Preview */}
      <div className="lg:col-span-1">
        <div className="bg-white rounded-xl shadow-sm p-6 sticky top-24">
          <h3 className="text-lg font-semibold mb-4">Resume Preview</h3>
          <div className="border border-gray-200 rounded-lg overflow-hidden" ref={resumeRef}>
            <ResumePreview resumeData={resumeData} />
          </div>
        </div>
      </div>
    </div>
  )
}

