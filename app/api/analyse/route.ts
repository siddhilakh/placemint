import { prisma } from '@/lib/prisma'
import { auth } from '@clerk/nextjs/server'
import { NextResponse } from 'next/server'
import { analyseResume } from '@/lib/gemini'
import { CURRENT_PROMPT_VERSION } from '@/lib/prompts'

export async function POST(request: Request) {
  try {
    const { userId } = await auth()

    if (!userId)
      return NextResponse.json({ error: 'Unauthorised' }, { status: 401 })

    const body = await request.json()
    const { resumeId } = body

    const resume = await prisma.resume.findUnique({
      where: { id: resumeId }
    })

    if (!resume || resume.userId !== userId)
      return NextResponse.json({ error: 'Resume not found' }, { status: 404 })

    if (resume.extractedText === 'TEXT_EXTRACTION_FAILED')
      return NextResponse.json(
        { error: 'Resume text could not be extracted. Please upload a text-based PDF.' },
        { status: 400 }
      )

    const profile = await prisma.studentProfile.findUnique({
      where: { userId }
    })

    if (!profile)
      return NextResponse.json({ error: 'Please complete your profile first.' }, { status: 404 })

    const analysis = await analyseResume(resume.extractedText!, {
      name:           profile.name,
      branch:         profile.branch,
      cgpa:           Number(profile.cgpa),
      collegeTier:    profile.collegeTier,
      graduationYear: profile.graduationYear,
    })

    const saved = await prisma.resumeAnalysis.upsert({
      where:  { resumeId },
      update: {
        atsScore:      analysis.atsScore,
        roles:         analysis.roles,
        gaps:          analysis.gaps,
        summary:       analysis.summary,
        promptVersion: CURRENT_PROMPT_VERSION,
      },
      create: {
        resumeId,
        atsScore:      analysis.atsScore,
        roles:         analysis.roles,
        gaps:          analysis.gaps,
        summary:       analysis.summary,
        promptVersion: CURRENT_PROMPT_VERSION,
      }
    })

    return NextResponse.json(saved, { status: 201 })

  } catch (error) {
    console.error(error)
    return NextResponse.json({ error: 'Analysis failed' }, { status: 500 })
  }
}