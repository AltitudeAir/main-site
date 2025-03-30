'use client';
import { useAppDispatch, useAppSelector } from '@/core/redux/hooks';
import { RootState } from '@/core/redux/store';
import packagesApi from '@/modules/packages/packagesApi';
import { PackageGalleryDataType } from '@/modules/packages/packagesType';
import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';
import { Navigation } from 'swiper/modules';
import { Swiper, SwiperRef, SwiperSlide } from 'swiper/react';

const PackageGallery = ({ packageSlug }: { packageSlug: string }) => {
  const swiperRef = useRef<SwiperRef | null>(null);
  const [isBeginning, toggleIsBeginning] = useState<boolean | undefined>(
    undefined
  );
  const [isEnd, toggleIsEnd] = useState<boolean | undefined>(undefined);

  const dispatch = useAppDispatch();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setIsLoading(true);
    dispatch(packagesApi.endpoints.getPackageGallery.initiate(packageSlug))
      .then(() => {
        setIsLoading(false);
      })
      .catch((error: any) => {
        setIsLoading(false);
        console.error('Error fetching package gallery:', error);
        setError('Error fetching data');
      });
  }, [dispatch, packageSlug]);

  const packageGalleryData = useAppSelector(
    (state: RootState) =>
      state.baseApi.queries[`getPackageGallery`]
        ?.data as PackageGalleryDataType[]
  );

  const breakpoints = {
    // when window width is >= 320px
    200: {
      slidesPerView: 1,
      spaceBetween: 15,
    },
    // when window width is >= 480px
    480: {
      slidesPerView: 2,
      spaceBetween: 20,
    },
    // when window width is >= 640px
    1024: {
      slidesPerView: 2,
      spaceBetween: 25,
    },
  };

  return (
    <>
      {!isLoading ? (
        packageGalleryData && packageGalleryData.length > 0 ? (
          <>
            <h3 className="text-2xl font-bold text-custom-blue sm:px-0 px-3 mt-5">
              Gallery
            </h3>
            <div className="group relative w-full my-5 transition-all duration-100">
              <div>
                <button
                  disabled={isBeginning}
                  onClick={() => swiperRef.current?.swiper.slidePrev()}
                  className="text-[#f7c024] disabled:text-gray-400 absolute left-0 top-1/2 -translate-y-1/2 z-20"
                >
                  <IoIosArrowBack size={45} />
                </button>
                <button
                  disabled={isEnd}
                  className="text-[#f7c024] disabled:text-gray-400 absolute right-0 top-1/2 -translate-y-1/2 z-20"
                  onClick={() => swiperRef.current?.swiper.slideNext()}
                >
                  <IoIosArrowForward size={45} />
                </button>
              </div>
              <Swiper
                navigation={true}
                onReachBeginning={() => (
                  toggleIsBeginning(true), toggleIsEnd(false)
                )}
                onReachEnd={() => (toggleIsBeginning(false), toggleIsEnd(true))}
                onSlideChange={() => {
                  if (
                    !swiperRef.current?.swiper.isBeginning &&
                    !swiperRef.current?.swiper.isEnd
                  ) {
                    toggleIsBeginning(false), toggleIsEnd(false);
                  }
                }}
                ref={swiperRef}
                modules={[Navigation]}
                breakpoints={breakpoints}
                className="w-full"
              >
                {packageGalleryData.map((imageData, index) => (
                  <SwiperSlide key={index}>
                    <div className="relative mx-auto aspect-video">
                      <Image
                        src={
                          imageData.file
                            ? imageData.file
                            : '/images/errors/placeholder.webp'
                        }
                        alt={packageSlug + '_' + index}
                        onError={(e) => {
                          e.currentTarget.src =
                            '/images/errors/placeholder.webp';
                        }}
                        fill
                        sizes="(max-width: 2000px) 100vw, 33vw"
                        className="object-cover"
                        blurDataURL="/images/noImage.png"
                        loading="lazy"
                        placeholder="blur"
                      />
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
          </>
        ) : null
      ) : null}
    </>
  );
};

export default PackageGallery;
