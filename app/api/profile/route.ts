import { prisma } from '@/lib/prisma'
import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  try {
    const body = await request.json()

    // ensure placeholder user exists first
    await prisma.user.upsert({
      where:  { id: 'placeholder_01' },
      update: {},
      create: {
        id:    'placeholder_01',
        email: 'placeholder@placemint.dev',
        name:  body.name,
      }
    })

    const profile = await prisma.studentProfile.create({
      data: {
        userId:         'placeholder_01',
        name:           body.name,
        branch:         body.branch,
        cgpa:           parseFloat(body.cgpa),
        collegeTier:    body.collegeTier,
        graduationYear: parseInt(body.graduationYear),
      }
    })

    return NextResponse.json(profile, { status: 201 })
  } catch (error) {
    console.error(error)
    return NextResponse.json({ error: 'Failed to save profile' }, { status: 500 })
  }
}

export async function GET() {
  try {
    const profile = await prisma.studentProfile.findUnique({
      where:   { userId: 'placeholder_01' },
      include: { resumes: true }
    })

    if (!profile)
      return NextResponse.json({ error: 'Profile not found' }, { status: 404 })

    return NextResponse.json(profile)
  } catch (error) {
    console.error(error)
    return NextResponse.json({ error: 'Failed to fetch profile' }, { status: 500 })
  }
}