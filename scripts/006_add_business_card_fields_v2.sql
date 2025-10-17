-- Add business card fields to companies table
ALTER TABLE companies
ADD COLUMN IF NOT EXISTS company_email TEXT,
ADD COLUMN IF NOT EXISTS company_phone TEXT,
ADD COLUMN IF NOT EXISTS company_address TEXT;

-- Refresh the schema cache
NOTIFY pgrst, 'reload schema';
