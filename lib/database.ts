import { supabase } from './supabase';

// Team Members
export interface TeamMember {
  id?: string;
  created_at?: string;
  name: string;
  designation: string;
  bio: string;
  image_url: string;
  linkedin_url?: string;
  twitter_url?: string;
  updated_at?: string;
}

export const teamMembersService = {
  async getAll(): Promise<TeamMember[]> {
    const { data, error } = await supabase
      .from('team_members')
      .select('*')
      .order('created_at', { ascending: false });
    
    if (error) throw new Error(error.message);
    return data || [];
  },

  async getById(id: string): Promise<TeamMember | null> {
    const { data, error } = await supabase
      .from('team_members')
      .select('*')
      .eq('id', id)
      .single();
    
    if (error) return null;
    return data;
  },

  async create(data: Omit<TeamMember, 'id' | 'created_at' | 'updated_at'>): Promise<string> {
    const { data: result, error } = await supabase
      .from('team_members')
      .insert([data])
      .select()
      .single();
    
    if (error) throw new Error(error.message);
    return result.id;
  },

  async update(id: string, data: TeamMember): Promise<void> {
    const { error } = await supabase
      .from('team_members')
      .update(data)
      .eq('id', id);
    
    if (error) throw new Error(error.message);
  },

  async delete(id: string): Promise<void> {
    const { error } = await supabase
      .from('team_members')
      .delete()
      .eq('id', id);
    
    if (error) throw new Error(error.message);
  },
};

// Services
export interface Service {
  id?: string;
  title: string;
  slug: string;
  description: string;
  long_description: string;
  features: string[];
  technologies: string[];
  starting_price: string;
  delivery_time: string;
  icon: string;
  featured_image?: string;
  gradient: string;
  bg_gradient: string;
  seo_title?: string;
  seo_description?: string;
  seo_keywords?: string[];
  og_title?: string;
  og_description?: string;
  og_image?: string;
  created_at?: string;
  updated_at?: string;
}

export const servicesService = {
  async getAll(): Promise<Service[]> {
    const { data, error } = await supabase
      .from('services')
      .select('*')
      .order('created_at', { ascending: false });
    
    if (error) throw new Error(error.message);
    return data || [];
  },

  async getById(id: string): Promise<Service | null> {
    const { data, error } = await supabase
      .from('services')
      .select('*')
      .eq('id', id)
      .single();
    
    if (error) return null;
    return data;
  },

  async getBySlug(slug: string): Promise<Service | null> {
    const { data, error } = await supabase
      .from('services')
      .select('*')
      .eq('slug', slug)
      .single();
    
    if (error) return null;
    return data;
  },

  async create(data: Omit<Service, 'id' | 'created_at' | 'updated_at'>): Promise<string> {
    const { data: result, error } = await supabase
      .from('services')
      .insert([data])
      .select()
      .single();
    
    if (error) throw new Error(error.message);
    return result.id;
  },

  async update(id: string, data: Partial<Service>): Promise<void> {
    const { error } = await supabase
      .from('services')
      .update(data)
      .eq('id', id);
    
    if (error) throw new Error(error.message);
  },

  async delete(id: string): Promise<void> {
    const { error } = await supabase
      .from('services')
      .delete()
      .eq('id', id);
    
    if (error) throw new Error(error.message);
  },
};

// Portfolio
export interface Portfolio {
  id?: string;
  title: string;
  slug: string;
  description: string;
  long_description: string;
  image_url: string;
  featured_image?: string;
  gallery_urls: string[];
  tags: string[];
  category: string;
  client: string;
  year: string;
  duration?: string;
  team_size?: string;
  live_url?: string;
  github_url?: string;
  challenge: string;
  solution: string;
  features: string[];
  technologies: Record<string, string[]>;
  results: Array<{ metric: string; value: string; description: string }>;
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
  og_title?: string;
  og_description?: string;
  og_image?: string;
  created_at?: string;
  updated_at?: string;
}

export const portfolioService = {
  async getAll(): Promise<Portfolio[]> {
    const { data, error } = await supabase
      .from('portfolio')
      .select('*')
      .order('created_at', { ascending: false });
    
    if (error) throw new Error(error.message);
    return data || [];
  },

  async getById(id: string): Promise<Portfolio | null> {
    const { data, error } = await supabase
      .from('portfolio')
      .select('*')
      .eq('id', id)
      .single();
    
    if (error) return null;
    return data;
  },

  async getBySlug(slug: string): Promise<Portfolio | null> {
    const { data, error } = await supabase
      .from('portfolio')
      .select('*')
      .eq('slug', slug)
      .single();
    
    if (error) return null;
    return data;
  },

  async create(data: Omit<Portfolio, 'id' | 'created_at' | 'updated_at'>): Promise<string> {
    const { data: result, error } = await supabase
      .from('portfolio')
      .insert([data])
      .select()
      .single();
    
    if (error) throw new Error(error.message);
    return result.id;
  },

  async update(id: string, data: Partial<Portfolio>): Promise<void> {
    const { error } = await supabase
      .from('portfolio')
      .update(data)
      .eq('id', id);
    
    if (error) throw new Error(error.message);
  },

  async delete(id: string): Promise<void> {
    const { error } = await supabase
      .from('portfolio')
      .delete()
      .eq('id', id);
    
    if (error) throw new Error(error.message);
  },
};

// Blog Posts
export interface BlogPost {
  id?: string;
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
  og_title?: string;
  og_description?: string;
  og_image?: string;
  created_at?: string;
  updated_at?: string;
  published_at?: string;
}

export const blogService = {
  async getAll(): Promise<BlogPost[]> {
    const { data, error } = await supabase
      .from('blog_posts')
      .select('*')
      .order('created_at', { ascending: false });
    
    if (error) throw new Error(error.message);
    return data || [];
  },

  async getPublished(): Promise<BlogPost[]> {
    const { data, error } = await supabase
      .from('blog_posts')
      .select('*')
      .eq('published', true)
      .order('published_at', { ascending: false });
    
    if (error) throw new Error(error.message);
    return data || [];
  },

  async getById(id: string): Promise<BlogPost | null> {
    const { data, error } = await supabase
      .from('blog_posts')
      .select('*')
      .eq('id', id)
      .single();
    
    if (error) return null;
    return data;
  },

  async getBySlug(slug: string): Promise<BlogPost | null> {
    const { data, error } = await supabase
      .from('blog_posts')
      .select('*')
      .eq('slug', slug)
      .single();
    
    if (error) return null;
    return data;
  },

  async create(data: Omit<BlogPost, 'id' | 'created_at' | 'updated_at'>): Promise<string> {
    const insertData = {
      ...data,
      published_at: data.published ? new Date().toISOString() : null,
    };

    const { data: result, error } = await supabase
      .from('blog_posts')
      .insert([insertData])
      .select()
      .single();
    
    if (error) throw new Error(error.message);
    return result.id;
  },

  async update(id: string, data: Partial<BlogPost>): Promise<void> {
    const updateData: any = { ...data };
    
    if (data.published && !data.published_at) {
      updateData.published_at = new Date().toISOString();
    }

    const { error } = await supabase
      .from('blog_posts')
      .update(updateData)
      .eq('id', id);
    
    if (error) throw new Error(error.message);
  },

  async delete(id: string): Promise<void> {
    const { error } = await supabase
      .from('blog_posts')
      .delete()
      .eq('id', id);
    
    if (error) throw new Error(error.message);
  },
};

// Testimonials
export interface Testimonial {
  id?: string;
  name: string;
  designation: string;
  company: string;
  content: string;
  avatar?: string;
  rating: number;
  featured: boolean;
  created_at?: string;
  updated_at?: string;
}

export const testimonialsService = {
  async getAll(): Promise<Testimonial[]> {
    const { data, error } = await supabase
      .from('testimonials')
      .select('*')
      .order('created_at', { ascending: false });
    
    if (error) throw new Error(error.message);
    return data || [];
  },

  async getFeatured(): Promise<Testimonial[]> {
    const { data, error } = await supabase
      .from('testimonials')
      .select('*')
      .eq('featured', true)
      .order('created_at', { ascending: false });
    
    if (error) throw new Error(error.message);
    return data || [];
  },

  async getById(id: string): Promise<Testimonial | null> {
    const { data, error } = await supabase
      .from('testimonials')
      .select('*')
      .eq('id', id)
      .single();
    
    if (error) return null;
    return data;
  },

  async create(data: Omit<Testimonial, 'id' | 'created_at' | 'updated_at'>): Promise<string> {
    const { data: result, error } = await supabase
      .from('testimonials')
      .insert([data])
      .select()
      .single();
    
    if (error) throw new Error(error.message);
    return result.id;
  },

  async update(id: string, data: Partial<Testimonial>): Promise<void> {
    const { error } = await supabase
      .from('testimonials')
      .update(data)
      .eq('id', id);
    
    if (error) throw new Error(error.message);
  },

  async delete(id: string): Promise<void> {
    const { error } = await supabase
      .from('testimonials')
      .delete()
      .eq('id', id);
    
    if (error) throw new Error(error.message);
  },
};

// Contact Submissions
export interface ContactSubmission {
  id?: string;
  name: string;
  email: string;
  company?: string;
  service?: string;
  budget?: string;
  message: string;
  status: 'new' | 'read' | 'replied' | 'archived';
  created_at?: string;
  updated_at?: string;
}

export const contactService = {
  async getAll(): Promise<ContactSubmission[]> {
    const { data, error } = await supabase
      .from('contact_submissions')
      .select('*')
      .order('created_at', { ascending: false });
    
    if (error) throw new Error(error.message);
    return data || [];
  },

  async getById(id: string): Promise<ContactSubmission | null> {
    const { data, error } = await supabase
      .from('contact_submissions')
      .select('*')
      .eq('id', id)
      .single();
    
    if (error) return null;
    return data;
  },

  async create(data: Omit<ContactSubmission, 'id' | 'created_at' | 'updated_at'>): Promise<string> {
    const { data: result, error } = await supabase
      .from('contact_submissions')
      .insert([data])
      .select()
      .single();
    
    if (error) throw new Error(error.message);
    return result.id;
  },

  async update(id: string, data: Partial<ContactSubmission>): Promise<void> {
    const { error } = await supabase
      .from('contact_submissions')
      .update(data)
      .eq('id', id);
    
    if (error) throw new Error(error.message);
  },

  async delete(id: string): Promise<void> {
    const { error } = await supabase
      .from('contact_submissions')
      .delete()
      .eq('id', id);
    
    if (error) throw new Error(error.message);
  },
};