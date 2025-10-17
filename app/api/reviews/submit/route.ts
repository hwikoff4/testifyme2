import { createClient } from "@/lib/supabase/server"
import { NextResponse } from "next/server"

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { company_id, video_id, reviewer_name, reviewer_email, rating, comment, video_url } = body

    console.log("[v0] Received review submission with video_url:", video_url)

    if (!company_id || !reviewer_name || !reviewer_email || !rating || !comment) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    const supabase = await createClient()

    const { data, error } = await supabase
      .from("reviews")
      .insert({
        company_id,
        video_id: video_id || null,
        reviewer_name,
        reviewer_email,
        rating,
        comment,
        video_url: video_url || null,
        status: "pending", // Requires approval
        is_featured: false,
      })
      .select()

    if (error) {
      console.error("[v0] Database error:", error)
      throw error
    }

    console.log("[v0] Review saved successfully:", data)

    return NextResponse.json({ success: true, data })
  } catch (error) {
    console.error("[v0] Error submitting review:", error)
    return NextResponse.json({ error: "Failed to submit review" }, { status: 500 })
  }
}
