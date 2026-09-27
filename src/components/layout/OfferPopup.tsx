'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Modal, Image, Box, ActionIcon } from '@mantine/core';
import { IconX } from '@tabler/icons-react';

export function OfferPopup() {
  const [opened, setOpened] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      try {
        const hasSeen = sessionStorage.getItem('hasSeenOfferPopup');
        if (!hasSeen) {
          setOpened(true);
          sessionStorage.setItem('hasSeenOfferPopup', 'true');
        }
      } catch (e) {
        // sessionStorage not available
      }
    }, 2500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <Modal
      opened={opened}
      onClose={() => setOpened(false)}
      centered
      withCloseButton={false}
      padding={0}
      radius="lg"
      size="xs"
      styles={{
        content: {
          overflow: 'hidden',
          backgroundColor: 'transparent',
          boxShadow: 'none',
        },
        body: {
          padding: 0,
          position: 'relative',
        },
      }}
    >
      <Box style={{ position: 'relative', textAlign: 'center' }}>
        <ActionIcon
          onClick={() => setOpened(false)}
          variant="filled"
          color="dark"
          radius="xl"
          size="md"
          style={{
            position: 'absolute',
            top: 8,
            right: 8,
            zIndex: 10,
            backgroundColor: 'rgba(0,0,0,0.7)',
          }}
        >
          <IconX size={16} />
        </ActionIcon>

        <Link href="/category/mobiles--watch" onClick={() => setOpened(false)}>
          <Image
            src="https://shopping99.in/assets/website/images/new-offer.png"
            alt="Maha Sale Offer"
            radius="md"
            style={{
              maxHeight: '380px',
              width: '100%',
              objectFit: 'contain',
              boxShadow: '0 12px 30px rgba(0,0,0,0.3)',
            }}
            fallbackSrc="https://shopping99.in/assets/images/india-dresses.webp"
          />
        </Link>
      </Box>
    </Modal>
  );
}
