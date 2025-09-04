-- Fix the storage INSERT policy to include WITH CHECK constraint
DROP POLICY IF EXISTS "Users can upload their own files" ON storage.objects;

CREATE POLICY "Users can upload their own files" 
ON storage.objects 
FOR INSERT 
WITH CHECK (
  bucket_id = 'user_uploads' 
  AND auth.uid()::text = (storage.foldername(name))[1]
);

-- Also check if RLS is enabled on storage.objects
SELECT tablename, rowsecurity FROM pg_tables WHERE schemaname = 'storage' AND tablename = 'objects';