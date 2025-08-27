-- Add payment_status column to user_info table
ALTER TABLE public.user_info 
ADD COLUMN IF NOT EXISTS payment_status TEXT NOT NULL DEFAULT 'inactive';