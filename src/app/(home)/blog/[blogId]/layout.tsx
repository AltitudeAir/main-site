import { Metadata } from 'next';
import BlogItem from './page';
export const metadata: Metadata = {
  title: 'Our Services',
  description: 'Our Services page',
  openGraph: {
    title: 'Our Services ',
    description: 'Our Services page',
    url: 'https://altitudeairnepal.com',
    images: [
      {
        url: 'https://altitudeairnepal.com/images/description/down.webp',
        width: 1200,
        height: 630,
        alt: 'Our Services ',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
};

export default function BlogPage() {
  return <BlogItem />;
}
