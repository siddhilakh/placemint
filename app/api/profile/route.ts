import { prisma } from '@/lib/prisma'
import { auth, currentUser } from '@clerk/nextjs/server'
import { NextResponse } from 'next/server'

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

    const body = await request.json()

    const profile = await prisma.studentProfile.upsert({
      where:  { userId },
      update: {
        name:           body.name,
        branch:         body.branch,
        cgpa:           body.cgpa,
        collegeTier:    body.collegeTier,
        graduationYear: parseInt(body.graduationYear),
      },
      create: {
        userId,
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
    const { userId } = await auth()

    if (!userId)
      return NextResponse.json({ error: 'Unauthorised' }, { status: 401 })

    const profile = await prisma.studentProfile.findUnique({
      where:   { userId },
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