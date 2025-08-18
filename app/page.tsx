import { Metadata } from 'next';
import Hero from '@/components/sections/Hero';
import Services from '@/components/sections/Services';
import Portfolio from '@/components/sections/Portfolio';
import CTA from '@/components/sections/CTA';
import Stats from '@/components/sections/Stats';
import { Testimonials } from '@/components/sections/Testimonials';
import { UnderHeroCTA } from '@/components/sections/UnderHeroCTA';

export const metadata: Metadata = {
  title: 'Devskrew - Premium Digital Agency',
  description: 'Transform your business with our cutting-edge web development, digital marketing, and design services. We create digital experiences that drive results and accelerate growth.',
  keywords: ['digital agency', 'web development', 'digital marketing', 'web design', 'SEO', 'branding', 'UI/UX design'],
  openGraph: {
    title: 'Devskrew - Premium Digital Agency',
    description: 'Transform your business with our cutting-edge digital solutions.',
    images: ['/og-home.jpg'],
  },
};

export default function Home() {
  return (
    <>
      <Hero />
      <UnderHeroCTA />
      <Services />
      <Portfolio />
      <Testimonials />
      <CTA />
    </>
  );
}