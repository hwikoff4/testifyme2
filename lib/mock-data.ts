export const MOCK_CLIENT = {
  id: "demo-client-123",
  company_name: "Acme Corporation",
  subdomain: "acme",
  primary_color: "#3b82f6",
  logo_url: null,
  created_at: new Date().toISOString(),
}

export const MOCK_PROFILE = {
  id: "demo-profile-123",
  user_id: "demo-user-123",
  client_id: MOCK_CLIENT.id,
  display_name: "Demo User",
  role: "admin" as const,
  created_at: new Date().toISOString(),
  client: MOCK_CLIENT,
}

export const MOCK_REVIEWS = [
  {
    id: "review-1",
    client_id: MOCK_CLIENT.id,
    customer_name: "Sarah Johnson",
    customer_email: "sarah@example.com",
    customer_title: "Marketing Director",
    customer_company: "TechStart Inc",
    rating: 5,
    review_text:
      "Absolutely fantastic service! The team went above and beyond to ensure our project was a success. Their attention to detail and commitment to quality is unmatched.",
    video_url: null,
    is_approved: true,
    is_featured: true,
    submitted_at: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
    approved_at: new Date(Date.now() - 6 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: "review-2",
    client_id: MOCK_CLIENT.id,
    customer_name: "Michael Chen",
    customer_email: "michael@example.com",
    customer_title: "CEO",
    customer_company: "Growth Labs",
    rating: 5,
    review_text:
      "Working with this team has been a game-changer for our business. They delivered exactly what we needed, on time and within budget.",
    video_url: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
    is_approved: true,
    is_featured: true,
    submitted_at: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000).toISOString(),
    approved_at: new Date(Date.now() - 13 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: "review-3",
    client_id: MOCK_CLIENT.id,
    customer_name: "Emily Rodriguez",
    customer_email: "emily@example.com",
    customer_title: "Product Manager",
    customer_company: "InnovateCo",
    rating: 4,
    review_text:
      "Great experience overall. The product exceeded our expectations and the support team was very responsive.",
    video_url: null,
    is_approved: true,
    is_featured: false,
    submitted_at: new Date(Date.now() - 21 * 24 * 60 * 60 * 1000).toISOString(),
    approved_at: new Date(Date.now() - 20 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: "review-4",
    client_id: MOCK_CLIENT.id,
    customer_name: "David Park",
    customer_email: "david@example.com",
    customer_title: "CTO",
    customer_company: "DataFlow Systems",
    rating: 5,
    review_text:
      "Exceptional quality and professionalism. I highly recommend their services to anyone looking for reliable solutions.",
    video_url: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4",
    is_approved: true,
    is_featured: false,
    submitted_at: new Date(Date.now() - 28 * 24 * 60 * 60 * 1000).toISOString(),
    approved_at: new Date(Date.now() - 27 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: "review-5",
    client_id: MOCK_CLIENT.id,
    customer_name: "Jessica Williams",
    customer_email: "jessica@example.com",
    customer_title: "Operations Manager",
    customer_company: "Streamline Co",
    rating: 5,
    review_text: "Outstanding results! The team was professional, efficient, and delivered beyond our expectations.",
    video_url: null,
    is_approved: false,
    is_featured: false,
    submitted_at: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
    approved_at: null,
  },
  {
    id: "review-6",
    client_id: MOCK_CLIENT.id,
    customer_name: "Robert Taylor",
    customer_email: "robert@example.com",
    customer_title: "Founder",
    customer_company: "StartupHub",
    rating: 4,
    review_text:
      "Very satisfied with the service. Quick turnaround and excellent communication throughout the process.",
    video_url: null,
    is_approved: false,
    is_featured: false,
    submitted_at: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
    approved_at: null,
  },
]

export const MOCK_CLIENTS = [
  MOCK_CLIENT,
  {
    id: "demo-client-456",
    company_name: "TechVision Inc",
    subdomain: "techvision",
    primary_color: "#10b981",
    logo_url: null,
    created_at: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: "demo-client-789",
    company_name: "Digital Solutions",
    subdomain: "digitalsolutions",
    primary_color: "#8b5cf6",
    logo_url: null,
    created_at: new Date(Date.now() - 60 * 24 * 60 * 60 * 1000).toISOString(),
  },
]

export const MOCK_ADMINS = [
  {
    id: "admin-1",
    user_id: "admin-user-1",
    email: "admin@testify.ai",
    display_name: "Platform Admin",
    created_at: new Date().toISOString(),
  },
]

export function getMockStats(clientId: string) {
  const clientReviews = MOCK_REVIEWS.filter((r) => r.client_id === clientId)
  return {
    total: clientReviews.length,
    approved: clientReviews.filter((r) => r.is_approved).length,
    pending: clientReviews.filter((r) => !r.is_approved).length,
    featured: clientReviews.filter((r) => r.is_featured).length,
    videoReviews: clientReviews.filter((r) => r.video_url).length,
    textReviews: clientReviews.filter((r) => !r.video_url).length,
  }
}

export function getMockPlatformStats() {
  return {
    totalClients: MOCK_CLIENTS.length,
    totalReviews: MOCK_REVIEWS.length,
    approvedReviews: MOCK_REVIEWS.filter((r) => r.is_approved).length,
    pendingReviews: MOCK_REVIEWS.filter((r) => !r.is_approved).length,
  }
}
