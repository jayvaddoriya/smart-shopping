import productsData from '@/data/products.json';
import { Product } from '@/types';
import { ProductDetailClient } from './ProductDetailClient';

export async function generateStaticParams() {
  return (productsData as Product[]).map((p) => ({
    id: p.id,
  }));
}

export default function ProductDetailPage({ params }: { params: { id: string } }) {
  return <ProductDetailClient id={params.id} />;
}
