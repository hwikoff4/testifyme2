"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Star, Loader2, Upload, X, CheckCircle2, Sparkles } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { generateReview } from "@/app/actions/ai-review"
import { upload } from "@vercel/blob/client"

interface Company {
  id: string
  name: string
}

interface NewReviewFormProps {
  companies: Company[]
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

export function NewReviewForm({ companies }: NewReviewFormProps) {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [rating, setRating] = useState(5)
  const [comment, setComment] = useState("")
  const [selectedKeywords, setSelectedKeywords] = useState<string[]>([])
  const [selectedEmotions, setSelectedEmotions] = useState<string[]>([])
  const [selectedServiceType, setSelectedServiceType] = useState<string>("")
  const [isGenerating, setIsGenerating] = useState(false)
  const [videoFile, setVideoFile] = useState<File | null>(null)
  const [isUploading, setIsUploading] = useState(false)
  const [uploadedVideoUrl, setUploadedVideoUrl] = useState<string>("")
  const [selectedCompany, setSelectedCompany] = useState<string>("")

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

    if (!selectedCompany) {
      setError("Please select a company first")
      return
    }

    const company = companies.find((c) => c.id === selectedCompany)
    if (!company) return

    setIsGenerating(true)
    setError(null)

    try {
      const result = await generateReview({
        companyName: company.name,
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

    if (!selectedCompany) {
      setError("Please select a company")
      return
    }

    setIsSubmitting(true)
    setError(null)

    const formData = new FormData(e.currentTarget)

    console.log("[v0] Submitting review with video_url:", uploadedVideoUrl)

    try {
      // Using the same API endpoint as submit-review-form
      const response = await fetch("/api/reviews/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          company_id: selectedCompany,
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

      router.push("/dashboard/reviews")
      router.refresh()
    } catch (err) {
      console.error("[v0] Submit error:", err)
      setError(err instanceof Error ? err.message : "An error occurred")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 md:space-y-6">
      <div className="space-y-2">
        <Label htmlFor="company">Company *</Label>
        <Select value={selectedCompany} onValueChange={setSelectedCompany} required>
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
        <Label htmlFor="reviewer_name">Reviewer Name *</Label>
        <Input id="reviewer_name" name="reviewer_name" placeholder="John Doe" required />
      </div>

      <div className="space-y-2">
        <Label htmlFor="reviewer_email">Reviewer Email *</Label>
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
            !selectedServiceType.trim() ||
            !selectedCompany
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
        <Label htmlFor="comment">Review Comment *</Label>
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

      <div className="flex gap-3">
        <Button
          type="submit"
          disabled={isSubmitting || isUploading || !selectedCompany}
          className="bg-gradient-to-r from-blue-600 to-red-600 hover:from-blue-700 hover:to-red-700"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Submitting...
            </>
          ) : (
            "Create Review"
          )}
        </Button>
        <Button type="button" variant="outline" onClick={() => router.back()} disabled={isSubmitting || isUploading}>
          Cancel
        </Button>
      </div>
    </form>
  )
}
