import { customMetaDataGenerator } from '@/core/helpers/customMetaDataGenerator';
import { Metadata } from 'next';
import Description from './page';
export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const slug = params.slug;

  const dynamicTitle = `Fleets - ${slug}`;
  const dynamicOgImage = `https://altitudeairnepal.com/images/fleets/${slug}.jpg`;

  return customMetaDataGenerator({
    title: dynamicTitle,
    ogImage: dynamicOgImage,
  });
}
export default function FleetsPage() {
  return <Description />;
}
