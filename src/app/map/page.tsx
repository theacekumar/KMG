'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useLanguage } from '@/context/language-provider';
import dynamic from 'next/dynamic';
import { Skeleton } from '@/components/ui/skeleton';
import type { Metadata } from 'next';

// This metadata will be resolved on the client side
export const metadata: Metadata = {
  title: 'Metro Map | Kolkata Metro Guide',
  description: 'Interactive map of the Kolkata Metro network with all lines and stations. Supports zoom and pan for easy navigation.',
};


const MetroMap = dynamic(() => import('@/components/metro-map'), {
  ssr: false,
  loading: () => (
    <div className="w-full h-[70vh] md:h-[80vh] border rounded-lg overflow-hidden bg-muted/30 flex items-center justify-center p-4">
      <div className="w-full h-full flex flex-col items-center justify-center gap-4">
        <Skeleton className="h-8 w-1/4" />
        <Skeleton className="w-full h-full" />
      </div>
    </div>
  ),
});

export default function MapPage() {
  const { t } = useLanguage();

  return (
    <div className="container mx-auto max-w-7xl p-4 md:p-8">
      <Card className="overflow-hidden">
        <CardHeader>
          <CardTitle className="text-2xl font-headline">{t.map.title}</CardTitle>
        </CardHeader>
        <CardContent>
          <MetroMap />
        </CardContent>
      </Card>
    </div>
  );
}
