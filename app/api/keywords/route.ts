import { prisma } from '@/lib/prisma'
import { auth } from '@clerk/nextjs/server'
import { NextResponse } from 'next/server'
import { GoogleGenerativeAI } from '@google/generative-ai'
import { KEYWORD_PROMPTS, CURRENT_KEYWORD_PROMPT_VERSION } from '@/lib/prompts'

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!)
const model = genAI.getGenerativeModel({ model: 'gemini-2.5-flash' })

export async function POST(request: Request) {
  try {
    const { userId } = await auth()

    if (!userId)
      return NextResponse.json({ error: 'Unauthorised' }, { status: 401 })

    const body = await request.json()
    const { jobDescription } = body

    if (!jobDescription || jobDescription.trim().length < 50)
      return NextResponse.json(
        { error: 'Job description is too short. Please paste the full JD.' },
        { status: 400 }
      )

    // Fetch latest resume text for this user
    const latestResume = await prisma.resume.findFirst({
      where:   { userId },
      orderBy: { createdAt: 'desc' },
      select:  { extractedText: true }
    })

    if (!latestResume)
      return NextResponse.json(
        { error: 'No resume found. Please upload your resume first.' },
        { status: 404 }
      )

    if (latestResume.extractedText === 'TEXT_EXTRACTION_FAILED')
      return NextResponse.json(
        { error: 'Resume text could not be extracted. Please upload a text-based PDF.' },
        { status: 400 }
      )

    // Build prompt with real values
    const promptTemplate = KEYWORD_PROMPTS[CURRENT_KEYWORD_PROMPT_VERSION]
    const prompt = promptTemplate
      .replace('{jobDescription}', jobDescription)
      .replace('{resumeText}', latestResume.extractedText ?? '')

    // Call Gemini
    const result = await model.generateContent(prompt)
    const text   = result.response.text()

    // Clean and parse
    const cleaned = text.replace(/```json|```/g, '').trim()
    const analysis = JSON.parse(cleaned)

    return NextResponse.json(analysis)

  } catch (error) {
    console.error(error)
    return NextResponse.json({ error: 'Keyword analysis failed' }, { status: 500 })
  }
}