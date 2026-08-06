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
    default: 'Bhoot Tech — Web Design & Development',
    template: '%s | Bhoot Tech',
  },
  description:
    'Bhoot Tech designs and develops high-performance websites, eCommerce experiences and web applications for ambitious businesses.',
  keywords: [
    'Web Design',
    'Web Development',
    'eCommerce',
    'Web Applications',
    'UI/UX Design',
    'Next.js Studio',
    'Frontend Engineering',
  ],
  authors: [{ name: 'Bhoot Tech' }],
  creator: 'Bhoot Tech',
  metadataBase: new URL('https://bhoottech.com'),
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://bhoottech.com',
    title: 'Bhoot Tech — Web Design & Development',
    description:
      'Invisible Complexity. Visible Impact. We build fast, modern, scalable digital experiences for ambitious businesses.',
    siteName: 'Bhoot Tech',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Bhoot Tech — Web Design & Development',
    description:
      'Invisible Complexity. Visible Impact. Fast, modern, and scalable web solutions.',
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
