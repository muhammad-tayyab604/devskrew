
import { Metadata } from 'next';
import ServicesClient from './ServicesClient';

export const metadata: Metadata = {
  title: 'Our Services | Web & App Development, Digital Marketing, SEO & Design | Devskrew',
  description:
    'Discover Devskrew’s full range of services including web development, app design, digital marketing, SEO, branding, and UI/UX design. Tailored solutions to help your business grow.',
  keywords: [
    'Devskrew services',
    'web development services',
    'app development agency',
    'digital marketing services',
    'SEO company',
    'branding solutions',
    'UI/UX design services',
    'creative digital agency',
    'software development services',
    'custom website design',
  ],
  openGraph: {
    type: 'website',
    url: 'https://devskrew.com/services',
    title: 'Devskrew Services | Web Development, Marketing, SEO & Design',
    description:
      'From websites and apps to SEO, branding, and marketing — Devskrew offers expert digital solutions designed to deliver results for your business.',
    images: [
      {
        url: '/og-services.webp',
        width: 1200,
        height: 630,
        alt: 'Devskrew Services - Web, App, SEO & Marketing',
      },
    ],
    siteName: 'Devskrew',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Devskrew Services | Web & App Development, SEO & Digital Marketing',
    description:
      'Explore Devskrew’s expert services — web & app development, SEO, branding, design, and digital marketing to grow your business online.',
    images: ['/og-services.webp'],
    creator: '@Devskrew',
  },
  robots: {
    index: true,
    follow: true,
  },
};


export default function ServicesPage() {
  return <ServicesClient/>
}