import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.kolkatametroguide.app',
  appName: 'Kolkata Metro Guide',
  webDir: 'out',
  bundledWebRuntime: false,
  server: {
    androidScheme: 'https'
  },
  android: {
    // Ensuring we target the latest SDK versions
    compileSdkVersion: 35,
    targetSdkVersion: 35,
    minSdkVersion: 24,
    buildOptions: {
      releaseType: 'AAB'
    }
  }
};

export default config;
