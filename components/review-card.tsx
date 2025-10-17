import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Star, Video } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

type Review = {
  id: string
  customer_name: string
  customer_avatar_url: string | null
  review_type: string
  video_url: string | null
  text_content: string | null
  rating: number | null
  created_at: string
}

export function ReviewCard({ review, brandColor }: { review: Review; brandColor: string | null }) {
  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2)
  }

  const getVideoEmbedUrl = (url: string) => {
    // Convert YouTube watch URLs to embed URLs
    if (url.includes("youtube.com/watch")) {
      const videoId = new URL(url).searchParams.get("v")
      return `https://www.youtube.com/embed/${videoId}`
    }
    if (url.includes("youtu.be/")) {
      const videoId = url.split("youtu.be/")[1]?.split("?")[0]
      return `https://www.youtube.com/embed/${videoId}`
    }
    // Add more video platform support as needed
    return url
  }

  return (
    <Card className="flex h-full flex-col">
      <CardHeader>
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <Avatar>
              <AvatarImage src={review.customer_avatar_url || undefined} alt={review.customer_name} />
              <AvatarFallback>{getInitials(review.customer_name)}</AvatarFallback>
            </Avatar>
            <div>
              <p className="font-semibold">{review.customer_name}</p>
              {review.rating && (
                <div className="flex gap-0.5">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className={`h-4 w-4 ${
                        i < review.rating! ? "fill-yellow-400 text-yellow-400" : "fill-muted text-muted"
                      }`}
                    />
                  ))}
                </div>
              )}
            </div>
          </div>
          {review.review_type === "video" && (
            <div className="rounded-full bg-primary/10 p-2">
              <Video className="h-4 w-4" style={{ color: brandColor || undefined }} />
            </div>
          )}
        </div>
      </CardHeader>
      <CardContent className="flex-1">
        {review.review_type === "video" && review.video_url && (
          <div className="mb-4 aspect-video overflow-hidden rounded-lg">
            <iframe
              src={getVideoEmbedUrl(review.video_url)}
              className="h-full w-full"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        )}
        {review.text_content && <p className="text-sm leading-relaxed text-muted-foreground">{review.text_content}</p>}
      </CardContent>
    </Card>
  )
}
