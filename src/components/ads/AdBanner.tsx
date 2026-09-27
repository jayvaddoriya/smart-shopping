'use client';

import React, { useEffect, useRef, useState } from 'react';
import { Box, Text, Group, Badge, Paper } from '@mantine/core';
import { IconSparkles, IconExternalLink } from '@tabler/icons-react';
import { ADS_CONFIG, AdSlotKey } from '@/config/adsConfig';

interface AdBannerProps {
  slotKey: AdSlotKey;
  format?: 'auto' | 'horizontal' | 'rectangle' | 'in-feed';
  responsive?: boolean;
  className?: string;
}

export function AdBanner({
  slotKey,
  format = 'auto',
  responsive = true,
  className = '',
}: AdBannerProps) {
  const adRef = useRef<HTMLDivElement>(null);
  const [adLoaded, setAdLoaded] = useState(false);
  const slotId = ADS_CONFIG.slots[slotKey] || '1770310380490-0';

  useEffect(() => {
    if (!ADS_CONFIG.enabled) return;

    try {
      if (typeof window !== 'undefined') {
        const adsbygoogle = (window as unknown as { adsbygoogle?: unknown[] }).adsbygoogle || [];
        (window as unknown as { adsbygoogle?: unknown[] }).adsbygoogle = adsbygoogle;
        adsbygoogle.push({});
        setAdLoaded(true);
      }
    } catch (e) {
      // AdSense script may be blocked by ad blocker
      console.debug('AdSense notice:', e);
    }
  }, [slotKey]);

  if (!ADS_CONFIG.enabled) {
    return null;
  }

  // Fallback sponsored card
  const renderFallback = () => {
    if (!ADS_CONFIG.showFallbacks) return null;

    return (
      <Paper
        withBorder
        p="sm"
        radius="md"
        style={{
          background: 'linear-gradient(135deg, #fff9fb 0%, #fef3f9 100%)',
          borderColor: '#f0c5e7',
          textAlign: 'center',
          position: 'relative',
          overflow: 'hidden',
          cursor: 'pointer',
        }}
        onClick={() => {
          window.open('https://shopping99.in/category/tranding-sale', '_blank');
        }}
      >
        <Group justify="space-between" mb={4}>
          <Badge size="xs" variant="light" color="pink" leftSection={<IconSparkles size={10} />}>
            Sponsored Ad
          </Badge>
          <Text size="xs" c="dimmed">
            Ads by Google
          </Text>
        </Group>

        <Box py={8}>
          <Text fw={700} size="sm" c="#9f2089">
            🔥 Maha Dhamaka Festival Sale - Up to 85% OFF!
          </Text>
          <Text size="xs" c="dimmed" mt={2}>
            Exclusive deals on Fashion, Accessories & Smart Tech. Free Cash on Delivery!
          </Text>
        </Box>

        <Group justify="center" gap={4}>
          <Text size="xs" fw={600} c="#9f2089">
            Shop Trending Offers Now
          </Text>
          <IconExternalLink size={12} color="#9f2089" />
        </Group>
      </Paper>
    );
  };

  return (
    <Box
      ref={adRef}
      className={`ad-container ad-slot-${slotKey} ${className}`}
      my="sm"
      style={{
        minHeight: format === 'horizontal' ? '60px' : '90px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        maxWidth: '100%',
        overflow: 'hidden',
      }}
    >
      {/* Real Google AdSense Unit */}
      {ADS_CONFIG.client && (
        <ins
          className="adsbygoogle"
          style={{
            display: 'block',
            width: '100%',
            textAlign: 'center',
            minHeight: format === 'horizontal' ? '60px' : '90px',
          }}
          data-ad-client={ADS_CONFIG.client}
          data-ad-slot={slotId}
          data-ad-format={format === 'in-feed' ? 'fluid' : format}
          data-full-width-responsive={responsive ? 'true' : 'false'}
        />
      )}

      {/* Fallback Display if AdSense is pending or in preview */}
      {renderFallback()}
    </Box>
  );
}
