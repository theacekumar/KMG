'use client';

import React from 'react';
import MetroMapSvg from '@/components/metro-map-svg';
import { useLanguage } from '@/context/language-provider';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { MapPin, Layers } from 'lucide-react';

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
              <CardDescription className="text-base text-muted-foreground mt-1">
                True Scalable Vector Graphics (SVG) Recreation of the Schematic Route Network
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-4 bg-muted/20">
          <div className="bg-white rounded-xl p-2 md:p-4 border shadow-sm">
            <MetroMapSvg />
          </div>
        </CardContent>
      </Card>

      {/* Responsive Usage Help Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card className="border p-4 bg-card shadow-sm flex items-start gap-4">
          <div className="p-2 rounded-lg bg-yellow-500/10 text-yellow-600 shrink-0">
            <MapPin className="h-5 w-5" />
          </div>
          <div>
            <h4 className="font-semibold text-base text-foreground">Interactive Tracing</h4>
            <p className="text-sm text-muted-foreground mt-1">
              Tap any station circle marker or labeled node to immediately view live lines, interchanges, or terminal relationships.
            </p>
          </div>
        </Card>

        <Card className="border p-4 bg-card shadow-sm flex items-start gap-4">
          <div className="p-2 rounded-lg bg-blue-500/10 text-blue-600 shrink-0">
            <Layers className="h-5 w-5" />
          </div>
          <div>
            <h4 className="font-semibold text-base text-foreground">Offline Support Capable</h4>
            <p className="text-sm text-muted-foreground mt-1">
              This layout vector relies completely on local SVG geometry code, enabling instant high-definition rendering offline.
            </p>
          </div>
        </Card>
      </div>
    </div>
  );
}
