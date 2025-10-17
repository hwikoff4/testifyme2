import { createServerClient } from "@/lib/supabase/server"

export type Company = {
  id: string
  name: string
  logo_url: string | null
  website: string | null
  description: string | null
  brand_color: string | null
  google_place_id: string | null // Added google_place_id field
  company_email: string | null // Added business card fields
  company_phone: string | null // Added business card fields
  company_address: string | null // Added business card fields
  created_at: string
  updated_at: string
}

export type Video = {
  id: string
  company_id: string
  title: string
  description: string | null
  video_url: string
  thumbnail_url: string | null
  duration: number | null
  view_count: number
  status: "pending" | "approved" | "rejected"
  featured: boolean
  created_at: string
  updated_at: string
  source?: "company" | "customer"
  reviewer_name?: string
  reviewer_email?: string
  rating?: number
}

export type Review = {
  id: string
  video_id: string
  company_id: string
  reviewer_name: string
  reviewer_email: string
  reviewer_avatar: string | null
  rating: number | null
  comment: string
  status: "pending" | "approved" | "rejected"
  is_featured: boolean
  video_url: string | null // Added video_url field
  created_at: string
  updated_at: string
}

// Companies
export async function getCompanies() {
  const supabase = await createServerClient()
  const profile = await getCurrentUserProfile()

  if (!profile?.company_id) {
    return []
  }

  // Only return the user's own company
  const { data, error } = await supabase
    .from("companies")
    .select("*")
    .eq("id", profile.company_id)
    .order("created_at", { ascending: false })

  if (error) throw error
  return data as Company[]
}

export async function getCompany(id: string) {
  const supabase = await createServerClient()
  const { data, error } = await supabase.from("companies").select("*").eq("id", id).single()

  if (error) throw error
  return data as Company
}

export const getCompanyById = getCompany

export async function createCompany(company: Omit<Company, "id" | "created_at" | "updated_at">) {
  const supabase = await createServerClient()

  const companyData: any = {
    name: company.name,
    logo_url: company.logo_url,
    website: company.website,
    description: company.description,
    brand_color: company.brand_color,
    google_place_id: company.google_place_id,
  }

  // Only add business card fields if they have values
  if (company.company_email) companyData.company_email = company.company_email
  if (company.company_phone) companyData.company_phone = company.company_phone
  if (company.company_address) companyData.company_address = company.company_address

  const { data, error } = await supabase.from("companies").insert(companyData).select().single()

  if (error) throw error
  return data as Company
}

export async function updateCompany(id: string, updates: Partial<Omit<Company, "id" | "created_at" | "updated_at">>) {
  const supabase = await createServerClient()
  const profile = await getCurrentUserProfile()

  if (!profile?.company_id) {
    throw new Error("User profile not found")
  }

  if (profile.company_id !== id) {
    throw new Error("Unauthorized: You can only update your own company")
  }

  const { data, error } = await supabase
    .from("companies")
    .update({ ...updates, updated_at: new Date().toISOString() })
    .eq("id", id)
    .select()
    .single()

  if (error) throw error
  return data as Company
}

// Videos
export async function getVideos(companyId?: string) {
  const supabase = await createServerClient()
  const profile = await getCurrentUserProfile()

  if (!profile?.company_id) {
    return []
  }

  // Use the user's company_id, ignore the parameter
  const { data, error } = await supabase
    .from("videos")
    .select("*, companies(*)")
    .eq("company_id", profile.company_id)
    .order("created_at", { ascending: false })

  console.log("[v0] getVideos - company_id:", profile.company_id, "results:", data?.length)

  if (error) throw error
  return data
}

export async function getVideo(id: string) {
  const supabase = await createServerClient()
  const { data, error } = await supabase.from("videos").select("*, companies(*)").eq("id", id).single()

  if (error) throw error
  return data
}

export async function createVideo(video: Omit<Video, "id" | "created_at" | "updated_at">) {
  const supabase = await createServerClient()
  const { data, error } = await supabase.from("videos").insert(video).select().single()

  if (error) throw error
  return data as Video
}

export async function updateVideo(id: string, updates: Partial<Omit<Video, "id" | "created_at" | "updated_at">>) {
  const supabase = await createServerClient()
  const { data, error } = await supabase
    .from("videos")
    .update({ ...updates, updated_at: new Date().toISOString() })
    .eq("id", id)
    .select()
    .single()

  if (error) throw error
  return data as Video
}

export async function getVideosByCompany(companyId: string) {
  const supabase = await createServerClient()
  const { data, error } = await supabase
    .from("videos")
    .select("*")
    .eq("company_id", companyId)
    .order("created_at", { ascending: false })

  if (error) throw error
  return data as Video[]
}

// Reviews
export async function getReviews(videoId?: string) {
  const supabase = await createServerClient()
  const profile = await getCurrentUserProfile()

  console.log("[v0] getReviews - profile:", profile)

  if (!profile?.company_id) {
    console.log("[v0] getReviews - No company_id found in profile")
    return []
  }

  let query = supabase
    .from("reviews")
    .select("*, videos(*), companies(*)")
    .eq("company_id", profile.company_id)
    .order("created_at", { ascending: false })

  if (videoId) {
    query = query.eq("video_id", videoId)
  }

  console.log("[v0] getReviews - company_id:", profile.company_id, "videoId filter:", videoId)

  const { data, error } = await query

  console.log("[v0] getReviews - results:", data?.length, "error:", error)

  if (error) throw error
  return data
}

export async function updateReviewStatus(id: string, status: "pending" | "approved" | "rejected") {
  const supabase = await createServerClient()
  const { data, error } = await supabase
    .from("reviews")
    .update({ status, updated_at: new Date().toISOString() })
    .eq("id", id)
    .select()
    .single()

  if (error) throw error
  return data
}

export async function toggleReviewFeatured(id: string, isFeatured: boolean) {
  const supabase = await createServerClient()
  const { data, error } = await supabase
    .from("reviews")
    .update({ is_featured: isFeatured, updated_at: new Date().toISOString() })
    .eq("id", id)
    .select()
    .single()

  if (error) throw error
  return data
}

export async function getReviewsByCompany(companyId: string) {
  const supabase = await createServerClient()
  const { data, error } = await supabase
    .from("reviews")
    .select("*, videos(*)")
    .eq("company_id", companyId)
    .order("created_at", { ascending: false })

  if (error) throw error
  return data as Review[]
}

// User Profile and Company
export async function getCurrentUserProfile() {
  const supabase = await createServerClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) return null

  const { data, error } = await supabase.from("profiles").select("*, companies(*)").eq("user_id", user.id).single()

  if (error) {
    console.error("Error fetching user profile:", error)
    return null
  }

  return data
}

export async function createUserProfile(userId: string, companyId: string, role = "owner") {
  const supabase = await createServerClient()
  const { data, error } = await supabase
    .from("profiles")
    .insert({
      user_id: userId,
      company_id: companyId,
      role,
    })
    .select()
    .single()

  if (error) throw error
  return data
}

// Stats
export async function getStats() {
  const supabase = await createServerClient()
  const profile = await getCurrentUserProfile()

  if (!profile?.company_id) {
    return {
      totalCompanies: 0,
      totalVideos: 0,
      totalReviews: 0,
      approvedReviews: 0,
      pendingReviews: 0,
      featuredReviews: 0,
    }
  }

  const [companiesResult, videosResult, reviewsResult] = await Promise.all([
    supabase.from("companies").select("id", { count: "exact", head: true }).eq("id", profile.company_id),
    supabase.from("videos").select("id", { count: "exact", head: true }).eq("company_id", profile.company_id),
    supabase.from("reviews").select("status, is_featured").eq("company_id", profile.company_id),
  ])

  const reviews = reviewsResult.data || []

  console.log("[v0] getStats - company_id:", profile.company_id, "reviews:", reviews.length)

  return {
    totalCompanies: companiesResult.count || 0,
    totalVideos: videosResult.count || 0,
    totalReviews: reviews.length,
    approvedReviews: reviews.filter((r) => r.status === "approved").length,
    pendingReviews: reviews.filter((r) => r.status === "pending").length,
    featuredReviews: reviews.filter((r) => r.is_featured).length,
  }
}

export async function getAllVideos() {
  const supabase = await createServerClient()
  const profile = await getCurrentUserProfile()

  if (!profile?.company_id) {
    return []
  }

  // Get company-uploaded videos
  const { data: companyVideos, error: videosError } = await supabase
    .from("videos")
    .select("*")
    .eq("company_id", profile.company_id)
    .order("created_at", { ascending: false })

  if (videosError) throw videosError

  // Get customer-uploaded videos from reviews
  const { data: reviewVideos, error: reviewsError } = await supabase
    .from("reviews")
    .select("*")
    .eq("company_id", profile.company_id)
    .not("video_url", "is", null)
    .order("created_at", { ascending: false })

  if (reviewsError) throw reviewsError

  // Transform review videos to match video format
  const customerVideos = (reviewVideos || []).map((review) => ({
    id: review.id,
    company_id: review.company_id,
    title: `${review.reviewer_name}'s Testimonial`,
    description: review.comment,
    video_url: review.video_url!,
    thumbnail_url: null,
    duration: null,
    view_count: 0,
    status: review.status,
    featured: review.is_featured,
    created_at: review.created_at,
    updated_at: review.updated_at,
    source: "customer" as const,
    reviewer_name: review.reviewer_name,
    reviewer_email: review.reviewer_email,
    rating: review.rating,
  }))

  // Combine and sort by date
  const allVideos = [
    ...(companyVideos || []).map((v) => ({ ...v, source: "company" as const })),
    ...customerVideos,
  ].sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())

  return allVideos
}
