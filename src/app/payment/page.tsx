'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  Container,
  Box,
  Grid,
  Title,
  Text,
  Paper,
  Radio,
  Group,
  Button,
  Stack,
  Badge,
  Divider,
  ThemeIcon,
  Alert,
  SimpleGrid,
} from '@mantine/core';
import {
  IconAlertTriangle,
  IconCreditCard,
  IconCash,
  IconDeviceMobile,
  IconShieldCheck,
  IconArrowRight,
  IconSparkles,
} from '@tabler/icons-react';
import { useCart } from '@/context/CartContext';
import { AdBanner } from '@/components/ads/AdBanner';
import { OutOfStockModal } from '@/components/cart/OutOfStockModal';
import { ProductCard } from '@/components/product/ProductCard';
import productsData from '@/data/products.json';
import { Product } from '@/types';

export default function PaymentPage() {
  const { cartTotal, cartCount } = useCart();
  const [paymentMethod, setPaymentMethod] = useState('cod');
  const [showOutOfStockNotice, setShowOutOfStockNotice] = useState(false);
  const [modalOpened, setModalOpened] = useState(false);

  // Automatically trigger the Out of Stock notification on this final step to fulfill the user requirement
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowOutOfStockNotice(true);
      setModalOpened(true);
    }, 1200);

    return () => clearTimeout(timer);
  }, []);

  const handlePlaceOrder = () => {
    setShowOutOfStockNotice(true);
    setModalOpened(true);
  };

  const trendingAlternatives = (productsData as Product[]).slice(14, 22);

  return (
    <Box py="lg">
      <Container size="lg">
        {/* Step Indicator */}
        <Paper withBorder p="xs" radius="md" mb="md" style={{ backgroundColor: '#ffffff' }}>
          <Group justify="space-around">
            <Group gap={6}>
              <Badge circle color="green" size="sm">✓</Badge>
              <Text size="xs" fw={700}>1. Cart</Text>
            </Group>
            <Text c="dimmed">→</Text>
            <Group gap={6}>
              <Badge circle color="green" size="sm">✓</Badge>
              <Text size="xs" fw={700}>2. Address</Text>
            </Group>
            <Text c="dimmed">→</Text>
            <Group gap={6}>
              <Badge circle color="pink" size="sm">3</Badge>
              <Text size="xs" fw={700} c="#9f2089">3. Final Step</Text>
            </Group>
          </Group>
        </Paper>

        {/* OUT OF STOCK PROMINENT BANNER (Triggered on Final Step) */}
        {showOutOfStockNotice && (
          <Alert
            icon={<IconAlertTriangle size={24} />}
            title="⚠️ ITEM CURRENTLY OUT OF STOCK - MAHA SALE DEMAND"
            color="red"
            variant="filled"
            radius="md"
            mb="xl"
            styles={{
              root: {
                backgroundColor: '#dc2626',
                boxShadow: '0 4px 15px rgba(220, 38, 38, 0.25)',
              },
              title: { fontWeight: 800, fontSize: '15px' },
              message: { fontSize: '13px', lineHeight: 1.5 },
            }}
          >
            We sincerely apologize! Because of extraordinary visitor traffic and fast-selling flash deals during today&apos;s Maha Sale, this product was <b>sold out</b> just seconds ago.
            <br />
            Please browse our verified <b>In-Stock Alternatives</b> below with extra 10% instant discount!
          </Alert>
        )}

        <Grid gutter="xl">
          {/* Payment Method Selector */}
          <Grid.Col span={{ base: 12, md: 8 }}>
            <Paper withBorder p="lg" radius="md" style={{ backgroundColor: '#ffffff' }}>
              <Title order={2} size="h4" fw={800} c="dark.8" mb="sm">
                Select Payment Method
              </Title>
              <Text size="xs" c="dimmed" mb="md">
                100% Safe Payment with 256-Bit SSL Encryption
              </Text>

              <Radio.Group
                value={paymentMethod}
                onChange={setPaymentMethod}
              >
                <Stack gap="sm">
                  {/* Cash on Delivery */}
                  <Paper
                    withBorder
                    p="sm"
                    radius="md"
                    style={{
                      borderColor: paymentMethod === 'cod' ? '#9f2089' : '#e0e0e0',
                      backgroundColor: paymentMethod === 'cod' ? '#fdf2f9' : '#ffffff',
                    }}
                  >
                    <Group justify="space-between">
                      <Group gap="sm">
                        <Radio value="cod" />
                        <IconCash size={22} color="#008c00" />
                        <Box>
                          <Text size="sm" fw={700}>
                            Cash on Delivery (COD)
                          </Text>
                          <Text size="xs" c="dimmed">
                            Pay in cash or UPI when order reaches your doorstep
                          </Text>
                        </Box>
                      </Group>
                      <Badge color="green" size="xs">Recommended</Badge>
                    </Group>
                  </Paper>

                  {/* UPI / QR */}
                  <Paper
                    withBorder
                    p="sm"
                    radius="md"
                    style={{
                      borderColor: paymentMethod === 'upi' ? '#9f2089' : '#e0e0e0',
                      backgroundColor: paymentMethod === 'upi' ? '#fdf2f9' : '#ffffff',
                    }}
                  >
                    <Group gap="sm">
                      <Radio value="upi" />
                      <IconDeviceMobile size={22} color="#9f2089" />
                      <Box>
                        <Text size="sm" fw={700}>
                          UPI / Google Pay / PhonePe / Paytm
                        </Text>
                        <Text size="xs" c="dimmed">
                          Instant discount applied on prepaid orders
                        </Text>
                      </Box>
                    </Group>
                  </Paper>

                  {/* Credit / Debit Cards */}
                  <Paper
                    withBorder
                    p="sm"
                    radius="md"
                    style={{
                      borderColor: paymentMethod === 'card' ? '#9f2089' : '#e0e0e0',
                      backgroundColor: paymentMethod === 'card' ? '#fdf2f9' : '#ffffff',
                    }}
                  >
                    <Group gap="sm">
                      <Radio value="card" />
                      <IconCreditCard size={22} color="#228be6" />
                      <Box>
                        <Text size="sm" fw={700}>
                          Credit / Debit Card / Net Banking
                        </Text>
                        <Text size="xs" c="dimmed">
                          Visa, MasterCard, RuPay, Maestro
                        </Text>
                      </Box>
                    </Group>
                  </Paper>
                </Stack>
              </Radio.Group>

              {/* ⚠️ HIGH VALUE AD BANNER: Strategically placed right on this final payment screen */}
              <Box my="lg">
                <Text size="xs" fw={700} c="dimmed" tt="uppercase" mb={4}>
                  Sponsored Promotion
                </Text>
                <AdBanner slotKey="paymentOutOfStock" format="rectangle" />
              </Box>

              <Button
                fullWidth
                size="md"
                radius="md"
                style={{
                  backgroundColor: '#ffc200',
                  color: '#000000',
                  fontWeight: 800,
                  fontSize: '15px',
                }}
                rightSection={<IconArrowRight size={20} />}
                onClick={handlePlaceOrder}
              >
                Place Order (Pay Now)
              </Button>
            </Paper>
          </Grid.Col>

          {/* Price Summary */}
          <Grid.Col span={{ base: 12, md: 4 }}>
            <Paper withBorder p="md" radius="md" style={{ backgroundColor: '#ffffff', position: 'sticky', top: '100px' }}>
              <Title order={4} size="h5" fw={700} mb="md" c="dark.7">
                FINAL PAYMENT
              </Title>

              <Stack gap="xs">
                <Group justify="space-between">
                  <Text size="sm" c="dimmed">Items in Cart</Text>
                  <Text size="sm" fw={600}>{cartCount}</Text>
                </Group>
                <Group justify="space-between">
                  <Text size="sm" c="dimmed">Order Total</Text>
                  <Text size="sm" fw={600}>₹{cartTotal.toFixed(2)}</Text>
                </Group>
                <Group justify="space-between">
                  <Text size="sm" c="dimmed">Delivery Charges</Text>
                  <Text size="sm" fw={700} c="green.7">FREE</Text>
                </Group>
                <Divider my="xs" />
                <Group justify="space-between">
                  <Text size="md" fw={800}>Amount to Pay</Text>
                  <Text size="lg" fw={900} c="#9f2089">₹{cartTotal.toFixed(2)}</Text>
                </Group>
              </Stack>

              {showOutOfStockNotice && (
                <Box p="xs" mt="md" style={{ backgroundColor: '#fef2f2', border: '1px dashed #ef4444', borderRadius: '6px' }}>
                  <Text size="xs" fw={700} c="red.7" ta="center">
                    Status: Stock Depleted
                  </Text>
                </Box>
              )}
            </Paper>
          </Grid.Col>
        </Grid>

        {/* Trending In-Stock Alternatives Grid */}
        <Box mt="xl">
          <Group justify="space-between" align="center" mb="md">
            <Group gap="xs">
              <IconSparkles size={22} color="#9f2089" />
              <Title order={3} size="h4" fw={800} c="dark.8">
                Trending In-Stock Alternatives For You
              </Title>
            </Group>
            <Button component={Link} href="/" variant="subtle" color="pink" size="xs">
              Explore More →
            </Button>
          </Group>

          <SimpleGrid cols={{ base: 2, sm: 3, md: 4 }} spacing="sm">
            {trendingAlternatives.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </SimpleGrid>
        </Box>

        {/* Modal Alert */}
        <OutOfStockModal opened={modalOpened} onClose={() => setModalOpened(false)} />
      </Container>
    </Box>
  );
}
