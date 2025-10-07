'use client';

import { useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Loader2 } from 'lucide-react';
import { useLanguage } from '@/context/language-provider';

export default function MapRedirectPage() {
  const redirectUrl = 'https://kolkatametroguide-privacypolicy.my.canva.site/map';
  const { t } = useLanguage();

  useEffect(() => {
    window.location.href = redirectUrl;
  }, []);

  return (
    <div className="container mx-auto max-w-4xl p-4 md:p-8">
      <Card>
        <CardHeader>
          <CardTitle className="text-3xl font-headline text-primary">Redirecting to Metro Map</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6 text-muted-foreground flex items-center justify-center py-12">
            <Loader2 className="mr-2 h-8 w-8 animate-spin" />
            <p className="text-lg">Please wait while we redirect you to our interactive map...</p>
        </CardContent>
      </Card>
    </div>
  );
}
