import type React from "react"
import { redirect } from "next/navigation"
import { createServerClient } from "@/lib/supabase/server"
import { DashboardSidebar } from "@/components/dashboard-sidebar"

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const supabase = await createServerClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect("/auth/login")
  }

  const { data: profile } = await supabase.from("profiles").select("company_id").eq("user_id", user.id).maybeSingle()

  if (!profile?.company_id) {
    redirect("/onboarding")
  }

  return (
    <div className="flex min-h-screen flex-col md:flex-row">
      <DashboardSidebar userEmail={user.email || ""} />

      {/* Main content with mobile padding */}
      <main className="flex-1 bg-gradient-to-br from-background via-background to-muted/20 p-4 md:p-8">{children}</main>
    </div>
  )
}
