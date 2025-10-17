import { notFound } from "next/navigation"
import { getCompanyById, getReviewsByCompany } from "@/lib/db"
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Star } from "lucide-react"

interface ShowcasePageProps {
  params: Promise<{ id: string }>
  searchParams: Promise<{ featured?: string; limit?: string }>
}

export default async function ShowcasePage({ params, searchParams }: ShowcasePageProps) {
  const { id } = await params
  const { featured, limit } = await searchParams

  const company = await getCompanyById(id)
  if (!company) {
    notFound()
  }

  const allReviews = await getReviewsByCompany(id)

  let reviews = allReviews.filter((r) => r.status === "approved")

  if (featured === "true") {
    reviews = reviews.filter((r) => r.is_featured)
  }

  if (limit) {
    reviews = reviews.slice(0, Number.parseInt(limit))
  }

  return (
    <div className="min-h-screen bg-background p-8">
      <div className="max-w-6xl mx-auto space-y-8">
        <div className="text-center space-y-4">
          {company.logo_url && (
            <div className="flex justify-center">
              <img src={company.logo_url || "/placeholder.svg"} alt={company.name} className="h-16 w-auto" />
            </div>
          )}
          <h1 className="text-4xl font-bold">{company.name}</h1>
          <p className="text-xl text-muted-foreground">Customer Testimonials</p>
        </div>

        {reviews.length === 0 ? (
          <Card>
            <CardContent className="py-12 text-center text-muted-foreground">No reviews available yet.</CardContent>
          </Card>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {reviews.map((review) => (
              <Card key={review.id} className="flex flex-col">
                <CardContent className="pt-6 flex-1 flex flex-col">
                  <div className="flex items-center gap-3 mb-4">
                    <Avatar>
                      <AvatarImage src={review.reviewer_avatar || undefined} />
                      <AvatarFallback>{review.reviewer_name.charAt(0).toUpperCase()}</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-semibold">{review.reviewer_name}</p>
                      {review.rating && (
                        <div className="flex gap-0.5">
                          {Array.from({ length: 5 }).map((_, i) => (
                            <Star
                              key={i}
                              className={`w-4 h-4 ${i < review.rating! ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`}
                            />
                          ))}
                        </div>
                      )}
                    </div>
                  </div>

                  {review.comment && <p className="text-sm text-muted-foreground flex-1">{review.comment}</p>}
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
