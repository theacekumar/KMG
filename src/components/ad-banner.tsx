'use client';

import React, { useEffect } from 'react';
import { AdMob, BannerAdPosition, BannerAdSize } from '@capacitor-community/admob';
import { Capacitor } from '@capacitor/core';

interface AdBannerProps {
  adUnitId: string;
}

export default function AdBanner({ adUnitId }: AdBannerProps) {
  useEffect(() => {
    // Only run on native platforms
    if (Capacitor.getPlatform() === 'web') return;

    const initializeAdMob = async () => {
      try {
        await AdMob.initialize();
        
        // Show banner at the bottom, above the fixed navigation
        // Bottom nav height is 16 units (64px)
        await AdMob.showBanner({
          adId: adUnitId,
          adSize: BannerAdSize.ADAPTIVE_BANNER,
          position: BannerAdPosition.BOTTOM_CENTER,
          margin: 64, // Space for the bottom navigation bar
          isTesting: false // Set to true during manual testing if needed
        });
      } catch (error) {
        console.error('AdMob initialization or banner show failed:', error);
      }
    };

    initializeAdMob();

    // Clean up: hide banner when component unmounts or user navigates
    return () => {
      if (Capacitor.getPlatform() !== 'web') {
        AdMob.hideBanner().catch(err => console.error('Failed to hide banner:', err));
      }
    };
  }, [adUnitId]);

  return (
    <div className="w-full h-24 flex items-center justify-center bg-muted/5 mt-8 border-y border-dashed border-muted-foreground/10" aria-hidden="true">
       {/* Placeholder for the native ad view that is rendered by the Android system */}
       <span className="text-xs text-muted-foreground uppercase tracking-widest opacity-30">Advertisement</span>
    </div>
  );
}