import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { Toaster } from '@/components/ui/sonner';
import { ThemeProvider } from '@/components/theme-provider';
import HeaderGuard from '@/components/layout/HeaderGuard';
import FooterGuard from '@/components/layout/FooterGuard';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: {
    default: 'Devskrew | Premium Digital Agency for Web & App Development, Marketing & Design',
    template: '%s | Devskrew',
  },
  description:
    'Devskrew is a global digital agency specializing in web development, app design, SEO, branding, UI/UX, and digital marketing. We create innovative solutions that help businesses grow online.',
  keywords: [
    'digital agency',
    'web development company',
    'app development services',
    'web design agency',
    'digital marketing agency',
    'SEO experts',
    'branding services',
    'UI/UX design company',
    'software development agency',
    'creative digital solutions',
  ],
  authors: [{ name: 'Devskrew Team' }],
  creator: 'Devskrew',
  publisher: 'Devskrew',
  metadataBase: new URL('https://devskrew.com'),
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://devskrew.com',
    title: 'Devskrew | Premium Digital Agency for Web & App Development, Marketing & Design',
    description:
      'Partner with Devskrew to build modern websites, apps, and digital solutions. Explore our portfolio of web development, marketing, branding & design projects.',
    siteName: 'Devskrew',
    images: [
      {
        url: '/og-home.webp',
        width: 1200,
        height: 630,
        alt: 'Devskrew - Global Digital Agency',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Devskrew | Web & App Development, SEO & Digital Marketing',
    description:
      'Devskrew empowers businesses with expert web & app development, SEO, branding, and digital marketing solutions that drive measurable growth.',
    images: ['/og-home.webp'],
    creator: '@Devskrew',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'your-google-verification-code',
    yandex: 'your-yandex-verification-code',
  },
};


export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <meta name="theme-color" content="#1e40af" />
      </head>
      <body>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange={false}
        >
          <HeaderGuard/>

          <main className="min-h-screen">
            {children}
          </main>
          <FooterGuard />
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}