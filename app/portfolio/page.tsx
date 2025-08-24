import { Metadata } from 'next';
import PortfolioClient from './PortfolioClient';

export const metadata: Metadata = {
  title: 'Devskrew Portfolio | Web Development, App Design & Digital Marketing Projects',
  description:
    'Explore Devskrew’s portfolio of successful projects — from custom websites and apps to branding, SEO, and digital marketing campaigns that deliver results.',
  keywords: [
    'Devskrew portfolio',
    'web development projects',
    'app development case studies',
    'digital agency portfolio',
    'branding work',
    'UI/UX design showcase',
    'SEO project examples',
    'digital marketing campaigns',
    'software development portfolio',
    'creative agency case studies',
  ],
  openGraph: {
    type: 'website',
    url: 'https://devskrew.com/portfolio',
    title: 'Devskrew Portfolio | Proven Web, App & Marketing Projects',
    description:
      'See how Devskrew transforms ideas into digital success. View our portfolio of web development, app design, SEO, branding, and digital marketing projects.',
    images: [
      {
        url: '/og-portfolio.webp',
        width: 1200,
        height: 630,
        alt: 'Devskrew Portfolio - Digital Agency Projects',
      },
    ],
    siteName: 'Devskrew',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Devskrew Portfolio | Web Development, Design & Marketing Projects',
    description:
      'Discover Devskrew’s portfolio of websites, apps, SEO, branding & digital marketing campaigns that help businesses grow with digital innovation.',
    images: ['/og-portfolio.webp'],
    creator: '@Devskrew',
  },
  robots: {
    index: true,
    follow: true,
  },
};


export default function PortfolioPage() {
  return <PortfolioClient/>
}