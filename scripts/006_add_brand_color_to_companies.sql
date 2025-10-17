-- Add brand_color column to companies table
ALTER TABLE companies ADD COLUMN IF NOT EXISTS brand_color TEXT DEFAULT '#3b82f6';
