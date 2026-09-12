
'use client';

import React from 'react';
import MetroMapSvg from '@/components/metro-map-svg';
import { useLanguage } from '@/context/language-provider';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Layers } from 'lucide-react';

export default function MapPage() {
  const { t } = useLanguage();

  return (
    <div className="container mx-auto max-w-5xl p-4 md:p-8 space-y-6">
      <Card className="border-2 shadow-xl overflow-hidden">
        <CardHeader className="bg-gradient-to-r from-primary/10 via-background to-background border-b pb-6">
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-xl bg-primary text-white shadow-md">
              <Layers className="h-6 w-6" />
            </div>
            <div>
              <CardTitle className="text-3xl font-headline font-bold text-primary tracking-tight">
                {t.map?.title || "Kolkata Metro Map"}
              </CardTitle>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-4 bg-muted/20">
          <div className="bg-white rounded-xl p-2 md:p-4 border shadow-sm">
            <MetroMapSvg />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
