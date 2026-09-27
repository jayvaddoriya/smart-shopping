'use client';

import React from 'react';
import Link from 'next/link';
import { Card, Image, Text, Group, Badge, Box, Button } from '@mantine/core';
import { IconStarFilled, IconShoppingCart, IconBolt } from '@tabler/icons-react';
import { Product } from '@/types';
import { useCart } from '@/context/CartContext';

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const { addToCart } = useCart();

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product, product.sizes?.[0] || 'Free Size', 1, true);
  };

  return (
    <Card
      withBorder
      shadow="xs"
      padding="xs"
      radius="md"
      className="product-card-hover"
      style={{
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        backgroundColor: '#ffffff',
        position: 'relative',
      }}
    >
      <Link href={`/product/${product.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
        {/* Product Image & Badges */}
        <Box style={{ position: 'relative', overflow: 'hidden', borderRadius: '6px' }}>
          <Image
            src={product.image}
            alt={product.name}
            h={210}
            style={{
              objectFit: 'cover',
              width: '100%',
              transition: 'transform 0.3s ease',
            }}
            fallbackSrc="https://shopping99.in/assets/images/india-dresses.webp"
          />

          {/* Discount Pill */}
          {product.discount && (
            <Badge
              color="green.7"
              variant="filled"
              size="xs"
              radius="xs"
              style={{
                position: 'absolute',
                top: 8,
                left: 8,
                fontWeight: 700,
                fontSize: '10px',
                textTransform: 'uppercase',
              }}
            >
              {product.discount}
            </Badge>
          )}

          {/* Assured Logo */}
          <Box
            style={{
              position: 'absolute',
              bottom: 6,
              right: 6,
              background: 'rgba(255,255,255,0.92)',
              padding: '2px 6px',
              borderRadius: '4px',
              display: 'flex',
              alignItems: 'center',
            }}
          >
            <Text size="9px" fw={800} c="#008c00">
              ✓ ASSURED
            </Text>
          </Box>
        </Box>

        {/* Product Details */}
        <Box mt="xs" style={{ flex: 1 }}>
          {/* Rating */}
          <Group gap={4} align="center" mb={4}>
            <Box
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '2px',
                backgroundColor: '#008c00',
                color: '#fff',
                padding: '1px 5px',
                borderRadius: '4px',
                fontSize: '10px',
                fontWeight: 700,
              }}
            >
              <span>{product.rating || '4.2'}</span>
              <IconStarFilled size={8} />
            </Box>
            <Text size="11px" c="dimmed">
              ({product.ratingCount || 450})
            </Text>
          </Group>

          {/* Name */}
          <Text size="xs" fw={600} className="line-clamp-2" lh={1.3} mb={6} c="dark.7">
            {product.name}
          </Text>

          {/* Pricing */}
          <Group gap={6} align="baseline">
            <Text fw={800} size="sm" c="#9f2089">
              ₹{product.sellPrice.toFixed(2)}
            </Text>
            <Text size="xs" td="line-through" c="dimmed">
              ₹{product.mrpPrice.toFixed(2)}
            </Text>
            {product.discount && (
              <Text size="10px" fw={700} c="green.7">
                {product.discount}
              </Text>
            )}
          </Group>

          <Text size="10px" c="teal.7" fw={600} mt={2}>
            Free Delivery
          </Text>
        </Box>
      </Link>

      {/* Quick Action Button */}
      <Button
        mt="xs"
        size="xs"
        variant="light"
        color="pink"
        fullWidth
        radius="sm"
        leftSection={<IconShoppingCart size={14} />}
        onClick={handleQuickAdd}
        styles={{
          root: {
            '&:hover': {
              backgroundColor: '#9f2089',
              color: '#ffffff',
            },
          },
        }}
      >
        Add to Cart
      </Button>
    </Card>
  );
}
