CREATE TYPE public.app_role AS ENUM ('admin', 'editor');

CREATE TABLE public.user_roles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  email text,
  role public.app_role NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (user_id, role)
);
GRANT SELECT ON public.user_roles TO authenticated;
GRANT ALL ON public.user_roles TO service_role;
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

CREATE OR REPLACE FUNCTION public.has_role(_user_id uuid, _role public.app_role)
RETURNS boolean LANGUAGE sql STABLE SECURITY DEFINER SET search_path = public AS $$
  SELECT EXISTS (SELECT 1 FROM public.user_roles WHERE user_id = _user_id AND role = _role)
$$;

CREATE OR REPLACE FUNCTION public.is_blog_editor(_user_id uuid)
RETURNS boolean LANGUAGE sql STABLE SECURITY DEFINER SET search_path = public AS $$
  SELECT EXISTS (SELECT 1 FROM public.user_roles WHERE user_id = _user_id AND role IN ('admin','editor'))
$$;

CREATE POLICY "Users see own roles, admins see all" ON public.user_roles
  FOR SELECT TO authenticated
  USING (user_id = auth.uid() OR public.has_role(auth.uid(), 'admin'));

CREATE TABLE public.blog_posts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  slug text NOT NULL UNIQUE,
  kind text NOT NULL DEFAULT 'article',
  status text NOT NULL DEFAULT 'draft',
  date date NOT NULL DEFAULT CURRENT_DATE,
  reading_minutes integer NOT NULL DEFAULT 3,
  cover_url text,
  title jsonb NOT NULL DEFAULT '{"es":"","en":""}'::jsonb,
  description jsonb NOT NULL DEFAULT '{"es":"","en":""}'::jsonb,
  blocks jsonb NOT NULL DEFAULT '{"es":[],"en":[]}'::jsonb,
  translated boolean NOT NULL DEFAULT false,
  created_by uuid,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  CONSTRAINT blog_posts_kind_check CHECK (kind IN ('article','case','news')),
  CONSTRAINT blog_posts_status_check CHECK (status IN ('draft','published')),
  CONSTRAINT blog_posts_slug_check CHECK (slug ~ '^[a-z0-9]+(-[a-z0-9]+)*$')
);
CREATE INDEX blog_posts_status_date_idx ON public.blog_posts (status, date DESC);
GRANT SELECT ON public.blog_posts TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.blog_posts TO authenticated;
GRANT ALL ON public.blog_posts TO service_role;
ALTER TABLE public.blog_posts ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Published posts are public" ON public.blog_posts
  FOR SELECT TO anon, authenticated USING (status = 'published');
CREATE POLICY "Editors read all posts" ON public.blog_posts
  FOR SELECT TO authenticated USING (public.is_blog_editor(auth.uid()));
CREATE POLICY "Editors insert posts" ON public.blog_posts
  FOR INSERT TO authenticated WITH CHECK (public.is_blog_editor(auth.uid()));
CREATE POLICY "Editors update posts" ON public.blog_posts
  FOR UPDATE TO authenticated USING (public.is_blog_editor(auth.uid())) WITH CHECK (public.is_blog_editor(auth.uid()));
CREATE POLICY "Editors delete posts" ON public.blog_posts
  FOR DELETE TO authenticated USING (public.is_blog_editor(auth.uid()));

CREATE OR REPLACE FUNCTION public.touch_updated_at()
RETURNS trigger LANGUAGE plpgsql SET search_path = public AS $$
BEGIN NEW.updated_at = now(); RETURN NEW; END $$;
CREATE TRIGGER blog_posts_touch BEFORE UPDATE ON public.blog_posts
  FOR EACH ROW EXECUTE FUNCTION public.touch_updated_at();

CREATE POLICY "Editors upload blog images" ON storage.objects
  FOR INSERT TO authenticated WITH CHECK (bucket_id = 'blog-images' AND public.is_blog_editor(auth.uid()));
CREATE POLICY "Editors update blog images" ON storage.objects
  FOR UPDATE TO authenticated USING (bucket_id = 'blog-images' AND public.is_blog_editor(auth.uid()));
CREATE POLICY "Editors delete blog images" ON storage.objects
  FOR DELETE TO authenticated USING (bucket_id = 'blog-images' AND public.is_blog_editor(auth.uid()));