'use client';
import PackageBoxCard from '@/app/(components)/PackageBoxCard';
import { useAppDispatch, useAppSelector } from '@/core/redux/hooks';
import { RootState } from '@/core/redux/store';
import { PaginatedResponseType } from '@/core/types/responseTypes';
import packagesApi from '@/modules/packages/packagesApi';
import { PackagesDataType } from '@/modules/packages/packagesType';
import { useEffect, useRef, useState } from 'react';
import { Navigation, Pagination } from 'swiper/modules';
import { Swiper, SwiperRef, SwiperSlide } from 'swiper/react';

// const packageList: PackageType[] = [
//   {
//     id: 1,
//     image: '/images/banner/Sheyphoksundo.png',
//     name: 'Gosaikunda Pilgrimage Tour',
//     duration: '2 Days',
//     location: 'Everest Base Camp',
//     description:
//       'Altitude air takes us through the different villages towards the southern face of Annapurna base camp.',
//     rating: 4.5,
//     elevation: '3700m',
//   },
//   {
//     id: 1,
//     image: '/images/banner/banner-4.jpg',
//     name: 'Gosaikunda Pilgrimage Tour',
//     duration: '2 Days',
//     location: 'Everest Base Camp',
//     description:
//       'Altitude air takes us through the different villages towards the southern face of Annapurna base camp.',
//     rating: 5.0,
//     elevation: '3700m',
//   },
//   {
//     id: 1,
//     image: '/images/banner/altitude.png',
//     name: 'Gosaikunda Pilgrimage Tour',
//     duration: '2 Days',
//     location: 'Everest Base Camp',
//     description:
//       'Altitude air takes us through the different villages towards the southern face of Annapurna base camp.',
//     rating: 4.0,
//     elevation: '3700m',
//   },
//   {
//     id: 1,
//     image: '/images/banner/banner.webp',
//     name: 'Gosaikunda Pilgrimage Tour',
//     duration: '2 Days',
//     location: 'Everest Base Camp',
//     description:
//       'Altitude air takes us through the different villages towards the southern face of Annapurna base camp.',
//     rating: 5.0,
//     elevation: '3700m',
//   },
//   {
//     id: 1,
//     image: '/images/banner/banner-2.webp',
//     name: 'Gosaikunda Pilgrimage Tour',
//     duration: '2 Days',
//     location: 'Everest Base Camp',
//     description:
//       'Altitude air takes us through the different villages towards the southern face of Annapurna base camp.',
//     rating: 5.0,
//     elevation: '3700m',
//   },
//   {
//     id: 1,
//     image: '/images/banner/banner-3.webp',
//     name: 'Gosaikunda Pilgrimage Tour',
//     duration: '2 Days',
//     location: 'Everest Base Camp',
//     description:
//       'Altitude air takes us through the different villages towards the southern face of Annapurna base camp.',
//     rating: 5.0,
//     elevation: '3700m',
//   },
// ];

const RelatedPackages = () => {
  const dispatch = useAppDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setIsLoading(true);
    dispatch(packagesApi.endpoints.getAllPackages.initiate())
      .then(() => {
        setIsLoading(false);
      })
      .catch((error) => {
        setIsLoading(false);
        console.error('Error fetching news:', error);
        setError('Error fetching data');
      });
  }, [dispatch]);

  const paginatedPackagesResponse = useAppSelector(
    (state: RootState) =>
      state.baseApi.queries[`getAllPackages`]
        ?.data as PaginatedResponseType<PackagesDataType>
  );

  const swiperRef = useRef<SwiperRef | null>(null);

  const breakpoints = {
    // when window width is >= 320px
    320: {
      slidesPerView: 1,
      spaceBetween: 15,
    },
    // when window width is >= 480px
    480: {
      slidesPerView: 1,
      spaceBetween: 20,
    },
    728: {
      slidesPerView: 3,
      spaceBetween: 20,
    },
    // when window width is >= 640px
    1024: {
      slidesPerView: 4,
      spaceBetween: 25,
    },
  };

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <>
      <div className="bg-custom-blue/10 py-10 mt-10">
        <div className="container mx-auto">
          <h3 className="text-2xl font-bold text-custom-blue mb-5 px-3 sm:px-0">
            Related Packages
          </h3>
          <div className="relative w-full my-5 transition-all duration-100 px-3 sm:px-0">
            <Swiper
              pagination={{
                dynamicBullets: true,
              }}
              navigation={true}
              ref={swiperRef}
              modules={[Navigation, Pagination]}
              breakpoints={breakpoints}
              className="w-full pb-12"
            >
              {paginatedPackagesResponse &&
              paginatedPackagesResponse.results.length > 0 ? (
                paginatedPackagesResponse.results.map((item, index) => (
                  <SwiperSlide key={index}>
                    <PackageBoxCard item={item} />
                  </SwiperSlide>
                ))
              ) : (
                <></>
              )}
            </Swiper>
          </div>
        </div>
      </div>
    </>
  );
};

export default RelatedPackages;
