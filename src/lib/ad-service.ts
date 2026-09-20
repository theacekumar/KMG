'use client';

import { AdMob, InterstitialAdPluginEvents, AdLoadInfo } from '@capacitor-community/admob';
import { Capacitor } from '@capacitor/core';

const INTERSTITIAL_ID = 'ca-app-pub-7962981529644720/5311154464';

class AdService {
  private isInitialized = false;
  private searchCount = 0;
  private isInterstitialLoading = false;
  private isInterstitialReady = false;

  constructor() {
    if (typeof window !== 'undefined' && Capacitor.getPlatform() !== 'web') {
      this.init();
      
      AdMob.addListener(InterstitialAdPluginEvents.Loaded, (info: AdLoadInfo) => {
        this.isInterstitialReady = true;
        this.isInterstitialLoading = false;
      });

      AdMob.addListener(InterstitialAdPluginEvents.FailedToLoad, () => {
        this.isInterstitialReady = false;
        this.isInterstitialLoading = false;
        // Retry preloading after a delay
        setTimeout(() => this.preloadInterstitial(), 30000);
      });

      AdMob.addListener(InterstitialAdPluginEvents.Dismissed, () => {
        this.isInterstitialReady = false;
        this.preloadInterstitial();
      });
    }
  }

  async init() {
    if (this.isInitialized || Capacitor.getPlatform() === 'web') return;
    try {
      await AdMob.initialize();
      this.isInitialized = true;
      this.preloadInterstitial();
    } catch (e) {
      console.error('AdMob init error:', e);
    }
  }

  async preloadInterstitial() {
    if (this.isInterstitialLoading || this.isInterstitialReady || Capacitor.getPlatform() === 'web') return;
    
    this.isInterstitialLoading = true;
    try {
      await AdMob.prepareInterstitial({
        adId: INTERSTITIAL_ID,
        isTesting: false,
      });
    } catch (e) {
      this.isInterstitialLoading = false;
      console.error('Interstitial preload error:', e);
    }
  }

  async handleRouteSearchAd() {
    if (Capacitor.getPlatform() === 'web') return;

    this.searchCount++;

    // Logic: 
    // 1. Never on the 1st search.
    // 2. Never on the 2nd search.
    // 3. Show on every 3rd search (3, 6, 9...).
    if (this.searchCount > 1 && this.searchCount % 3 === 0) {
      if (this.isInterstitialReady) {
        try {
          await AdMob.showInterstitial();
        } catch (e) {
          console.error('Error showing interstitial:', e);
        }
      } else {
        // If not ready, try preloading for next time
        this.preloadInterstitial();
      }
    }
  }
}

export const adService = new AdService();