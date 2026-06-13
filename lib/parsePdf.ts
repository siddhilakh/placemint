import { extractText } from 'unpdf'

export async function extractTextFromPdf(fileUrl: string): Promise<string> {
  try {
    const response = await fetch(fileUrl)
    const arrayBuffer = await response.arrayBuffer()
    const buffer = new Uint8Array(arrayBuffer)
    const { text } = await extractText(buffer, { mergePages: true })
    return text
  } catch (error) {
    console.error('PDF extraction error:', error)
    throw new Error('Failed to extract text from PDF')
  }
}