import { Metadata } from 'next';
import About from './page';
export const metadata: Metadata = {
  title: 'About',
  description: 'About page',
  openGraph: {
    title: 'About Us',
    description:
      'At Altitude Air, we go Above and Beyond to ensure operational excellence and the highest safety standards. While navigating Nepal’s Himalayan range, our services are crucial for your best experience, guaranteeing safe and seamless travel.',
    images: [
      {
        url: 'https://altitudeairnepal.com/images/banner/banner-2.webp',
        width: 1200,
        height: 630,
        alt: 'Altitude Air Contact',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
};

export default function AboutPage() {
  return <About />;
}
