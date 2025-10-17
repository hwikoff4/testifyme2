"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { createVideo } from "@/app/actions/videos"
import { Loader2, Upload, X, CheckCircle2 } from "lucide-react"
import { upload } from "@vercel/blob/client"

interface Company {
  id: string
  name: string
}

interface VideoFormProps {
  companies: Company[]
}

export function VideoForm({ companies }: VideoFormProps) {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [videoFile, setVideoFile] = useState<File | null>(null)
  const [videoUrl, setVideoUrl] = useState("")
  const [isUploading, setIsUploading] = useState(false)
  const [uploadedVideoUrl, setUploadedVideoUrl] = useState<string>("")
  const [error, setError] = useState<string | null>(null)

  const handleVideoFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    // Validate file type
    if (!file.type.startsWith("video/")) {
      setError("Please upload a valid video file")
      return
    }

    // Validate file size (max 100MB)
    if (file.size > 100 * 1024 * 1024) {
      setError("Video file must be less than 100MB")
      return
    }

    setVideoFile(file)
    setVideoUrl("") // Clear URL input when file is selected
    setError(null)
    setIsUploading(true)

    try {
      console.log("[v0] Starting video upload:", file.name, file.size)

      const blob = await upload(file.name, file, {
        access: "public",
        handleUploadUrl: "/api/upload",
      })

      setUploadedVideoUrl(blob.url)
      console.log("[v0] Video uploaded successfully:", blob.url)
    } catch (err) {
      console.error("[v0] Upload error:", err)
      setError(err instanceof Error ? err.message : "Failed to upload video")
      setVideoFile(null)
    } finally {
      setIsUploading(false)
    }
  }

  const removeVideo = () => {
    setVideoFile(null)
    setUploadedVideoUrl("")
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setIsSubmitting(true)
    setError(null)

    const formData = new FormData(e.currentTarget)

    try {
      if (uploadedVideoUrl) {
        formData.set("video_url", uploadedVideoUrl)
      }

      await createVideo(formData)
      router.push("/dashboard/videos")
      router.refresh()
    } catch (error) {
      console.error("[v0] Error creating video:", error)
      const errorMessage = error instanceof Error ? error.message : "Failed to create video. Please try again."
      setError(errorMessage)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="company_id">Company *</Label>
        <Select name="company_id" required>
          <SelectTrigger>
            <SelectValue placeholder="Select a company" />
          </SelectTrigger>
          <SelectContent>
            {companies.map((company) => (
              <SelectItem key={company.id} value={company.id}>
                {company.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label htmlFor="title">Video Title *</Label>
        <Input id="title" name="title" placeholder="e.g., Customer Success Story" required />
      </div>

      <div className="space-y-2">
        <Label htmlFor="description">Description</Label>
        <Textarea id="description" name="description" placeholder="Brief description of the video..." rows={3} />
      </div>

      <div className="space-y-4 p-4 border rounded-lg bg-muted/50">
        <Label>Video Source *</Label>
        <div className="space-y-3">
          <div className="space-y-2">
            <Label htmlFor="video_file" className="text-sm font-normal">
              Upload Video File
            </Label>
            {!videoFile ? (
              <div className="border-2 border-dashed rounded-lg p-6 text-center hover:border-primary transition-colors">
                <input
                  id="video_file"
                  type="file"
                  accept="video/*"
                  onChange={handleVideoFileChange}
                  disabled={!!videoUrl || isUploading}
                  className="hidden"
                />
                <label htmlFor="video_file" className="cursor-pointer">
                  <Upload className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
                  <p className="text-sm font-medium">Click to upload video</p>
                  <p className="text-xs text-muted-foreground mt-1">MP4, MOV, or WebM (max 100MB)</p>
                </label>
              </div>
            ) : (
              <div className="border rounded-lg p-4 flex items-center justify-between bg-muted/50">
                <div className="flex items-center gap-2">
                  {isUploading ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <CheckCircle2 className="h-4 w-4 text-green-600" />
                  )}
                  <div>
                    <p className="text-sm font-medium truncate">{videoFile.name}</p>
                    <p className="text-xs text-muted-foreground">
                      {(videoFile.size / 1024 / 1024).toFixed(2)} MB
                      {isUploading && " - Uploading..."}
                      {uploadedVideoUrl && " - Uploaded successfully"}
                    </p>
                  </div>
                </div>
                <Button type="button" variant="ghost" size="sm" onClick={removeVideo} disabled={isUploading}>
                  <X className="h-4 w-4" />
                </Button>
              </div>
            )}
          </div>

          <div className="flex items-center gap-2">
            <div className="h-px bg-border flex-1" />
            <span className="text-xs text-muted-foreground">OR</span>
            <div className="h-px bg-border flex-1" />
          </div>

          <div className="space-y-2">
            <Label htmlFor="video_url" className="text-sm font-normal">
              Video URL
            </Label>
            <Input
              id="video_url"
              name="video_url"
              type="url"
              placeholder="https://youtube.com/watch?v=..."
              value={videoUrl}
              onChange={(e) => setVideoUrl(e.target.value)}
              disabled={!!videoFile}
              required={!videoFile && !uploadedVideoUrl}
            />
          </div>
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="thumbnail_url">Thumbnail URL</Label>
        <Input id="thumbnail_url" name="thumbnail_url" type="url" placeholder="https://example.com/thumbnail.jpg" />
      </div>

      <div className="space-y-2">
        <Label htmlFor="duration">Duration (seconds)</Label>
        <Input id="duration" name="duration" type="number" placeholder="120" min="0" />
      </div>

      {error && <p className="text-sm text-red-600">{error}</p>}

      <div className="flex gap-3">
        <Button
          type="submit"
          disabled={isSubmitting || isUploading || (!uploadedVideoUrl && !videoUrl)}
          className="bg-gradient-to-r from-blue-600 to-red-600 hover:from-blue-700 hover:to-red-700"
        >
          {isUploading ? (
            <>
              <Upload className="w-4 h-4 mr-2 animate-pulse" />
              Uploading...
            </>
          ) : isSubmitting ? (
            <>
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              Creating...
            </>
          ) : (
            "Create Video"
          )}
        </Button>
        <Button type="button" variant="outline" onClick={() => router.back()} disabled={isSubmitting || isUploading}>
          Cancel
        </Button>
      </div>
    </form>
  )
}
