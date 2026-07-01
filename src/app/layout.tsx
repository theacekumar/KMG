import type { Metadata, Viewport } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { cn } from '@/lib/utils';
import { Toaster } from '@/components/ui/toaster';
import { LanguageProvider } from '@/context/language-provider';
import AppHeader from '@/components/app-header';
import MobileNav from '@/components/mobile-nav';
import { LoadingBar } from '@/components/loading-bar';
import { Suspense } from 'react';
import { PwaRegistration } from '@/components/pwa-registration';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter', display: 'swap' });

export const metadata: Metadata = {
  title: 'Kolkata Metro Guide',
  description: 'Your guide to the Kolkata Metro. Find routes, fares, and station information.',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title: 'Kolkata Metro Guide',
  },
  formatDetection: {
    telephone: false,
  },
};

export const viewport: Viewport = {
  themeColor: '#3b82f6',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={cn('font-body antialiased min-h-screen bg-background flex flex-col', inter.variable)}>
        <Suspense>
          <LoadingBar />
        </Suspense>
        <LanguageProvider>
          <PwaRegistration />
          <AppHeader />
          <main className="flex-grow">{children}</main>
          <MobileNav />
          <Toaster />
        </LanguageProvider>
      </body>
    </html>
  );
}
