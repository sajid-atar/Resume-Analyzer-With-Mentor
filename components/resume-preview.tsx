export function ResumePreview({ resumeData }: { resumeData: any }) {
  return (
    <div className="bg-white p-4 h-[600px] overflow-auto">
      <div className="text-center mb-4">
        <h1 className="text-xl font-bold">{resumeData.personalInfo.fullName || "Your Name"}</h1>
        <div className="text-sm text-gray-600 flex flex-wrap justify-center gap-2">
          {resumeData.personalInfo.email && <span>{resumeData.personalInfo.email}</span>}
          {resumeData.personalInfo.phone && <span>• {resumeData.personalInfo.phone}</span>}
          {resumeData.personalInfo.location && <span>• {resumeData.personalInfo.location}</span>}
        </div>
      </div>

      {resumeData.personalInfo.summary && (
        <div className="mb-4">
          <h2 className="text-sm font-bold uppercase border-b border-gray-300 mb-2">Summary</h2>
          <p className="text-sm">{resumeData.personalInfo.summary}</p>
        </div>
      )}

      {resumeData.workExperience.some((exp) => exp.title || exp.company) && (
        <div className="mb-4">
          <h2 className="text-sm font-bold uppercase border-b border-gray-300 mb-2">Experience</h2>
          {resumeData.workExperience.map(
            (exp, index) =>
              (exp.title || exp.company) && (
                <div key={exp.id} className="mb-3">
                  <div className="flex justify-between">
                    <div className="font-semibold text-sm">{exp.title || "Job Title"}</div>
                    <div className="text-xs text-gray-600">
                      {exp.startDate && exp.endDate ? `${exp.startDate} - ${exp.endDate}` : "Date Range"}
                    </div>
                  </div>
                  <div className="text-sm">
                    {exp.company || "Company"}
                    {exp.location ? `, ${exp.location}` : ""}
                  </div>
                  {exp.description && <p className="text-xs mt-1">{exp.description}</p>}
                </div>
              ),
          )}
        </div>
      )}

      {resumeData.education.some((edu) => edu.degree || edu.institution) && (
        <div className="mb-4">
          <h2 className="text-sm font-bold uppercase border-b border-gray-300 mb-2">Education</h2>
          {resumeData.education.map(
            (edu, index) =>
              (edu.degree || edu.institution) && (
                <div key={edu.id} className="mb-3">
                  <div className="flex justify-between">
                    <div className="font-semibold text-sm">{edu.degree || "Degree"}</div>
                    <div className="text-xs text-gray-600">
                      {edu.startDate && edu.endDate ? `${edu.startDate} - ${edu.endDate}` : "Date Range"}
                    </div>
                  </div>
                  <div className="text-sm">
                    {edu.institution || "Institution"}
                    {edu.location ? `, ${edu.location}` : ""}
                  </div>
                  {edu.description && <p className="text-xs mt-1">{edu.description}</p>}
                </div>
              ),
          )}
        </div>
      )}

      {resumeData.skills.some((skill) => skill.name) && (
        <div className="mb-4">
          <h2 className="text-sm font-bold uppercase border-b border-gray-300 mb-2">Skills</h2>
          <div className="flex flex-wrap gap-2">
            {resumeData.skills.map(
              (skill, index) =>
                skill.name && (
                  <span key={skill.id} className="text-xs bg-gray-100 px-2 py-1 rounded">
                    {skill.name}
                  </span>
                ),
            )}
          </div>
        </div>
      )}

      {resumeData.languages.some((lang) => lang.name) && (
        <div className="mb-4">
          <h2 className="text-sm font-bold uppercase border-b border-gray-300 mb-2">Languages</h2>
          <div className="flex flex-wrap gap-2">
            {resumeData.languages.map(
              (lang, index) =>
                lang.name && (
                  <span key={lang.id} className="text-xs">
                    {lang.name} ({lang.proficiency})
                  </span>
                ),
            )}
          </div>
        </div>
      )}

      {resumeData.certifications.some((cert) => cert.name) && (
        <div className="mb-4">
          <h2 className="text-sm font-bold uppercase border-b border-gray-300 mb-2">Certifications</h2>
          {resumeData.certifications.map(
            (cert, index) =>
              cert.name && (
                <div key={cert.id} className="mb-2">
                  <div className="text-sm font-semibold">{cert.name}</div>
                  <div className="text-xs text-gray-600">
                    {cert.issuer}
                    {cert.date ? ` - ${cert.date}` : ""}
                  </div>
                </div>
              ),
          )}
        </div>
      )}

      {/* This is just a simplified preview. In a real app, you'd have different templates */}
      <div className="text-xs text-center text-gray-400 mt-4">
        This is a simplified preview. The actual resume will look more professional.
      </div>
    </div>
  )
}

