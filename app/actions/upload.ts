"use server"

import { put } from "@vercel/blob"

export async function uploadVideo(formData: FormData) {
  try {
    const file = formData.get("file") as File

    if (!file) {
      return { success: false, error: "No file provided" }
    }

    // Validate file type
    if (!file.type.startsWith("video/")) {
      return { success: false, error: "File must be a video" }
    }

    // Validate file size (max 100MB)
    if (file.size > 100 * 1024 * 1024) {
      return { success: false, error: "Video file must be less than 100MB" }
    }

    console.log("[v0] Uploading video:", file.name, file.size)

    // Upload to Vercel Blob
    const blob = await put(file.name, file, {
      access: "public",
      addRandomSuffix: true,
    })

    console.log("[v0] Video uploaded successfully:", blob.url)

    return { success: true, url: blob.url }
  } catch (error) {
    console.error("[v0] Upload error:", error)
    return {
      success: false,
      error: error instanceof Error ? error.message : "Failed to upload video",
    }
  }
}
