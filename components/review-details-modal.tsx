"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { CheckCircle, XCircle, Star, Trash2, User, Download } from "lucide-react"
import { updateReviewStatus, toggleReviewFeatured, deleteReview } from "@/app/actions/reviews"
import { useRouter } from "next/navigation"

type Review = {
  id: string
  reviewer_name: string
  reviewer_email: string
  reviewer_avatar: string | null
  rating: number | null
  comment: string
  status: "pending" | "approved" | "rejected"
  is_featured: boolean
  created_at: string
  video_url: string | null
  videos?: {
    title: string
    video_url: string
  }
}

export function ReviewDetailsModal({
  review,
  open,
  onOpenChange,
}: {
  review: Review | null
  open: boolean
  onOpenChange: (open: boolean) => void
}) {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)

  if (!review) return null

  const handleStatusChange = async (status: "pending" | "approved" | "rejected") => {
    setIsLoading(true)
    try {
      await updateReviewStatus(review.id, status)
      router.refresh()
      onOpenChange(false)
    } catch (error) {
      console.error("Error updating status:", error)
      alert("Failed to update review status")
    } finally {
      setIsLoading(false)
    }
  }

  const handleToggleFeatured = async () => {
    setIsLoading(true)
    try {
      await toggleReviewFeatured(review.id, !review.is_featured)
      router.refresh()
      onOpenChange(false)
    } catch (error) {
      console.error("Error toggling featured:", error)
      alert("Failed to toggle featured status")
    } finally {
      setIsLoading(false)
    }
  }

  const handleDelete = async () => {
    if (!confirm("Are you sure you want to delete this review?")) return

    setIsLoading(true)
    try {
      await deleteReview(review.id)
      router.refresh()
      onOpenChange(false)
    } catch (error) {
      console.error("Error deleting review:", error)
      alert("Failed to delete review")
    } finally {
      setIsLoading(false)
    }
  }

  const videoUrl = review.video_url || review.videos?.video_url

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl">Review Details</DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Customer Info */}
          <div className="flex items-start gap-4 p-4 bg-muted/50 rounded-lg">
            <div className="h-12 w-12 rounded-full bg-gradient-to-r from-blue-600 to-red-600 flex items-center justify-center text-white font-semibold flex-shrink-0">
              {review.reviewer_avatar ? (
                <img
                  src={review.reviewer_avatar || "/placeholder.svg"}
                  alt={review.reviewer_name}
                  className="h-12 w-12 rounded-full"
                />
              ) : (
                <User className="h-6 w-6" />
              )}
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="font-semibold text-lg">{review.reviewer_name}</h3>
              <p className="text-sm text-muted-foreground break-all">{review.reviewer_email}</p>
              <div className="flex items-center gap-2 mt-2">
                {review.rating && (
                  <div className="flex items-center gap-1">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        className={`h-4 w-4 ${i < review.rating! ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`}
                      />
                    ))}
                    <span className="text-sm font-medium ml-1">{review.rating}/5</span>
                  </div>
                )}
                <span className="text-sm text-muted-foreground">
                  {new Date(review.created_at).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </span>
              </div>
            </div>
          </div>

          {/* Status Badges */}
          <div className="flex gap-2">
            <Badge
              variant={
                review.status === "approved" ? "default" : review.status === "rejected" ? "destructive" : "secondary"
              }
            >
              {review.status}
            </Badge>
            {review.is_featured && (
              <Badge className="bg-gradient-to-r from-blue-600 to-red-600 border-0">Featured</Badge>
            )}
            {review.videos?.title && <Badge variant="outline">{review.videos.title}</Badge>}
          </div>

          {/* Video */}
          {videoUrl && (
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <h4 className="font-semibold">Video Testimonial</h4>
                <Button
                  variant="outline"
                  size="sm"
                  asChild
                  className="hover:bg-gradient-to-r hover:from-blue-600 hover:to-red-600 hover:text-white transition-all bg-transparent"
                >
                  <a href={videoUrl} download target="_blank" rel="noopener noreferrer">
                    <Download className="w-4 h-4 mr-2" />
                    Download Video
                  </a>
                </Button>
              </div>
              <video src={videoUrl} controls className="w-full rounded-lg border" />
            </div>
          )}

          {/* Review Comment */}
          <div className="space-y-2">
            <h4 className="font-semibold">Review</h4>
            <div className="p-4 bg-muted/50 rounded-lg">
              <p className="text-sm leading-relaxed whitespace-pre-wrap">{review.comment}</p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap gap-2 pt-4 border-t">
            <Button
              onClick={() => handleStatusChange("approved")}
              disabled={isLoading || review.status === "approved"}
              variant={review.status === "approved" ? "default" : "outline"}
              className="flex-1 min-w-[120px]"
            >
              <CheckCircle className="mr-2 h-4 w-4" />
              Approve
            </Button>
            <Button
              onClick={() => handleStatusChange("rejected")}
              disabled={isLoading || review.status === "rejected"}
              variant={review.status === "rejected" ? "destructive" : "outline"}
              className="flex-1 min-w-[120px]"
            >
              <XCircle className="mr-2 h-4 w-4" />
              Reject
            </Button>
            <Button
              onClick={() => handleStatusChange("pending")}
              disabled={isLoading || review.status === "pending"}
              variant={review.status === "pending" ? "secondary" : "outline"}
              className="flex-1 min-w-[120px]"
            >
              <CheckCircle className="mr-2 h-4 w-4" />
              Set Pending
            </Button>
            <Button
              onClick={handleToggleFeatured}
              disabled={isLoading}
              variant={review.is_featured ? "default" : "outline"}
              className="flex-1 min-w-[120px]"
            >
              <Star className="mr-2 h-4 w-4" />
              {review.is_featured ? "Unfeature" : "Feature"}
            </Button>
            <Button onClick={handleDelete} disabled={isLoading} variant="destructive" className="flex-1 min-w-[120px]">
              <Trash2 className="mr-2 h-4 w-4" />
              Delete
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
