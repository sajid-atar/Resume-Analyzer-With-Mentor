import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { Document, Packer, Paragraph, TextRun } from 'docx';

export async function generatePDF(resumeElement: HTMLElement): Promise<string> {
  const canvas = await html2canvas(resumeElement);
  const imgData = canvas.toDataURL('image/png');
  const pdf = new jsPDF('p', 'mm', 'a4');
  const pdfWidth = pdf.internal.pageSize.getWidth();
  const pdfHeight = pdf.internal.pageSize.getHeight();
  
  pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
  return pdf.output('datauristring');
}

export async function generateDOCX(resumeData: any): Promise<Blob> {
  const doc = new Document({
    sections: [{
      properties: {},
      children: [
        new Paragraph({
          children: [
            new TextRun({ text: resumeData.personalInfo.fullName, bold: true, size: 28 }),
          ],
        }),
        new Paragraph({
          children: [
            new TextRun({ 
              text: `${resumeData.personalInfo.email} | ${resumeData.personalInfo.phone} | ${resumeData.personalInfo.location}`,
              size: 24 
            }),
          ],
        }),
        // Add more sections based on resumeData structure
      ],
    }],
  });

  return await Packer.toBlob(doc);
} 