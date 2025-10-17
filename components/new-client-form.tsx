"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { createClient } from "@/lib/supabase/client"

export function NewClientForm() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsLoading(true)
    setError(null)

    const formData = new FormData(e.currentTarget)
    const supabase = createClient()

    try {
      const { error } = await supabase.from("clients").insert({
        name: formData.get("company_name") as string,
        email: formData.get("email") as string,
        subdomain: (formData.get("subdomain") as string) || null,
        brand_color: formData.get("brand_color") as string,
      })

      if (error) throw error

      router.push("/admin/clients")
      router.refresh()
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Client Details</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="company_name">Company Name *</Label>
              <Input id="company_name" name="company_name" placeholder="Acme Inc." required />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="email">Email *</Label>
              <Input id="email" name="email" type="email" placeholder="contact@acme.com" required />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="subdomain">Subdomain</Label>
              <Input id="subdomain" name="subdomain" placeholder="acme" />
              <p className="text-xs text-muted-foreground">Optional: Custom subdomain for the client</p>
            </div>

            <div className="grid gap-2">
              <Label htmlFor="brand_color">Brand Color</Label>
              <div className="flex gap-2">
                <Input id="brand_color" name="brand_color" type="color" defaultValue="#3b82f6" className="w-20" />
                <Input type="text" defaultValue="#3b82f6" className="flex-1" disabled />
              </div>
            </div>
          </div>

          {error && <p className="text-sm text-red-600">{error}</p>}

          <div className="flex gap-4">
            <Button type="submit" disabled={isLoading}>
              {isLoading ? "Creating..." : "Create Client"}
            </Button>
            <Button type="button" variant="outline" onClick={() => router.back()}>
              Cancel
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}
