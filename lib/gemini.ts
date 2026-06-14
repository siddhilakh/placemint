import { GoogleGenerativeAI } from '@google/generative-ai'
import { ANALYSIS_PROMPTS, CURRENT_PROMPT_VERSION } from '@/lib/prompts'

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!)
const model = genAI.getGenerativeModel({ model: 'gemini-2.5-flash' })

export async function analyseResume(
  resumeText: string,
  profile: {
    name: string
    branch: string
    cgpa: number
    collegeTier: string
    graduationYear: number
  }
) {
 
  const promptTemplate = ANALYSIS_PROMPTS[CURRENT_PROMPT_VERSION]
  const prompt = promptTemplate
    .replace('{branch}', profile.branch)
    .replace('{cgpa}', String(profile.cgpa))
    .replace('{collegeTier}', profile.collegeTier)
    .replace('{graduationYear}', String(profile.graduationYear))

  const fullPrompt = `${prompt}\n\nResume Text:\n${resumeText}`

  const result = await model.generateContent(fullPrompt)
  const text = result.response.text()

  
  const cleaned = text.replace(/```json|```/g, '').trim()

  return JSON.parse(cleaned)
}