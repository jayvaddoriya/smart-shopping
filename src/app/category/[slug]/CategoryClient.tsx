'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  Container,
  Box,
  Title,
  Text,
  Breadcrumbs,
  Anchor,
  Group,
  Badge,
  Paper,
  Button,
} from '@mantine/core';
import { IconCategory, IconChevronRight, IconArrowRight } from '@tabler/icons-react';
import categoriesData from '@/data/categories.json';
import productsData from '@/data/products.json';
import { ProductGrid } from '@/components/product/ProductGrid';
import { AdBanner } from '@/components/ads/AdBanner';
import { Product } from '@/types';

export function CategoryClient({ slug }: { slug: string }) {
  const [visibleCount, setVisibleCount] = useState(24);

  const category = categoriesData.find((c) => c.slug === slug);

  const currentCategory = category || {
    id: slug,
    name: slug.replace(/-/g, ' ').toUpperCase(),
    slug: slug,
    description: 'Browse authentic discounted deals and trending products.',
  };

  const allProducts = productsData as Product[];

  let categoryProducts = allProducts.filter((p) => p.category === slug);
  if (categoryProducts.length < 8) {
    categoryProducts = allProducts.filter(
      (p) =>
        p.category === slug ||
        p.name.toLowerCase().includes(slug.replace(/-/g, ' ')) ||
        p.description.toLowerCase().includes(slug.replace(/-/g, ' '))
    );
  }
  if (categoryProducts.length < 12) {
    categoryProducts = allProducts.slice(0, 30);
  }

  const displayedProducts = categoryProducts.slice(0, visibleCount);
  const hasMore = visibleCount < categoryProducts.length;

  return (
    <Box py="md">
      <Container size="xl">
        <AdBanner slotKey="topHeader" format="horizontal" />

        <Breadcrumbs separator={<IconChevronRight size={14} color="#999" />} mb="md">
          <Anchor component={Link} href="/" size="xs" c="dimmed">
            Home
          </Anchor>
          <Anchor component={Link} href="/category/indian-dresses" size="xs" c="dimmed">
            Categories
          </Anchor>
          <Text size="xs" fw={700} c="#9f2089">
            {currentCategory.name}
          </Text>
        </Breadcrumbs>

        <Paper
          p="lg"
          radius="md"
          mb="lg"
          style={{
            background: 'linear-gradient(135deg, #fef3f9 0%, #fbe3f3 100%)',
            border: '1px solid #f4c2e6',
          }}
        >
          <Group justify="space-between" align="center">
            <Box>
              <Group gap="xs" mb={4}>
                <IconCategory size={22} color="#9f2089" />
                <Title order={2} size="h3" fw={800} c="#9f2089">
                  {currentCategory.name}
                </Title>
                <Badge color="pink" variant="filled">
                  {categoryProducts.length} Items Available
                </Badge>
              </Group>
              <Text size="sm" c="dark.4" style={{ maxWidth: '600px' }}>
                {currentCategory.description}
              </Text>
            </Box>

            <Badge size="lg" color="yellow" variant="filled" c="#000" fw={700}>
              Up to 80% OFF
            </Badge>
          </Group>
        </Paper>

        <Box mb="md">
          <AdBanner slotKey="belowCategories" format="horizontal" />
        </Box>

        <ProductGrid products={displayedProducts} insertAdsEvery={6} />

        {hasMore && (
          <Box style={{ textAlign: 'center' }} mt="xl" mb="md">
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
              Load More in {currentCategory.name}
            </Button>
          </Box>
        )}
      </Container>
    </Box>
  );
}
