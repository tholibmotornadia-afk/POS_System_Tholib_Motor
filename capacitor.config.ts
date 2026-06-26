import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.posnext.app',
  appName: 'Nadia Tholib Motor',
  webDir: 'public',
  server: {
    url: 'https://pos-system-tholib-motor.vercel.app/',
    cleartext: true,
    errorPath: 'error.html'
  }
};

export default config;
