import { type NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest) {
  try {
    const token = process.env.BLOB_READ_WRITE_TOKEN

    if (!token) {
      return NextResponse.json({ error: "Blob storage not configured" }, { status: 500 })
    }

    // Return the token for client-side upload
    return NextResponse.json({ token })
  } catch (error) {
    console.error("[v0] Client token error:", error)
    return NextResponse.json({ error: "Failed to get upload token" }, { status: 500 })
  }
}
