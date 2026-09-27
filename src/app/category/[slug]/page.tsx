import categoriesData from '@/data/categories.json';
import { CategoryClient } from './CategoryClient';

export async function generateStaticParams() {
  return categoriesData.map((cat) => ({
    slug: cat.slug,
  }));
}

export default function CategoryPage({ params }: { params: { slug: string } }) {
  return <CategoryClient slug={params.slug} />;
}
