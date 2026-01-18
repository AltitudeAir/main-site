import { customMetaDataGenerator } from '@/core/helpers/customMetaDataGenerator';
import { Metadata } from 'next';
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
    ogImage1: dynamicOgImage,
    ogImage2: dynamicOgImage,
  });
}
export default function FleetsPage({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
