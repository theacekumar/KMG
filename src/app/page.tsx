
'use client';

import SearchForm from "@/components/search-form";
import { useLanguage } from "@/context/language-provider";

export default function Home() {
  const { t } = useLanguage();

  return (
    <div className="flex-grow flex flex-col items-center justify-center p-4">
        <div className="z-10 text-center mb-8">
            <h1 className="text-4xl md:text-5xl font-headline font-bold text-primary tracking-tight">
                {t.appName}
            </h1>
            <p className="mt-2 md:mt-4 text-lg md:text-xl text-muted-foreground">
                {t.home.subtitle}
            </p>
        </div>
        <SearchForm />
    </div>
  );
}
