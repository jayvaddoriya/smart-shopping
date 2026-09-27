'use client';

import React from 'react';
import Link from 'next/link';
import { Box, Group, UnstyledButton, Text, Badge } from '@mantine/core';
import {
  IconHome,
  IconCategory,
  IconSearch,
  IconShoppingCart,
} from '@tabler/icons-react';
import { useCart } from '@/context/CartContext';

export function MobileBottomBar() {
  const { cartCount, openCart } = useCart();

  return (
    <Box
      hiddenFrom="md"
      style={{
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: '#ffffff',
        borderTop: '1px solid #e9e9e9',
        boxShadow: '0 -2px 10px rgba(0,0,0,0.06)',
        zIndex: 99,
        padding: '6px 0',
      }}
    >
      <Group justify="space-around" align="center">
        <UnstyledButton
          component={Link}
          href="/"
          style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}
        >
          <IconHome size={20} color="#666" />
          <Text size="10px" fw={600} c="dimmed" mt={2}>
            Home
          </Text>
        </UnstyledButton>

        <UnstyledButton
          component={Link}
          href="/category/indian-dresses"
          style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}
        >
          <IconCategory size={20} color="#666" />
          <Text size="10px" fw={600} c="dimmed" mt={2}>
            Categories
          </Text>
        </UnstyledButton>

        <UnstyledButton
          component={Link}
          href="/search"
          style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}
        >
          <IconSearch size={20} color="#666" />
          <Text size="10px" fw={600} c="dimmed" mt={2}>
            Search
          </Text>
        </UnstyledButton>

        <UnstyledButton
          onClick={openCart}
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            position: 'relative',
          }}
        >
          <Box style={{ position: 'relative' }}>
            <IconShoppingCart size={20} color="#9f2089" />
            {cartCount > 0 && (
              <Badge
                size="xs"
                circle
                color="pink"
                style={{
                  position: 'absolute',
                  top: '-6px',
                  right: '-10px',
                  backgroundColor: '#9f2089',
                }}
              >
                {cartCount}
              </Badge>
            )}
          </Box>
          <Text size="10px" fw={700} c="#9f2089" mt={2}>
            Cart
          </Text>
        </UnstyledButton>
      </Group>
    </Box>
  );
}
