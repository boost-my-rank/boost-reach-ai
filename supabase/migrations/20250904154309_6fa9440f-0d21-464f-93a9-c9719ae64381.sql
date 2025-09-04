-- Fix search_path security issues for all functions that access app_private schema
ALTER FUNCTION public.create_upload_url(text, bigint, text) SET search_path = public, app_private;
ALTER FUNCTION public.complete_upload(uuid) SET search_path = public, app_private; 
ALTER FUNCTION public.cancel_upload(uuid) SET search_path = public, app_private;
ALTER FUNCTION public.get_user_knowledge_files() SET search_path = public, app_private;