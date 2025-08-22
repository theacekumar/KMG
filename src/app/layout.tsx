import type { Metadata } from 'next';
import './globals.css';
import { cn } from '@/lib/utils';
import { Toaster } from '@/components/ui/toaster';
import { LanguageProvider } from '@/context/language-provider';
import AppHeader from '@/components/app-header';
import MobileNav from '@/components/mobile-nav';

export const metadata: Metadata = {
  title: 'Kolkata Metro Guide',
  description: 'Your guide to the Kolkata Metro. Find routes, fares, and station information.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=PT+Sans:ital,wght@0,400;0,700;1,400;1,700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className={cn('font-body antialiased min-h-screen bg-background flex flex-col')}>
        <LanguageProvider>
          <AppHeader />
          <main className="flex-grow">{children}</main>
          <MobileNav />
          <Toaster />
        </LanguageProvider>
      </body>
    </html>
  );
}
