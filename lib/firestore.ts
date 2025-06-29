import {
  collection,
  doc,
  getDocs,
  getDoc,
  addDoc,
  updateDoc,
  deleteDoc,
  query,
  orderBy,
  where,
  Timestamp,
} from 'firebase/firestore';
import { db } from './firebase';

// Team Members
export interface TeamMember {
  id?: string;
  name: string;
  designation: string;
  bio: string;
  imageUrl: string;
  linkedinUrl?: string;
  twitterUrl?: string;
  createdAt?: Timestamp;
  updatedAt?: Timestamp;
}

export const teamMembersService = {
  async getAll(): Promise<TeamMember[]> {
    const q = query(collection(db, 'teamMembers'));
    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as TeamMember));
  },

  async getById(id: string): Promise<TeamMember | null> {
    const docRef = doc(db, 'teamMembers', id);
    const docSnap = await getDoc(docRef);
    return docSnap.exists() ? { id: docSnap.id, ...docSnap.data() } as TeamMember : null;
  },

  async create(data: Omit<TeamMember, 'id' | 'createdAt' | 'updatedAt'>): Promise<string> {
    const docRef = await addDoc(collection(db, 'teamMembers'), {
      ...data,
      createdAt: Timestamp.now(),
      updatedAt: Timestamp.now(),
    });
    return docRef.id;
  },

  async update(id: string, data: Partial<TeamMember>): Promise<void> {
    const docRef = doc(db, 'teamMembers', id);
    await updateDoc(docRef, {
      ...data,
      updatedAt: Timestamp.now(),
    });
  },

  async delete(id: string): Promise<void> {
    const docRef = doc(db, 'teamMembers', id);
    await deleteDoc(docRef);
  },
};

// Services
export interface Service {
  id?: string;
  title: string;
  slug: string;
  description: string;
  longDescription: string;
  features: string[];
  technologies: string[];
  startingPrice: string;
  deliveryTime: string;
  icon: string;
  featuredImage?: string; // New field for featured image
  gradient: string;
  bgGradient: string;
  seoTitle?: string;
  seoDescription?: string;
  seoKeywords?: string[];
  // OpenGraph fields
  ogTitle?: string;
  ogDescription?: string;
  ogImage?: string;
  createdAt?: Timestamp;
  updatedAt?: Timestamp;
}

export const servicesService = {
  async getAll(): Promise<Service[]> {
    const q = query(collection(db, 'services'), orderBy('createdAt', 'desc'));
    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Service));
  },

  async getById(id: string): Promise<Service | null> {
    const docRef = doc(db, 'services', id);
    const docSnap = await getDoc(docRef);
    return docSnap.exists() ? { id: docSnap.id, ...docSnap.data() } as Service : null;
  },

  async getBySlug(slug: string): Promise<Service | null> {
    const q = query(collection(db, 'services'), where('slug', '==', slug));
    const snapshot = await getDocs(q);
    return snapshot.empty ? null : { id: snapshot.docs[0].id, ...snapshot.docs[0].data() } as Service;
  },

  async create(data: Omit<Service, 'id' | 'createdAt' | 'updatedAt'>): Promise<string> {
    const docRef = await addDoc(collection(db, 'services'), {
      ...data,
      createdAt: Timestamp.now(),
      updatedAt: Timestamp.now(),
    });
    return docRef.id;
  },

  async update(id: string, data: Partial<Service>): Promise<void> {
    const docRef = doc(db, 'services', id);
    await updateDoc(docRef, {
      ...data,
      updatedAt: Timestamp.now(),
    });
  },

  async delete(id: string): Promise<void> {
    const docRef = doc(db, 'services', id);
    await deleteDoc(docRef);
  },
};

// Portfolio
export interface Portfolio {
  id?: string;
  title: string;
  slug: string;
  description: string;
  longDescription: string;
  imageUrl: string;
  featuredImage?: string; // New field for featured image (different from main imageUrl)
  galleryUrls: string[];
  tags: string[];
  category: string;
  client: string;
  year: string;
  duration?: string;
  teamSize?: string;
  liveUrl?: string;
  githubUrl?: string;
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
  seoTitle?: string;
  seoDescription?: string;
  seoKeywords?: string[];
  // OpenGraph fields
  ogTitle?: string;
  ogDescription?: string;
  ogImage?: string;
  createdAt?: Timestamp;
  updatedAt?: Timestamp;
}

export const portfolioService = {
  async getAll(): Promise<Portfolio[]> {
    const q = query(collection(db, 'portfolio'), orderBy('createdAt', 'desc'));
    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Portfolio));
  },

  async getById(id: string): Promise<Portfolio | null> {
    const docRef = doc(db, 'portfolio', id);
    const docSnap = await getDoc(docRef);
    return docSnap.exists() ? { id: docSnap.id, ...docSnap.data() } as Portfolio : null;
  },

  async getBySlug(slug: string): Promise<Portfolio | null> {
    const q = query(collection(db, 'portfolio'), where('slug', '==', slug));
    const snapshot = await getDocs(q);
    return snapshot.empty ? null : { id: snapshot.docs[0].id, ...snapshot.docs[0].data() } as Portfolio;
  },

  async create(data: Omit<Portfolio, 'id' | 'createdAt' | 'updatedAt'>): Promise<string> {
    const docRef = await addDoc(collection(db, 'portfolio'), {
      ...data,
      createdAt: Timestamp.now(),
      updatedAt: Timestamp.now(),
    });
    return docRef.id;
  },

  async update(id: string, data: Partial<Portfolio>): Promise<void> {
    const docRef = doc(db, 'portfolio', id);
    await updateDoc(docRef, {
      ...data,
      updatedAt: Timestamp.now(),
    });
  },

  async delete(id: string): Promise<void> {
    const docRef = doc(db, 'portfolio', id);
    await deleteDoc(docRef);
  },
};

// Blog Posts
export interface BlogPost {
  id?: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  imageUrl: string;
  author: string;
  category: string;
  readTime: string;
  gradient: string;
  published: boolean;
  seoTitle?: string;
  seoDescription?: string;
  seoKeywords?: string[];
  // OpenGraph fields
  ogTitle?: string;
  ogDescription?: string;
  ogImage?: string;
  createdAt?: Timestamp;
  updatedAt?: Timestamp;
  publishedAt?: Timestamp;
}

export const blogService = {
  async getAll(): Promise<BlogPost[]> {
    const q = query(collection(db, 'blogPosts'), orderBy('createdAt', 'desc'));
    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as BlogPost));
  },

  async getPublished(): Promise<BlogPost[]> {
    const q = query(
      collection(db, 'blogPosts'),
      where('published', '==', true),
      orderBy('publishedAt', 'desc')
    );
    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as BlogPost));
  },

  async getById(id: string): Promise<BlogPost | null> {
    const docRef = doc(db, 'blogPosts', id);
    const docSnap = await getDoc(docRef);
    return docSnap.exists() ? { id: docSnap.id, ...docSnap.data() } as BlogPost : null;
  },

  async getBySlug(slug: string): Promise<BlogPost | null> {
    const q = query(collection(db, 'blogPosts'), where('slug', '==', slug));
    const snapshot = await getDocs(q);
    return snapshot.empty ? null : { id: snapshot.docs[0].id, ...snapshot.docs[0].data() } as BlogPost;
  },

  async create(data: Omit<BlogPost, 'id' | 'createdAt' | 'updatedAt'>): Promise<string> {
    const docRef = await addDoc(collection(db, 'blogPosts'), {
      ...data,
      createdAt: Timestamp.now(),
      updatedAt: Timestamp.now(),
      publishedAt: data.published ? Timestamp.now() : null,
    });
    return docRef.id;
  },

  async update(id: string, data: Partial<BlogPost>): Promise<void> {
    const docRef = doc(db, 'blogPosts', id);
    const updateData: any = {
      ...data,
      updatedAt: Timestamp.now(),
    };
    
    if (data.published && !data.publishedAt) {
      updateData.publishedAt = Timestamp.now();
    }
    
    await updateDoc(docRef, updateData);
  },

  async delete(id: string): Promise<void> {
    const docRef = doc(db, 'blogPosts', id);
    await deleteDoc(docRef);
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
  createdAt?: Timestamp;
  updatedAt?: Timestamp;
}

export const testimonialsService = {
  async getAll(): Promise<Testimonial[]> {
    const q = query(collection(db, 'testimonials'));
    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Testimonial));
  },

  async getFeatured(): Promise<Testimonial[]> {
    const q = query(
      collection(db, 'testimonials'),
      where('featured', '==', true)
    );
    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Testimonial));
  },

  async getById(id: string): Promise<Testimonial | null> {
    const docRef = doc(db, 'testimonials', id);
    const docSnap = await getDoc(docRef);
    return docSnap.exists() ? { id: docSnap.id, ...docSnap.data() } as Testimonial : null;
  },

  async create(data: Omit<Testimonial, 'id' | 'createdAt' | 'updatedAt'>): Promise<string> {
    const docRef = await addDoc(collection(db, 'testimonials'), {
      ...data,
      createdAt: Timestamp.now(),
      updatedAt: Timestamp.now(),
    });
    return docRef.id;
  },

  async update(id: string, data: Partial<Testimonial>): Promise<void> {
    const docRef = doc(db, 'testimonials', id);
    await updateDoc(docRef, {
      ...data,
      updatedAt: Timestamp.now(),
    });
  },

  async delete(id: string): Promise<void> {
    const docRef = doc(db, 'testimonials', id);
    await deleteDoc(docRef);
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
  createdAt?: Timestamp;
  updatedAt?: Timestamp;
}

export const contactService = {
  async getAll(): Promise<ContactSubmission[]> {
    const q = query(collection(db, 'contactSubmissions'), orderBy('createdAt', 'desc'));
    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as ContactSubmission));
  },

  async getById(id: string): Promise<ContactSubmission | null> {
    const docRef = doc(db, 'contactSubmissions', id);
    const docSnap = await getDoc(docRef);
    return docSnap.exists() ? { id: docSnap.id, ...docSnap.data() } as ContactSubmission : null;
  },

  async create(data: Omit<ContactSubmission, 'id' | 'createdAt' | 'updatedAt'>): Promise<string> {
    const docRef = await addDoc(collection(db, 'contactSubmissions'), {
      ...data,
      createdAt: Timestamp.now(),
      updatedAt: Timestamp.now(),
    });
    return docRef.id;
  },

  async update(id: string, data: Partial<ContactSubmission>): Promise<void> {
    const docRef = doc(db, 'contactSubmissions', id);
    await updateDoc(docRef, {
      ...data,
      updatedAt: Timestamp.now(),
    });
  },

  async delete(id: string): Promise<void> {
    const docRef = doc(db, 'contactSubmissions', id);
    await deleteDoc(docRef);
  },
};