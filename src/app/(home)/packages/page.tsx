import Package from '@/app/(components)/(sections)/(landing)/Package';
import { fetchData } from '@/core/api/api_client';
import { apiPaths } from '@/core/api/apiConstants';
import { customMetaDataGenerator } from '@/core/helpers/customMetaDataGenerator';
import { PaginatedResponseType } from '@/core/types/responseTypes';
import { PackagesDataType } from '@/modules/packages/packagesType';
import { Metadata } from 'next';

export const metadata: Metadata = customMetaDataGenerator({
  title: 'Packages',
  description:
    'Helicopter tour over the Himalayas is indeed a lifetime experience. The magnificent views of the Himalayas is the unique specialty of helicopter treks.',
  ogImage: 'https://altitudeairnepal.com/images/banner/banner.webp',
});
export default async function Packages() {
  const { data: paginatedPackagesResponse } = await fetchData<
    PaginatedResponseType<PackagesDataType>
  >(apiPaths.getPackages);
  return (
    <div className="bg-custom-gray-light/50">
      <div
        className="relative h-[80vh] w-full bg-no-repeat bg-cover flex items-end justify-center"
        style={{ backgroundImage: 'url(/images/banner/banner.webp)' }}
      >
        <h1
          className="text-white z-10 mb-16 text-3xl text-center"
          style={{ fontFamily: 'BankGothic-Regular', wordSpacing: '5px' }}
        >
          Heli Trek
        </h1>
        <div className="absolute bottom-0 left-0 top-0 right-0 bg-gradient-to-t from-custom-blue to-transparent"></div>
      </div>
      <div className="">
        <h2 className="text-center text-lg font-medium text-custom-blue my-10 max-w-xs md:max-w-3xl mx-auto">
          Helicopter tour over the Himalayas is indeed a lifetime experience.
          The magnificent views of the Himalayas is the unique specialty of
          helicopter treks.
        </h2>
        <Package paginatedPackagesResponse={paginatedPackagesResponse} />
      </div>
    </div>
  );
}
