'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, Map, Info, Settings, Ticket } from 'lucide-react';
import { useLanguage } from '@/context/language-provider';
import { cn } from '@/lib/utils';
import LanguageToggle from './language-toggle';
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover';
import { Button } from './ui/button';

export default function MobileNav() {
  const pathname = usePathname();
  const { t } = useLanguage();

  const navItems = [
    { href: '/', label: t.nav.home, icon: <Home className="w-5 h-5" /> },
    { href: '/map', label: t.nav.map, icon: <Map className="w-5 h-5" /> },
    { href: '/smart-card', label: t.nav.smartCard, icon: <Ticket className="w-5 h-5" /> },
    { href: '/about', label: t.nav.about, icon: <Info className="w-5 h-5" /> },
  ];

  return (
    <div className="fixed bottom-0 left-0 z-50 w-full h-16 border-t bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 md:hidden">
      <div className="grid h-full grid-cols-5 mx-auto font-medium">
        {navItems.map((item) => (
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
              <Settings className="w-5 h-5" />
              <span className="text-xs">Settings</span>
            </button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-4 mb-2">
            <LanguageToggle />
          </PopoverContent>
        </Popover>
      </div>
    </div>
  );
}
