'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  Container,
  Box,
  Title,
  Text,
  Group,
  Image,
  Badge,
  UnstyledButton,
  Button,
  Tabs,
} from '@mantine/core';
import {
  IconFlame,
  IconSparkles,
  IconArrowRight,
  IconChevronRight,
} from '@tabler/icons-react';
import categoriesData from '@/data/categories.json';
import productsData from '@/data/products.json';
import { ProductGrid } from '@/components/product/ProductGrid';
import { AdBanner } from '@/components/ads/AdBanner';
import { Product } from '@/types';

export default function HomePage() {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [visibleCount, setVisibleCount] = useState<number>(24);

  const allProducts = productsData as Product[];

  const filteredProducts =
    selectedCategory === 'all'
      ? allProducts
      : allProducts.filter((p) => p.category === selectedCategory);

  const displayedProducts = filteredProducts.slice(0, visibleCount);
  const hasMore = visibleCount < filteredProducts.length;

  return (
    <Box>
      {/* 1. TOP HEADER LEADERBOARD AD */}
      <Container size="xl" pt="xs">
        <AdBanner slotKey="topHeader" format="horizontal" />
      </Container>

      {/* 2. CATEGORIES CIRCULAR STRIP */}
      <Box style={{ backgroundColor: '#ffffff', borderBottom: '1px solid #f0f0f0' }} py="md">
        <Container size="xl">
          <Box
            className="hide-scrollbar"
            style={{
              display: 'flex',
              gap: '24px',
              overflowX: 'auto',
              padding: '4px 0',
              justifyContent: 'flex-start',
            }}
          >
            {categoriesData.map((cat) => (
              <UnstyledButton
                key={cat.id}
                component={Link}
                href={`/category/${cat.slug}`}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  minWidth: '76px',
                  textAlign: 'center',
                }}
              >
                <Box
                  style={{
                    width: 66,
                    height: 66,
                    borderRadius: '50%',
                    padding: '2px',
                    border: '2px solid #9f2089',
                    backgroundColor: '#ffffff',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    boxShadow: '0 4px 10px rgba(159, 32, 137, 0.15)',
                    transition: 'transform 0.2s',
                  }}
                >
                  <Image
                    src={cat.image}
                    alt={cat.name}
                    w={58}
                    h={58}
                    radius="50%"
                    style={{ objectFit: 'cover' }}
                    fallbackSrc="https://shopping99.in/assets/images/india-dresses.webp"
                  />
                </Box>
                <Text size="11px" fw={700} c="dark.7" mt={6} style={{ maxWidth: '80px', lineHeight: 1.2 }}>
                  {cat.name}
                </Text>
              </UnstyledButton>
            ))}
          </Box>
        </Container>
      </Box>

      {/* 3. HERO PROMOTIONAL BANNER */}
      <Container size="xl" mt="md">
        <Box
          style={{
            position: 'relative',
            borderRadius: '12px',
            overflow: 'hidden',
            boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
          }}
        >
          <Link href="/category/tranding-sale">
            <Image
              src="https://shopping99.in/assets/website/images/mens-website.webp.webp"
              alt="Maha Sale Festival Banner"
              w="100%"
              h={{ base: 140, sm: 220, md: 320 }}
              style={{ objectFit: 'cover' }}
              fallbackSrc="https://shopping99.in/assets/images/india-dresses.webp"
            />
          </Link>
        </Box>
      </Container>

      {/* 4. BELOW CATEGORIES HORIZONTAL AD */}
      <Container size="xl" mt="md">
        <AdBanner slotKey="belowCategories" format="horizontal" />
      </Container>

      {/* 5. MAIN PRODUCTS FEED */}
      <Container size="xl" mt="lg">
        {/* Section Heading & Category Filter Tabs */}
        <Box mb="md">
          <Group justify="space-between" align="center" mb="sm">
            <Group gap="xs">
              <IconFlame size={24} color="#9f2089" />
              <Title order={3} size="h3" fw={800} c="dark.8">
                Products For You
              </Title>
              <Badge color="pink" variant="light" size="sm">
                {filteredProducts.length} Items
              </Badge>
            </Group>

            <Button
              component={Link}
              href="/category/tranding-sale"
              variant="subtle"
              color="pink"
              size="xs"
              rightSection={<IconChevronRight size={14} />}
            >
              View All Deals
            </Button>
          </Group>

          {/* Quick Filter Tabs */}
          <Box className="hide-scrollbar" style={{ overflowX: 'auto', paddingBottom: '4px' }}>
            <Group gap="xs" wrap="nowrap">
              <Button
                size="xs"
                radius="xl"
                variant={selectedCategory === 'all' ? 'filled' : 'default'}
                color="pink"
                style={selectedCategory === 'all' ? { backgroundColor: '#9f2089' } : {}}
                onClick={() => {
                  setSelectedCategory('all');
                  setVisibleCount(24);
                }}
              >
                All Products ({allProducts.length})
              </Button>
              {categoriesData.map((cat) => (
                <Button
                  key={cat.id}
                  size="xs"
                  radius="xl"
                  variant={selectedCategory === cat.slug ? 'filled' : 'default'}
                  color="pink"
                  style={selectedCategory === cat.slug ? { backgroundColor: '#9f2089' } : {}}
                  onClick={() => {
                    setSelectedCategory(cat.slug);
                    setVisibleCount(24);
                  }}
                >
                  {cat.name}
                </Button>
              ))}
            </Group>
          </Box>
        </Box>

        {/* Product Grid with In-Feed Ads */}
        <ProductGrid products={displayedProducts} insertAdsEvery={6} />

        {/* Load More Button */}
        {hasMore && (
          <Box style={{ textAlign: 'center' }} mt="xl" mb="md">
            <Button
              size="md"
              radius="md"
              variant="filled"
              color="pink"
              style={{
                backgroundColor: '#9f2089',
                padding: '0 32px',
                fontWeight: 700,
              }}
              rightSection={<IconArrowRight size={18} />}
              onClick={() => setVisibleCount((prev) => prev + 24)}
            >
              Load More Products ({filteredProducts.length - visibleCount} remaining)
            </Button>
          </Box>
        )}
      </Container>
    </Box>
  );
}
