import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { cn } from '@/lib/utils';
import { Toaster } from '@/components/ui/toaster';
import { LanguageProvider } from '@/context/language-provider';
import AppHeader from '@/components/app-header';
import MobileNav from '@/components/mobile-nav';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });

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
      <body className={cn('font-body antialiased min-h-screen bg-background flex flex-col', inter.variable)}>
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
