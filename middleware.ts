import { updateSession } from "@/lib/supabase/middleware"
import type { NextRequest } from "next/server"

export async function middleware(request: NextRequest) {
  const response = await updateSession(request)

  if (request.nextUrl.pathname.startsWith("/embed/")) {
    response.headers.delete("X-Frame-Options")
    response.headers.set("Content-Security-Policy", "frame-ancestors *")
  }

  return response
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|api/upload|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)"],
}
