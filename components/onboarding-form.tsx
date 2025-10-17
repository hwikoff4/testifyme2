"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { createClient } from "@/lib/supabase/client"
import { CheckCircle2 } from "lucide-react"

type User = {
  id: string
  email?: string
  user_metadata?: {
    company_name?: string
    display_name?: string
  }
}

export function OnboardingForm({ user }: { user: User }) {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleComplete = async () => {
    setIsLoading(true)
    setError(null)

    const supabase = createClient()

    try {
      // Create client
      const { data: client, error: clientError } = await supabase
        .from("clients")
        .insert({
          name: user.user_metadata?.company_name || "My Company",
          email: user.email || "",
        })
        .select()
        .single()

      if (clientError) throw clientError

      // Create profile
      const { error: profileError } = await supabase.from("profiles").insert({
        user_id: user.id,
        client_id: client.id,
        role: "admin",
        display_name: user.user_metadata?.display_name || "User",
      })

      if (profileError) throw profileError

      router.push("/dashboard")
      router.refresh()
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Card>
      <CardHeader className="text-center">
        <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-green-100">
          <CheckCircle2 className="h-6 w-6 text-green-600" />
        </div>
        <CardTitle className="text-2xl font-bold">Welcome to Testify AI!</CardTitle>
        <CardDescription>Let's set up your account</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <p className="text-sm">
            <strong>Company:</strong> {user.user_metadata?.company_name || "Not provided"}
          </p>
          <p className="text-sm">
            <strong>Name:</strong> {user.user_metadata?.display_name || "Not provided"}
          </p>
          <p className="text-sm">
            <strong>Email:</strong> {user.email}
          </p>
        </div>

        {error && <p className="text-sm text-red-600">{error}</p>}

        <Button onClick={handleComplete} disabled={isLoading} className="w-full">
          {isLoading ? "Setting up..." : "Complete Setup"}
        </Button>
      </CardContent>
    </Card>
  )
}
