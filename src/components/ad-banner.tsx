'use client';

import React, { useEffect } from 'react';
import { AdMob, BannerAdPosition, BannerAdSize } from '@capacitor-community/admob';
import { Capacitor } from '@capacitor/core';
import { adService } from '@/lib/ad-service';

interface AdBannerProps {
  adUnitId: string;
}

export default function AdBanner({ adUnitId }: AdBannerProps) {
  useEffect(() => {
    // Only run on native platforms
    if (Capacitor.getPlatform() === 'web') return;

    const showBanner = async () => {
      try {
        // Ensure initialized via shared service
        await adService.init();
        
        // Show banner at the bottom, above the fixed navigation
        // Bottom nav height is 16 units (64px)
        await AdMob.showBanner({
          adId: adUnitId,
          adSize: BannerAdSize.ADAPTIVE_BANNER,
          position: BannerAdPosition.BOTTOM_CENTER,
          margin: 64, // Space for the bottom navigation bar
          isTesting: false
        });
      } catch (error) {
        console.error('Banner show failed:', error);
      }
    };

    showBanner();

    // Clean up: hide banner when component unmounts
    return () => {
      if (Capacitor.getPlatform() !== 'web') {
        AdMob.hideBanner().catch(err => console.error('Failed to hide banner:', err));
      }
    };
  }, [adUnitId]);

  // Return a clean spacer to prevent content from being covered by the native banner
  // No borders or "Advertisement" text as requested
  return (
    <div className="w-full h-24 mt-8" aria-hidden="true" />
  );
}