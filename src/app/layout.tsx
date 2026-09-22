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
  metadataBase: new URL('https://yjdevelopers.com'),
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://yjdevelopers.com',
    title: 'YJ DEVELOPERS — Web, Mobile App Development & Video Editing',
    description:
      'Invisible Complexity. Visible Impact. We build fast, modern, scalable digital experiences for ambitious businesses.',
    siteName: 'YJ DEVELOPERS',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'YJ DEVELOPERS — Web, Mobile App Development & Video Editing',
    description:
      'Invisible Complexity. Visible Impact. Fast, modern, and scalable digital solutions.',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`scroll-smooth ${plusJakartaSans.variable}`}>
      <body className="min-h-screen flex flex-col bg-white text-slate-900 font-sans antialiased">
        {children}
      </body>
    </html>
  );
}
