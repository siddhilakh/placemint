import { prisma } from '@/lib/prisma'
import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  try {
    const body = await request.json()

    const resume = await prisma.resume.create({
      data: {
        userId:   'placeholder_01',
        fileName: body.fileName,
        fileUrl:  body.fileUrl ?? 'placeholder_url',
      }
    })

    return NextResponse.json(resume, { status: 201 })
  } catch (error) {
    console.error(error)
    return NextResponse.json({ error: 'Failed to save resume' }, { status: 500 })
  }
}

export async function GET() {
  try {
    const resumes = await prisma.resume.findMany({
      where:   { userId: 'placeholder_01' },
      include: { analysis: true },
      orderBy: { createdAt: 'desc' }
    })

    return NextResponse.json(resumes)
  } catch (error) {
    console.error(error)
    return NextResponse.json({ error: 'Failed to fetch resumes' }, { status: 500 })
  }
}