"use server"

import { revalidatePath } from "next/cache"
import { createServerClient } from "@/lib/supabase/server"

export async function createVideo(formData: FormData) {
  const supabase = await createServerClient()

  const videoData = {
    company_id: formData.get("company_id") as string,
    title: formData.get("title") as string,
    description: (formData.get("description") as string) || null,
    video_url: formData.get("video_url") as string,
    thumbnail_url: (formData.get("thumbnail_url") as string) || null,
    duration: formData.get("duration") ? Number.parseInt(formData.get("duration") as string) : null,
  }

  const { error } = await supabase.from("videos").insert([videoData])

  if (error) {
    console.error("Error creating video:", error)
    throw new Error("Failed to create video")
  }

  revalidatePath("/dashboard/videos")
  revalidatePath("/dashboard")
}

export async function updateVideoStatus(videoId: string, status: "pending" | "approved" | "rejected") {
  const supabase = await createServerClient()

  const { error } = await supabase
    .from("videos")
    .update({ status, updated_at: new Date().toISOString() })
    .eq("id", videoId)

  if (error) {
    console.error("Error updating video status:", error)
    throw new Error("Failed to update video status")
  }

  revalidatePath("/dashboard/videos")
  revalidatePath("/dashboard")
}

export async function toggleVideoFeatured(videoId: string, featured: boolean) {
  const supabase = await createServerClient()

  const { error } = await supabase
    .from("videos")
    .update({ featured, updated_at: new Date().toISOString() })
    .eq("id", videoId)

  if (error) {
    console.error("Error toggling video featured:", error)
    throw new Error("Failed to toggle video featured status")
  }

  revalidatePath("/dashboard/videos")
  revalidatePath("/dashboard")
}
