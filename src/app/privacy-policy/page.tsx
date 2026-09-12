'use client';

import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Loader2 } from 'lucide-react';
import { useLanguage } from '@/context/language-provider';

export default function PrivacyPolicyRedirectPage() {
  const redirectUrl = 'https://sites.google.com/view/kolkatametroguideprivacypolicy/home';
  const { t } = useLanguage();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const timer = setTimeout(() => {
        window.location.href = redirectUrl;
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  if (!mounted) return null;

  return (
    <div className="container mx-auto max-w-4xl p-4 md:p-8">
      <Card>
        <CardHeader>
          <CardTitle className="text-3xl font-headline text-primary">{t.privacyPolicy.redirecting}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6 text-muted-foreground flex items-center justify-center py-12">
            <Loader2 className="mr-2 h-8 w-8 animate-spin" />
            <p className="text-lg">{t.privacyPolicy.pleaseWait}</p>
        </CardContent>
      </Card>
    </div>
  );
}
