-- Add facebook_page_id column to companies table
ALTER TABLE companies ADD COLUMN IF NOT EXISTS facebook_page_id TEXT;

-- Refresh the schema cache
NOTIFY pgrst, 'reload schema';
