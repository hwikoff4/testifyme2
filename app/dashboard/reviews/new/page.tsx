import { Suspense } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { NewReviewForm } from "@/components/new-review-form"
import { getCompanies } from "@/lib/db"

async function ReviewFormWrapper() {
  const companies = await getCompanies()

  return <NewReviewForm companies={companies} />
}

export default function NewReviewPage() {
  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div>
        <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-red-600 bg-clip-text text-transparent">
          Add New Review
        </h1>
        <p className="text-muted-foreground mt-1">Manually add a customer testimonial</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Review Details</CardTitle>
          <CardDescription>Fill in the customer testimonial information</CardDescription>
        </CardHeader>
        <CardContent>
          <Suspense fallback={<div className="animate-pulse h-96 bg-muted rounded" />}>
            <ReviewFormWrapper />
          </Suspense>
        </CardContent>
      </Card>
    </div>
  )
}
