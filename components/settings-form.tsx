"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Copy, Check } from "lucide-react"
import { updateCompanySettings } from "@/app/actions/companies"

type Company = {
  id: string
  name: string
  logo_url: string | null
  website: string | null
  description: string | null
  brand_color: string | null
  google_place_id: string | null // Added google_place_id to type
  facebook_page_id: string | null // Added facebook_page_id to type
  company_email: string | null // Added company_email to type
  company_phone: string | null // Added company_phone to type
  company_address: string | null // Added company_address to type
}

export function SettingsForm({ company, userEmail }: { company: Company; userEmail: string }) {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)
  const [copiedCode, setCopiedCode] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsLoading(true)
    setError(null)
    setSuccess(false)

    const formData = new FormData(e.currentTarget)

    try {
      await updateCompanySettings(company.id, formData)
      setSuccess(true)
      router.refresh()
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred")
    } finally {
      setIsLoading(false)
    }
  }

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text)
    setCopiedCode(id)
    setTimeout(() => setCopiedCode(null), 2000)
  }

  const baseUrl = typeof window !== "undefined" ? window.location.origin : ""
  const showcaseUrl = `${baseUrl}/showcase/${company.id}`
  const embedUrl = `${baseUrl}/embed/${company.id}`
  const submitUrl = `${baseUrl}/submit/${company.id}`

  const embedCodes = {
    basic: `<iframe src="${embedUrl}" width="100%" height="600" frameborder="0"></iframe>`,
    featured: `<iframe src="${embedUrl}?featured=true" width="100%" height="600" frameborder="0"></iframe>`,
    limited: `<iframe src="${embedUrl}?limit=6" width="100%" height="600" frameborder="0"></iframe>`,
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Company Information</CardTitle>
          <CardDescription>Update your company details and branding</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid gap-2">
              <Label htmlFor="name">Company Name</Label>
              <Input id="name" name="name" defaultValue={company.name} required />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="website">Website</Label>
              <Input
                id="website"
                name="website"
                type="url"
                defaultValue={company.website || ""}
                placeholder="https://example.com"
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="description">Description</Label>
              <Input
                id="description"
                name="description"
                defaultValue={company.description || ""}
                placeholder="Brief description of your company"
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="company_email">Company Email</Label>
              <Input
                id="company_email"
                name="company_email"
                type="email"
                defaultValue={company.company_email || ""}
                placeholder="contact@example.com"
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="company_phone">Company Phone</Label>
              <Input
                id="company_phone"
                name="company_phone"
                type="tel"
                defaultValue={company.company_phone || ""}
                placeholder="+1 (555) 123-4567"
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="company_address">Company Address</Label>
              <Input
                id="company_address"
                name="company_address"
                defaultValue={company.company_address || ""}
                placeholder="123 Main St, City, State 12345"
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="google_place_id">Google Place ID</Label>
              <Input
                id="google_place_id"
                name="google_place_id"
                defaultValue={company.google_place_id || ""}
                placeholder="ChIJN1t_tDeuEmsRUsoyG83frY4"
              />
              <p className="text-xs text-muted-foreground">
                Used to direct customers to your Google Review form after testimonial submission.{" "}
                <a
                  href="https://developers.google.com/maps/documentation/javascript/examples/places-placeid-finder"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline"
                >
                  Find your Place ID
                </a>
              </p>
            </div>

            <div className="grid gap-2">
              <Label htmlFor="facebook_page_id">Facebook Page Username</Label>
              <Input
                id="facebook_page_id"
                name="facebook_page_id"
                defaultValue={company.facebook_page_id || ""}
                placeholder="yourcompany"
              />
              <p className="text-xs text-muted-foreground">
                Enter your Facebook page username (e.g., &quot;yourcompany&quot; from facebook.com/yourcompany/reviews)
                to direct customers to your Facebook reviews.
              </p>
            </div>

            <div className="grid gap-2">
              <Label htmlFor="logo_url">Logo URL</Label>
              <Input
                id="logo_url"
                name="logo_url"
                type="url"
                defaultValue={company.logo_url || ""}
                placeholder="https://example.com/logo.png"
              />
              <p className="text-xs text-muted-foreground italic">
                Coming soon: White Label feature - customize your testimonial pages with your own branding
              </p>
            </div>

            <div className="grid gap-2">
              <Label htmlFor="brand_color">Brand Color</Label>
              <div className="flex gap-2">
                <Input
                  id="brand_color"
                  name="brand_color"
                  type="color"
                  defaultValue={company.brand_color || "#3b82f6"}
                  className="w-20"
                />
                <Input type="text" value={company.brand_color || "#3b82f6"} className="flex-1" disabled />
              </div>
              <p className="text-xs text-muted-foreground italic">
                Coming soon: White Label feature - customize your testimonial pages with your own branding
              </p>
            </div>

            <div className="grid gap-2">
              <Label htmlFor="email">Your Email</Label>
              <Input id="email" value={userEmail} disabled />
            </div>

            {error && <p className="text-sm text-red-600">{error}</p>}

            {success && <p className="text-sm text-green-600">Settings saved successfully!</p>}

            <Button type="submit" disabled={isLoading}>
              {isLoading ? "Saving..." : "Save Changes"}
            </Button>
          </form>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Embed & Share</CardTitle>
          <CardDescription>Display your testimonials on your website or share with customers</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* URLs */}
          <div className="space-y-3">
            <div>
              <Label className="text-xs text-muted-foreground">Public Showcase URL</Label>
              <div className="flex gap-2">
                <Input value={showcaseUrl} readOnly className="font-mono text-sm" />
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => copyToClipboard(showcaseUrl, "showcase")}
                  type="button"
                >
                  {copiedCode === "showcase" ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                </Button>
              </div>
            </div>

            <div>
              <Label className="text-xs text-muted-foreground">Review Submission URL</Label>
              <div className="flex gap-2">
                <Input value={submitUrl} readOnly className="font-mono text-sm" />
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => copyToClipboard(submitUrl, "submit")}
                  type="button"
                >
                  {copiedCode === "submit" ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                </Button>
              </div>
            </div>
          </div>

          {/* Embed Codes */}
          <div>
            <Label className="mb-2 block">Embed Code</Label>
            <Tabs defaultValue="basic">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="basic">All Reviews</TabsTrigger>
                <TabsTrigger value="featured">Featured Only</TabsTrigger>
                <TabsTrigger value="limited">Limited (6)</TabsTrigger>
              </TabsList>
              <TabsContent value="basic" className="mt-4">
                <div className="relative">
                  <pre className="overflow-x-auto rounded-lg bg-muted p-4 text-sm">
                    <code>{embedCodes.basic}</code>
                  </pre>
                  <Button
                    variant="outline"
                    size="sm"
                    className="absolute right-2 top-2 bg-transparent"
                    onClick={() => copyToClipboard(embedCodes.basic, "basic")}
                    type="button"
                  >
                    {copiedCode === "basic" ? <Check className="mr-2 h-4 w-4" /> : <Copy className="mr-2 h-4 w-4" />}
                    Copy
                  </Button>
                </div>
              </TabsContent>
              <TabsContent value="featured" className="mt-4">
                <div className="relative">
                  <pre className="overflow-x-auto rounded-lg bg-muted p-4 text-sm">
                    <code>{embedCodes.featured}</code>
                  </pre>
                  <Button
                    variant="outline"
                    size="sm"
                    className="absolute right-2 top-2 bg-transparent"
                    onClick={() => copyToClipboard(embedCodes.featured, "featured")}
                    type="button"
                  >
                    {copiedCode === "featured" ? <Check className="mr-2 h-4 w-4" /> : <Copy className="mr-2 h-4 w-4" />}
                    Copy
                  </Button>
                </div>
              </TabsContent>
              <TabsContent value="limited" className="mt-4">
                <div className="relative">
                  <pre className="overflow-x-auto rounded-lg bg-muted p-4 text-sm">
                    <code>{embedCodes.limited}</code>
                  </pre>
                  <Button
                    variant="outline"
                    size="sm"
                    className="absolute right-2 top-2 bg-transparent"
                    onClick={() => copyToClipboard(embedCodes.limited, "limited")}
                    type="button"
                  >
                    {copiedCode === "limited" ? <Check className="mr-2 h-4 w-4" /> : <Copy className="mr-2 h-4 w-4" />}
                    Copy
                  </Button>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
