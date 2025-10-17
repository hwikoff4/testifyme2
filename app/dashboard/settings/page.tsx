import { SettingsForm } from "@/components/settings-form"
import { getCompanies } from "@/lib/db"
import { createServerClient } from "@/lib/supabase/server"
import { redirect } from "next/navigation"

export default async function SettingsPage() {
  const supabase = await createServerClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect("/auth/login")
  }

  // Get the first company (for MVP, assuming one company per user)
  const companies = await getCompanies()
  const company = companies[0]

  if (!company) {
    redirect("/dashboard/companies/new")
  }

  return (
    <div className="space-y-6 md:space-y-8">
      <div>
        <h1 className="text-2xl md:text-3xl font-bold">Settings</h1>
        <p className="text-sm md:text-base text-muted-foreground mt-1">Manage your company branding and embed codes</p>
      </div>

      <div className="mx-auto max-w-2xl">
        <SettingsForm company={company} userEmail={user.email || ""} />
      </div>
    </div>
  )
}
