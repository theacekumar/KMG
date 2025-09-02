'use client';

import Image from 'next/image';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useLanguage } from '@/context/language-provider';

export default function MapPage() {
  const { t } = useLanguage();

  return (
    <div className="container mx-auto max-w-7xl p-4 md:p-8">
      <Card className="overflow-hidden">
        <CardHeader>
          <CardTitle className="text-2xl font-headline">{t.map.title}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="w-full h-[70vh] md:h-[80vh] border rounded-lg overflow-auto bg-muted/30 flex items-center justify-center">
            <div className="relative" style={{ width: '1200px', height: '1200px' }}>
                <Image
                    src="https://i.ibb.co/Y7Nq25F/kolkata-metro-map.png"
                    alt="Kolkata Metro Map"
                    data-ai-hint="metro map"
                    layout="fill"
                    objectFit="contain"
                />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
