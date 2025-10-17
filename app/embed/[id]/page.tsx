import { notFound } from "next/navigation"
import { getCompanyById, getReviewsByCompany } from "@/lib/db"
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Star } from "lucide-react"
import Image from "next/image"

interface EmbedPageProps {
  params: Promise<{ id: string }>
  searchParams: Promise<{ featured?: string; limit?: string }>
}

export default async function EmbedPage({ params, searchParams }: EmbedPageProps) {
  const { id } = await params
  const { featured, limit } = await searchParams

  const company = await getCompanyById(id)
  if (!company) {
    notFound()
  }

  const allReviews = await getReviewsByCompany(id)

  console.log("[v0] Total reviews fetched:", allReviews.length)
  console.log("[v0] Reviews with video_url:", allReviews.filter((r) => r.video_url).length)

  // Filter reviews
  let reviews = allReviews.filter((r) => r.status === "approved")

  if (featured === "true") {
    reviews = reviews.filter((r) => r.is_featured)
  }

  const totalReviews = reviews.length
  const averageRating = totalReviews > 0 ? reviews.reduce((acc, r) => acc + (r.rating || 0), 0) / totalReviews : 0

  if (limit) {
    reviews = reviews.slice(0, Number.parseInt(limit))
  }

  return (
    <div className="p-4 bg-transparent min-h-screen">
      {totalReviews > 0 && (
        <div className="mb-6 text-center">
          <div className="flex items-center justify-center gap-3 mb-2">
            <div className="text-5xl font-bold">{averageRating.toFixed(1)}</div>
            <div className="flex flex-col items-start">
              <div className="flex gap-1">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className={`w-5 h-5 ${i < Math.round(averageRating) ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`}
                  />
                ))}
              </div>
              <p className="text-sm text-muted-foreground">
                Based on {totalReviews} {totalReviews === 1 ? "review" : "reviews"}
              </p>
            </div>
          </div>
        </div>
      )}

      {reviews.length === 0 ? (
        <p className="text-center text-muted-foreground py-8">No reviews available.</p>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {reviews.map((review) => {
            console.log("[v0] Rendering review:", review.id, "video_url:", review.video_url)

            return (
              <Card key={review.id} className="flex flex-col">
                <CardContent className="pt-4 flex-1 flex flex-col">
                  {review.video_url && (
                    <div className="mb-3 rounded-lg overflow-hidden">
                      <video
                        src={review.video_url}
                        controls
                        className="w-full h-48 object-cover bg-black"
                        preload="metadata"
                      >
                        Your browser does not support the video tag.
                      </video>
                    </div>
                  )}

                  {/* Reviewer Info */}
                  <div className="flex items-center gap-2 mb-3">
                    <Avatar className="w-8 h-8">
                      <AvatarImage src={review.reviewer_avatar || undefined} />
                      <AvatarFallback className="text-xs">
                        {review.reviewer_name.charAt(0).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold text-sm truncate">{review.reviewer_name}</p>
                      {review.rating && (
                        <div className="flex gap-0.5">
                          {Array.from({ length: 5 }).map((_, i) => (
                            <Star
                              key={i}
                              className={`w-3 h-3 ${i < review.rating! ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`}
                            />
                          ))}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Comment */}
                  {review.comment && (
                    <p className="text-xs text-muted-foreground flex-1 line-clamp-4">{review.comment}</p>
                  )}
                </CardContent>
              </Card>
            )
          })}
        </div>
      )}

      <div className="fixed bottom-4 right-4">
        <a
          href="https://testify-ai.vercel.app"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 px-3 py-1.5 bg-white/90 backdrop-blur-sm rounded-full shadow-lg border border-gray-200 hover:shadow-xl transition-all text-xs font-medium text-gray-700 hover:text-gray-900"
        >
          <Image src="/logo.png" alt="Testify AI" width={16} height={16} className="w-4 h-4" />
          <span>Powered by Testify AI</span>
        </a>
      </div>
    </div>
  )
}
