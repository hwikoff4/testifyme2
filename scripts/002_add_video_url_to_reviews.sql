-- Add video_url column to reviews table for direct video uploads
-- Make video_id nullable since external users can upload videos directly
ALTER TABLE reviews
ADD COLUMN video_url TEXT;

-- Make video_id nullable
ALTER TABLE reviews
ALTER COLUMN video_id DROP NOT NULL;
