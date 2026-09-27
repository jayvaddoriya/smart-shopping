'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  Box,
  Container,
  Group,
  TextInput,
  ActionIcon,
  Badge,
  Text,
  Drawer,
  Stack,
  UnstyledButton,
  Image,
} from '@mantine/core';
import {
  IconSearch,
  IconShoppingCart,
  IconMenu2,
  IconX,
  IconFlame,
  IconClock,
} from '@tabler/icons-react';
import { useCart } from '@/context/CartContext';
import categoriesData from '@/data/categories.json';

export function Header() {
  const router = useRouter();
  const { cartCount, openCart } = useCart();
  const [searchQuery, setSearchQuery] = useState('');
  const [menuOpened, setMenuOpened] = useState(false);

  // Countdown timer for Maha Sale
  const [timeLeft, setTimeLeft] = useState({ hours: 1, minutes: 14, seconds: 59 });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) return { ...prev, seconds: prev.seconds - 1 };
        if (prev.minutes > 0) return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        if (prev.hours > 0) return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        return { hours: 2, minutes: 0, seconds: 0 };
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  const formatTwoDigits = (num: number) => String(num).padStart(2, '0');

  return (
    <Box component="header" style={{ position: 'sticky', top: 0, zIndex: 100, background: '#ffffff', boxShadow: '0 2px 10px rgba(0,0,0,0.06)' }}>
      {/* Top Urgent Deals Bar */}
      <Box
        style={{
          background: 'linear-gradient(90deg, #970e71 0%, #ba208b 50%, #970e71 100%)',
          color: '#ffffff',
          padding: '6px 12px',
        }}
      >
        <Container size="xl">
          <Group justify="space-between" align="center" wrap="nowrap">
            <Group gap={6} align="center">
              <IconFlame size={16} color="#ffc200" />
              <Text size="xs" fw={700} style={{ letterSpacing: '0.5px' }}>
                MAHA SALE ENDS IN:
              </Text>
              <Badge color="yellow" variant="filled" size="sm" radius="xs" c="#000" fw={700}>
                {formatTwoDigits(timeLeft.hours)}h : {formatTwoDigits(timeLeft.minutes)}m : {formatTwoDigits(timeLeft.seconds)}s
              </Badge>
            </Group>
            <Text size="xs" fw={600} visibleFrom="sm">
              ✨ Free Shipping on All Orders | Cash on Delivery Available
            </Text>
          </Group>
        </Container>
      </Box>

      {/* Main Header */}
      <Container size="xl" py="sm">
        <Group justify="space-between" align="center" wrap="nowrap">
          {/* Left: Mobile Menu Toggle + Logo */}
          <Group gap="xs" wrap="nowrap">
            <ActionIcon
              variant="subtle"
              color="gray"
              hiddenFrom="md"
              onClick={() => setMenuOpened(true)}
              aria-label="Open menu"
            >
              <IconMenu2 size={24} />
            </ActionIcon>

            <Link href="/" style={{ display: 'flex', alignItems: 'center' }}>
              <Box style={{ fontWeight: 900, fontSize: '24px', color: '#9f2089', letterSpacing: '-0.5px' }}>
                SHOPPING<span style={{ color: '#ffc200', background: '#9f2089', padding: '2px 6px', borderRadius: '4px', marginLeft: '2px' }}>99</span>
              </Box>
            </Link>
          </Group>

          {/* Center: Search Bar */}
          <Box style={{ flex: 1, maxWidth: '540px' }} mx="md" visibleFrom="xs">
            <form onSubmit={handleSearch}>
              <TextInput
                placeholder="Search for Sarees, Kurtis, Smart Watches, Cosmetics..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.currentTarget.value)}
                leftSection={<IconSearch size={18} color="#999" />}
                rightSection={
                  searchQuery ? (
                    <ActionIcon variant="transparent" size="xs" onClick={() => setSearchQuery('')}>
                      <IconX size={14} color="#999" />
                    </ActionIcon>
                  ) : null
                }
                radius="xl"
                size="sm"
                styles={{
                  input: {
                    border: '1.5px solid #e2e2e8',
                    '&:focus': { borderColor: '#9f2089' },
                  },
                }}
              />
            </form>
          </Box>

          {/* Right: Cart Button */}
          <Group gap="sm" wrap="nowrap">
            <UnstyledButton
              onClick={openCart}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                padding: '8px 14px',
                borderRadius: '8px',
                backgroundColor: '#fdf3fa',
                cursor: 'pointer',
              }}
            >
              <Box style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
                <IconShoppingCart size={22} color="#9f2089" />
                {cartCount > 0 && (
                  <Badge
                    size="xs"
                    circle
                    color="pink"
                    style={{
                      position: 'absolute',
                      top: '-8px',
                      right: '-10px',
                      backgroundColor: '#9f2089',
                    }}
                  >
                    {cartCount}
                  </Badge>
                )}
              </Box>
              <Text size="sm" fw={700} c="#9f2089" visibleFrom="sm">
                Cart
              </Text>
            </UnstyledButton>
          </Group>
        </Group>

        {/* Mobile Search Input (Visible only on smallest screens) */}
        <Box mt="xs" hiddenFrom="xs">
          <form onSubmit={handleSearch}>
            <TextInput
              placeholder="Search Sarees, Watches, Kurtis..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.currentTarget.value)}
              leftSection={<IconSearch size={16} color="#999" />}
              radius="md"
              size="xs"
            />
          </form>
        </Box>
      </Container>

      {/* Categories Bar (Desktop) */}
      <Box
        visibleFrom="md"
        style={{
          borderTop: '1px solid #f0f0f4',
          borderBottom: '1px solid #f0f0f4',
          background: '#ffffff',
        }}
      >
        <Container size="xl">
          <Group gap="xl" py={8} justify="center">
            {categoriesData.map((cat) => (
              <Link key={cat.id} href={`/category/${cat.slug}`}>
                <Text
                  size="sm"
                  fw={600}
                  c="#444"
                  style={{
                    transition: 'color 0.2s',
                    '&:hover': { color: '#9f2089' },
                  }}
                >
                  {cat.name}
                </Text>
              </Link>
            ))}
          </Group>
        </Container>
      </Box>

      {/* Mobile Drawer Navigation */}
      <Drawer
        opened={menuOpened}
        onClose={() => setMenuOpened(false)}
        title={
          <Text fw={700} size="lg" c="#9f2089">
            Categories & Menu
          </Text>
        }
        padding="md"
        size="xs"
      >
        <Stack gap="sm">
          <Text size="xs" fw={700} c="dimmed" tt="uppercase">
            Product Categories
          </Text>
          {categoriesData.map((cat) => (
            <UnstyledButton
              key={cat.id}
              component={Link}
              href={`/category/${cat.slug}`}
              onClick={() => setMenuOpened(false)}
              p="xs"
              style={{
                borderRadius: '6px',
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                borderBottom: '1px solid #f5f5f5',
              }}
            >
              <Image
                src={cat.image}
                alt={cat.name}
                w={36}
                h={36}
                radius="50%"
                fallbackSrc="https://shopping99.in/assets/images/india-dresses.webp"
              />
              <Text size="sm" fw={600}>
                {cat.name}
              </Text>
            </UnstyledButton>
          ))}

          <Box mt="md" pt="md" style={{ borderTop: '1px solid #eee' }}>
            <Text size="xs" fw={700} c="dimmed" tt="uppercase" mb="xs">
              Quick Links
            </Text>
            <Stack gap="xs">
              <Link href="/about-us" onClick={() => setMenuOpened(false)}>
                <Text size="sm" c="dimmed">About Us</Text>
              </Link>
              <Link href="/contact-us" onClick={() => setMenuOpened(false)}>
                <Text size="sm" c="dimmed">Contact Us</Text>
              </Link>
              <Link href="/terms-and-conditions" onClick={() => setMenuOpened(false)}>
                <Text size="sm" c="dimmed">Terms & Conditions</Text>
              </Link>
              <Link href="/privacy-policy" onClick={() => setMenuOpened(false)}>
                <Text size="sm" c="dimmed">Privacy Policy</Text>
              </Link>
            </Stack>
          </Box>
        </Stack>
      </Drawer>
    </Box>
  );
}
