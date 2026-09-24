import type { Metadata } from 'next';
import { Plus_Jakarta_Sans } from 'next/font/google';
import './globals.css';

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ['latin'],
  variable: '--font-plus-jakarta',
  display: 'swap',
  weight: ['400', '500', '600', '700', '800'],
});

export const metadata: Metadata = {
  title: {
    default: 'YJ DEVELOPERS — Web, Mobile App Development & Video Editing',
    template: '%s | YJ DEVELOPERS',
  },
  description:
    'YJ DEVELOPERS designs and develops high-performance websites, mobile applications, and video editing experiences for ambitious businesses.',
  keywords: [
    'Web Design',
    'Web Development',
    'App Development',
    'Mobile Apps',
    'Video Editing',
    'Post Production',
    'Next.js Studio',
    'Full Stack Agency',
  ],
  authors: [{ name: 'YJ DEVELOPERS' }],
  creator: 'YJ DEVELOPERS',
  publisher: 'YJ DEVELOPERS',
  metadataBase: new URL('https://yjdevelopers.com'),
  alternates: {
    canonical: 'https://yjdevelopers.com',
  },
  icons: {
    icon: '/black-logo.png',
    shortcut: '/black-logo.png',
    apple: '/black-logo.png',
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://yjdevelopers.com',
    title: 'YJ DEVELOPERS — Web, Mobile App Development & Video Editing',
    description:
      'Invisible Complexity. Visible Impact. We build fast, modern, scalable digital experiences for ambitious businesses.',
    siteName: 'YJ DEVELOPERS',
    images: [
      {
        url: '/landing-page.png',
        width: 1200,
        height: 630,
        alt: 'YJ DEVELOPERS Showcase',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'YJ DEVELOPERS — Web, Mobile App Development & Video Editing',
    description:
      'Invisible Complexity. Visible Impact. Fast, modern, and scalable digital solutions.',
    images: ['/landing-page.png'],
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

const jsonLdOrganization = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Organization',
      '@id': 'https://yjdevelopers.com/#organization',
      name: 'YJ DEVELOPERS',
      url: 'https://yjdevelopers.com',
      logo: {
        '@type': 'ImageObject',
        url: 'https://yjdevelopers.com/black-logo.png',
        caption: 'YJ DEVELOPERS Logo',
      },
      description:
        'YJ DEVELOPERS is a premier digital agency engineering high-performance websites, mobile applications, and video editing experiences.',
      email: 'hello@yjdevelopers.com',
      telephone: '+919076543210',
      sameAs: [
        'https://linkedin.com',
        'https://instagram.com',
        'https://github.com',
        'https://twitter.com',
      ],
      contactPoint: {
        '@type': 'ContactPoint',
        telephone: '+91-90765-43210',
        contactType: 'customer support',
        email: 'hello@yjdevelopers.com',
        availableLanguage: ['English', 'Hindi'],
      },
    },
    {
      '@type': 'WebSite',
      '@id': 'https://yjdevelopers.com/#website',
      url: 'https://yjdevelopers.com',
      name: 'YJ DEVELOPERS',
      description:
        'Fast, modern, and scalable digital experiences, web apps, and video editing.',
      publisher: {
        '@id': 'https://yjdevelopers.com/#organization',
      },
      inLanguage: 'en-US',
    },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`scroll-smooth ${plusJakartaSans.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdOrganization) }}
        />
      </head>
      <body className="min-h-screen flex flex-col bg-white text-slate-900 font-sans antialiased">
        {children}
      </body>
    </html>
  );
}
