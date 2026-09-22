import { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'YJ DEVELOPERS — Invisible Complexity. Visible Impact.',
    short_name: 'YJ DEVELOPERS',
    description:
      'Fast, modern and scalable websites, mobile apps and video editing for ambitious businesses.',
    start_url: '/',
    display: 'standalone',
    background_color: '#ffffff',
    theme_color: '#7c3aed',
    icons: [
      {
        src: '/black-logo.png',
        sizes: '192x192',
        type: 'image/png',
      },
      {
        src: '/black-logo.png',
        sizes: '512x512',
        type: 'image/png',
      },
    ],
  };
}
