"use client"

import { Button } from "@/components/ui/button"
import Link from "next/link"
import { LayoutDashboard, Star, Settings, Building2, Video, LogOut, Menu, X, CreditCard } from "lucide-react"
import { useState } from "react"
import { signOut } from "@/app/actions/auth"
import Image from "next/image"

interface DashboardSidebarProps {
  userEmail: string
}

export function DashboardSidebar({ userEmail }: DashboardSidebarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <>
      <div className="md:hidden border-b bg-white shadow-sm p-4 flex items-center justify-between sticky top-0 z-50">
        <Image src="/testifyme-logo.png" alt="TestifyMe" width={140} height={40} className="h-8 w-auto" />
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="text-[#0A1F44]"
        >
          {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </Button>
      </div>

      <aside
        className={`${
          mobileMenuOpen ? "flex" : "hidden"
        } md:flex w-full md:w-72 border-r bg-gradient-to-b from-white via-blue-50/20 to-white shadow-xl flex-col fixed md:sticky top-[57px] md:top-0 h-[calc(100vh-57px)] md:h-screen z-40`}
      >
        <div className="flex h-full flex-col">
          <div className="border-b p-6 bg-white">
            <Image src="/testifyme-logo.png" alt="TestifyMe" width={160} height={50} className="h-12 w-auto mb-3" />
            <p className="text-sm text-muted-foreground font-medium truncate">{userEmail}</p>
          </div>

          <nav className="flex-1 space-y-2 p-4">
            <Link href="/dashboard" onClick={() => setMobileMenuOpen(false)}>
              <Button
                variant="ghost"
                className="w-full justify-start hover:bg-gradient-to-r hover:from-[#56B4E9]/10 hover:to-[#0A1F44]/10 hover:text-[#0A1F44] transition-all"
              >
                <LayoutDashboard className="mr-3 h-5 w-5" />
                <span className="font-medium">Dashboard</span>
              </Button>
            </Link>
            <Link href="/dashboard/companies" onClick={() => setMobileMenuOpen(false)}>
              <Button
                variant="ghost"
                className="w-full justify-start hover:bg-gradient-to-r hover:from-[#56B4E9]/10 hover:to-[#0A1F44]/10 hover:text-[#0A1F44] transition-all"
              >
                <Building2 className="mr-3 h-5 w-5" />
                <span className="font-medium">Companies</span>
              </Button>
            </Link>
            <Link href="/dashboard/videos" onClick={() => setMobileMenuOpen(false)}>
              <Button
                variant="ghost"
                className="w-full justify-start hover:bg-gradient-to-r hover:from-[#56B4E9]/10 hover:to-[#0A1F44]/10 hover:text-[#0A1F44] transition-all"
              >
                <Video className="mr-3 h-5 w-5" />
                <span className="font-medium">Videos</span>
              </Button>
            </Link>
            <Link href="/dashboard/reviews" onClick={() => setMobileMenuOpen(false)}>
              <Button
                variant="ghost"
                className="w-full justify-start hover:bg-gradient-to-r hover:from-[#56B4E9]/10 hover:to-[#0A1F44]/10 hover:text-[#0A1F44] transition-all"
              >
                <Star className="mr-3 h-5 w-5" />
                <span className="font-medium">Reviews</span>
              </Button>
            </Link>
            <Link href="/dashboard/business-cards" onClick={() => setMobileMenuOpen(false)}>
              <Button
                variant="ghost"
                className="w-full justify-start hover:bg-gradient-to-r hover:from-[#56B4E9]/10 hover:to-[#0A1F44]/10 hover:text-[#0A1F44] transition-all"
              >
                <CreditCard className="mr-3 h-5 w-5" />
                <span className="font-medium">Business Cards</span>
              </Button>
            </Link>
            <Link href="/dashboard/settings" onClick={() => setMobileMenuOpen(false)}>
              <Button
                variant="ghost"
                className="w-full justify-start hover:bg-gradient-to-r hover:from-[#56B4E9]/10 hover:to-[#0A1F44]/10 hover:text-[#0A1F44] transition-all"
              >
                <Settings className="mr-3 h-5 w-5" />
                <span className="font-medium">Settings</span>
              </Button>
            </Link>
          </nav>

          <div className="border-t p-4 bg-white">
            <form action={signOut}>
              <Button
                variant="ghost"
                className="w-full justify-start text-red-600 hover:bg-red-50 hover:text-red-700 transition-all"
                type="submit"
              >
                <LogOut className="mr-3 h-5 w-5" />
                <span className="font-medium">Sign Out</span>
              </Button>
            </form>
          </div>
        </div>
      </aside>

      {/* Mobile menu overlay */}
      {mobileMenuOpen && (
        <div
          className="md:hidden fixed inset-0 bg-black/20 backdrop-blur-sm z-30 top-[57px]"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}
    </>
  )
}
