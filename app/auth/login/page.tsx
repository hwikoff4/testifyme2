"use client"

import type React from "react"

import { signIn } from "@/app/actions/auth"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import Link from "next/link"
import { useState } from "react"
import Image from "next/image"

export default function LoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError(null)

    try {
      const result = await signIn(email, password)

      if (result?.error) {
        setError(result.error)
      }
    } catch (error: unknown) {
      if (error instanceof Error) {
        setError(error.message)
      } else {
        setError("An unexpected error occurred during login. Please try again.")
      }
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="flex min-h-screen w-full items-center justify-center p-4 md:p-6 bg-gradient-to-br from-white via-blue-50/30 to-white relative overflow-hidden">
      <div className="absolute inset-0 -z-10 opacity-20">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 gradient-unc-blue rounded-full blur-3xl animate-gradient" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 gradient-navy rounded-full blur-3xl animate-gradient" />
      </div>

      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <Image
            src="/testifyme-logo.png"
            alt="TestifyMe"
            width={200}
            height={60}
            className="h-14 w-auto mx-auto mb-4"
          />
        </div>

        <Card className="border-2 border-[#56B4E9]/20 shadow-2xl">
          <CardHeader className="text-center space-y-2 pb-6">
            <CardTitle className="text-3xl font-bold text-[#0A1F44]">Welcome back</CardTitle>
            <CardDescription className="text-base">Sign in to your TestifyMe account</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin}>
              <div className="flex flex-col gap-5">
                <div className="grid gap-2">
                  <Label htmlFor="email" className="text-[#0A1F44] font-medium">
                    Email
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="you@company.com"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="border-[#56B4E9]/30 focus:border-[#56B4E9] focus:ring-[#56B4E9]"
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="password" className="text-[#0A1F44] font-medium">
                    Password
                  </Label>
                  <Input
                    id="password"
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="border-[#56B4E9]/30 focus:border-[#56B4E9] focus:ring-[#56B4E9]"
                  />
                </div>
                {error && (
                  <div className="rounded-lg bg-red-50 border border-red-200 p-3 text-sm text-red-700">{error}</div>
                )}
                <Button
                  type="submit"
                  className="w-full gradient-brand text-white hover:opacity-90 transition-opacity py-6 text-base font-semibold shadow-lg"
                  disabled={isLoading}
                >
                  {isLoading ? "Signing in..." : "Sign in"}
                </Button>
              </div>
              <div className="mt-6 text-center text-sm">
                Don&apos;t have an account?{" "}
                <Link
                  href="/auth/sign-up"
                  className="font-semibold text-[#56B4E9] hover:text-[#0A1F44] underline underline-offset-4 transition-colors"
                >
                  Sign up
                </Link>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
