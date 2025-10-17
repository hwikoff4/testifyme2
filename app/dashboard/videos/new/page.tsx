import { Suspense } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { VideoForm } from "@/components/video-form"
import { getCompanies } from "@/lib/db"

async function VideoFormWrapper() {
  console.log("[v0] VideoFormWrapper: Fetching companies...")

  try {
    const companies = await getCompanies()
    console.log("[v0] VideoFormWrapper: Companies fetched:", companies?.length || 0)

    if (!companies || companies.length === 0) {
      return (
        <div className="text-center py-8 text-muted-foreground">
          <p>No companies found. Please create a company first.</p>
        </div>
      )
    }

    return <VideoForm companies={companies} />
  } catch (error) {
    console.error("[v0] VideoFormWrapper: Error fetching companies:", error)
    return (
      <div className="text-center py-8 text-destructive">
        <p>Error loading companies. Please try again.</p>
        <p className="text-sm mt-2">{error instanceof Error ? error.message : "Unknown error"}</p>
      </div>
    )
  }
}

export default function NewVideoPage() {
  console.log("[v0] NewVideoPage: Rendering...")

  return (
    <div className="max-w-2xl mx-auto space-y-6 p-6">
      <div>
        <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-red-600 bg-clip-text text-transparent">
          Add New Video
        </h1>
        <p className="text-muted-foreground mt-1">Upload a new video testimonial</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Video Details</CardTitle>
          <CardDescription>Fill in the information about the video testimonial</CardDescription>
        </CardHeader>
        <CardContent>
          <Suspense
            fallback={
              <div className="space-y-4">
                <div className="animate-pulse h-10 bg-muted rounded" />
                <div className="animate-pulse h-10 bg-muted rounded" />
                <div className="animate-pulse h-20 bg-muted rounded" />
                <div className="animate-pulse h-10 bg-muted rounded" />
              </div>
            }
          >
            <VideoFormWrapper />
          </Suspense>
        </CardContent>
      </Card>
    </div>
  )
}
