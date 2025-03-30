'use client';
import { PaginatedResponseType } from '@/core/types/responseTypes';
import { PackagesDataType } from '@/modules/packages/packagesType';
import { useRef } from 'react';
import { Navigation, Pagination } from 'swiper/modules';
import { Swiper, SwiperRef, SwiperSlide } from 'swiper/react';
import PackageBoxCard from '../../PackageBoxCard';

const Package = ({
  paginatedPackagesResponse,
}: {
  paginatedPackagesResponse?: PaginatedResponseType<PackagesDataType>;
}) => {
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
      slidesPerView: 3,
      spaceBetween: 25,
    },
  };

  return (
    <>
      <div className="bg-custom-gray/60 py-10">
        <div className="news_content_container max-w-7xl mx-auto !text-left">
          <h2 className="text-2xl font-bold !text-custom-blue mb-10 px-6 sm:px-0 text-center">
            Packages
          </h2>
          <div className="relative w-full h-full my-5 transition-all duration-100 px-6 sm:px-0">
            <Swiper
              pagination={{
                dynamicBullets: true,
              }}
              navigation={true}
              ref={swiperRef}
              modules={[Navigation, Pagination]}
              breakpoints={breakpoints}
              className="w-full"
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

export default Package;
