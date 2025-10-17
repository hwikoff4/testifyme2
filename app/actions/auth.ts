"use server"

import { createServerClient } from "@/lib/supabase/server"
import { redirect } from "next/navigation"

export async function signOut() {
  const supabase = await createServerClient()
  await supabase.auth.signOut()
  redirect("/auth/login")
}

export async function signIn(email: string, password: string) {
  const supabase = await createServerClient()

  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  })

  if (error) {
    return { error: error.message }
  }

  if (!data.user) {
    return { error: "Invalid credentials" }
  }

  redirect("/dashboard")
}

export async function signUp(email: string, password: string, companyName: string) {
  const supabase = await createServerClient()

  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      emailRedirectTo:
        process.env.NEXT_PUBLIC_DEV_SUPABASE_REDIRECT_URL || `${process.env.NEXT_PUBLIC_SUPABASE_URL}/onboarding`,
    },
  })

  if (error) {
    return { error: error.message }
  }

  if (!data.user) {
    return { error: "Failed to create account" }
  }

  // Redirect to onboarding
  redirect("/onboarding")
}
