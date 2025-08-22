import SearchForm from "@/components/search-form";
import { translations } from "@/lib/translations";
import Image from "next/image";

export default function Home() {
  const t = translations['en']; // Default to English for initial static render

  return (
    <div className="relative flex-grow flex flex-col items-center justify-center p-4 overflow-hidden">
        <Image
          src="https://placehold.co/1920x1080.png"
          alt="Kolkata Metro"
          data-ai-hint="metro train"
          layout="fill"
          objectFit="cover"
          className="absolute inset-0 z-0 opacity-20 dark:opacity-10"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/50 via-background/80 to-background z-0" />
        <div className="z-10 text-center">
            <h1 className="text-4xl md:text-6xl font-headline font-bold text-primary tracking-tight">
                Kolkata Metro Guide
            </h1>
            <p className="mt-2 md:mt-4 text-lg md:text-xl text-foreground/80">
                Plan your journey, find fares, and explore stations.
            </p>
        </div>
        <SearchForm />
    </div>
  );
}
