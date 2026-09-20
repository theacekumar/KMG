import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'app.kmg.app',
  appName: 'Kolkata Metro Guide',
  webDir: 'out',
  bundledWebRuntime: false,
  server: {
    androidScheme: 'https'
  },
  android: {
    // Target Android 16 (API 36) and ensure 16 KB page alignment compatibility
    compileSdkVersion: 36,
    targetSdkVersion: 36,
    minSdkVersion: 24,
    buildOptions: {
      releaseType: 'AAB'
    }
  }
};

export default config;