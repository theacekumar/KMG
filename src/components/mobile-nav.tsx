'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, Map, Info, Menu, ShieldCheck, CreditCard } from 'lucide-react';
import { useLanguage } from '@/context/language-provider';
import { cn } from '@/lib/utils';
import LanguageToggle from './language-toggle';
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover';
import { Separator } from './ui/separator';
import { useState } from 'react';

export default function MobileNav() {
  const pathname = usePathname();
  const { t } = useLanguage();
  const [open, setOpen] = useState(false);

  const mainNavItems = [
    { href: '/', label: t.nav.home, icon: <Home className="w-5 h-5" /> },
    { href: '/smart-card', label: t.nav.smartCard, icon: <CreditCard className="w-5 h-5" /> },
    { href: '/map', label: t.nav.map, icon: <Map className="w-5 h-5" /> },
  ];

  const isMenuPageActive = pathname === '/about' || pathname === '/privacy-policy';

  return (
    <div className="fixed bottom-0 left-0 z-50 w-full h-16 border-t bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 md:hidden">
      <div className="grid h-full grid-cols-4 mx-auto font-medium">
        {mainNavItems.map((item) => (
          <Link
            href={item.href}
            key={item.href}
            className={cn(
              'inline-flex flex-col items-center justify-center px-5 hover:bg-muted transition-colors',
              pathname === item.href ? 'text-primary' : 'text-muted-foreground'
            )}
          >
            {item.icon}
            <span className="text-xs">{item.label}</span>
          </Link>
        ))}
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <button
              type="button"
              className={cn(
                'inline-flex flex-col items-center justify-center px-5 hover:bg-muted transition-colors',
                isMenuPageActive ? 'text-primary' : 'text-muted-foreground'
              )}
              aria-label="Open menu"
            >
              <Menu className="w-5 h-5" />
              <span className="text-xs">{t.nav.menu}</span>
            </button>
          </PopoverTrigger>
          <PopoverContent className="w-56 p-4 mb-2" align="end" side="top">
            <div className="flex flex-col space-y-4">
               <div className="flex items-center justify-between">
                  <span className="text-sm font-semibold">{t.nav.menu}</span>
                  <LanguageToggle />
               </div>
               <Separator />
                <nav className="flex flex-col space-y-1">
                    <Link
                      href="/about"
                      onClick={() => setOpen(false)}
                      className={cn(
                        "flex items-center space-x-3 p-2 rounded-md text-sm transition-colors hover:bg-muted",
                        pathname === '/about' ? "text-primary bg-primary/5 font-medium" : "text-muted-foreground"
                      )}
                    >
                      <Info className="w-4 h-4" />
                      <span>{t.nav.about}</span>
                    </Link>
                    <Link
                      href="/privacy-policy"
                      onClick={() => setOpen(false)}
                      className={cn(
                        "flex items-center space-x-3 p-2 rounded-md text-sm transition-colors hover:bg-muted",
                        pathname === '/privacy-policy' ? "text-primary bg-primary/5 font-medium" : "text-muted-foreground"
                      )}
                    >
                      <ShieldCheck className="w-4 h-4" />
                      <span>{t.nav.privacyPolicy}</span>
                    </Link>
                </nav>
            </div>
          </PopoverContent>
        </Popover>
      </div>
    </div>
  );
}
