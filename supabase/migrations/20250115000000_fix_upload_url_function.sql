-- Fix the create_upload_url function to use the correct Supabase Storage API
-- The storage.create_signed_upload_url function doesn't exist in all Supabase versions
-- We'll use the storage.from().createSignedUploadUrl() approach instead

CREATE OR REPLACE FUNCTION public.create_upload_url(
  file_name TEXT,
  file_size BIGINT,
  mime_type TEXT
)
RETURNS JSON
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public, app_private
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

  -- For now, return the file_id and storage_path
  -- The client will handle the signed URL generation
  RETURN json_build_object(
    'file_id', file_id,
    'storage_path', storage_path,
    'signed_url', NULL
  );
END;
$$;
