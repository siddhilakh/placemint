import { extractText } from 'unpdf'

export async function extractTextFromPdf(fileUrl: string): Promise<string> {
  try {
    const response = await fetch(fileUrl)

    const arrayBuffer = await response.arrayBuffer()

    const buffer = new Uint8Array(arrayBuffer.slice(0))

    const { text } = await extractText(buffer, {
      mergePages: true,
    })

    console.log("Extracted text length:", text.length)

    const cleanedText = text.trim()

    if (cleanedText.length < 100) {
      return "TEXT_EXTRACTION_FAILED"
    }

    return cleanedText

  } catch (error) {
    console.error("PDF extraction error:", error)

    return "TEXT_EXTRACTION_FAILED"
  }
}