import { Suspense } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { PlusCircle, Video, Eye, Clock, User, Building2, Download } from "lucide-react"
import { getAllVideos } from "@/lib/db"

function formatDuration(seconds: number) {
  const mins = Math.floor(seconds / 60)
  const secs = seconds % 60
  return `${mins}:${secs.toString().padStart(2, "0")}`
}

async function VideosContent() {
  const videos = await getAllVideos()

  return (
    <div className="grid gap-4 md:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
      {videos.map((video) => (
        <Card key={video.id} className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
          <CardHeader className="space-y-3">
            <div className="relative aspect-video rounded-lg overflow-hidden bg-gradient-to-br from-blue-500/10 to-red-500/10">
              {video.video_url ? (
                <video
                  src={video.video_url}
                  className="w-full h-full object-cover"
                  controls={false}
                  preload="metadata"
                />
              ) : video.thumbnail_url ? (
                <img
                  src={video.thumbnail_url || "/placeholder.svg"}
                  alt={video.title}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <Video className="w-12 h-12 text-muted-foreground" />
                </div>
              )}
              <Badge
                className={`absolute top-2 left-2 ${
                  video.source === "customer"
                    ? "bg-gradient-to-r from-purple-600 to-pink-600"
                    : "bg-gradient-to-r from-blue-600 to-cyan-600"
                } border-0`}
              >
                {video.source === "customer" ? (
                  <>
                    <User className="w-3 h-3 mr-1" />
                    Customer
                  </>
                ) : (
                  <>
                    <Building2 className="w-3 h-3 mr-1" />
                    Company
                  </>
                )}
              </Badge>
              {video.featured && (
                <Badge className="absolute top-2 right-2 bg-gradient-to-r from-yellow-500 to-orange-500 border-0">
                  Featured
                </Badge>
              )}
            </div>
            <div className="space-y-1">
              <CardTitle className="line-clamp-1">{video.title}</CardTitle>
              <CardDescription className="line-clamp-2">
                {video.source === "customer" && "reviewer_name" in video && (
                  <span className="text-xs text-muted-foreground block mb-1">
                    by {video.reviewer_name}
                    {"rating" in video && video.rating && ` • ${video.rating}/5 ⭐`}
                  </span>
                )}
                {video.description || "No description"}
              </CardDescription>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between text-sm text-muted-foreground">
              {video.source === "company" && (
                <>
                  <div className="flex items-center gap-1">
                    <Eye className="w-4 h-4" />
                    <span>{video.view_count} views</span>
                  </div>
                  {video.duration && (
                    <div className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      <span>{formatDuration(video.duration)}</span>
                    </div>
                  )}
                </>
              )}
              {video.source === "customer" && (
                <div className="text-xs text-muted-foreground">{new Date(video.created_at).toLocaleDateString()}</div>
              )}
            </div>
            <div className="flex items-center justify-between gap-2">
              <Badge
                variant={
                  video.status === "approved" ? "default" : video.status === "rejected" ? "destructive" : "secondary"
                }
              >
                {video.status}
              </Badge>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  asChild
                  className="hover:bg-gradient-to-r hover:from-blue-600 hover:to-red-600 hover:text-white transition-all bg-transparent"
                >
                  <a href={video.video_url} download target="_blank" rel="noopener noreferrer">
                    <Download className="w-4 h-4" />
                  </a>
                </Button>
                {video.source === "company" && (
                  <Button variant="outline" size="sm" asChild>
                    <Link href={`/dashboard/videos/${video.id}`}>View</Link>
                  </Button>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

export default function VideosPage() {
  return (
    <div className="space-y-4 md:space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-blue-600 to-red-600 bg-clip-text text-transparent">
            Videos
          </h1>
          <p className="text-sm md:text-base text-muted-foreground mt-1">Manage your video testimonials</p>
        </div>
        <Button
          asChild
          className="bg-gradient-to-r from-blue-600 to-red-600 hover:from-blue-700 hover:to-red-700 w-full sm:w-auto"
        >
          <Link href="/dashboard/videos/new">
            <PlusCircle className="w-4 h-4 mr-2" />
            Add Video
          </Link>
        </Button>
      </div>

      <Suspense
        fallback={
          <div className="grid gap-4 md:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
            {[1, 2, 3].map((i) => (
              <Card key={i} className="animate-pulse">
                <CardHeader>
                  <div className="aspect-video bg-muted rounded-lg" />
                  <div className="h-6 bg-muted rounded w-3/4" />
                  <div className="h-4 bg-muted rounded w-full" />
                </CardHeader>
              </Card>
            ))}
          </div>
        }
      >
        <VideosContent />
      </Suspense>
    </div>
  )
}
