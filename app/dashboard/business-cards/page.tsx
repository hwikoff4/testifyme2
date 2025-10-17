import { redirect } from "next/navigation"
import { createServerClient } from "@/lib/supabase/server"
import { getCurrentUserProfile } from "@/lib/db"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { BusinessCard } from "@/components/business-card"
import { AlertCircle } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

export default async function BusinessCardsPage() {
  const supabase = await createServerClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect("/auth/login")
  }

  const profile = await getCurrentUserProfile()

  if (!profile?.companies) {
    redirect("/onboarding")
  }

  const company = profile.companies
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://testifyme.com"
  const submitUrl = `${baseUrl}/submit/${company.id}`

  const missingFields = []
  if (!company.company_email) missingFields.push("Company Email")
  if (!company.company_phone) missingFields.push("Company Phone")
  if (!company.company_address) missingFields.push("Company Address")

  return (
    <div className="space-y-4 md:space-y-6">
      <div>
        <h1 className="text-2xl md:text-3xl font-bold tracking-tight">Business Cards</h1>
        <p className="text-sm md:text-base text-muted-foreground mt-1">
          Generate downloadable business cards with QR codes for easy review collection
        </p>
      </div>

      {missingFields.length > 0 && (
        <Alert>
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Complete Your Profile</AlertTitle>
          <AlertDescription className="text-sm">
            To generate a complete business card, please add the following in{" "}
            <a href="/dashboard/settings" className="font-medium underline">
              Settings
            </a>
            : {missingFields.join(", ")}
          </AlertDescription>
        </Alert>
      )}

      <div className="grid gap-4 md:gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Your Business Card</CardTitle>
            <CardDescription>
              Download and print this card to share with customers. They can scan the QR code to leave a review.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <BusinessCard
              companyName={company.name}
              companyEmail={company.company_email}
              companyPhone={company.company_phone}
              companyAddress={company.company_address}
              companyLogo={company.logo_url}
              submitUrl={submitUrl}
              userName={user.email?.split("@")[0] || "Team Member"}
            />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>How It Works</CardTitle>
            <CardDescription>Make the most of your business cards</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex gap-3">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#56B4E9] text-white font-semibold">
                1
              </div>
              <div>
                <h3 className="font-semibold">Download Your Card</h3>
                <p className="text-sm text-muted-foreground">
                  Click the download button to save your business card as an image
                </p>
              </div>
            </div>

            <div className="flex gap-3">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#56B4E9] text-white font-semibold">
                2
              </div>
              <div>
                <h3 className="font-semibold">Print & Distribute</h3>
                <p className="text-sm text-muted-foreground">
                  Print your cards professionally or use them digitally in email signatures
                </p>
              </div>
            </div>

            <div className="flex gap-3">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#56B4E9] text-white font-semibold">
                3
              </div>
              <div>
                <h3 className="font-semibold">Customers Scan & Review</h3>
                <p className="text-sm text-muted-foreground">
                  Customers scan the QR code to instantly access your review submission form
                </p>
              </div>
            </div>

            <div className="flex gap-3">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#56B4E9] text-white font-semibold">
                4
              </div>
              <div>
                <h3 className="font-semibold">AI Generates Testimonial</h3>
                <p className="text-sm text-muted-foreground">
                  Our AI creates a professional testimonial from their feedback
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
