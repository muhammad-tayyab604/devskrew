-- Create storage buckets for file uploads

-- Team members bucket
INSERT INTO storage.buckets (id, name, public) 
VALUES ('team-members', 'team-members', true)
ON CONFLICT (id) DO NOTHING;

-- Services bucket
INSERT INTO storage.buckets (id, name, public) 
VALUES ('services', 'services', true)
ON CONFLICT (id) DO NOTHING;

-- Portfolio bucket
INSERT INTO storage.buckets (id, name, public) 
VALUES ('portfolio', 'portfolio', true)
ON CONFLICT (id) DO NOTHING;

-- Blog bucket
INSERT INTO storage.buckets (id, name, public) 
VALUES ('blog', 'blog', true)
ON CONFLICT (id) DO NOTHING;

-- Testimonials bucket
INSERT INTO storage.buckets (id, name, public) 
VALUES ('testimonials', 'testimonials', true)
ON CONFLICT (id) DO NOTHING;

-- Create storage policies for public read access
CREATE POLICY "Public read access" ON storage.objects FOR SELECT USING (true);

-- Create storage policies for authenticated upload
CREATE POLICY "Authenticated users can upload team-members" ON storage.objects 
FOR INSERT WITH CHECK (bucket_id = 'team-members' AND auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can upload services" ON storage.objects 
FOR INSERT WITH CHECK (bucket_id = 'services' AND auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can upload portfolio" ON storage.objects 
FOR INSERT WITH CHECK (bucket_id = 'portfolio' AND auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can upload blog" ON storage.objects 
FOR INSERT WITH CHECK (bucket_id = 'blog' AND auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can upload testimonials" ON storage.objects 
FOR INSERT WITH CHECK (bucket_id = 'testimonials' AND auth.role() = 'authenticated');

-- Create storage policies for authenticated update/delete
CREATE POLICY "Authenticated users can update team-members" ON storage.objects 
FOR UPDATE USING (bucket_id = 'team-members' AND auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can update services" ON storage.objects 
FOR UPDATE USING (bucket_id = 'services' AND auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can update portfolio" ON storage.objects 
FOR UPDATE USING (bucket_id = 'portfolio' AND auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can update blog" ON storage.objects 
FOR UPDATE USING (bucket_id = 'blog' AND auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can update testimonials" ON storage.objects 
FOR UPDATE USING (bucket_id = 'testimonials' AND auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can delete team-members" ON storage.objects 
FOR DELETE USING (bucket_id = 'team-members' AND auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can delete services" ON storage.objects 
FOR DELETE USING (bucket_id = 'services' AND auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can delete portfolio" ON storage.objects 
FOR DELETE USING (bucket_id = 'portfolio' AND auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can delete blog" ON storage.objects 
FOR DELETE USING (bucket_id = 'blog' AND auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can delete testimonials" ON storage.objects 
FOR DELETE USING (bucket_id = 'testimonials' AND auth.role() = 'authenticated');