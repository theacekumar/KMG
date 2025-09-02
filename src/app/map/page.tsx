import Image from 'next/image';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Translations } from '@/lib/translations';

export default function MapPage() {
  const t = Translations.en;

  return (
    <div className="container mx-auto max-w-7xl p-4 md:p-8">
      <Card className="overflow-hidden">
        <CardHeader>
          <CardTitle className="text-2xl font-headline">{t.map.title}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="w-full h-[70vh] md:h-[80vh] border rounded-lg overflow-auto bg-muted/30 flex items-center justify-center">
            <div className="relative" style={{ width: '1200px', height: '900px' }}>
                <Image
                    src="https://i.ibb.co/bF9gV0d/kolkata-metro-route-map.png"
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
