'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useLanguage } from '@/context/language-provider';
import Image from 'next/image';

export default function MapPage() {
  const { t } = useLanguage();

  return (
    <div className="container mx-auto max-w-7xl p-4 md:p-8">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl font-headline">{t.map.title}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="relative w-full h-[600px] bg-muted rounded-md">
             <Image 
                src="https://i.ibb.co/bF9gYq2/kolkata-metro-map.png" 
                alt="Kolkata Metro Map" 
                fill
                style={{objectFit: "contain"}}
                data-ai-hint="metro map"
             />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
