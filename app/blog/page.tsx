
import { blogService } from '@/lib/database';
import { Metadata } from 'next';
import BlogClient from './BlogClient';

export const metadata: Metadata = {
  title: 'Devskrew Blog | Insights on Web Development, Marketing & Digital Innovation',
  description:
    'Explore expert insights, tips, and guides from Devskrew on web development, app design, SEO, digital marketing, and business growth strategies.',
  keywords: [
    'Devskrew blog',
    'digital agency insights',
    'web development tips',
    'app development blog',
    'digital marketing strategies',
    'SEO best practices',
    'UI/UX design trends',
    'branding advice',
    'software development insights',
    'business growth blog',
  ],
  openGraph: {
    type: 'website',
    url: 'https://devskrew.com/blog',
    title: 'Devskrew Blog | Insights on Web Development, Marketing & Digital Innovation',
    description:
      'Stay updated with Devskrew’s blog. Read expert articles on web development, apps, design, SEO, and digital marketing to grow your business online.',
    images: [
      {
        url: '/og-blog.webp',
        width: 1200,
        height: 630,
        alt: 'Devskrew Blog - Digital Agency Insights',
      },
    ],
    siteName: 'Devskrew',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Devskrew Blog | Web Development, Marketing & SEO Insights',
    description:
      'Read the latest blogs from Devskrew on web development, app design, SEO, and digital marketing strategies that drive business growth.',
    images: ['/og-blog.webp'],
    creator: '@Devskrew',
  },
  robots: {
    index: true,
    follow: true,
  },
};


export default async function Blog() {
  const blogPosts = await blogService.getPublished()

  return <BlogClient blogPosts={blogPosts} />
}