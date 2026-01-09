-- Migration: Add loves column for love reactions feature
-- Run this SQL in your Supabase SQL Editor

-- Add loves column (array of user_ids who loved the message)
ALTER TABLE template_utama 
ADD COLUMN IF NOT EXISTS loves TEXT[] DEFAULT '{}';

-- Add GIN index for better array query performance
CREATE INDEX IF NOT EXISTS idx_template_utama_loves 
ON template_utama USING GIN (loves);

-- Add comment to document the column
COMMENT ON COLUMN template_utama.loves IS 'Array of user_ids who loved this message';

-- Update RLS policy to allow anyone to update loves
-- (Existing policies for UPDATE based on user_id will be overridden for loves column)
DROP POLICY IF EXISTS "Allow love reactions" ON template_utama;
CREATE POLICY "Allow love reactions" 
ON template_utama 
FOR UPDATE 
USING (true)
WITH CHECK (true);

-- Verification query
SELECT column_name, data_type, is_nullable 
FROM information_schema.columns 
WHERE table_name = 'template_utama' 
AND column_name = 'loves';
