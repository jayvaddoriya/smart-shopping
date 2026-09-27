'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  Container,
  Box,
  Grid,
  Image,
  Title,
  Text,
  Group,
  Badge,
  Button,
  Paper,
  Breadcrumbs,
  Anchor,
  ActionIcon,
  SimpleGrid,
} from '@mantine/core';
import {
  IconStarFilled,
  IconShoppingCart,
  IconBolt,
  IconTruckDelivery,
  IconShieldCheck,
  IconClock,
  IconChevronRight,
  IconMinus,
  IconPlus,
} from '@tabler/icons-react';
import productsData from '@/data/products.json';
import { Product } from '@/types';
import { useCart } from '@/context/CartContext';
import { AdBanner } from '@/components/ads/AdBanner';
import { ProductCard } from '@/components/product/ProductCard';

export function ProductDetailClient({ id }: { id: string }) {
  const router = useRouter();
  const { addToCart } = useCart();

  const allProducts = productsData as Product[];
  const product = allProducts.find((p) => p.id === id) || allProducts[0];

  const galleryImages = product.images && product.images.length > 0 ? product.images : [product.image];
  const [selectedImage, setSelectedImage] = useState(galleryImages[0]);
  const [selectedSize, setSelectedSize] = useState(product.sizes?.[0] || 'Free Size');
  const [quantity, setQuantity] = useState(1);

  const handleAddToCart = () => {
    addToCart(product, selectedSize, quantity, true);
  };

  const handleBuyNow = () => {
    addToCart(product, selectedSize, quantity, false);
    router.push('/address');
  };

  const similarProducts = allProducts
    .filter((p) => p.id !== product.id && p.category === product.category)
    .slice(0, 5);

  return (
    <Box py="md">
      <Container size="xl">
        <AdBanner slotKey="topHeader" format="horizontal" />

        <Breadcrumbs separator={<IconChevronRight size={14} color="#999" />} mb="md">
          <Anchor component={Link} href="/" size="xs" c="dimmed">
            Home
          </Anchor>
          <Anchor component={Link} href={`/category/${product.category}`} size="xs" c="dimmed">
            {product.category.replace(/-/g, ' ').toUpperCase()}
          </Anchor>
          <Text size="xs" fw={700} c="#9f2089" className="line-clamp-1">
            {product.name}
          </Text>
        </Breadcrumbs>

        <Grid gutter="xl">
          <Grid.Col span={{ base: 12, md: 5 }}>
            <Box style={{ position: 'sticky', top: '100px' }}>
              <Paper
                withBorder
                radius="md"
                p="xs"
                style={{
                  backgroundColor: '#ffffff',
                  textAlign: 'center',
                  position: 'relative',
                  overflow: 'hidden',
                }}
              >
                <Image
                  src={selectedImage}
                  alt={product.name}
                  h={{ base: 320, sm: 420 }}
                  style={{ objectFit: 'contain', width: '100%' }}
                  fallbackSrc="https://shopping99.in/assets/images/india-dresses.webp"
                />

                {product.discount && (
                  <Badge
                    color="green.7"
                    size="md"
                    style={{ position: 'absolute', top: 12, left: 12, fontWeight: 700 }}
                  >
                    {product.discount}
                  </Badge>
                )}
              </Paper>

              {galleryImages.length > 1 && (
                <Group gap="xs" mt="sm">
                  {galleryImages.map((img, idx) => (
                    <Box
                      key={idx}
                      onClick={() => setSelectedImage(img)}
                      style={{
                        cursor: 'pointer',
                        borderRadius: '6px',
                        overflow: 'hidden',
                        border: selectedImage === img ? '2px solid #9f2089' : '1px solid #ddd',
                        width: 60,
                        height: 60,
                      }}
                    >
                      <Image
                        src={img}
                        alt={`Thumbnail ${idx + 1}`}
                        w="100%"
                        h="100%"
                        style={{ objectFit: 'cover' }}
                      />
                    </Box>
                  ))}
                </Group>
              )}
            </Box>
          </Grid.Col>

          <Grid.Col span={{ base: 12, md: 7 }}>
            <Box>
              <Title order={1} size="h3" fw={700} lh={1.3} mb="xs" c="dark.8">
                {product.name}
              </Title>

              <Group gap="sm" mb="sm" align="center">
                <Box
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '4px',
                    backgroundColor: '#008c00',
                    color: '#fff',
                    padding: '2px 8px',
                    borderRadius: '4px',
                    fontSize: '12px',
                    fontWeight: 700,
                  }}
                >
                  <span>{product.rating || '4.2'}</span>
                  <IconStarFilled size={12} />
                </Box>
                <Text size="xs" c="dimmed">
                  {product.ratingCount || 1240} ratings & 480 reviews
                </Text>
                <Badge color="green" variant="light" size="xs">
                  ✓ 100% Genuine Verified
                </Badge>
              </Group>

              <Paper p="sm" radius="md" style={{ backgroundColor: '#fffbfd', border: '1px solid #fae2f3' }} mb="md">
                <Group gap="md" align="baseline">
                  <Text size="28px" fw={900} c="#9f2089">
                    ₹{product.sellPrice.toFixed(2)}
                  </Text>
                  <Text size="lg" td="line-through" c="dimmed">
                    ₹{product.mrpPrice.toFixed(2)}
                  </Text>
                  {product.discount && (
                    <Badge color="green.7" variant="filled" size="md">
                      {product.discount}
                    </Badge>
                  )}
                </Group>
                <Text size="xs" c="dimmed" mt={4}>
                  Inclusive of all taxes • <b>Free Cash on Delivery Available</b>
                </Text>
              </Paper>

              <Box mb="md">
                <AdBanner slotKey="productDetailTop" format="rectangle" />
              </Box>

              {product.sizes && product.sizes.length > 0 && (
                <Box mb="md">
                  <Text size="xs" fw={700} c="dark.5" tt="uppercase" mb={6}>
                    Select Size / Variant:
                  </Text>
                  <Group gap="xs">
                    {product.sizes.map((size) => (
                      <Button
                        key={size}
                        variant={selectedSize === size ? 'filled' : 'outline'}
                        color="pink"
                        style={
                          selectedSize === size
                            ? { backgroundColor: '#9f2089', color: '#fff' }
                            : { borderColor: '#d0d0d0', color: '#333' }
                        }
                        size="xs"
                        radius="md"
                        onClick={() => setSelectedSize(size)}
                      >
                        {size}
                      </Button>
                    ))}
                  </Group>
                </Box>
              )}

              <Box mb="lg">
                <Text size="xs" fw={700} c="dark.5" tt="uppercase" mb={6}>
                  Quantity:
                </Text>
                <Group gap="xs">
                  <ActionIcon
                    variant="default"
                    size="md"
                    onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  >
                    <IconMinus size={14} />
                  </ActionIcon>
                  <Text fw={700} size="sm" px="sm">
                    {quantity}
                  </Text>
                  <ActionIcon variant="default" size="md" onClick={() => setQuantity((q) => q + 1)}>
                    <IconPlus size={14} />
                  </ActionIcon>
                </Group>
              </Box>

              <Grid gutter="sm" mb="xl">
                <Grid.Col span={6}>
                  <Button
                    fullWidth
                    size="md"
                    radius="md"
                    variant="default"
                    leftSection={<IconShoppingCart size={20} />}
                    onClick={handleAddToCart}
                    style={{
                      border: '2px solid #222',
                      fontWeight: 700,
                      color: '#222',
                    }}
                  >
                    Add to Cart
                  </Button>
                </Grid.Col>
                <Grid.Col span={6}>
                  <Button
                    fullWidth
                    size="md"
                    radius="md"
                    leftSection={<IconBolt size={20} />}
                    onClick={handleBuyNow}
                    style={{
                      backgroundColor: '#ffc200',
                      color: '#000000',
                      fontWeight: 700,
                    }}
                  >
                    Buy Now
                  </Button>
                </Grid.Col>
              </Grid>

              <Paper withBorder p="md" radius="md" mb="md" style={{ backgroundColor: '#ffffff' }}>
                <Title order={4} size="h5" fw={700} c="dark.8" mb="sm">
                  Product Details & Specifications
                </Title>
                <Text size="xs" c="dark.6" lh={1.7} style={{ whiteSpace: 'pre-line' }}>
                  {product.description || product.name}
                </Text>
              </Paper>

              <Paper withBorder p="sm" radius="md" mb="lg" style={{ backgroundColor: '#fcfcfc' }}>
                <SimpleGrid cols={3} spacing="xs">
                  <Group gap={6} align="center">
                    <IconTruckDelivery size={20} color="#9f2089" />
                    <Box>
                      <Text size="11px" fw={700}>
                        Free Delivery
                      </Text>
                      <Text size="9px" c="dimmed">
                        Across India
                      </Text>
                    </Box>
                  </Group>
                  <Group gap={6} align="center">
                    <IconShieldCheck size={20} color="#008c00" />
                    <Box>
                      <Text size="11px" fw={700}>
                        Assured Quality
                      </Text>
                      <Text size="9px" c="dimmed">
                        100% Genuine
                      </Text>
                    </Box>
                  </Group>
                  <Group gap={6} align="center">
                    <IconClock size={20} color="#ffc200" />
                    <Box>
                      <Text size="11px" fw={700}>
                        7 Days Return
                      </Text>
                      <Text size="9px" c="dimmed">
                        Hassle Free
                      </Text>
                    </Box>
                  </Group>
                </SimpleGrid>
              </Paper>

              <Box mb="xl">
                <AdBanner slotKey="productDetailBottom" format="horizontal" />
              </Box>
            </Box>
          </Grid.Col>
        </Grid>

        {similarProducts.length > 0 && (
          <Box mt="xl">
            <Group justify="space-between" align="center" mb="md">
              <Title order={3} size="h4" fw={800} c="dark.8">
                Similar Products You May Like
              </Title>
              <Link href={`/category/${product.category}`}>
                <Text size="xs" fw={700} c="#9f2089">
                  View More →
                </Text>
              </Link>
            </Group>

            <SimpleGrid cols={{ base: 2, sm: 3, md: 5 }} spacing="sm">
              {similarProducts.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </SimpleGrid>
          </Box>
        )}
      </Container>
    </Box>
  );
}
