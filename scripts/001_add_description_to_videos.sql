-- Add missing columns to videos table to match the Video type
ALTER TABLE videos ADD COLUMN IF NOT EXISTS description TEXT;
ALTER TABLE videos ADD COLUMN IF NOT EXISTS view_count INTEGER DEFAULT 0 NOT NULL;
ALTER TABLE videos ADD COLUMN IF NOT EXISTS status TEXT DEFAULT 'pending' NOT NULL;
ALTER TABLE videos ADD COLUMN IF NOT EXISTS featured BOOLEAN DEFAULT false NOT NULL;

-- Add check constraint for status values
DO $$ 
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_constraint 
    WHERE conname = 'videos_status_check'
  ) THEN
    ALTER TABLE videos ADD CONSTRAINT videos_status_check 
    CHECK (status IN ('pending', 'approved', 'rejected'));
  END IF;
END $$;
