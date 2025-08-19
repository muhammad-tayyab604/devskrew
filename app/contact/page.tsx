import ContactPageClient from "./ContactPageClient";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: 'Contact Devskrew | Get in Touch for Web & App Development, Marketing & Design',
  description:
    'Reach out to Devskrew for web development, app design, SEO, branding, and digital marketing solutions. Let’s discuss how we can help grow your business.',
  keywords: [
    'contact Devskrew',
    'hire digital agency',
    'get a quote web development',
    'app development consultation',
    'SEO and marketing support',
    'branding agency contact',
    'UI/UX design inquiry',
    'digital solutions consultation',
  ],
  openGraph: {
    type: 'website',
    url: 'https://devskrew.com/contact',
    title: 'Contact Devskrew | Let’s Build Your Next Digital Project',
    description:
      'Looking for expert web development, app solutions, or digital marketing? Contact Devskrew today and let’s create powerful digital experiences together.',
    images: [
      {
        url: '/og-contact.webp',
        width: 1200,
        height: 630,
        alt: 'Contact Devskrew - Digital Agency',
      },
    ],
    siteName: 'Devskrew',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Contact Devskrew | Web & App Development, Marketing & Design',
    description:
      'Connect with Devskrew’s team for custom websites, apps, SEO, and digital marketing solutions that grow your business. Let’s talk today!',
    images: ['/og-contact.webp'],
    creator: '@Devskrew',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function ContactPage() {
  return <ContactPageClient />;
}
