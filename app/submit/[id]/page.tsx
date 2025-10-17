import { notFound } from "next/navigation"
import { getCompanyById, getVideosByCompany } from "@/lib/db"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { SubmitReviewForm } from "@/components/submit-review-form"

interface SubmitPageProps {
  params: Promise<{ id: string }>
}

export default async function SubmitPage({ params }: SubmitPageProps) {
  const { id } = await params

  const company = await getCompanyById(id)
  if (!company) {
    notFound()
  }

  const videos = await getVideosByCompany(id)

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-red-50 p-4 md:p-8">
      <div className="max-w-2xl mx-auto space-y-4 md:space-y-6">
        {/* Company Header */}
        <div className="text-center space-y-3 md:space-y-4">
          {company.logo_url && (
            <div className="flex justify-center">
              <img src={company.logo_url || "/placeholder.svg"} alt={company.name} className="h-12 md:h-16 w-auto" />
            </div>
          )}
          <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-blue-600 to-red-600 bg-clip-text text-transparent">
            Share Your Experience
          </h1>
          <p className="text-base md:text-lg text-muted-foreground px-4">
            We'd love to hear about your experience with {company.name}
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Submit Your Review</CardTitle>
            <CardDescription>Your feedback helps us improve and helps others make informed decisions</CardDescription>
          </CardHeader>
          <CardContent>
            <SubmitReviewForm
              companyId={id}
              companyName={company.name}
              videos={videos}
              googlePlaceId={company.google_place_id}
              facebookPageId={company.facebook_page_id}
            />
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
