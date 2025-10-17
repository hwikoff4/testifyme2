"use server"

import { revalidatePath } from "next/cache"
import { createServerClient } from "@/lib/supabase/server"

export async function createReview(formData: FormData) {
  const supabase = await createServerClient()

  const reviewData = {
    video_id: (formData.get("video_id") as string) || null,
    video_url: (formData.get("video_url") as string) || null,
    company_id: formData.get("company_id") as string,
    reviewer_name: formData.get("reviewer_name") as string,
    reviewer_email: formData.get("reviewer_email") as string,
    reviewer_avatar: (formData.get("reviewer_avatar") as string) || null,
    rating: formData.get("rating") ? Number.parseInt(formData.get("rating") as string) : null,
    comment: formData.get("comment") as string,
    status: "pending" as const,
    is_featured: false,
  }

  console.log("[v0] Creating review with data:", reviewData)

  const { error } = await supabase.from("reviews").insert([reviewData])

  if (error) {
    console.error("Error creating review:", error)
    throw new Error("Failed to create review")
  }

  revalidatePath("/dashboard/reviews")
  revalidatePath("/dashboard")
}

export async function updateReviewStatus(reviewId: string, status: "pending" | "approved" | "rejected") {
  const supabase = await createServerClient()

  const { error } = await supabase
    .from("reviews")
    .update({ status, updated_at: new Date().toISOString() })
    .eq("id", reviewId)

  if (error) {
    console.error("Error updating review status:", error)
    throw new Error("Failed to update review status")
  }

  revalidatePath("/dashboard/reviews")
  revalidatePath("/dashboard")
}

export async function toggleReviewFeatured(reviewId: string, isFeatured: boolean) {
  const supabase = await createServerClient()

  const { error } = await supabase
    .from("reviews")
    .update({ is_featured: isFeatured, updated_at: new Date().toISOString() })
    .eq("id", reviewId)

  if (error) {
    console.error("Error toggling review featured:", error)
    throw new Error("Failed to toggle review featured status")
  }

  revalidatePath("/dashboard/reviews")
  revalidatePath("/dashboard")
}

export async function deleteReview(reviewId: string) {
  const supabase = await createServerClient()

  const { error } = await supabase.from("reviews").delete().eq("id", reviewId)

  if (error) {
    console.error("Error deleting review:", error)
    throw new Error("Failed to delete review")
  }

  revalidatePath("/dashboard/reviews")
  revalidatePath("/dashboard")
}
