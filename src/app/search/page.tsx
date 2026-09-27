'use client';

import React, { Suspense, useState } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import {
  Container,
  Box,
  Title,
  Text,
  TextInput,
  Group,
  Badge,
  Breadcrumbs,
  Anchor,
  Button,
} from '@mantine/core';
import { IconSearch, IconChevronRight, IconArrowRight } from '@tabler/icons-react';
import productsData from '@/data/products.json';
import { ProductGrid } from '@/components/product/ProductGrid';
import { AdBanner } from '@/components/ads/AdBanner';
import { Product } from '@/types';

function SearchContent() {
  const searchParams = useSearchParams();
  const initialQuery = searchParams.get('q') || '';
  const [query, setQuery] = useState(initialQuery);
  const [visibleCount, setVisibleCount] = useState(24);

  const allProducts = productsData as Product[];

  const filteredProducts = query.trim()
    ? allProducts.filter((p) => {
        const q = query.toLowerCase();
        return (
          p.name.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q) ||
          (p.description && p.description.toLowerCase().includes(q))
        );
      })
    : allProducts;

  const displayedProducts = filteredProducts.slice(0, visibleCount);
  const hasMore = visibleCount < filteredProducts.length;

  return (
    <Box py="md">
      <Container size="xl">
        <AdBanner slotKey="topHeader" format="horizontal" />

        <Breadcrumbs separator={<IconChevronRight size={14} color="#999" />} mb="md">
          <Anchor component={Link} href="/" size="xs" c="dimmed">
            Home
          </Anchor>
          <Text size="xs" fw={700} c="#9f2089">
            Search Results
          </Text>
        </Breadcrumbs>

        <Box mb="xl" style={{ maxWidth: '600px' }}>
          <TextInput
            size="md"
            radius="md"
            placeholder="Search across 260+ products..."
            value={query}
            onChange={(e) => setQuery(e.currentTarget.value)}
            leftSection={<IconSearch size={20} color="#9f2089" />}
          />
        </Box>

        <Group justify="space-between" align="center" mb="md">
          <Group gap="xs">
            <Title order={2} size="h3" fw={800} c="dark.8">
              {query.trim() ? `Search results for "${query}"` : 'All Products'}
            </Title>
            <Badge color="pink" variant="light">
              {filteredProducts.length} Results
            </Badge>
          </Group>
        </Group>

        <ProductGrid products={displayedProducts} insertAdsEvery={6} />

        {hasMore && (
          <Box style={{ textAlign: 'center' }} mt="xl">
            <Button
              size="md"
              radius="md"
              color="pink"
              style={{
                backgroundColor: '#9f2089',
                padding: '0 32px',
                fontWeight: 700,
              }}
              rightSection={<IconArrowRight size={18} />}
              onClick={() => setVisibleCount((prev) => prev + 24)}
            >
              Load More Results
            </Button>
          </Box>
        )}
      </Container>
    </Box>
  );
}

export default function SearchPage() {
  return (
    <Suspense fallback={<Box p="xl" ta="center">Loading search...</Box>}>
      <SearchContent />
    </Suspense>
  );
}
