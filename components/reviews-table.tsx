"use client"

import { useState, useRef, useEffect } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { MoreHorizontal, CheckCircle, XCircle, Star, Trash2, Download } from "lucide-react"
import { useRouter } from "next/navigation"
import { updateReviewStatus, toggleReviewFeatured, deleteReview } from "@/app/actions/reviews"
import { ReviewDetailsModal } from "@/components/review-details-modal"

type Review = {
  id: string
  reviewer_name: string
  reviewer_email: string
  rating: number | null
  comment: string
  status: "pending" | "approved" | "rejected"
  is_featured: boolean
  created_at: string
  video_url: string | null
  reviewer_avatar: string | null
  videos?: {
    title: string
  }
}

export function ReviewsTable({ reviews }: { reviews: Review[] }) {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState<string | null>(null)
  const [openDropdown, setOpenDropdown] = useState<string | null>(null)
  const [selectedReview, setSelectedReview] = useState<Review | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setOpenDropdown(null)
      }
    }

    if (openDropdown) {
      document.addEventListener("mousedown", handleClickOutside)
      return () => document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [openDropdown])

  const handleStatusChange = async (reviewId: string, status: "pending" | "approved" | "rejected") => {
    setIsLoading(reviewId)
    setOpenDropdown(null)
    try {
      await updateReviewStatus(reviewId, status)
      router.refresh()
    } catch (error) {
      console.error("Error updating status:", error)
      alert("Failed to update review status")
    } finally {
      setIsLoading(null)
    }
  }

  const handleToggleFeatured = async (reviewId: string, currentFeatured: boolean) => {
    setIsLoading(reviewId)
    setOpenDropdown(null)
    try {
      await toggleReviewFeatured(reviewId, !currentFeatured)
      router.refresh()
    } catch (error) {
      console.error("Error toggling featured:", error)
      alert("Failed to toggle featured status")
    } finally {
      setIsLoading(null)
    }
  }

  const handleDelete = async (reviewId: string) => {
    if (!confirm("Are you sure you want to delete this review?")) return

    setIsLoading(reviewId)
    setOpenDropdown(null)
    try {
      await deleteReview(reviewId)
      router.refresh()
    } catch (error) {
      console.error("Error deleting review:", error)
      alert("Failed to delete review")
    } finally {
      setIsLoading(null)
    }
  }

  const handleRowClick = (review: Review) => {
    setSelectedReview(review)
    setIsModalOpen(true)
  }

  if (reviews.length === 0) {
    return (
      <div className="flex min-h-[300px] md:min-h-[400px] flex-col items-center justify-center rounded-lg border border-dashed p-6 md:p-8 text-center">
        <div className="mb-4 h-16 w-16 rounded-full bg-gradient-to-r from-blue-600 to-red-600 flex items-center justify-center">
          <Star className="h-8 w-8 text-white" />
        </div>
        <h3 className="mb-2 text-lg font-semibold">No reviews yet</h3>
        <p className="mb-4 text-sm text-muted-foreground">Start collecting testimonials from your customers</p>
      </div>
    )
  }

  return (
    <>
      <div className="rounded-lg border overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="min-w-[150px]">Customer</TableHead>
              <TableHead className="min-w-[100px]">Video</TableHead>
              <TableHead className="min-w-[80px]">Rating</TableHead>
              <TableHead className="min-w-[120px]">Status</TableHead>
              <TableHead className="min-w-[100px]">Date</TableHead>
              <TableHead className="w-[70px]"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {reviews.map((review) => (
              <TableRow
                key={review.id}
                onClick={() => handleRowClick(review)}
                className="transition-colors hover:bg-muted/50 cursor-pointer"
              >
                <TableCell>
                  <div>
                    <div className="font-medium">{review.reviewer_name}</div>
                    <div className="text-sm text-muted-foreground">{review.reviewer_email}</div>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <span className="text-sm">{review.videos?.title || "—"}</span>
                    {review.video_url && (
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-6 w-6"
                        asChild
                        onClick={(e) => e.stopPropagation()}
                      >
                        <a href={review.video_url} download target="_blank" rel="noopener noreferrer">
                          <Download className="h-3 w-3" />
                        </a>
                      </Button>
                    )}
                  </div>
                </TableCell>
                <TableCell>{review.rating ? `${review.rating}/5` : "—"}</TableCell>
                <TableCell>
                  <div className="flex gap-2">
                    <Badge
                      variant={
                        review.status === "approved"
                          ? "default"
                          : review.status === "rejected"
                            ? "destructive"
                            : "secondary"
                      }
                    >
                      {review.status}
                    </Badge>
                    {review.is_featured && (
                      <Badge className="bg-gradient-to-r from-blue-600 to-red-600 border-0">Featured</Badge>
                    )}
                  </div>
                </TableCell>
                <TableCell>{new Date(review.created_at).toLocaleDateString()}</TableCell>
                <TableCell>
                  <div className="relative" ref={openDropdown === review.id ? dropdownRef : null}>
                    <Button
                      variant="ghost"
                      size="icon"
                      disabled={isLoading === review.id}
                      onClick={(e) => {
                        e.stopPropagation()
                        setOpenDropdown(openDropdown === review.id ? null : review.id)
                      }}
                    >
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>

                    {openDropdown === review.id && (
                      <div
                        className="absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-50"
                        style={{
                          backgroundColor: "white",
                          border: "1px solid #e5e7eb",
                          boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -4px rgba(0, 0, 0, 0.1)",
                        }}
                        onClick={(e) => e.stopPropagation()}
                      >
                        <div className="py-1">
                          <button
                            onClick={() => handleStatusChange(review.id, "approved")}
                            disabled={review.status === "approved"}
                            className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
                          >
                            <CheckCircle className="mr-2 h-4 w-4" />
                            Approve
                          </button>
                          <button
                            onClick={() => handleStatusChange(review.id, "rejected")}
                            disabled={review.status === "rejected"}
                            className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
                          >
                            <XCircle className="mr-2 h-4 w-4" />
                            Reject
                          </button>
                          <button
                            onClick={() => handleStatusChange(review.id, "pending")}
                            disabled={review.status === "pending"}
                            className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
                          >
                            <CheckCircle className="mr-2 h-4 w-4" />
                            Set Pending
                          </button>
                          <button
                            onClick={() => handleToggleFeatured(review.id, review.is_featured)}
                            className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                          >
                            <Star className="mr-2 h-4 w-4" />
                            {review.is_featured ? "Unfeature" : "Feature"}
                          </button>
                          <button
                            onClick={() => handleDelete(review.id)}
                            className="flex items-center w-full px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                          >
                            <Trash2 className="mr-2 h-4 w-4" />
                            Delete
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <ReviewDetailsModal review={selectedReview} open={isModalOpen} onOpenChange={setIsModalOpen} />
    </>
  )
}
