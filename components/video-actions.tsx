"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { MoreVertical, Check, X, Star, StarOff, Loader2 } from "lucide-react"
import { updateVideoStatus, toggleVideoFeatured } from "@/app/actions/videos"

type Video = {
  id: string
  status: "pending" | "approved" | "rejected"
  featured: boolean
}

export function VideoActions({ video }: { video: Video }) {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)

  async function handleStatusChange(status: "pending" | "approved" | "rejected") {
    setIsLoading(true)
    try {
      await updateVideoStatus(video.id, status)
      router.refresh()
    } catch (error) {
      console.error("Error updating status:", error)
      alert("Failed to update status")
    } finally {
      setIsLoading(false)
    }
  }

  async function handleToggleFeatured() {
    setIsLoading(true)
    try {
      await toggleVideoFeatured(video.id, !video.featured)
      router.refresh()
    } catch (error) {
      console.error("Error toggling featured:", error)
      alert("Failed to toggle featured status")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon" disabled={isLoading}>
          {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <MoreVertical className="h-4 w-4" />}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>Actions</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={() => handleStatusChange("approved")} disabled={video.status === "approved"}>
          <Check className="mr-2 h-4 w-4" />
          Approve
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => handleStatusChange("rejected")} disabled={video.status === "rejected"}>
          <X className="mr-2 h-4 w-4" />
          Reject
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => handleStatusChange("pending")} disabled={video.status === "pending"}>
          <Loader2 className="mr-2 h-4 w-4" />
          Set Pending
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={handleToggleFeatured}>
          {video.featured ? (
            <>
              <StarOff className="mr-2 h-4 w-4" />
              Unfeature
            </>
          ) : (
            <>
              <Star className="mr-2 h-4 w-4" />
              Feature
            </>
          )}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
