import { createClient } from '@supabase/supabase-js';

// Get environment variables with fallbacks for development
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

// Only create client if we have the required environment variables
export const supabase = supabaseUrl && supabaseAnonKey 
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null;

// Helper function to check if Supabase is configured
export const isSupabaseConfigured = () => {
  return !!(supabaseUrl && supabaseAnonKey);
};

// Types for our database tables
export interface TeamMember {
  id: string;
  name: string;
  designation: string;
  bio: string;
  image_url: string;
  linkedin_url?: string;
  twitter_url?: string;
  order_index: number;
  created_at: string;
  updated_at: string;
}

export interface Service {
  id: string;
  title: string;
  slug: string;
  description: string;
  long_description: string;
  features: string[];
  technologies: string[];
  starting_price: string;
  delivery_time: string;
  icon: string;
  gradient: string;
  bg_gradient: string;
  seo_title?: string;
  seo_description?: string;
  seo_keywords?: string[];
  created_at: string;
  updated_at: string;
}

export interface Portfolio {
  id: string;
  title: string;
  slug: string;
  description: string;
  long_description: string;
  image_url: string;
  gallery_urls: string[];
  tags: string[];
  category: string;
  client: string;
  year: string;
  duration: string;
  team_size: string;
  live_url?: string;
  github_url?: string;
  challenge: string;
  solution: string;
  features: string[];
  technologies: Record<string, string[]>;
  results: Array<{
    metric: string;
    value: string;
    description: string;
  }>;
  testimonial: {
    content: string;
    author: string;
    role: string;
    avatar?: string;
  };
  gradient: string;
  featured: boolean;
  seo_title?: string;
  seo_description?: string;
  seo_keywords?: string[];
  created_at: string;
  updated_at: string;
}

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  image_url: string;
  author: string;
  category: string;
  read_time: string;
  gradient: string;
  published: boolean;
  seo_title?: string;
  seo_description?: string;
  seo_keywords?: string[];
  created_at: string;
  updated_at: string;
  published_at?: string;
}

export interface ContactSubmission {
  id: string;
  name: string;
  email: string;
  company?: string;
  service?: string;
  budget?: string;
  message: string;
  status: 'new' | 'read' | 'replied' | 'archived';
  created_at: string;
  updated_at: string;
}