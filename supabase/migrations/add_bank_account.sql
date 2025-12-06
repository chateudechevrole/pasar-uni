-- Add bank_account column to profiles table
-- Run this in your Supabase SQL Editor

ALTER TABLE profiles 
ADD COLUMN IF NOT EXISTS bank_account TEXT;

-- Update the comment
COMMENT ON COLUMN profiles.bank_account IS 'Bank account details for receiving payments (e.g., Maybank 1234567890 - John Doe)';
