import { customMetaDataGenerator } from '@/core/helpers/customMetaDataGenerator';
import { Metadata } from 'next';
import BlogItem from './page';
export const metadata: Metadata = customMetaDataGenerator({
  title: 'Our Services',
  description:
    'We are the first aviators in Nepal to bring an Airbus Helicopter for commercial operation',
  ogImage1: 'https://altitudeairnepal.com/images/banner/Services.JPG',
  ogImage2: 'https://altitudeairnepal.com/images/banner/Services.JPG',
});
export default function BlogPage() {
  return <BlogItem />;
}
