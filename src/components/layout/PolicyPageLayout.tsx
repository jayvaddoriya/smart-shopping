'use client';

import React from 'react';
import Link from 'next/link';
import {
  Container,
  Box,
  Title,
  Text,
  Paper,
  Breadcrumbs,
  Anchor,
  Divider,
  Group,
  Badge,
} from '@mantine/core';
import { IconChevronRight, IconFileText, IconShieldCheck } from '@tabler/icons-react';
import policiesData from '@/data/policies.json';
import { AdBanner } from '@/components/ads/AdBanner';

interface PolicyPageLayoutProps {
  slug: string;
  defaultTitle: string;
}

export function PolicyPageLayout({ slug, defaultTitle }: PolicyPageLayoutProps) {
  const policy = (policiesData as Record<string, { slug: string; title: string; content: string }>)[slug];
  const title = policy?.title || defaultTitle;
  const content = policy?.content || 'Policy details are being updated.';

  // Format content cleanly into paragraphs
  const cleanParagraphs = content
    .split('\n')
    .map((p) => p.trim())
    .filter((p) => p.length > 0 && !p.startsWith('###') && !p.startsWith('<!--') && !p.includes('boAt Airdopes') && !p.includes('Your Cart'));

  return (
    <Box py="md">
      <Container size="md">
        {/* Top Leaderboard Ad */}
        <AdBanner slotKey="topHeader" format="horizontal" />

        {/* Breadcrumbs */}
        <Breadcrumbs separator={<IconChevronRight size={14} color="#999" />} mb="md">
          <Anchor component={Link} href="/" size="xs" c="dimmed">
            Home
          </Anchor>
          <Anchor component={Link} href="/terms-and-conditions" size="xs" c="dimmed">
            Policies
          </Anchor>
          <Text size="xs" fw={700} c="#9f2089">
            {title}
          </Text>
        </Breadcrumbs>

        <Paper withBorder p="xl" radius="md" style={{ backgroundColor: '#ffffff' }}>
          <Group justify="space-between" align="center" mb="sm">
            <Group gap="xs">
              <IconFileText size={28} color="#9f2089" />
              <Title order={1} size="h3" fw={800} c="dark.8">
                {title}
              </Title>
            </Group>
            <Badge color="pink" variant="light">
              Official Policy
            </Badge>
          </Group>

          <Text size="xs" c="dimmed" mb="lg">
            shopping99.in • Operated by KVB Enterprise • Official Document
          </Text>

          <Divider mb="lg" />

          {/* Policy Text Body */}
          <Box style={{ color: '#333333', lineHeight: 1.8, fontSize: '14px' }}>
            {cleanParagraphs.map((para, idx) => {
              if (para.startsWith('# ')) {
                return (
                  <Title key={idx} order={2} size="h4" fw={700} mt="lg" mb="xs" c="#9f2089">
                    {para.replace('# ', '')}
                  </Title>
                );
              }
              if (para.startsWith('## ')) {
                return (
                  <Title key={idx} order={3} size="h5" fw={700} mt="md" mb="xs" c="dark.8">
                    {para.replace('## ', '')}
                  </Title>
                );
              }
              if (para.startsWith('Q.')) {
                return (
                  <Text key={idx} fw={700} size="sm" mt="md" c="#9f2089">
                    {para}
                  </Text>
                );
              }
              if (para.startsWith('A.')) {
                return (
                  <Text key={idx} size="sm" c="dark.6" mb="xs" pl="sm" style={{ borderLeft: '2px solid #9f2089' }}>
                    {para}
                  </Text>
                );
              }
              return (
                <Text key={idx} size="sm" mb="sm" c="dark.7">
                  {para}
                </Text>
              );
            })}
          </Box>

          {/* Strategic Ad Banner in Policy Page */}
          <Box my="xl">
            <AdBanner slotKey="belowCategories" format="horizontal" />
          </Box>

          <Box mt="xl" p="md" style={{ backgroundColor: '#fcfcfc', border: '1px solid #eee', borderRadius: '8px' }}>
            <Group gap="xs" mb={4}>
              <IconShieldCheck size={18} color="#008c00" />
              <Text size="xs" fw={700} c="dark.8">
                Questions or Concerns?
              </Text>
            </Group>
            <Text size="xs" c="dimmed">
              For any clarification regarding our policies or orders, email us directly at{' '}
              <Anchor href="mailto:contact@shopping99.in" fw={700} c="#9f2089">
                contact@shopping99.in
              </Anchor>
              . We respond within 24-48 business hours.
            </Text>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
}
