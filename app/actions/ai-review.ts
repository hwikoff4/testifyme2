"use server"

import { generateText } from "ai"

export async function generateReview(data: {
  companyName: string
  keywords: string[]
  emotions: string[]
  serviceType: string
}) {
  const { companyName, keywords, emotions, serviceType } = data

  const prompt = `Write a genuine, authentic 3-5 sentence customer review for ${companyName}, a ${serviceType} business. 
  
The review should incorporate these keywords naturally: ${keywords.join(", ")}
The reviewer's emotional tone should reflect: ${emotions.join(", ")}

Write in first person as if you are a real customer sharing your experience with their ${serviceType} service. Be specific and authentic. Do not use overly promotional language.`

  try {
    const { text } = await generateText({
      model: "openai/gpt-4o",
      prompt,
      maxOutputTokens: 300,
      temperature: 0.8,
    })

    return { success: true, review: text }
  } catch (error) {
    console.error("[v0] AI review generation error:", error)
    return {
      success: false,
      error: error instanceof Error ? error.message : "Failed to generate review",
    }
  }
}
