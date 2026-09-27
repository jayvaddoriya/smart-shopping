'use client';

import React from 'react';
import Link from 'next/link';
import { Group, Box, Text, ThemeIcon } from '@mantine/core';
import { IconShoppingBagCheck, IconSparkles } from '@tabler/icons-react';

interface LogoProps {
  size?: 'sm' | 'md' | 'lg';
  isFooter?: boolean;
}

export function Logo({ size = 'md', isFooter = false }: LogoProps) {
  const isLarge = size === 'lg';
  const iconSize = isLarge ? 28 : size === 'sm' ? 20 : 24;

  return (
    <Link href="/" style={{ textDecoration: 'none', display: 'inline-flex', alignItems: 'center' }}>
      <Group gap={8} wrap="nowrap" align="center">
        {/* Modern Brand Icon */}
        <Box
          style={{
            width: isLarge ? 42 : 36,
            height: isLarge ? 42 : 36,
            borderRadius: '10px',
            background: 'linear-gradient(135deg, #9f2089 0%, #d73fa7 50%, #ffc200 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 4px 12px rgba(159, 32, 137, 0.25)',
          }}
        >
          <IconShoppingBagCheck size={iconSize} color="#ffffff" stroke={2.2} />
        </Box>

        {/* Brand Text */}
        <Box style={{ lineHeight: 1 }}>
          <Group gap={3} align="baseline" wrap="nowrap">
            <Text
              fw={900}
              size={isLarge ? '26px' : '22px'}
              style={{
                letterSpacing: '-0.5px',
                color: isFooter ? '#ffffff' : '#9f2089',
                fontFamily: 'inherit',
              }}
            >
              SMART
            </Text>
            <Text
              fw={900}
              size={isLarge ? '26px' : '22px'}
              style={{
                letterSpacing: '-0.5px',
                color: isFooter ? '#ffc200' : '#222222',
                fontFamily: 'inherit',
              }}
            >
              SHOPPING
            </Text>
            <Box
              style={{
                backgroundColor: '#ffc200',
                color: '#000000',
                fontSize: '9px',
                fontWeight: 800,
                padding: '2px 5px',
                borderRadius: '4px',
                textTransform: 'uppercase',
                letterSpacing: '0.5px',
                marginLeft: '2px',
              }}
            >
              PRO
            </Box>
          </Group>
          <Text
            size="9px"
            fw={700}
            c={isFooter ? 'gray.4' : 'dimmed'}
            style={{ letterSpacing: '0.8px', textTransform: 'uppercase', marginTop: '2px' }}
          >
            India&apos;s Smart Value Store
          </Text>
        </Box>
      </Group>
    </Link>
  );
}
