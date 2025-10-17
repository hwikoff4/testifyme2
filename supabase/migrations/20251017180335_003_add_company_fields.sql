/*
  # Add Additional Company Fields

  1. New Columns
    - `google_place_id` (text) - Google Place ID for directing customers to reviews
    - `facebook_page_id` (text) - Facebook Page ID for social integration
    - `brand_color` (text, default '#3b82f6') - Brand color for customization
    - `company_email` (text) - Company contact email
    - `company_phone` (text) - Company phone number
    - `company_address` (text) - Company physical address

  2. Purpose
    - Google integration for review funnel
    - Social media integration
    - Business card generation
    - Brand customization
*/

ALTER TABLE companies ADD COLUMN IF NOT EXISTS google_place_id TEXT;
ALTER TABLE companies ADD COLUMN IF NOT EXISTS facebook_page_id TEXT;
ALTER TABLE companies ADD COLUMN IF NOT EXISTS brand_color TEXT DEFAULT '#3b82f6';
ALTER TABLE companies ADD COLUMN IF NOT EXISTS company_email TEXT;
ALTER TABLE companies ADD COLUMN IF NOT EXISTS company_phone TEXT;
ALTER TABLE companies ADD COLUMN IF NOT EXISTS company_address TEXT;

COMMENT ON COLUMN companies.google_place_id IS 'Google Place ID for directing customers to Google Reviews after testimonial submission';