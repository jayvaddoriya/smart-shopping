'use client';

import Script from 'next/script';
import { ADS_CONFIG } from '@/config/adsConfig';

export function AdSenseScript() {
  if (!ADS_CONFIG.enabled || !ADS_CONFIG.client) {
    return null;
  }

  return (
    <Script
      id="adsbygoogle-init"
      strategy="afterInteractive"
      src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${ADS_CONFIG.client}`}
      crossOrigin="anonymous"
    />
  );
}
