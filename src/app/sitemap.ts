import type { MetadataRoute } from 'next';
import { clubs } from '@/data/clubs';

const base = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://www.lionsmma.net';

export default function sitemap(): MetadataRoute.Sitemap {
  const pages = ['', '/clubs', '/classes', '/book', '/about', '/punjab-projects', '/volunteer', '/donate', '/contact', '/faqs'];
  return [...pages.map((p) => ({ url: `${base}${p}` })), ...clubs.map((c) => ({ url: `${base}/clubs/${c.slug}` }))];
}
