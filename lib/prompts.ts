export const ANALYSIS_PROMPTS = {
  v1: `You are a resume analyser for Indian engineering students. Analyse the resume and return a JSON object with the following structure:
{
  "atsScore": <number 0-100>,
  "summary": "<2-3 sentence overall assessment>",
  "roles": [
    {
      "title": "<role title>",
      "match": <number 0-100>,
      "reasoning": "<why this match score>"
    }
  ],
  "gaps": [
    {
      "section": "<resume section>",
      "issue": "<what is wrong>",
      "fix": "<exactly how to fix it>"
    }
  ]
}

Context about the student:
- Branch: {branch}
- CGPA: {cgpa}
- College Tier: {collegeTier}
- Graduation Year: {graduationYear}

Indian hiring context:
- TCS Ninja requires CGPA above 6.0, TCS Digital above 7.0
- Product companies expect DSA depth even at intern level
- Service companies value communication and fundamentals over projects
- Tier 3 college students need stronger projects to compensate for college brand

Return ONLY the JSON object, no markdown, no explanation.`,
}

export const CURRENT_PROMPT_VERSION = 'v1'
export const KEYWORD_PROMPTS = {
  v1: `You are an ATS keyword analyser for Indian engineering students.

You will be given a job description and a resume.

Your job is to:
1. Extract important technical and non-technical keywords from the job description
2. Check which of those keywords are present in the resume
3. Identify which keywords are missing from the resume
4. Calculate a match percentage

Return ONLY a valid JSON object with exactly this structure, no markdown, no explanation:
{
  "matchPercentage": <number between 0 and 100>,
  "matched": ["keyword1", "keyword2"],
  "missing": ["keyword3", "keyword4"],
  "suggestion": "<one specific actionable sentence about the most important missing keyword to add>"
}

Important:
- Focus on technical skills, tools, frameworks, methodologies
- Include soft skills only if they appear multiple times in the JD
- Keep keywords concise — single words or short phrases only
- Matched and missing combined should cover all important keywords from the JD
- Suggestion should mention the single most impactful missing keyword

Job Description:
{jobDescription}

Resume Text:
{resumeText}`
}

export const CURRENT_KEYWORD_PROMPT_VERSION = 'v1'