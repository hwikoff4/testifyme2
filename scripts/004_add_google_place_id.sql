-- Add google_place_id column to companies table
ALTER TABLE companies ADD COLUMN IF NOT EXISTS google_place_id TEXT;

-- Add comment for documentation
COMMENT ON COLUMN companies.google_place_id IS 'Google Place ID for directing customers to Google Reviews after testimonial submission';
