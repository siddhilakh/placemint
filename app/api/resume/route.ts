import { prisma } from '@/lib/prisma'
import { NextResponse } from 'next/server'
import { extractTextFromPdf } from '@/lib/parsePdf'

export async function POST(request: Request) {
  try {
    const body = await request.json()

    let extractedText = ''
    try {
      extractedText = await extractTextFromPdf(body.fileUrl)
    } catch (err) {
      console.error('Text extraction failed:', err)
    }

    if (!extractedText || extractedText.trim().length < 50) {
      extractedText = 'TEXT_EXTRACTION_FAILED'
    }

    const resume = await prisma.resume.create({
      data: {
        userId:        'placeholder_01',
        fileName:      body.fileName,
        fileUrl:       body.fileUrl,
        extractedText: extractedText,
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