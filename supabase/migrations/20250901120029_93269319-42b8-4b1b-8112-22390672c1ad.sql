-- Create contact_us_requests table for storing contact form submissions
CREATE TABLE public.contact_us_requests (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  topic TEXT NOT NULL,
  message TEXT NOT NULL,
  email TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.contact_us_requests ENABLE ROW LEVEL SECURITY;

-- Create policy for authenticated users to view all contact requests (for admin purposes)
CREATE POLICY "Authenticated users can view contact requests" 
ON public.contact_us_requests 
FOR SELECT 
USING (auth.uid() IS NOT NULL);

-- Create policy allowing anyone to insert contact requests (public form)
CREATE POLICY "Anyone can create contact requests" 
ON public.contact_us_requests 
FOR INSERT 
WITH CHECK (true);

-- Create trigger for automatic timestamp updates
CREATE TRIGGER update_contact_us_requests_updated_at
BEFORE UPDATE ON public.contact_us_requests
FOR EACH ROW
EXECUTE FUNCTION public.set_updated_at();