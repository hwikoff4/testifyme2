import { Suspense } from "react"
import { notFound, redirect } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { getVideo } from "@/lib/db"
import { VideoActions } from "@/components/video-actions"
import { ArrowLeft, Calendar, Clock, Eye, Video } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"

function formatDuration(seconds: number) {
  const mins = Math.floor(seconds / 60)
  const secs = seconds % 60
  return `${mins}:${secs.toString().padStart(2, "0")}`
}

async function VideoContent({ id }: { id: string }) {
  if (id === "new") {
    redirect("/dashboard/videos/new")
  }

  const video = await getVideo(id)

  if (!video) {
    notFound()
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" asChild>
          <Link href="/dashboard/videos">
            <ArrowLeft className="h-4 w-4" />
          </Link>
        </Button>
        <div className="flex-1">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-red-600 bg-clip-text text-transparent">
            {video.title}
          </h1>
          <p className="text-muted-foreground mt-1">{video.companies?.name}</p>
        </div>
        <VideoActions video={video} />
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Video Preview</CardTitle>
            <CardDescription>Preview of the video testimonial</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="relative aspect-video rounded-lg overflow-hidden bg-gradient-to-br from-blue-500/10 to-red-500/10">
              {video.thumbnail_url ? (
                <img
                  src={video.thumbnail_url || "/placeholder.svg"}
                  alt={video.title}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <Video className="w-16 h-16 text-muted-foreground" />
                </div>
              )}
            </div>
            <div className="mt-4">
              <a
                href={video.video_url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-blue-600 hover:underline break-all"
              >
                {video.video_url}
              </a>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Video Details</CardTitle>
            <CardDescription>Information about this video</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Status</span>
              <Badge
                variant={
                  video.status === "approved" ? "default" : video.status === "rejected" ? "destructive" : "secondary"
                }
              >
                {video.status}
              </Badge>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Featured</span>
              <Badge variant={video.featured ? "default" : "outline"}>{video.featured ? "Yes" : "No"}</Badge>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground flex items-center gap-1">
                <Eye className="w-4 h-4" />
                Views
              </span>
              <span className="font-medium">{video.view_count}</span>
            </div>

            {video.duration && (
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground flex items-center gap-1">
                  <Clock className="w-4 h-4" />
                  Duration
                </span>
                <span className="font-medium">{formatDuration(video.duration)}</span>
              </div>
            )}

            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground flex items-center gap-1">
                <Calendar className="w-4 h-4" />
                Created
              </span>
              <span className="font-medium">{new Date(video.created_at).toLocaleDateString()}</span>
            </div>
          </CardContent>
        </Card>
      </div>

      {video.description && (
        <Card>
          <CardHeader>
            <CardTitle>Description</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">{video.description}</p>
          </CardContent>
        </Card>
      )}
    </div>
  )
}

export default function VideoDetailPage({ params }: { params: { id: string } }) {
  return (
    <Suspense
      fallback={
        <div className="space-y-6">
          <div className="h-10 bg-muted rounded animate-pulse" />
          <div className="grid gap-6 md:grid-cols-2">
            <Card className="animate-pulse">
              <CardHeader>
                <div className="h-6 bg-muted rounded w-1/3" />
              </CardHeader>
              <CardContent>
                <div className="aspect-video bg-muted rounded" />
              </CardContent>
            </Card>
            <Card className="animate-pulse">
              <CardHeader>
                <div className="h-6 bg-muted rounded w-1/3" />
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="h-4 bg-muted rounded" />
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      }
    >
      <VideoContent id={params.id} />
    </Suspense>
  )
}
