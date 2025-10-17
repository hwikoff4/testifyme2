import { redirect } from "next/navigation"
import { createServerClient } from "@/lib/supabase/server"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Building2, ExternalLink } from "lucide-react"
import { createCompany, createUserProfile } from "@/lib/db"

export default async function OnboardingPage() {
  const supabase = await createServerClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect("/auth/login")
  }

  const { data: existingProfile, error: profileError } = await supabase
    .from("profiles")
    .select("*, companies(*)")
    .eq("user_id", user.id)
    .maybeSingle()

  console.log("[v0] Profile check:", { existingProfile, profileError })

  if (existingProfile?.company_id) {
    redirect("/dashboard")
  }

  async function createCompanyAndProfile(formData: FormData) {
    "use server"
    const supabase = await createServerClient()
    const {
      data: { user },
    } = await supabase.auth.getUser()

    if (!user) return

    const companyName = formData.get("companyName") as string
    const website = formData.get("website") as string
    const description = formData.get("description") as string
    const googlePlaceId = formData.get("googlePlaceId") as string
    const facebookPageId = formData.get("facebookPageId") as string
    const companyEmail = formData.get("companyEmail") as string
    const companyPhone = formData.get("companyPhone") as string
    const companyAddress = formData.get("companyAddress") as string

    console.log("[v0] Creating company:", { companyName, website, description, googlePlaceId, facebookPageId })

    const companyData: any = {
      name: companyName,
      website: website || null,
      description: description || null,
      logo_url: null,
      brand_color: null,
      google_place_id: googlePlaceId || null,
      facebook_page_id: facebookPageId || null,
    }

    // Only add business card fields if provided
    if (companyEmail) companyData.company_email = companyEmail
    if (companyPhone) companyData.company_phone = companyPhone
    if (companyAddress) companyData.company_address = companyAddress

    const company = await createCompany(companyData)

    console.log("[v0] Company created:", company)

    await createUserProfile(user.id, company.id, "owner")

    console.log("[v0] Profile created, redirecting to dashboard")

    redirect("/dashboard")
  }

  return (
    <div className="flex min-h-screen w-full items-center justify-center p-4 md:p-6 bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="w-full max-w-md">
        <Card className="shadow-xl">
          <CardHeader className="text-center">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-blue-600 to-red-600">
              <Building2 className="h-8 w-8 text-white" />
            </div>
            <CardTitle className="text-2xl md:text-3xl font-bold">Welcome to Testify AI</CardTitle>
            <CardDescription className="text-sm md:text-base">Let&apos;s set up your company account</CardDescription>
          </CardHeader>
          <CardContent>
            <form action={createCompanyAndProfile} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="companyName">Company Name *</Label>
                <Input id="companyName" name="companyName" placeholder="Acme Inc." required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="website">Website</Label>
                <Input id="website" name="website" type="url" placeholder="https://example.com" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="companyEmail">Company Email</Label>
                <Input id="companyEmail" name="companyEmail" type="email" placeholder="contact@example.com" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="companyPhone">Company Phone</Label>
                <Input id="companyPhone" name="companyPhone" type="tel" placeholder="+1 (555) 123-4567" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="companyAddress">Company Address</Label>
                <Input id="companyAddress" name="companyAddress" placeholder="123 Main St, City, State 12345" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea id="description" name="description" placeholder="Tell us about your company..." rows={3} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="googlePlaceId">Google Place ID (Optional)</Label>
                <Input id="googlePlaceId" name="googlePlaceId" placeholder="ChIJN1t_tDeuEmsRUsoyG83frY4" />
                <p className="text-xs text-muted-foreground">
                  This is used to automatically send customers to your Google Review form after they submit their
                  testimonial.{" "}
                  <a
                    href="https://developers.google.com/maps/documentation/javascript/examples/places-placeid-finder"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline inline-flex items-center gap-1"
                  >
                    Find your Place ID here
                    <ExternalLink className="h-3 w-3" />
                  </a>
                </p>
              </div>
              <div className="space-y-2">
                <Label htmlFor="facebookPageId">Facebook Page Username (Optional)</Label>
                <Input id="facebookPageId" name="facebookPageId" placeholder="yourcompany" />
                <p className="text-xs text-muted-foreground">
                  Enter your Facebook page username (e.g., &quot;yourcompany&quot; from
                  facebook.com/yourcompany/reviews) to send customers to your Facebook reviews after testimonial
                  submission.
                </p>
              </div>
              <Button type="submit" className="w-full bg-gradient-to-r from-[#56B4E9] to-[#0A1F44] hover:opacity-90">
                Create Company
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
