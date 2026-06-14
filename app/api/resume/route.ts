import { prisma } from '@/lib/prisma'
import { auth, currentUser } from "@clerk/nextjs/server"
import { NextResponse } from 'next/server'
import { extractTextFromPdf } from '@/lib/parsePdf'


export async function POST(request: Request) {
  try {
    const { userId } = await auth()

    if (!userId)
      return NextResponse.json({ error: 'Unauthorised' }, { status: 401 })

    const clerkUser = await currentUser()

    
    await prisma.user.upsert({
      where:  { id: userId },
      update: {},
      create: {
        id:    userId,
        email: clerkUser?.emailAddresses[0]?.emailAddress ?? '',
        name:  clerkUser?.firstName ?? '',
      }
    })
    // Check if profile exists
const profile = await prisma.studentProfile.findUnique({
  where: { userId }
})

if (!profile)
  return NextResponse.json(
    { error: 'Please complete your profile before uploading a resume' },
    { status: 400 }
  )

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
        userId,
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
    const { userId } = await auth()

    if (!userId)
      return NextResponse.json({ error: 'Unauthorised' }, { status: 401 })

    const resumes = await prisma.resume.findMany({
      where:   { userId },
      include: { analysis: true },
      orderBy: { createdAt: 'desc' }
    })

    return NextResponse.json(resumes)
  } catch (error) {
    console.error(error)
    return NextResponse.json({ error: 'Failed to fetch resumes' }, { status: 500 })
  }
}