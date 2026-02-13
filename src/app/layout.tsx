import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/next';
import { AuthProvider } from '@/contexts/AuthContext';
import '../styles/globals.css';

const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  variable: '--font-inter',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL('https://www.propthinks.com'),
  title: {
    default: 'PropThinks - Property Management in Andhra Pradesh',
    template: '%s | PropThinks',
  },
  description:
    'Find verified properties for rent in Nellore, Guntur, Vijayawada, and Tirupati. Professional property management services by PropThinks.',
  icons: {
    icon: [{ url: '/favicon.png', type: 'image/png' }],
    shortcut: ['/favicon.ico'],
    apple: [{ url: '/favicon.png' }],
  },
  keywords: [
    'property management',
    'properties for rent',
    'rental homes',
    'Nellore',
    'Guntur',
    'Vijayawada',
    'Tirupati',
    'Andhra Pradesh',
    'tenant screening',
    'rent collection',
  ],
  authors: [{ name: 'PropThinks' }],
  creator: 'PropThinks',
  publisher: 'PropThinks',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: 'website',
    locale: 'en_IN',
    url: 'https://www.propthinks.com',
    siteName: 'PropThinks',
    title: 'PropThinks - Property Management in Andhra Pradesh',
    description: 'Find verified properties for rent in Nellore, Guntur, Vijayawada, and Tirupati.',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'PropThinks - Professional Property Management',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'PropThinks - Property Management',
    description: 'Find your perfect home in Andhra Pradesh',
    images: ['/og-image.jpg'],
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
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.variable} suppressHydrationWarning>
      <body className="font-sans antialiased">
        <AuthProvider>
          {children}
        </AuthProvider>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
