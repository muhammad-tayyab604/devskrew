import { Metadata } from 'next';
import Hero from '@/components/sections/Hero';
import Services from '@/components/sections/Services';
import Portfolio from '@/components/sections/Portfolio';
import CTA from '@/components/sections/CTA';
import { Testimonials } from '@/components/sections/Testimonials';
import { UnderHeroCTA } from '@/components/sections/UnderHeroCTA';
import { DevskrewSection } from '@/components/sections/DevskrewSection';
import { FeaturesSection } from '@/components/sections/FeaturesSection';

export const metadata: Metadata = {
  title: 'Devskrew | Digital Agency for Web & App Development, Marketing & Design',
  description: 'Devskrew builds custom websites, apps, and brands with expert design, marketing & SEO. Explore our portfolio and grow your business with digital innovation.',
  keywords: ['digital agency', 'web development', "app development",'software development','creative agency','digital marketing', 'web design', 'SEO', 'branding', 'UI/UX design'],
  openGraph: {
  type: 'website',
  url: 'https://devskrew.com',
  title: 'Devskrew | Digital Agency for Web & App Development, Marketing & Design',
  description: 'Devskrew creates stunning websites, apps, and digital strategies that drive growth. Explore our services, portfolio, and custom solutions.',
  images: [
    {
      url: '/og-home.webp',
      width: 1200,
      height: 630,
      alt: 'Devskrew - Digital Agency',
    },
  ],
}

};

export default function Home() {
  return (
    <>
      <Hero />
      <UnderHeroCTA />
      <FeaturesSection/>
      <Services />
      <Portfolio />
      <Testimonials />
      <DevskrewSection/>
      <CTA />
    </>
  );
}