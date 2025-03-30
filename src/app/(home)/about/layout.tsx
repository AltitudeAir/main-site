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
    ogImage: 'https://altitudeairnepal.com/images/banner/banner-2.webp',
    description: introduction,
  });
  return metadata;
};

export default function AboutPage() {
  return <About />;
}
