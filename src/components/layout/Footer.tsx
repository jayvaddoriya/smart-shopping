'use client';

import React from 'react';
import Link from 'next/link';
import { Box, Container, Grid, Stack, Text, Group, Divider } from '@mantine/core';
import {
  IconMail,
  IconShieldCheck,
  IconTruckDelivery,
  IconClock,
  IconHeart,
} from '@tabler/icons-react';
import { AdBanner } from '@/components/ads/AdBanner';

export function Footer() {
  return (
    <Box component="footer" style={{ background: '#1a1a1a', color: '#ffffff', marginTop: '40px' }} pt="xl" pb="md">
      <Container size="xl">
        {/* Footer Ad Banner */}
        <Box mb="xl">
          <AdBanner slotKey="footer" format="horizontal" />
        </Box>

        {/* Value Proposition Highlights */}
        <Grid mb="xl" py="md" style={{ borderTop: '1px solid #2e2e2e', borderBottom: '1px solid #2e2e2e' }}>
          <Grid.Col span={{ base: 6, md: 3 }}>
            <Group gap="sm" wrap="nowrap">
              <IconTruckDelivery size={28} color="#ffc200" />
              <Box>
                <Text size="sm" fw={700}>
                  Free Shipping
                </Text>
                <Text size="xs" c="dimmed">
                  On all prepaid & COD orders
                </Text>
              </Box>
            </Group>
          </Grid.Col>
          <Grid.Col span={{ base: 6, md: 3 }}>
            <Group gap="sm" wrap="nowrap">
              <IconShieldCheck size={28} color="#00b894" />
              <Box>
                <Text size="sm" fw={700}>
                  100% Assured
                </Text>
                <Text size="xs" c="dimmed">
                  Quality checked products
                </Text>
              </Box>
            </Group>
          </Grid.Col>
          <Grid.Col span={{ base: 6, md: 3 }}>
            <Group gap="sm" wrap="nowrap">
              <IconClock size={28} color="#9f2089" />
              <Box>
                <Text size="sm" fw={700}>
                  Fast Dispatch
                </Text>
                <Text size="xs" c="dimmed">
                  Dispatched within 24 hours
                </Text>
              </Box>
            </Group>
          </Grid.Col>
          <Grid.Col span={{ base: 6, md: 3 }}>
            <Group gap="sm" wrap="nowrap">
              <IconHeart size={28} color="#ff7675" />
              <Box>
                <Text size="sm" fw={700}>
                  Happy Customers
                </Text>
                <Text size="xs" c="dimmed">
                  10,000+ satisfied buyers
                </Text>
              </Box>
            </Group>
          </Grid.Col>
        </Grid>

        {/* Main Footer Links */}
        <Grid mb="xl" gutter="xl">
          {/* Brand & About */}
          <Grid.Col span={{ base: 12, md: 4 }}>
            <Text fw={900} size="xl" c="#ffffff" mb="xs">
              SHOPPING<span style={{ color: '#ffc200' }}>99</span>
            </Text>
            <Text size="xs" c="gray.4" lh={1.6} mb="md">
              Shopping99 is India’s premier online discount shopping portal, delivering the highest value deals in Indian Ethnic Dresses, Co-ord Sets, Smart Watches, Accessories, and Daily Essentials directly to your doorstep.
            </Text>
            <Group gap="xs">
              <IconMail size={16} color="#ffc200" />
              <Text size="xs" c="gray.3" component="a" href="mailto:contact@shopping99.in">
                contact@shopping99.in
              </Text>
            </Group>
          </Grid.Col>

          {/* Quick Links / About */}
          <Grid.Col span={{ base: 6, md: 4 }}>
            <Text fw={700} size="sm" mb="md" c="#ffffff">
              About & Support
            </Text>
            <Stack gap={8}>
              <Link href="/about-us">
                <Text size="xs" c="gray.4" style={{ '&:hover': { color: '#00b894' } }}>
                  About Us
                </Text>
              </Link>
              <Link href="/contact-us">
                <Text size="xs" c="gray.4">
                  Contact Us
                </Text>
              </Link>
              <Link href="/faqs">
                <Text size="xs" c="gray.4">
                  Frequently Asked Questions (FAQs)
                </Text>
              </Link>
              <Link href="/cart">
                <Text size="xs" c="gray.4">
                  Your Cart
                </Text>
              </Link>
            </Stack>
          </Grid.Col>

          {/* Policies */}
          <Grid.Col span={{ base: 6, md: 4 }}>
            <Text fw={700} size="sm" mb="md" c="#ffffff">
              Our Policies
            </Text>
            <Stack gap={8}>
              <Link href="/terms-and-conditions">
                <Text size="xs" c="gray.4">
                  Terms & Conditions
                </Text>
              </Link>
              <Link href="/privacy-policy">
                <Text size="xs" c="gray.4">
                  Privacy Policy
                </Text>
              </Link>
              <Link href="/refund_returns">
                <Text size="xs" c="gray.4">
                  Return & Refund Policy
                </Text>
              </Link>
              <Link href="/cookie-policy">
                <Text size="xs" c="gray.4">
                  Cookie Policy
                </Text>
              </Link>
              <Link href="/disclosure-policy">
                <Text size="xs" c="gray.4">
                  Disclosure Policy
                </Text>
              </Link>
              <Link href="/disclaimer">
                <Text size="xs" c="gray.4">
                  Disclaimer
                </Text>
              </Link>
            </Stack>
          </Grid.Col>
        </Grid>

        <Divider color="#2e2e2e" mb="md" />

        {/* Bottom Bar */}
        <Group justify="space-between" align="center">
          <Text size="xs" c="gray.5">
            © {new Date().getFullYear()} <b>shopping99.in</b> | All Rights Reserved.
          </Text>
          <Text size="xs" c="gray.6">
            Designed for high performance & mobile responsiveness
          </Text>
        </Group>
      </Container>
    </Box>
  );
}
