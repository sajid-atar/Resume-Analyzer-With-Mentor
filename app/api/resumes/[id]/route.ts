import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { unlink } from 'fs/promises'
import { join } from 'path'

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const resume = await prisma.resume.findUnique({
      where: { id: params.id },
    })

    if (!resume) {
      return NextResponse.json(
        { error: 'Resume not found' },
        { status: 404 }
      )
    }

    return NextResponse.json(resume)
  } catch (error) {
    console.error('Resume fetch error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch resume' },
      { status: 500 }
    )
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const resume = await prisma.resume.findUnique({
      where: { id: params.id },
    })

    if (!resume) {
      return NextResponse.json(
        { error: 'Resume not found' },
        { status: 404 }
      )
    }

    // Delete associated file if it exists
    if (resume.filePath) {
      try {
        await unlink(join(process.cwd(), 'public', resume.filePath))
      } catch (error) {
        console.error('File deletion error:', error)
      }
    }

    // Delete the resume from database
    await prisma.resume.delete({
      where: { id: params.id },
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Resume deletion error:', error)
    return NextResponse.json(
      { error: 'Failed to delete resume' },
      { status: 500 }
    )
  }
}

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const data = await request.json()

    // Find the resume first
    const existingResume = await prisma.resume.findUnique({
      where: { id: params.id },
    })

    if (!existingResume) {
      return NextResponse.json(
        { error: 'Resume not found' },
        { status: 404 }
      )
    }

    // Update the resume
    const resume = await prisma.resume.update({
      where: { id: params.id },
      data: {
        title: data.title || 'Untitled Resume',
        content: data.content || {},
        template: data.template || 'modern',
        isPublic: data.isPublic || false
      }
    })

    return NextResponse.json(resume)
  } catch (error) {
    console.error('Resume update error:', error)
    return NextResponse.json(
      { error: 'Failed to update resume' },
      { status: 500 }
    )
  }
} 