"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Star, CheckCircle2, Loader2, Sparkles, Upload, X, Copy, Check } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { generateReview } from "@/app/actions/ai-review"
import { upload } from "@vercel/blob/client"
import { Card, CardContent } from "@/components/ui/card"

interface Video {
  id: string
  title: string
}

interface SubmitReviewFormProps {
  companyId: string
  companyName: string
  videos: Video[]
  googlePlaceId?: string | null // Added googlePlaceId prop
  facebookPageId?: string | null // Added facebookPageId prop
}

const KEYWORDS = [
  "quality",
  "service",
  "value",
  "professional",
  "reliable",
  "efficient",
  "innovative",
  "responsive",
  "knowledgeable",
  "friendly",
  "timely",
  "thorough",
]

const EMOTIONS = [
  "satisfied",
  "impressed",
  "grateful",
  "excited",
  "confident",
  "relieved",
  "delighted",
  "amazed",
  "pleased",
  "thankful",
]

export function SubmitReviewForm({
  companyId,
  companyName,
  videos,
  googlePlaceId,
  facebookPageId,
}: SubmitReviewFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)
  const [rating, setRating] = useState(5)
  const [comment, setComment] = useState("")
  const [selectedKeywords, setSelectedKeywords] = useState<string[]>([])
  const [selectedEmotions, setSelectedEmotions] = useState<string[]>([])
  const [selectedServiceType, setSelectedServiceType] = useState<string>("")
  const [isGenerating, setIsGenerating] = useState(false)
  const [videoFile, setVideoFile] = useState<File | null>(null)
  const [isUploading, setIsUploading] = useState(false)
  const [uploadedVideoUrl, setUploadedVideoUrl] = useState<string>("")
  const [copied, setCopied] = useState(false)

  const handleVideoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
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
    setError(null)
    setIsUploading(true)

    try {
      console.log("[v0] Starting video upload:", file.name, file.size)
      // Upload directly to Blob from client using handleUpload
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

  const handleGenerateReview = async () => {
    if (selectedKeywords.length === 0 || selectedEmotions.length === 0 || !selectedServiceType.trim()) {
      setError("Please enter a service type, select at least one keyword, and one emotion to generate a review")
      return
    }

    setIsGenerating(true)
    setError(null)

    try {
      const result = await generateReview({
        companyName,
        keywords: selectedKeywords,
        emotions: selectedEmotions,
        serviceType: selectedServiceType,
      })

      if (result.success && result.review) {
        setComment(result.review)
      } else {
        setError(result.error || "Failed to generate review")
      }
    } catch (err) {
      setError("An error occurred while generating the review")
    } finally {
      setIsGenerating(false)
    }
  }

  const toggleKeyword = (keyword: string) => {
    setSelectedKeywords((prev) => (prev.includes(keyword) ? prev.filter((k) => k !== keyword) : [...prev, keyword]))
  }

  const toggleEmotion = (emotion: string) => {
    setSelectedEmotions((prev) => (prev.includes(emotion) ? prev.filter((e) => e !== emotion) : [...prev, emotion]))
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)
    setError(null)

    const formData = new FormData(e.currentTarget)

    console.log("[v0] Submitting review with video_url:", uploadedVideoUrl)

    try {
      const response = await fetch("/api/reviews/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          company_id: companyId,
          reviewer_name: formData.get("reviewer_name"),
          reviewer_email: formData.get("reviewer_email"),
          rating,
          comment: comment || formData.get("comment"),
          video_url: uploadedVideoUrl || null,
        }),
      })

      if (!response.ok) throw new Error("Failed to submit review")

      const result = await response.json()
      console.log("[v0] Review submitted successfully:", result)

      setSuccess(true)
    } catch (err) {
      console.error("[v0] Submit error:", err)
      setError(err instanceof Error ? err.message : "An error occurred")
    } finally {
      setIsSubmitting(false)
    }
  }

  const copyReviewText = () => {
    navigator.clipboard.writeText(comment)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const googleReviewUrl = googlePlaceId ? `https://search.google.com/local/writereview?placeid=${googlePlaceId}` : null
  const facebookReviewUrl = facebookPageId ? `https://www.facebook.com/${facebookPageId}/reviews` : null

  if (success) {
    return (
      <div className="flex flex-col items-center justify-center py-8 md:py-12 text-center space-y-6">
        <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
          <CheckCircle2 className="h-8 w-8 text-green-600" />
        </div>
        <div className="space-y-2">
          <h2 className="text-xl md:text-2xl font-bold">Thank you for your review!</h2>
          <p className="text-sm md:text-base text-muted-foreground px-4">
            Your testimonial has been submitted and will be reviewed shortly.
          </p>
        </div>

        {rating === 5 && (googleReviewUrl || facebookReviewUrl) && comment && (
          <div className="w-full max-w-md space-y-4">
            <h3 className="font-semibold text-lg">Share Your Review</h3>
            <p className="text-sm text-muted-foreground">Help others discover {companyName} by posting your review!</p>

            <Card className="border-2 border-blue-200 bg-blue-50/50">
              <CardContent className="pt-6 space-y-4">
                <div className="bg-white rounded-lg p-3 border border-blue-200">
                  <p className="text-sm text-gray-700 italic line-clamp-3">{comment}</p>
                </div>

                <Button variant="outline" size="sm" onClick={copyReviewText} className="w-full bg-white">
                  {copied ? (
                    <>
                      <Check className="mr-2 h-4 w-4" />
                      Copied!
                    </>
                  ) : (
                    <>
                      <Copy className="mr-2 h-4 w-4" />
                      Copy Review Text
                    </>
                  )}
                </Button>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {googleReviewUrl && (
                    <Button
                      asChild
                      className="bg-white hover:bg-gray-50 text-gray-900 border-2 border-gray-200"
                      variant="outline"
                    >
                      <a
                        href={googleReviewUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-center gap-2"
                      >
                        <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
                          <path
                            d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                            fill="#4285F4"
                          />
                          <path
                            d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23s3.99-2.47 7.07-5.93l-2.85 2.22-.81.62z"
                            fill="#34A853"
                          />
                          <path
                            d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                            fill="#FBBC05"
                          />
                          <path
                            d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                            fill="#EA4335"
                          />
                        </svg>
                        Google
                      </a>
                    </Button>
                  )}

                  {facebookReviewUrl && (
                    <Button asChild className="bg-[#1877F2] hover:bg-[#166FE5] text-white">
                      <a
                        href={facebookReviewUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-center gap-2"
                      >
                        <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                        </svg>
                        Facebook
                      </a>
                    </Button>
                  )}
                </div>

                <p className="text-xs text-blue-600">
                  Copy your review and paste it on Google or Facebook to help others find {companyName}
                </p>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 md:space-y-6">
      <div className="space-y-2">
        <Label htmlFor="video">Upload Video (Optional)</Label>
        <p className="text-sm text-muted-foreground mb-2">Share a video testimonial to make your review stand out</p>
        {!videoFile ? (
          <div className="border-2 border-dashed rounded-lg p-6 text-center hover:border-primary transition-colors">
            <input
              type="file"
              id="video"
              accept="video/*"
              onChange={handleVideoUpload}
              className="hidden"
              disabled={isUploading}
            />
            <label htmlFor="video" className="cursor-pointer">
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
              <span className="text-sm font-medium truncate">{videoFile.name}</span>
            </div>
            <Button type="button" variant="ghost" size="sm" onClick={removeVideo} disabled={isUploading}>
              <X className="h-4 w-4" />
            </Button>
          </div>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="reviewer_name">Your Name *</Label>
        <Input id="reviewer_name" name="reviewer_name" placeholder="John Doe" required />
      </div>

      <div className="space-y-2">
        <Label htmlFor="reviewer_email">Your Email *</Label>
        <Input id="reviewer_email" name="reviewer_email" type="email" placeholder="john@example.com" required />
      </div>

      <div className="space-y-2">
        <Label>Rating *</Label>
        <div className="flex gap-2">
          {Array.from({ length: 5 }).map((_, i) => (
            <button
              key={i}
              type="button"
              onClick={() => setRating(i + 1)}
              className="transition-transform hover:scale-110"
            >
              <Star className={`h-8 w-8 ${i < rating ? "fill-yellow-400 text-yellow-400" : "fill-muted text-muted"}`} />
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-4 rounded-lg border-2 border-dashed border-purple-300 bg-purple-50/50 p-4">
        <div className="flex items-center gap-2">
          <Sparkles className="h-5 w-5 text-purple-600" />
          <h3 className="font-semibold text-purple-900">AI-Powered Review Generator</h3>
        </div>
        <p className="text-sm text-purple-700">
          Enter the service type and select keywords and emotions to generate a personalized review using AI
        </p>

        <div className="space-y-2">
          <Label htmlFor="serviceType">Service Type *</Label>
          <Input
            id="serviceType"
            placeholder="e.g., flooring, roofing, plumbing, web design..."
            value={selectedServiceType}
            onChange={(e) => setSelectedServiceType(e.target.value)}
            className="bg-white"
          />
          <p className="text-xs text-muted-foreground italic">
            Be specific about the service you received for better AI-generated reviews
          </p>
        </div>

        <div className="space-y-2">
          <Label>Keywords</Label>
          <div className="flex flex-wrap gap-2">
            {KEYWORDS.map((keyword) => (
              <Badge
                key={keyword}
                variant={selectedKeywords.includes(keyword) ? "default" : "outline"}
                className="cursor-pointer transition-all hover:scale-105"
                onClick={() => toggleKeyword(keyword)}
              >
                {keyword}
              </Badge>
            ))}
          </div>
        </div>

        <div className="space-y-2">
          <Label>Emotions</Label>
          <div className="flex flex-wrap gap-2">
            {EMOTIONS.map((emotion) => (
              <Badge
                key={emotion}
                variant={selectedEmotions.includes(emotion) ? "default" : "outline"}
                className="cursor-pointer transition-all hover:scale-105"
                onClick={() => toggleEmotion(emotion)}
              >
                {emotion}
              </Badge>
            ))}
          </div>
        </div>

        <Button
          type="button"
          onClick={handleGenerateReview}
          disabled={
            isGenerating ||
            selectedKeywords.length === 0 ||
            selectedEmotions.length === 0 ||
            !selectedServiceType.trim()
          }
          className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
        >
          {isGenerating ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Generating with AI...
            </>
          ) : (
            <>
              <Sparkles className="mr-2 h-4 w-4" />
              Generate Review with AI
            </>
          )}
        </Button>
      </div>

      <div className="space-y-2">
        <Label htmlFor="comment">Your Review *</Label>
        <Textarea
          id="comment"
          name="comment"
          placeholder="Share your experience... or use AI to generate one above!"
          rows={5}
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          required
        />
      </div>

      {error && <p className="text-sm text-red-600">{error}</p>}

      <Button
        type="submit"
        disabled={isSubmitting || isUploading}
        className="w-full bg-gradient-to-r from-blue-600 to-red-600 hover:from-blue-700 hover:to-red-700"
      >
        {isSubmitting ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Submitting...
          </>
        ) : (
          "Submit Review"
        )}
      </Button>
    </form>
  )
}
