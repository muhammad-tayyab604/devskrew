-- Enable necessary extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create team_members table
CREATE TABLE IF NOT EXISTS team_members (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  name TEXT NOT NULL,
  designation TEXT NOT NULL,
  bio TEXT NOT NULL,
  imageUrl TEXT NOT NULL,
  linkedinUrl TEXT,
  twitterUrl TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create services table
CREATE TABLE IF NOT EXISTS services (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  title TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  description TEXT NOT NULL,
  longDescription TEXT NOT NULL,
  features TEXT[] DEFAULT '{}',
  technologies TEXT[] DEFAULT '{}',
  startingPrice TEXT NOT NULL,
  deliveryTime TEXT NOT NULL,
  icon TEXT DEFAULT 'Code',
  featuredImage TEXT,
  gradient TEXT DEFAULT 'from-blue-500 to-cyan-500',
  bgGradient TEXT DEFAULT 'from-blue-50 to-cyan-50 dark:from-blue-950/50 dark:to-cyan-950/50',
  seoTitle TEXT,
  seoDescription TEXT,
  seoKeywords TEXT[] DEFAULT '{}',
  ogTitle TEXT,
  ogDescription TEXT,
  ogImage TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create portfolio table
CREATE TABLE IF NOT EXISTS portfolio (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  title TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  description TEXT NOT NULL,
  longDescription TEXT NOT NULL,
  imageUrl TEXT NOT NULL,
  featuredImage TEXT,
  galleryUrls TEXT[] DEFAULT '{}',
  tags TEXT[] DEFAULT '{}',
  category TEXT NOT NULL,
  client TEXT NOT NULL,
  year TEXT NOT NULL,
  duration TEXT,
  teamSize TEXT,
  liveUrl TEXT,
  githubUrl TEXT,
  challenge TEXT NOT NULL,
  solution TEXT NOT NULL,
  features TEXT[] DEFAULT '{}',
  technologies JSONB DEFAULT '{}',
  results JSONB DEFAULT '[]',
  testimonial JSONB DEFAULT '{}',
  gradient TEXT DEFAULT 'from-blue-500 to-cyan-500',
  featured BOOLEAN DEFAULT FALSE,
  seoTitle TEXT,
  seoDescription TEXT,
  seoKeywords TEXT[] DEFAULT '{}',
  ogTitle TEXT,
  ogDescription TEXT,
  ogImage TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create blog_posts table
CREATE TABLE IF NOT EXISTS blog_posts (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  title TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  excerpt TEXT NOT NULL,
  content TEXT NOT NULL,
  imageUrl TEXT NOT NULL,
  author TEXT NOT NULL,
  category TEXT NOT NULL,
  readTime TEXT NOT NULL,
  gradient TEXT DEFAULT 'from-blue-500 to-cyan-500',
  published BOOLEAN DEFAULT FALSE,
  seoTitle TEXT,
  seoDescription TEXT,
  seoKeywords TEXT[] DEFAULT '{}',
  ogTitle TEXT,
  ogDescription TEXT,
  ogImage TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  published_at TIMESTAMP WITH TIME ZONE
);

-- Create testimonials table
CREATE TABLE IF NOT EXISTS testimonials (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  name TEXT NOT NULL,
  designation TEXT NOT NULL,
  company TEXT NOT NULL,
  content TEXT NOT NULL,
  avatar TEXT,
  rating INTEGER DEFAULT 5 CHECK (rating >= 1 AND rating <= 5),
  featured BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create contact_submissions table
CREATE TABLE IF NOT EXISTS contact_submissions (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  company TEXT,
  service TEXT,
  budget TEXT,
  message TEXT NOT NULL,
  status TEXT DEFAULT 'new' CHECK (status IN ('new', 'read', 'replied', 'archived')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_services_slug ON services(slug);
CREATE INDEX IF NOT EXISTS idx_portfolio_slug ON portfolio(slug);
CREATE INDEX IF NOT EXISTS idx_blog_posts_slug ON blog_posts(slug);
CREATE INDEX IF NOT EXISTS idx_blog_posts_published ON blog_posts(published);
CREATE INDEX IF NOT EXISTS idx_testimonials_featured ON testimonials(featured);
CREATE INDEX IF NOT EXISTS idx_contact_submissions_status ON contact_submissions(status);

-- Create updated_at trigger function
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create triggers for updated_at
CREATE TRIGGER update_team_members_updated_at BEFORE UPDATE ON team_members FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_services_updated_at BEFORE UPDATE ON services FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_portfolio_updated_at BEFORE UPDATE ON portfolio FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_blog_posts_updated_at BEFORE UPDATE ON blog_posts FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_testimonials_updated_at BEFORE UPDATE ON testimonials FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_contact_submissions_updated_at BEFORE UPDATE ON contact_submissions FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Enable Row Level Security (RLS)
ALTER TABLE team_members ENABLE ROW LEVEL SECURITY;
ALTER TABLE services ENABLE ROW LEVEL SECURITY;
ALTER TABLE portfolio ENABLE ROW LEVEL SECURITY;
ALTER TABLE blog_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE testimonials ENABLE ROW LEVEL SECURITY;
ALTER TABLE contact_submissions ENABLE ROW LEVEL SECURITY;

-- Create policies for public read access
CREATE POLICY "Allow public read access on team_members" ON team_members FOR SELECT USING (true);
CREATE POLICY "Allow public read access on services" ON services FOR SELECT USING (true);
CREATE POLICY "Allow public read access on portfolio" ON portfolio FOR SELECT USING (true);
CREATE POLICY "Allow public read access on published blog_posts" ON blog_posts FOR SELECT USING (published = true);
CREATE POLICY "Allow public read access on testimonials" ON testimonials FOR SELECT USING (true);

-- Create policies for authenticated users (admin access)
CREATE POLICY "Allow authenticated users full access on team_members" ON team_members FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Allow authenticated users full access on services" ON services FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Allow authenticated users full access on portfolio" ON portfolio FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Allow authenticated users full access on blog_posts" ON blog_posts FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Allow authenticated users full access on testimonials" ON testimonials FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Allow authenticated users full access on contact_submissions" ON contact_submissions FOR ALL USING (auth.role() = 'authenticated');

-- Allow public to create contact submissions
CREATE POLICY "Allow public to create contact_submissions" ON contact_submissions FOR INSERT WITH CHECK (true);