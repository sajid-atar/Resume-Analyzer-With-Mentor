import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { writeFile } from 'fs/promises'
import { join } from 'path'

export async function GET() {
  try {
    // For now, get all resumes (later we'll filter by user)
    const resumes = await prisma.resume.findMany({
      orderBy: {
        updatedAt: 'desc'
      }
    })
    return NextResponse.json(resumes)
  } catch (error) {
    console.error('Resumes fetch error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch resumes' },
      { status: 500 }
    )
  }
}

export async function POST(request: Request) {
  try {
    const data = await request.json()

    // Create a temporary user if none exists (remove this in production)
    let user = await prisma.user.findFirst()
    if (!user) {
      user = await prisma.user.create({
        data: {
          email: 'temp@example.com',
          name: 'Temporary User'
        }
      })
    }

    // Create resume with proper data validation
    const resume = await prisma.resume.create({
      data: {
        title: data.title || 'Untitled Resume',
        content: data.content || {},
        template: data.template || 'modern',
        userId: user.id, // Use the temporary user's ID
        isPublic: data.isPublic || false
      }
    })

    // If there's a file to save
    if (data.file) {
      const buffer = Buffer.from(data.file.split(',')[1], 'base64')
      const filePath = join(process.cwd(), 'public', 'uploads', `${resume.id}.pdf`)
      
      await writeFile(filePath, buffer)
      
      // Update resume with file path
      await prisma.resume.update({
        where: { id: resume.id },
        data: { filePath: `/uploads/${resume.id}.pdf` },
      })
    }

    return NextResponse.json(resume)
  } catch (error) {
    console.error('Resume creation error:', error)
    return NextResponse.json(
      { error: 'Failed to create resume' },
      { status: 500 }
    )
  }
} 