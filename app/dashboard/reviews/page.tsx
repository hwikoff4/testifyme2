import { Suspense } from "react"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import Link from "next/link"
import { ReviewsTable } from "@/components/reviews-table"
import { getReviews } from "@/lib/db"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

async function ReviewsContent() {
  const reviews = await getReviews()

  return <ReviewsTable reviews={reviews} />
}

export default function ReviewsPage() {
  return (
    <div className="space-y-4 md:space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-gradient-brand">Reviews</h1>
          <p className="text-sm md:text-base text-muted-foreground mt-1">Manage your customer testimonials</p>
        </div>
        <Button asChild className="gradient-brand w-full sm:w-auto">
          <Link href="/dashboard/reviews/new">
            <Plus className="mr-2 h-4 w-4" />
            Add Review
          </Link>
        </Button>
      </div>

      <Suspense
        fallback={
          <Card className="animate-pulse">
            <CardHeader>
              <CardTitle className="h-6 bg-muted rounded w-1/4" />
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="h-16 bg-muted rounded" />
                ))}
              </div>
            </CardContent>
          </Card>
        }
      >
        <ReviewsContent />
      </Suspense>
    </div>
  )
}
