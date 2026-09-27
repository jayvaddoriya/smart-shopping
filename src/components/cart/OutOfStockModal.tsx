'use client';

import React from 'react';
import Link from 'next/link';
import {
  Modal,
  Box,
  Title,
  Text,
  Button,
  Group,
  Stack,
  ThemeIcon,
  Paper,
  SimpleGrid,
  Image,
  Badge,
} from '@mantine/core';
import {
  IconAlertTriangle,
  IconShoppingBag,
  IconArrowRight,
  IconSparkles,
} from '@tabler/icons-react';
import { AdBanner } from '@/components/ads/AdBanner';
import productsData from '@/data/products.json';
import { Product } from '@/types';

interface OutOfStockModalProps {
  opened: boolean;
  onClose: () => void;
}

export function OutOfStockModal({ opened, onClose }: OutOfStockModalProps) {
  // Grab 4 trending alternative products
  const alternativeProducts = (productsData as Product[]).slice(10, 14);

  return (
    <Modal
      opened={opened}
      onClose={onClose}
      size="lg"
      radius="lg"
      centered
      padding="lg"
      styles={{
        header: {
          borderBottom: '1px solid #fee2e2',
          backgroundColor: '#fff5f5',
          borderTopLeftRadius: '16px',
          borderTopRightRadius: '16px',
        },
      }}
      title={
        <Group gap="xs">
          <ThemeIcon color="red" variant="light" size="lg" radius="xl">
            <IconAlertTriangle size={20} />
          </ThemeIcon>
          <Text fw={800} size="md" c="red.8">
            Item Sold Out - High Demand Alert
          </Text>
        </Group>
      }
    >
      <Stack gap="md" pt="xs">
        <Paper p="md" radius="md" style={{ backgroundColor: '#fff8f8', border: '1px solid #ffd4d4' }}>
          <Text fw={700} size="md" c="red.9" mb={4}>
            ⚠️ We Apologize! This Item Just Went Out of Stock
          </Text>
          <Text size="xs" c="dark.4" lh={1.5}>
            Due to immense customer demand during today&apos;s <b>Maha Sale</b>, this product has temporarily run out of warehouse inventory. Don&apos;t worry—we have safely reserved your cart details for the next 15 minutes!
          </Text>
        </Paper>

        {/* High-Value Advertisement Placement on Final Step */}
        <Box>
          <Text size="xs" fw={700} c="dimmed" tt="uppercase" mb={4}>
            Sponsored Maha Sale Recommendations
          </Text>
          <AdBanner slotKey="paymentOutOfStock" format="rectangle" />
        </Box>

        {/* Alternative Trending In-Stock Products */}
        <Box>
          <Group justify="space-between" align="center" mb="xs">
            <Group gap={6}>
              <IconSparkles size={16} color="#9f2089" />
              <Text size="xs" fw={700} c="#9f2089" tt="uppercase">
                Trending In-Stock Alternatives
              </Text>
            </Group>
            <Badge size="xs" color="green" variant="light">
              In Stock Now
            </Badge>
          </Group>

          <SimpleGrid cols={{ base: 2, sm: 4 }} spacing="xs">
            {alternativeProducts.map((p) => (
              <Paper
                key={p.id}
                withBorder
                p={6}
                radius="sm"
                component={Link}
                href={`/product/${p.id}`}
                onClick={onClose}
                style={{
                  transition: 'transform 0.2s',
                  '&:hover': { transform: 'translateY(-2px)' },
                  display: 'flex',
                  flexDirection: 'column',
                }}
              >
                <Image
                  src={p.image}
                  alt={p.name}
                  h={90}
                  radius="xs"
                  style={{ objectFit: 'cover' }}
                  fallbackSrc="https://shopping99.in/assets/images/india-dresses.webp"
                />
                <Text size="11px" fw={600} mt={4} className="line-clamp-1">
                  {p.name}
                </Text>
                <Group gap={4} mt={2}>
                  <Text size="11px" fw={700} c="#9f2089">
                    ₹{p.sellPrice}
                  </Text>
                  <Text size="10px" td="line-through" c="dimmed">
                    ₹{p.mrpPrice}
                  </Text>
                </Group>
              </Paper>
            ))}
          </SimpleGrid>
        </Box>

        <Group justify="space-between" mt="sm">
          <Button
            variant="default"
            size="sm"
            component={Link}
            href="/"
            onClick={onClose}
            leftSection={<IconShoppingBag size={16} />}
          >
            Explore All Categories
          </Button>

          <Button
            color="pink"
            size="sm"
            style={{ backgroundColor: '#9f2089' }}
            component={Link}
            href="/category/tranding-sale"
            onClick={onClose}
            rightSection={<IconArrowRight size={16} />}
          >
            Shop Trending Sale
          </Button>
        </Group>
      </Stack>
    </Modal>
  );
}
