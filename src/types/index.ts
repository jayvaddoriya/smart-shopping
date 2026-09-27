export interface Product {
  id: string;
  url?: string;
  name: string;
  image: string;
  images: string[];
  sellPrice: number;
  mrpPrice: number;
  discount: string;
  rating: string;
  ratingCount: number;
  category: string;
  description: string;
  sizes: string[];
  inStock?: boolean;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  image: string;
  description: string;
}

export interface CartItem {
  product: Product;
  size: string;
  qty: number;
}

export interface SiteConfig {
  siteName: string;
  domain: string;
  tagline: string;
  supportEmail: string;
  logo: string;
  heroBanner: string;
  offerPopupImage: string;
  deliveryFee: number;
  freeDeliveryThreshold: number;
}

export interface PolicyPageData {
  slug: string;
  title: string;
  content: string;
}
