import type React from "react"
import { redirect } from "next/navigation"
import { isPlatformAdmin } from "@/lib/db/queries"
import { checkDatabaseSetup } from "@/lib/db/setup-check"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { LayoutDashboard, Users, Shield, LogOut } from "lucide-react"
import { createClient } from "@/lib/supabase/server"

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const { isSetup } = await checkDatabaseSetup()

  if (!isSetup) {
    redirect("/setup")
  }

  const isAdmin = await isPlatformAdmin()

  if (!isAdmin) {
    redirect("/dashboard")
  }

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <aside className="w-64 border-r bg-muted/40">
        <div className="flex h-full flex-col">
          {/* Logo */}
          <div className="border-b p-6">
            <img src="/logo.png" alt="Testify AI" className="h-12 w-auto mb-2" />
            <p className="text-sm text-muted-foreground">Platform Admin</p>
          </div>

          {/* Navigation */}
          <nav className="flex-1 space-y-1 p-4">
            <Link href="/admin">
              <Button variant="ghost" className="w-full justify-start">
                <LayoutDashboard className="mr-2 h-4 w-4" />
                Overview
              </Button>
            </Link>
            <Link href="/admin/clients">
              <Button variant="ghost" className="w-full justify-start">
                <Users className="mr-2 h-4 w-4" />
                Clients
              </Button>
            </Link>
            <Link href="/admin/admins">
              <Button variant="ghost" className="w-full justify-start">
                <Shield className="mr-2 h-4 w-4" />
                Platform Admins
              </Button>
            </Link>
          </nav>

          {/* User section */}
          <div className="border-t p-4">
            <form
              action={async () => {
                "use server"
                const supabase = await createClient()
                await supabase.auth.signOut()
                redirect("/auth/login")
              }}
            >
              <Button variant="ghost" className="w-full justify-start" type="submit">
                <LogOut className="mr-2 h-4 w-4" />
                Sign Out
              </Button>
            </form>
          </div>
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1">{children}</main>
    </div>
  )
}
