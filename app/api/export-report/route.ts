import { NextResponse } from "next/server"
import PDFDocument from "pdfkit/js/pdfkit.standalone"

export async function POST(request: Request) {
  try {
    const analysis = await request.json()
    
    // Create a PDF document with basic configuration
    const doc = new PDFDocument({
      margin: 50,
      size: 'A4',
      autoFirstPage: true,
      info: {
        Title: 'Resume Analysis Report',
        Author: 'Resume Analyzer',
        Subject: 'Resume Analysis Report',
        Keywords: 'resume, analysis, report'
      }
    })

    // Create a promise to handle PDF generation
    const pdfPromise = new Promise<Buffer>((resolve, reject) => {
      const chunks: Buffer[] = []
      
      doc.on('data', chunk => chunks.push(chunk))
      doc.on('end', () => resolve(Buffer.concat(chunks)))
      doc.on('error', reject)

      try {
        // Generate PDF content
        doc
          .fontSize(24)
          .text('Resume Analysis Report', { align: 'center' })
          .moveDown()
          
        // Overall Score
        doc
          .fontSize(16)
          .text('Overall Score', { underline: true })
          .fontSize(14)
          .text(`${analysis.overallScore}%`)
          .moveDown()

        // Individual Scores
        doc
          .fontSize(16)
          .text('Detailed Scores', { underline: true })
          .moveDown()
        
        analysis.scores.forEach((score: { name: string; score: number }) => {
          doc
            .fontSize(14)
            .text(`${score.name}: ${score.score}%`)
        })
        doc.moveDown()

        // Resume Details
        if (analysis.resumeDetails) {
          doc
            .fontSize(16)
            .text('Resume Details', { underline: true })
            .moveDown()
            .fontSize(14)
            .text(`Filename: ${analysis.resumeDetails.filename}`)
            .text(`Upload Date: ${analysis.resumeDetails.uploadDate}`)
            .text(`Job Match: ${analysis.resumeDetails.jobMatch}`)
            .text(`Word Count: ${analysis.resumeDetails.wordCount} words`)
            .moveDown()
        }

        // Suggestions
        doc
          .fontSize(16)
          .text('Improvement Suggestions', { underline: true })
          .moveDown()

        analysis.suggestions.forEach((suggestion: { category: string; items: string[]; priority: string }) => {
          doc
            .fontSize(14)
            .text(`${suggestion.category} (${suggestion.priority} priority)`)
            .fontSize(12)
          
          suggestion.items.forEach((item: string) => {
            doc.text(`• ${item}`)
          })
          doc.moveDown()
        })

        // Finalize the PDF
        doc.end()
      } catch (error) {
        reject(error)
      }
    })

    // Wait for PDF generation to complete
    const pdfBuffer = await pdfPromise

    // Return the PDF as a response
    return new NextResponse(pdfBuffer, {
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': `attachment; filename=resume-analysis-${new Date().toISOString().split('T')[0]}.pdf`
      }
    })
  } catch (error) {
    console.error('PDF generation error:', error)
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to generate PDF report' },
      { status: 500 }
    )
  }
} 