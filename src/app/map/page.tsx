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
          <div className="w-full h-[70vh] md:h-[80vh] border rounded-lg overflow-auto bg-muted/30">
            <div className="w-fit h-fit" style={{ minWidth: '1200px', minHeight: '900px' }}>
                <Image
                    src="https://placehold.co/1200x900.png"
                    alt="Kolkata Metro Map"
                    data-ai-hint="kolkata metro map"
                    width={1200}
                    height={900}
                    className="object-contain"
                />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
