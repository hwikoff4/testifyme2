import { createClient } from "@/lib/supabase/server"

export async function getCurrentUserProfile() {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) return null

  try {
    const { data: profile, error } = await supabase
      .from("profiles")
      .select("*, client:clients(*)")
      .eq("user_id", user.id)
      .single()

    if (error) {
      console.error("Error fetching profile:", error)
      return null
    }

    return profile
  } catch (error) {
    console.error("Database query failed:", error)
    return null
  }
}

export async function isPlatformAdmin() {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) return false

  const { data: admin } = await supabase.from("platform_admins").select("*").eq("user_id", user.id).single()

  return !!admin
}

export async function getAllClients() {
  const supabase = await createClient()

  const { data: clients, error } = await supabase
    .from("clients")
    .select("*, profiles(count)")
    .order("created_at", { ascending: false })

  if (error) throw error
  return clients
}

export async function getPlatformStats() {
  const supabase = await createClient()

  const { data: clients } = await supabase.from("clients").select("id")
  const { data: reviews } = await supabase.from("reviews").select("*")
  const { data: profiles } = await supabase.from("profiles").select("id")

  const totalClients = clients?.length || 0
  const totalReviews = reviews?.length || 0
  const totalUsers = profiles?.length || 0
  const approvedReviews = reviews?.filter((r) => r.is_approved).length || 0
  const pendingReviews = reviews?.filter((r) => !r.is_approved).length || 0

  return {
    totalClients,
    totalReviews,
    totalUsers,
    approvedReviews,
    pendingReviews,
  }
}

export async function getClientReviews(clientId: string) {
  const supabase = await createClient()

  const { data: reviews, error } = await supabase
    .from("reviews")
    .select("*")
    .eq("client_id", clientId)
    .order("created_at", { ascending: false })

  if (error) throw error
  return reviews
}

export async function getClientStats(clientId: string) {
  const supabase = await createClient()

  const { data: reviews } = await supabase.from("reviews").select("*").eq("client_id", clientId)

  const total = reviews?.length || 0
  const approved = reviews?.filter((r) => r.is_approved).length || 0
  const pending = reviews?.filter((r) => !r.is_approved).length || 0
  const featured = reviews?.filter((r) => r.is_featured).length || 0
  const videoReviews = reviews?.filter((r) => r.review_type === "video").length || 0
  const textReviews = reviews?.filter((r) => r.review_type === "text").length || 0

  return {
    total,
    approved,
    pending,
    featured,
    videoReviews,
    textReviews,
  }
}
