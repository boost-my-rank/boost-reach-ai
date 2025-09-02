-- Fix critical security issue: Restrict leads table access to administrators only

-- Drop the existing insecure policy that allows any authenticated user to read leads
DROP POLICY IF EXISTS "read: authenticated only" ON public.leads;

-- Create new secure policy - only admins can read lead data
CREATE POLICY "Only admins can view leads" 
ON public.leads 
FOR SELECT 
USING (public.is_admin());