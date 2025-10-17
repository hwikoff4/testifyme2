import { createBrowserClient } from "@supabase/ssr"

export function createClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  if (!url || !key) {
    console.error("[v0] Supabase environment variables missing:", { url: !!url, key: !!key })
    throw new Error("Supabase configuration is missing. Please check your environment variables.")
  }

  console.log("[v0] Creating Supabase browser client with URL:", url.substring(0, 30) + "...")

  return createBrowserClient(url, key)
}
