import { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Kolkata Metro Guide',
    short_name: 'Metro Guide',
    description: 'Your guide to the Kolkata Metro. Find routes, fares, and station information.',
    start_url: '/',
    display: 'standalone',
    background_color: '#ffffff',
    theme_color: '#3b82f6',
    icons: [
      {
        src: 'https://placehold.co/192x192/3b82f6/ffffff?text=Metro',
        sizes: '192x192',
        type: 'image/png',
      },
      {
        src: 'https://placehold.co/512x512/3b82f6/ffffff?text=Metro',
        sizes: '512x512',
        type: 'image/png',
      },
    ],
  };
}
