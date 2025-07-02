import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { Toaster } from '@/components/ui/sonner';
import { ThemeProvider } from '@/components/theme-provider';
import HeaderGuard from '@/components/layout/HeaderGuard';
import FooterGuard from '@/components/layout/FooterGuard';
import { SmoothCursor } from '@/components/ui/smooth-cursor';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: {
    default: 'Devskrew - Premium Digital Agency',
    template: '%s | Devskrew',
  },
  description: 'Transform your business with our cutting-edge web development, digital marketing, and design services. We create digital experiences that drive results.',
  keywords: ['digital agency', 'web development', 'digital marketing', 'web design', 'SEO', 'branding'],
  authors: [{ name: 'Devskrew Team' }],
  creator: 'Devskrew',
  publisher: 'Devskrew',
  metadataBase: new URL('https://yourdomain.com'),
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://yourdomain.com',
    title: 'Devskrew - Premium Digital Agency',
    description: 'Transform your business with our cutting-edge web development, digital marketing, and design services.',
    siteName: 'Devskrew',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Devskrew - Premium Digital Agency',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Devskrew - Premium Digital Agency',
    description: 'Transform your business with our cutting-edge digital solutions.',
    images: ['/og-image.jpg'],
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
          <SmoothCursor />

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