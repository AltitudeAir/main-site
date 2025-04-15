import { customMetaDataGenerator } from '@/core/helpers/customMetaDataGenerator';
import { Metadata } from 'next';
import ContactPage from './page';

export const metadata: Metadata = customMetaDataGenerator({
  title: 'Contact',
  description: 'Contact Page',
  ogImage1: 'https://altitudeairnepal.com/images/resized-images/Contact.jpg',
  ogImage2: 'https://altitudeairnepal.com/images/resized-images/Contact.jpg',
});
export default function Contact() {
  return <ContactPage />;
}
