
'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, Map, Info, Menu, Ticket, FileText, ShieldCheck } from 'lucide-react';
import { useLanguage } from '@/context/language-provider';
import { cn } from '@/lib/utils';
import LanguageToggle from './language-toggle';
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover';
import { Button } from './ui/button';
import { Separator } from './ui/separator';

export default function MobileNav() {
  const pathname = usePathname();
  const { t } = useLanguage();

  const mainNavItems = [
    { href: '/', label: t.nav.home, icon: <Home className="w-5 h-5" /> },
    { href: '/map', label: t.nav.map, icon: <Map className="w-5 h-5" /> },
    { href: '/smart-card', label: t.nav.smartCard, icon: <Ticket className="w-5 h-5" /> },
    { href: '/about', label: t.nav.about, icon: <Info className="w-5 h-5" /> },
  ];

  const menuItems = [
     { href: '/privacy-policy', label: t.nav.privacyPolicy, icon: <ShieldCheck className="w-4 h-4" /> },
    { href: '/terms-and-conditions', label: t.nav.termsAndConditions, icon: <FileText className="w-4 h-4" /> },
  ]

  return (
    <div className="fixed bottom-0 left-0 z-50 w-full h-16 border-t bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 md:hidden">
      <div className="grid h-full grid-cols-5 mx-auto font-medium">
        {mainNavItems.map((item) => (
          <Link
            href={item.href}
            key={item.href}
            className={cn(
              'inline-flex flex-col items-center justify-center px-5 hover:bg-muted',
              pathname === item.href ? 'text-primary' : 'text-muted-foreground'
            )}
          >
            {item.icon}
            <span className="text-xs">{item.label}</span>
          </Link>
        ))}
        <Popover>
          <PopoverTrigger asChild>
            <button
              type="button"
              className="inline-flex flex-col items-center justify-center px-5 text-muted-foreground hover:bg-muted"
            >
              <Menu className="w-5 h-5" />
              <span className="text-xs">Menu</span>
            </button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-4 mb-2">
            <div className="flex flex-col space-y-4">
               <LanguageToggle />
               <Separator />
                <nav className="flex flex-col space-y-2">
                 {menuItems.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      className="flex items-center space-x-2 text-sm text-muted-foreground hover:text-primary"
                    >
                      {item.icon}
                      <span>{item.label}</span>
                    </Link>
                  ))}
                </nav>
            </div>
          </PopoverContent>
        </Popover>
      </div>
    </div>
  );
}
