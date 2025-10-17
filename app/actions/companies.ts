"use server"

import { revalidatePath } from "next/cache"
import { createCompany, createVideo, updateCompany } from "@/lib/db"

export async function createCompanyAction(formData: FormData) {
  const name = formData.get("name") as string
  const website = formData.get("website") as string | null
  const logo_url = formData.get("logo_url") as string | null
  const description = formData.get("description") as string | null

  if (!name) {
    throw new Error("Company name is required")
  }

  await createCompany({
    name,
    website: website || null,
    logo_url: logo_url || null,
    description: description || null,
  })

  revalidatePath("/dashboard/companies")
}

export async function createVideoAction(formData: FormData) {
  const company_id = formData.get("company_id") as string
  const title = formData.get("title") as string
  const video_url = formData.get("video_url") as string
  const thumbnail_url = formData.get("thumbnail_url") as string | null
  const duration = formData.get("duration") as string | null

  if (!company_id || !title || !video_url) {
    throw new Error("Company, title, and video URL are required")
  }

  await createVideo({
    company_id,
    title,
    video_url,
    thumbnail_url: thumbnail_url || null,
    duration: duration ? Number.parseInt(duration) : null,
  })

  revalidatePath("/dashboard/companies")
  revalidatePath(`/dashboard/companies/${company_id}`)
}

export async function updateCompanySettings(companyId: string, formData: FormData) {
  const name = formData.get("name") as string
  const website = formData.get("website") as string | null
  const logo_url = formData.get("logo_url") as string | null
  const description = formData.get("description") as string | null
  const brand_color = formData.get("brand_color") as string | null
  const google_place_id = formData.get("google_place_id") as string | null
  const facebook_page_id = formData.get("facebook_page_id") as string | null
  const company_email = formData.get("company_email") as string | null
  const company_phone = formData.get("company_phone") as string | null
  const company_address = formData.get("company_address") as string | null

  if (!name) {
    throw new Error("Company name is required")
  }

  await updateCompany(companyId, {
    name,
    website: website || null,
    logo_url: logo_url || null,
    description: description || null,
    brand_color: brand_color || null,
    google_place_id: google_place_id || null,
    facebook_page_id: facebook_page_id || null,
    company_email: company_email || null,
    company_phone: company_phone || null,
    company_address: company_address || null,
  })

  revalidatePath("/dashboard/settings")
  revalidatePath("/dashboard/companies")
}
