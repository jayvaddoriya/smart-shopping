'use client';

import React from 'react';
import { SimpleGrid, Box } from '@mantine/core';
import { Product } from '@/types';
import { ProductCard } from './ProductCard';
import { AdBanner } from '@/components/ads/AdBanner';

interface ProductGridProps {
  products: Product[];
  insertAdsEvery?: number;
}

export function ProductGrid({ products, insertAdsEvery = 6 }: ProductGridProps) {
  const renderItems = () => {
    const items: React.ReactNode[] = [];

    products.forEach((product, idx) => {
      items.push(<ProductCard key={product.id} product={product} />);

      // Insert In-feed native advertisement every N products
      if ((idx + 1) % insertAdsEvery === 0 && idx !== products.length - 1) {
        items.push(
          <Box
            key={`ad-feed-${idx}`}
            style={{
              gridColumn: '1 / -1',
              width: '100%',
              margin: '8px 0',
            }}
          >
            <AdBanner slotKey="inFeed" format="horizontal" />
          </Box>
        );
      }
    });

    return items;
  };

  return (
    <SimpleGrid
      cols={{ base: 2, sm: 3, md: 4, lg: 5 }}
      spacing={{ base: 'xs', sm: 'md' }}
      verticalSpacing={{ base: 'xs', sm: 'md' }}
    >
      {renderItems()}
    </SimpleGrid>
  );
}
