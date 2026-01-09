-- Migration: Add user_id column to template_utama table
-- This column tracks message ownership for edit/delete functionality
-- Run this SQL in your Supabase SQL Editor

-- Add user_id column (nullable to support existing messages)
ALTER TABLE template_utama 
ADD COLUMN IF NOT EXISTS user_id TEXT;

-- Add index for better query performance
CREATE INDEX IF NOT EXISTS idx_template_utama_user_id 
ON template_utama(user_id);

-- Optional: Add comment to document the column
COMMENT ON COLUMN template_utama.user_id IS 'UUID stored in localStorage to track message ownership';

-- Verification query - check if column was added successfully
SELECT column_name, data_type, is_nullable 
FROM information_schema.columns 
WHERE table_name = 'template_utama' 
AND column_name = 'user_id';
