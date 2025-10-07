
'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, Map, Info, Train, Ticket, ShieldCheck } from 'lucide-react';

import { useLanguage } from '@/context/language-provider';
import { cn } from '@/lib/utils';
import LanguageToggle from './language-toggle';

export default function AppHeader() {
  const pathname = usePathname();
  const { t } = useLanguage();

  const navItems = [
    { href: '/', label: t.nav.home, icon: <Home className="w-4 h-4" /> },
    { href: '/smart-card', label: t.nav.smartCard, icon: <Ticket className="w-4 h-4" /> },
    { href: '/about', label: t.nav.about, icon: <Info className="w-4 h-4" /> },
  ];

  return (
    <header className="sticky top-0 z-50 hidden w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 md:block">
      <div className="container flex h-14 items-center">
        <Link href="/" className="mr-6 flex items-center space-x-2">
          <Train className="h-6 w-6 text-primary" />
          <span className="font-bold">{t.appName}</span>
        </Link>
        <nav className="flex items-center space-x-4 text-sm font-medium">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                'transition-colors hover:text-primary',
                pathname === item.href ? 'text-primary' : 'text-muted-foreground'
              )}
            >
              {item.label}
            </Link>
          ))}
            <a
              href="https://kolkatametroguide-privacypolicy.my.canva.site/map"
              target="_blank"
              rel="noopener noreferrer"
              className="transition-colors hover:text-primary text-muted-foreground"
            >
              {t.nav.map}
            </a>
            <a
              href="https://sites.google.com/view/kolkatametroguideprivacypolicy/home"
              target="_blank"
              rel="noopener noreferrer"
              className="transition-colors hover:text-primary text-muted-foreground"
            >
              {t.nav.privacyPolicy}
            </a>
        </nav>
        <div className="flex flex-1 items-center justify-end">
          <LanguageToggle />
        </div>
      </div>
    </header>
  );
}
