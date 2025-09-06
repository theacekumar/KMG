'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useLanguage } from '@/context/language-provider';

export default function MapPage() {
  const { t } = useLanguage();

  return (
    <div className="container mx-auto max-w-7xl p-4 md:p-8">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl font-headline">{t.map.title}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-center h-96 bg-muted rounded-md">
            <p className="text-muted-foreground">Map will be available soon.</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
