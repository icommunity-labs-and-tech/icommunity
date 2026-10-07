CREATE POLICY "Editors read blog images" ON storage.objects
  FOR SELECT TO authenticated USING (bucket_id = 'blog-images' AND public.is_blog_editor(auth.uid()));