ALTER TABLE public.blog_posts ADD COLUMN IF NOT EXISTS publish_at timestamptz;
ALTER TABLE public.blog_posts DROP CONSTRAINT blog_posts_status_check;
ALTER TABLE public.blog_posts ADD CONSTRAINT blog_posts_status_check CHECK (status = ANY (ARRAY['draft','scheduled','published']));
ALTER TABLE public.blog_posts ADD CONSTRAINT blog_posts_scheduled_at_check CHECK (status <> 'scheduled' OR publish_at IS NOT NULL);
CREATE INDEX IF NOT EXISTS blog_posts_publish_at_idx ON public.blog_posts (publish_at) WHERE status = 'scheduled';
DROP POLICY "Published posts are public" ON public.blog_posts;
CREATE POLICY "Published posts are public" ON public.blog_posts FOR SELECT TO anon, authenticated
  USING (status = 'published' OR (status = 'scheduled' AND publish_at <= now()));