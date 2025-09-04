-- Fix search_path security issue for the functions we just created
CREATE OR REPLACE FUNCTION public.create_upload_url(
  file_name TEXT,
  file_size BIGINT,
  mime_type TEXT
)
RETURNS JSON
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = 'public'
AS $$
DECLARE
  file_id UUID;
  storage_path TEXT;
  signed_url TEXT;
BEGIN
  -- Check authentication
  IF auth.uid() IS NULL THEN
    RAISE EXCEPTION 'Not authenticated';
  END IF;

  -- Generate unique storage path
  file_id := gen_random_uuid();
  storage_path := auth.uid()::text || '/' || file_id::text || '-' || file_name;

  -- Insert record with uploading status
  INSERT INTO app_private.knowledge_files (
    id, user_id, storage_path, original_name, mime_type, size_bytes, status
  ) VALUES (
    file_id, auth.uid(), storage_path, file_name, mime_type, file_size, 'uploading'
  );

  -- Generate signed upload URL (valid for 5 minutes)
  SELECT storage.create_signed_upload_url('user_uploads', storage_path, 300) INTO signed_url;

  RETURN json_build_object(
    'file_id', file_id,
    'storage_path', storage_path,
    'signed_url', signed_url
  );
END;
$$;

CREATE OR REPLACE FUNCTION public.complete_upload(
  file_id UUID
)
RETURNS BOOLEAN
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = 'public'
AS $$
BEGIN
  -- Check authentication
  IF auth.uid() IS NULL THEN
    RAISE EXCEPTION 'Not authenticated';
  END IF;

  -- Update status to uploaded
  UPDATE app_private.knowledge_files 
  SET status = 'uploaded'
  WHERE id = file_id 
    AND user_id = auth.uid() 
    AND status = 'uploading';

  RETURN FOUND;
END;
$$;

CREATE OR REPLACE FUNCTION public.cancel_upload(
  file_id UUID
)
RETURNS BOOLEAN
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = 'public'
AS $$
DECLARE
  file_path TEXT;
BEGIN
  -- Check authentication
  IF auth.uid() IS NULL THEN
    RAISE EXCEPTION 'Not authenticated';
  END IF;

  -- Get storage path
  SELECT storage_path INTO file_path
  FROM app_private.knowledge_files
  WHERE id = file_id AND user_id = auth.uid();

  -- Delete from storage if exists
  IF file_path IS NOT NULL THEN
    PERFORM storage.delete_object('user_uploads', file_path);
  END IF;

  -- Delete from database
  DELETE FROM app_private.knowledge_files 
  WHERE id = file_id AND user_id = auth.uid();

  RETURN FOUND;
END;
$$;

CREATE OR REPLACE FUNCTION public.get_user_knowledge_files()
RETURNS TABLE (
  id UUID,
  original_name TEXT,
  mime_type TEXT,
  size_bytes BIGINT,
  status TEXT,
  created_at TIMESTAMPTZ
)
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = 'public'
AS $$
BEGIN
  -- Check authentication
  IF auth.uid() IS NULL THEN
    RAISE EXCEPTION 'Not authenticated';
  END IF;

  RETURN QUERY
  SELECT 
    kf.id,
    kf.original_name,
    kf.mime_type,
    kf.size_bytes,
    kf.status,
    kf.created_at
  FROM app_private.knowledge_files kf
  WHERE kf.user_id = auth.uid()
  ORDER BY kf.created_at DESC;
END;
$$;