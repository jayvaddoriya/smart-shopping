'use client';

import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  Container,
  Box,
  Grid,
  Title,
  Text,
  Paper,
  Group,
  Stack,
  Button,
  Image,
  ActionIcon,
  Divider,
  Badge,
} from '@mantine/core';
import {
  IconTrash,
  IconMinus,
  IconPlus,
  IconShoppingCartOff,
  IconShieldCheck,
  IconArrowRight,
} from '@tabler/icons-react';
import { useCart } from '@/context/CartContext';
import { AdBanner } from '@/components/ads/AdBanner';

export default function CartPage() {
  const router = useRouter();
  const { items, updateQty, removeFromCart, cartTotal, cartCount } = useCart();

  if (items.length === 0) {
    return (
      <Container size="sm" py={60} style={{ textAlign: 'center' }}>
        <IconShoppingCartOff size={80} color="#cccccc" stroke={1.5} />
        <Title order={2} size="h3" mt="md" fw={700}>
          Your Cart is Feeling Lonely
        </Title>
        <Text size="sm" c="dimmed" mt="xs" mb="xl">
          You haven&apos;t added any items to your shopping cart yet. Discover trending deals from today&apos;s Maha Sale!
        </Text>
        <Button
          component={Link}
          href="/"
          size="md"
          color="pink"
          style={{ backgroundColor: '#9f2089' }}
          radius="md"
        >
          Explore All Products
        </Button>

        <Box mt="xl">
          <AdBanner slotKey="cartPage" format="rectangle" />
        </Box>
      </Container>
    );
  }

  return (
    <Box py="lg">
      <Container size="lg">
        {/* Top Leaderboard Ad */}
        <AdBanner slotKey="topHeader" format="horizontal" />

        <Title order={1} size="h3" fw={800} mb="md" c="dark.8">
          Shopping Cart ({cartCount} {cartCount === 1 ? 'item' : 'items'})
        </Title>

        <Grid gutter="xl">
          {/* Items List */}
          <Grid.Col span={{ base: 12, md: 8 }}>
            <Stack gap="md">
              {items.map((item) => (
                <Paper
                  key={`${item.product.id}-${item.size}`}
                  withBorder
                  p="md"
                  radius="md"
                  style={{ backgroundColor: '#ffffff' }}
                >
                  <Group align="flex-start" wrap="nowrap" gap="md">
                    <Image
                      src={item.product.image}
                      alt={item.product.name}
                      w={90}
                      h={110}
                      radius="sm"
                      style={{ objectFit: 'cover' }}
                      fallbackSrc="https://shopping99.in/assets/images/india-dresses.webp"
                    />

                    <Box style={{ flex: 1 }}>
                      <Group justify="space-between" align="flex-start">
                        <Link href={`/product/${item.product.id}`}>
                          <Text size="sm" fw={700} c="dark.8" className="line-clamp-2">
                            {item.product.name}
                          </Text>
                        </Link>
                        <ActionIcon
                          variant="subtle"
                          color="red"
                          onClick={() => removeFromCart(item.product.id, item.size)}
                        >
                          <IconTrash size={18} />
                        </ActionIcon>
                      </Group>

                      <Text size="xs" c="dimmed" mt={4}>
                        Size / Variant: <b>{item.size}</b>
                      </Text>

                      <Group justify="space-between" align="center" mt="md">
                        <Group gap="sm" align="baseline">
                          <Text fw={900} size="md" c="#9f2089">
                            ₹{item.product.sellPrice.toFixed(2)}
                          </Text>
                          <Text size="xs" td="line-through" c="dimmed">
                            ₹{item.product.mrpPrice.toFixed(2)}
                          </Text>
                          {item.product.discount && (
                            <Badge color="green" size="xs">
                              {item.product.discount}
                            </Badge>
                          )}
                        </Group>

                        {/* Quantity Counter */}
                        <Group gap={6} align="center">
                          <ActionIcon
                            variant="default"
                            size="sm"
                            onClick={() => updateQty(item.product.id, item.size, item.qty - 1)}
                          >
                            <IconMinus size={12} />
                          </ActionIcon>
                          <Text size="xs" fw={700} px={6}>
                            {item.qty}
                          </Text>
                          <ActionIcon
                            variant="default"
                            size="sm"
                            onClick={() => updateQty(item.product.id, item.size, item.qty + 1)}
                          >
                            <IconPlus size={12} />
                          </ActionIcon>
                        </Group>
                      </Group>
                    </Box>
                  </Group>
                </Paper>
              ))}

              {/* In-Cart Strategic Ad Banner */}
              <Box mt="sm">
                <AdBanner slotKey="cartPage" format="horizontal" />
              </Box>
            </Stack>
          </Grid.Col>

          {/* Price Summary Sidebar */}
          <Grid.Col span={{ base: 12, md: 4 }}>
            <Paper withBorder p="md" radius="md" style={{ backgroundColor: '#ffffff', position: 'sticky', top: '100px' }}>
              <Title order={4} size="h5" fw={700} mb="md" c="dark.7">
                PRICE DETAILS
              </Title>

              <Stack gap="xs">
                <Group justify="space-between">
                  <Text size="sm" c="dimmed">
                    Price ({cartCount} items)
                  </Text>
                  <Text size="sm" fw={600}>
                    ₹{cartTotal.toFixed(2)}
                  </Text>
                </Group>

                <Group justify="space-between">
                  <Text size="sm" c="dimmed">
                    Delivery Charges
                  </Text>
                  <Text size="sm" fw={700} c="green.7">
                    FREE
                  </Text>
                </Group>

                <Divider my="xs" />

                <Group justify="space-between">
                  <Text size="md" fw={800}>
                    Total Amount
                  </Text>
                  <Text size="lg" fw={900} c="#9f2089">
                    ₹{cartTotal.toFixed(2)}
                  </Text>
                </Group>
              </Stack>

              <Button
                fullWidth
                size="md"
                radius="md"
                mt="lg"
                style={{
                  backgroundColor: '#ffc200',
                  color: '#000000',
                  fontWeight: 700,
                }}
                rightSection={<IconArrowRight size={18} />}
                onClick={() => router.push('/address')}
              >
                Continue to Delivery
              </Button>

              <Group justify="center" gap={6} mt="md">
                <IconShieldCheck size={16} color="#008c00" />
                <Text size="xs" c="dimmed">
                  Safe & Secure Indian Checkout
                </Text>
              </Group>
            </Paper>
          </Grid.Col>
        </Grid>
      </Container>
    </Box>
  );
}
