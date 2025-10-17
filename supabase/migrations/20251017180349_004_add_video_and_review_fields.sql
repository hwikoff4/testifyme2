/*
  # Add Video and Review Fields

  1. Videos Table Updates
    - `description` (text) - Video description
    - `view_count` (integer, default 0) - Track video views
    - `status` (text, default 'pending') - Approval status
    - `featured` (boolean, default false) - Featured flag

  2. Reviews Table Updates
    - `video_url` (text) - Allow direct video upload to reviews
    - Make `video_id` nullable - External users can upload videos directly

  3. Purpose
    - Support direct video uploads in review submissions
    - Track video engagement
    - Manage video approval workflow
*/

ALTER TABLE videos ADD COLUMN IF NOT EXISTS description TEXT;
ALTER TABLE videos ADD COLUMN IF NOT EXISTS view_count INTEGER DEFAULT 0 NOT NULL;
ALTER TABLE videos ADD COLUMN IF NOT EXISTS status TEXT DEFAULT 'pending' NOT NULL;
ALTER TABLE videos ADD COLUMN IF NOT EXISTS featured BOOLEAN DEFAULT false NOT NULL;

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

ALTER TABLE reviews ADD COLUMN IF NOT EXISTS video_url TEXT;

DO $$
BEGIN
  IF EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'reviews' AND column_name = 'video_id' AND is_nullable = 'NO'
  ) THEN
    ALTER TABLE reviews ALTER COLUMN video_id DROP NOT NULL;
  END IF;
END $$;