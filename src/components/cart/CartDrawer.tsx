'use client';

import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  Drawer,
  Box,
  Stack,
  Group,
  Text,
  Button,
  Image,
  ActionIcon,
  Divider,
  Badge,
} from '@mantine/core';
import {
  IconTrash,
  IconPlus,
  IconMinus,
  IconShoppingCartOff,
  IconShieldCheck,
  IconArrowRight,
} from '@tabler/icons-react';
import { useCart } from '@/context/CartContext';
import { AdBanner } from '@/components/ads/AdBanner';

export function CartDrawer() {
  const router = useRouter();
  const { items, isCartOpen, closeCart, updateQty, removeFromCart, cartTotal } = useCart();

  const handleCheckout = () => {
    closeCart();
    router.push('/address');
  };

  return (
    <Drawer
      opened={isCartOpen}
      onClose={closeCart}
      position="right"
      size="md"
      title={
        <Group gap="xs">
          <Text fw={800} size="lg" c="#9f2089">
            Your Shopping Cart
          </Text>
          {items.length > 0 && (
            <Badge color="pink" variant="light" size="sm">
              {items.length} {items.length === 1 ? 'item' : 'items'}
            </Badge>
          )}
        </Group>
      }
      styles={{
        header: {
          borderBottom: '1px solid #f0f0f0',
          paddingBottom: '12px',
        },
        body: {
          display: 'flex',
          flexDirection: 'column',
          height: 'calc(100% - 60px)',
          padding: '16px',
        },
      }}
    >
      {items.length === 0 ? (
        <Box
          style={{
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            textAlign: 'center',
            padding: '40px 20px',
          }}
        >
          <IconShoppingCartOff size={64} color="#cccccc" stroke={1.5} />
          <Text fw={700} size="lg" mt="md" c="#222">
            Your cart is feeling lonely
          </Text>
          <Text size="sm" c="dimmed" mt={4} mb="xl">
            Explore hot trending Maha Sale deals and add your favorite items!
          </Text>
          <Button
            color="pink"
            style={{ backgroundColor: '#9f2089' }}
            radius="md"
            onClick={closeCart}
          >
            Start Shopping
          </Button>

          {/* Ad inside empty cart to capture impressions */}
          <Box mt="xl" w="100%">
            <AdBanner slotKey="cartPage" format="rectangle" />
          </Box>
        </Box>
      ) : (
        <Box style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
          {/* Free Shipping Alert */}
          <Box
            p="xs"
            mb="sm"
            style={{
              background: '#e6fcf5',
              border: '1px solid #b2f2bb',
              borderRadius: '8px',
              textAlign: 'center',
            }}
          >
            <Text size="xs" fw={700} c="#099268">
              🎉 Congratulations! You unlocked FREE Delivery across India!
            </Text>
          </Box>

          {/* Cart Items List */}
          <Box style={{ flex: 1, overflowY: 'auto' }} pr={4}>
            <Stack gap="md">
              {items.map((item) => (
                <Box
                  key={`${item.product.id}-${item.size}`}
                  p="sm"
                  style={{
                    backgroundColor: '#fafafa',
                    borderRadius: '8px',
                    border: '1px solid #ededed',
                  }}
                >
                  <Group align="flex-start" wrap="nowrap" gap="sm">
                    <Image
                      src={item.product.image}
                      alt={item.product.name}
                      w={70}
                      h={85}
                      radius="sm"
                      style={{ objectFit: 'cover' }}
                      fallbackSrc="https://shopping99.in/assets/images/india-dresses.webp"
                    />

                    <Box style={{ flex: 1 }}>
                      <Group justify="space-between" align="flex-start" wrap="nowrap">
                        <Text size="xs" fw={600} className="line-clamp-2" lh={1.3}>
                          {item.product.name}
                        </Text>
                        <ActionIcon
                          variant="subtle"
                          color="red"
                          size="sm"
                          onClick={() => removeFromCart(item.product.id, item.size)}
                        >
                          <IconTrash size={16} />
                        </ActionIcon>
                      </Group>

                      <Text size="xs" c="dimmed" mt={2}>
                        Size: <b>{item.size}</b>
                      </Text>

                      <Group justify="space-between" align="center" mt="xs">
                        <Group gap={6} align="baseline">
                          <Text fw={700} size="sm" c="#9f2089">
                            ₹{item.product.sellPrice.toFixed(2)}
                          </Text>
                          <Text size="xs" td="line-through" c="dimmed">
                            ₹{item.product.mrpPrice.toFixed(2)}
                          </Text>
                        </Group>

                        {/* Quantity Counter */}
                        <Group gap={4} align="center">
                          <ActionIcon
                            size="sm"
                            variant="default"
                            onClick={() => updateQty(item.product.id, item.size, item.qty - 1)}
                          >
                            <IconMinus size={12} />
                          </ActionIcon>
                          <Text size="xs" fw={700} px={6}>
                            {String(item.qty).padStart(2, '0')}
                          </Text>
                          <ActionIcon
                            size="sm"
                            variant="default"
                            onClick={() => updateQty(item.product.id, item.size, item.qty + 1)}
                          >
                            <IconPlus size={12} />
                          </ActionIcon>
                        </Group>
                      </Group>
                    </Box>
                  </Group>
                </Box>
              ))}
            </Stack>

            {/* Ad Banner inside Cart Drawer */}
            <Box mt="md">
              <AdBanner slotKey="cartPage" format="horizontal" />
            </Box>
          </Box>

          <Divider my="sm" />

          {/* Cart Footer */}
          <Box pt="xs">
            <Stack gap={6} mb="sm">
              <Group justify="space-between">
                <Text size="xs" c="dimmed">
                  Cart Total:
                </Text>
                <Text size="xs" fw={600}>
                  ₹{cartTotal.toFixed(2)}
                </Text>
              </Group>
              <Group justify="space-between">
                <Text size="xs" c="dimmed">
                  Shipping Fee:
                </Text>
                <Text size="xs" fw={700} c="teal">
                  FREE
                </Text>
              </Group>
              <Group justify="space-between">
                <Text size="sm" fw={800}>
                  Total Amount:
                </Text>
                <Text size="md" fw={800} c="#9f2089">
                  ₹{cartTotal.toFixed(2)}
                </Text>
              </Group>
            </Stack>

            <Button
              fullWidth
              size="md"
              radius="md"
              style={{
                backgroundColor: '#ffc200',
                color: '#000000',
                fontWeight: 700,
              }}
              rightSection={<IconArrowRight size={18} />}
              onClick={handleCheckout}
            >
              Confirm Order • ₹{cartTotal.toFixed(2)}
            </Button>

            <Group justify="center" gap={4} mt="xs">
              <IconShieldCheck size={14} color="#008c00" />
              <Text size="11px" c="dimmed">
                100% Safe & Secure Checkout with Cash on Delivery
              </Text>
            </Group>
          </Box>
        </Box>
      )}
    </Drawer>
  );
}
