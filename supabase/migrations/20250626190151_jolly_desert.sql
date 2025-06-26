/*
  # Initial Schema Setup for Admin Panel

  1. New Tables
    - `team_members`
      - `id` (uuid, primary key)
      - `name` (text)
      - `designation` (text)
      - `bio` (text)
      - `image_url` (text)
      - `linkedin_url` (text, optional)
      - `twitter_url` (text, optional)
      - `order_index` (integer)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)

    - `services`
      - `id` (uuid, primary key)
      - `title` (text)
      - `slug` (text, unique)
      - `description` (text)
      - `long_description` (text)
      - `features` (text array)
      - `technologies` (text array)
      - `starting_price` (text)
      - `delivery_time` (text)
      - `icon` (text)
      - `gradient` (text)
      - `bg_gradient` (text)
      - `seo_title` (text, optional)
      - `seo_description` (text, optional)
      - `seo_keywords` (text array, optional)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)

    - `portfolio`
      - `id` (uuid, primary key)
      - `title` (text)
      - `slug` (text, unique)
      - `description` (text)
      - `long_description` (text)
      - `image_url` (text)
      - `gallery_urls` (text array)
      - `tags` (text array)
      - `category` (text)
      - `client` (text)
      - `year` (text)
      - `duration` (text)
      - `team_size` (text)
      - `live_url` (text, optional)
      - `github_url` (text, optional)
      - `challenge` (text)
      - `solution` (text)
      - `features` (text array)
      - `technologies` (jsonb)
      - `results` (jsonb)
      - `testimonial` (jsonb)
      - `gradient` (text)
      - `featured` (boolean)
      - `seo_title` (text, optional)
      - `seo_description` (text, optional)
      - `seo_keywords` (text array, optional)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)

    - `blog_posts`
      - `id` (uuid, primary key)
      - `title` (text)
      - `slug` (text, unique)
      - `excerpt` (text)
      - `content` (text)
      - `image_url` (text)
      - `author` (text)
      - `category` (text)
      - `read_time` (text)
      - `gradient` (text)
      - `published` (boolean)
      - `seo_title` (text, optional)
      - `seo_description` (text, optional)
      - `seo_keywords` (text array, optional)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)
      - `published_at` (timestamp, optional)

    - `contact_submissions`
      - `id` (uuid, primary key)
      - `name` (text)
      - `email` (text)
      - `company` (text, optional)
      - `service` (text, optional)
      - `budget` (text, optional)
      - `message` (text)
      - `status` (text) - 'new', 'read', 'replied', 'archived'
      - `created_at` (timestamp)
      - `updated_at` (timestamp)

  2. Security
    - Enable RLS on all tables
    - Add policies for public read access where appropriate
    - Add policies for authenticated admin access
*/

-- Team Members Table
CREATE TABLE IF NOT EXISTS team_members (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  designation text NOT NULL,
  bio text NOT NULL,
  image_url text NOT NULL,
  linkedin_url text,
  twitter_url text,
  order_index integer DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE team_members ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Team members are viewable by everyone"
  ON team_members
  FOR SELECT
  USING (true);

CREATE POLICY "Team members are editable by authenticated users"
  ON team_members
  FOR ALL
  TO authenticated
  USING (true);

-- Services Table
CREATE TABLE IF NOT EXISTS services (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  slug text UNIQUE NOT NULL,
  description text NOT NULL,
  long_description text NOT NULL,
  features text[] DEFAULT '{}',
  technologies text[] DEFAULT '{}',
  starting_price text NOT NULL,
  delivery_time text NOT NULL,
  icon text DEFAULT 'Code',
  gradient text DEFAULT 'from-blue-500 to-cyan-500',
  bg_gradient text DEFAULT 'from-blue-50 to-cyan-50 dark:from-blue-950/50 dark:to-cyan-950/50',
  seo_title text,
  seo_description text,
  seo_keywords text[] DEFAULT '{}',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE services ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Services are viewable by everyone"
  ON services
  FOR SELECT
  USING (true);

CREATE POLICY "Services are editable by authenticated users"
  ON services
  FOR ALL
  TO authenticated
  USING (true);

-- Portfolio Table
CREATE TABLE IF NOT EXISTS portfolio (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  slug text UNIQUE NOT NULL,
  description text NOT NULL,
  long_description text NOT NULL,
  image_url text NOT NULL,
  gallery_urls text[] DEFAULT '{}',
  tags text[] DEFAULT '{}',
  category text NOT NULL,
  client text NOT NULL,
  year text NOT NULL,
  duration text,
  team_size text,
  live_url text,
  github_url text,
  challenge text NOT NULL,
  solution text NOT NULL,
  features text[] DEFAULT '{}',
  technologies jsonb DEFAULT '{}',
  results jsonb DEFAULT '[]',
  testimonial jsonb DEFAULT '{}',
  gradient text DEFAULT 'from-blue-500 to-cyan-500',
  featured boolean DEFAULT false,
  seo_title text,
  seo_description text,
  seo_keywords text[] DEFAULT '{}',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE portfolio ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Portfolio items are viewable by everyone"
  ON portfolio
  FOR SELECT
  USING (true);

CREATE POLICY "Portfolio items are editable by authenticated users"
  ON portfolio
  FOR ALL
  TO authenticated
  USING (true);

-- Blog Posts Table
CREATE TABLE IF NOT EXISTS blog_posts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  slug text UNIQUE NOT NULL,
  excerpt text NOT NULL,
  content text NOT NULL,
  image_url text NOT NULL,
  author text NOT NULL,
  category text NOT NULL,
  read_time text NOT NULL,
  gradient text DEFAULT 'from-blue-500 to-cyan-500',
  published boolean DEFAULT false,
  seo_title text,
  seo_description text,
  seo_keywords text[] DEFAULT '{}',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  published_at timestamptz
);

ALTER TABLE blog_posts ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Published blog posts are viewable by everyone"
  ON blog_posts
  FOR SELECT
  USING (published = true);

CREATE POLICY "Blog posts are editable by authenticated users"
  ON blog_posts
  FOR ALL
  TO authenticated
  USING (true);

-- Contact Submissions Table
CREATE TABLE IF NOT EXISTS contact_submissions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text NOT NULL,
  company text,
  service text,
  budget text,
  message text NOT NULL,
  status text DEFAULT 'new' CHECK (status IN ('new', 'read', 'replied', 'archived')),
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE contact_submissions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Contact submissions are editable by authenticated users"
  ON contact_submissions
  FOR ALL
  TO authenticated
  USING (true);

-- Indexes for better performance
CREATE INDEX IF NOT EXISTS idx_team_members_order ON team_members(order_index);
CREATE INDEX IF NOT EXISTS idx_services_slug ON services(slug);
CREATE INDEX IF NOT EXISTS idx_portfolio_slug ON portfolio(slug);
CREATE INDEX IF NOT EXISTS idx_portfolio_featured ON portfolio(featured);
CREATE INDEX IF NOT EXISTS idx_blog_posts_slug ON blog_posts(slug);
CREATE INDEX IF NOT EXISTS idx_blog_posts_published ON blog_posts(published);
CREATE INDEX IF NOT EXISTS idx_contact_submissions_status ON contact_submissions(status);
CREATE INDEX IF NOT EXISTS idx_contact_submissions_created_at ON contact_submissions(created_at);