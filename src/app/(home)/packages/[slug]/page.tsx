import { apiPaths } from '@/core/api/apiConstants';
import { fetchData } from '@/core/api/api_client';
import { customMetaDataGenerator } from '@/core/helpers/customMetaDataGenerator';
import { ArrayResponseType } from '@/core/types/responseTypes';
import { Footer } from '@/modules/general/footerTypes';
import { PackagesDataType } from '@/modules/packages/packagesType';
import { Metadata } from 'next';
import Image from 'next/image';
import { FaLocationDot } from 'react-icons/fa6';
import { IoTimeOutline } from 'react-icons/io5';
import BookingMainCard from './(components)/BookingMainCard';
import PackageAdditionalInfo from './(components)/PackageAdditionalInfo';
import PackageGallery from './(components)/PackageGallery';
import PackageHighlights from './(components)/PackageHighlights';
import PackageLocation from './(components)/PackageLocation';
import RelatedPackages from './(components)/RelatedPackages';

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const slug = params.slug;

  const dynamicTitle = `Packages - ${slug}`;
  const dynamicOgImage = `https://altitudeairnepal.com/images/fleets/${slug}.jpg`;

  return customMetaDataGenerator({
    title: dynamicTitle,
    ogImage1: dynamicOgImage,
    ogImage2: dynamicOgImage,
  });
}

export default async function Packages({
  params,
}: {
  params: { slug: string };
}) {
  const { data: footerdata, error } = await fetchData<
    ArrayResponseType<Footer>
  >(apiPaths.footerUrl);

  const { data: packageData, error: packageDataError } =
    await fetchData<PackagesDataType>(apiPaths.getPackages + params.slug);

  if (error || packageDataError) {
    return <div>Error: {error}</div>;
  }

  const getImage = (packageSlug: string) => {
    switch (packageSlug) {
      case 'khumbu':
        return '/images/packages/khumbu.jpg';
      case 'langtang-kyanjin-village-helicopter-tour':
        return '/images/packages/KyanjinGompa.jpg';
      default:
        return undefined;
    }
  };

  if (packageDataError || !packageData) return <>error page</>;

  return (
    <div className="bg-custom-gray-light/50 ">
      <div
        className="relative h-[50vh] sm:h-[70vh] w-full bg-no-repeat bg-cover bg-center"
        style={{ backgroundImage: `url(${packageData.cover_image})` }}
      >
        <div className="relative z-10 container mx-auto h-[40vh] sm:h-[60vh] px-6 sm:px-0 flex items-end">
          <div>
            <h1 className="text-4xl text-white capitalize font-black">
              {packageData.title}
            </h1>
            <p className="text-base text-white capitalize font-light flex items-center gap-2">
              <FaLocationDot /> {packageData.address}
            </p>
            <p className="text-base text-white capitalize font-light flex items-center gap-2">
              <IoTimeOutline /> Duration: {packageData.duration}
            </p>
            <p className="text-base text-white font-light">
              Starting from{' '}
              <span className="text-[#fbc200]">
                {packageData.currency === 'USD' ? '$' : 'NPR.'}
                {parseFloat(packageData.price ?? '0').toFixed(
                  packageData.currency === 'USD' ? 2 : 0
                )}
                {packageData.pricing_type === 'fixed' ? '' : ' /p'}
              </span>
            </p>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 top-0 right-0 bg-gradient-to-t from-custom-blue to-transparent"></div>
      </div>
      <BookingMainCard packageData={packageData} />
      <div className="container mx-auto">
        <div className="grid grid-cols-12 place-content-start sm:gap-x-10 sm:gap-y-10 px-0">
          <div className="col-span-12 md:col-span-8 w-full">
            <PackageAdditionalInfo packageItem={packageData} />
            <PackageGallery packageSlug={packageData.slug} />
            <PackageHighlights
              data={packageData.description}
              hotline={footerdata?.data[0].hotline ?? '-'}
            />
          </div>
          <div className="col-span-12 md:col-span-4 w-full flex flex-col gap-4">
            {getImage(params.slug) ? (
              <div className="relative w-full aspect-square">
                <Image
                  src={getImage(params.slug)!}
                  sizes=""
                  fill
                  objectFit="cover"
                  alt={`${packageData.title} route image`}
                />
              </div>
            ) : (
              <></>
            )}
            {/* <CalendarPicker /> */}
            {packageData.latitude && packageData.longitude ? (
              <PackageLocation
                latitude={parseFloat(packageData.latitude)}
                longtitude={parseFloat(packageData.longitude)}
              />
            ) : (
              <></>
            )}

            {/* <BookingCard /> */}
          </div>
        </div>
      </div>
      <RelatedPackages />
    </div>
  );
  // return <div></div>;
}
