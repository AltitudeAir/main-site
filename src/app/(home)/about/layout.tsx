import { fetchData } from '@/core/api/api_client';
import { apiPaths } from '@/core/api/apiConstants';
import { customMetaDataGenerator } from '@/core/helpers/customMetaDataGenerator';
import { PaginatedResponseType } from '@/core/types/responseTypes';
import { BODMessageType } from '@/modules/bod/bodType';
import { Metadata } from 'next';
import About from './page';

export const generateMetadata = async () => {
  const { data: bodMessageData } = await fetchData<
    PaginatedResponseType<BODMessageType>
  >(apiPaths.getBodMessageUrl);

  function stripHtml(html: string) {
    return html.replace(/<[^>]*>/g, '');
  }

  const introduction = bodMessageData?.results
    ?.map((item) => stripHtml(item?.introduction?.toString() ?? ''))
    .join('');

  const metadata: Metadata = customMetaDataGenerator({
    title: 'About Us',
    ogImage1: 'https://altitudeairnepal.com/images/resized-images/Abouts.webp',
    ogImage2: 'https://altitudeairnepal.com/images/resized-images/Abouts.webp',
    description: introduction,
  });
  return metadata;
};

export default function AboutPage() {
  return <About />;
}
