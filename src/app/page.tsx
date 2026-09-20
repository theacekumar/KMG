'use client';

import * as React from 'react';
import SearchForm from "@/components/search-form";
import { useLanguage } from "@/context/language-provider";
import RouteResult from '@/components/route-result';
import AdBanner from '@/components/ad-banner';

export default function Home() {
  const { t } = useLanguage();
  const [route, setRoute] = React.useState<{ from: string; to: string } | null>(null);

  const handleSearch = (from: string, to: string) => {
    setRoute({ from, to });
  };

  return (
    <div className="flex-grow flex flex-col items-center p-4">
        <div className="z-10 text-center mb-8">
            <h1 className="text-4xl md:text-5xl font-headline font-bold text-primary tracking-tight">
                {t.appName}
            </h1>
            <p className="mt-2 md:mt-4 text-lg md:text-xl text-muted-foreground">
                {t.home.subtitle}
            </p>
        </div>
        <SearchForm onSearch={handleSearch} />
        {route && (
             <div className="w-full max-w-4xl mt-8">
                <RouteResult fromId={route.from} toId={route.to} />
            </div>
        )}
        
        {/* AdMob Banner Integration */}
        <AdBanner adUnitId="ca-app-pub-7962981529644720/6885016627" />
    </div>
  );
}