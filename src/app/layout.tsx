import type { Metadata, Viewport } from 'next';
import '@mantine/core/styles.css';
import '@/styles/globals.css';
import { ColorSchemeScript, MantineProvider, createTheme, Box } from '@mantine/core';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { MobileBottomBar } from '@/components/layout/MobileBottomBar';
import { OfferPopup } from '@/components/layout/OfferPopup';
import { CartDrawer } from '@/components/cart/CartDrawer';
import { CartProvider } from '@/context/CartContext';
import { AdSenseScript } from '@/components/ads/AdSenseScript';
import { AdBanner } from '@/components/ads/AdBanner';

export const metadata: Metadata = {
  title: 'Smart Shopping - India’s Favorite Online Mega Sale & Super Store',
  description: 'Smart Shopping - Shop trending Indian Dresses, Co-ord Sets, Kurtis, Smart Watches and Accessories at lowest prices with Free Shipping and Cash on Delivery across India.',
  keywords: 'Smart Shopping, smart shopping online, smartshopping.in, Maha Sale, Indian dresses, kurti, saree, discount clothes, smart watch, online shopping india',
  authors: [{ name: 'Smart Shopping' }],
  openGraph: {
    title: 'Smart Shopping - India’s Favorite Online Mega Sale & Super Store',
    description: 'Shop trending fashion, ethnic dresses, smart watches and viral lifestyle accessories at up to 85% off with Free Delivery.',
    siteName: 'Smart Shopping',
    locale: 'en_IN',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Smart Shopping - India’s Favorite Online Mega Sale',
    description: 'Discover trending deals on Smart Shopping with 100% genuine quality and Cash on Delivery.',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  themeColor: '#9f2089',
};

const theme = createTheme({
  primaryColor: 'pink',
  colors: {
    pink: [
      '#fdf2f9',
      '#fae5f3',
      '#f5c9e7',
      '#f09ad6',
      '#e564bd',
      '#d73fa7',
      '#ba248d',
      '#9f2089',
      '#831c71',
      '#6e1a5f',
    ],
  },
  fontFamily: '-apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Helvetica, Arial, sans-serif',
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en-IN">
      <head>
        <ColorSchemeScript defaultColorScheme="light" />
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body>
        <AdSenseScript />
        <MantineProvider theme={theme} defaultColorScheme="light">
          <CartProvider>
            <Box style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
              <Header />

              <Box component="main" style={{ flex: 1, paddingBottom: '60px' }}>
                {children}
              </Box>

              {/* Sticky Mobile / Tablet Bottom Anchor Ad */}
              <Box
                style={{
                  position: 'sticky',
                  bottom: 0,
                  zIndex: 90,
                  backgroundColor: 'rgba(255, 255, 255, 0.96)',
                  borderTop: '1px solid #e0e0e0',
                  boxShadow: '0 -2px 10px rgba(0,0,0,0.05)',
                  padding: '2px 0',
                }}
              >
                <AdBanner slotKey="stickyBottomAnchor" format="horizontal" />
              </Box>

              <Footer />
              <CartDrawer />
              <MobileBottomBar />
              <OfferPopup />
            </Box>
          </CartProvider>
        </MantineProvider>
      </body>
    </html>
  );
}
