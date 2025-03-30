import { customMetaDataGenerator } from '@/core/helpers/customMetaDataGenerator';
import { Metadata } from 'next';
import ContactPage from './page';

export const metadata: Metadata = customMetaDataGenerator({
  title: 'Contact',
  description: 'Contact Page',
  ogImage: 'https://altitudeairnepal.com/images/contact/helicopter.webp',
});
export default function Contact() {
  return <ContactPage />;
}
