'use client';

import axiosInstance from '@/core/utils/axoisInst';
import { constants } from '@/core/utils/constants';
import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';
import { Navigation } from 'swiper/modules';
import { Swiper, SwiperRef, SwiperSlide } from 'swiper/react';

interface FeaturedImagesType {
  isImage: boolean;
  title: string;
  image?: string;
  thumbnail?: string;
  videoURL?: string;
}

interface ImagesNVideos {
  id: number;
  isImage: boolean;
  title: string;
  image?: string;
  thumbnail?: string;
  videoURL?: string;
}

export default function Gallery() {
  const swiperRef = useRef<SwiperRef | null>(null);
  const [featuredImages, setFeaturedImages] = useState<FeaturedImagesType[]>(
    []
  );
  const [imagesNVideos, setImagesNVideos] = useState<ImagesNVideos[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [isBeginning, toggleIsBeginning] = useState<boolean>(true);
  const [isEnd, toggleIsEnd] = useState<boolean>(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const featuredRes = await axiosInstance.get('/gallery/featuredlist/');
        const galleryRes = await axiosInstance.get('/gallery/');
        setFeaturedImages(featuredRes.data.data);
        setImagesNVideos(galleryRes.data.data);
      } catch (error) {
        setError('Error fetching data');
      }
    };

    fetchData();
  }, []);

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <main className="gallery-main">
      <section className="w-full mt-20 relative h-[30vh] md:h-[50vh] lg:h-[80vh] 2xl:h-[80vh]">
        <div className="">
          <button
            disabled={isBeginning}
            onClick={() => swiperRef.current?.swiper.slidePrev()}
            className="text-[#f7c024] disabled:text-gray-400 absolute left-0 top-1/2 z-50"
          >
            <IoIosArrowBack size={60} />
          </button>
          <button
            disabled={isEnd}
            className="text-[#f7c024] disabled:text-gray-400 absolute right-0 top-1/2 z-50"
            onClick={() => swiperRef.current?.swiper.slideNext()}
          >
            <IoIosArrowForward size={60} />
          </button>
        </div>
        <Swiper
          navigation={true}
          onReachEnd={() => (toggleIsEnd(true), toggleIsBeginning(false))}
          onReachBeginning={() => (toggleIsBeginning(true), toggleIsEnd(false))}
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
          slidesPerView={1}
          className="mySwiper mt-10"
        >
          {featuredImages &&
            featuredImages.map((item, index) => {
              if (item.isImage) {
                const title = item.title;
                const imageUrl = constants.baseUrl + item.image;
                return (
                  <SwiperSlide key={index}>
                    <div className="relative w-8/12 mx-auto aspect-video">
                      <Image
                        src={imageUrl}
                        alt={title}
                        onError={(e) => {
                          e.currentTarget.src =
                            '/images/errors/placeholder.webp';
                        }}
                        objectFit="cover"
                        fill
                        sizes="(max-width: 2000px) 75vw, 33vw"
                      />
                    </div>
                  </SwiperSlide>
                );
              } else {
                const videoURL = item.videoURL;
                return (
                  <SwiperSlide key={index}>
                    <div
                      className="video-thumb relative"
                      onClick={() => {
                        // openVidModal(videoURL ?? '');
                      }}
                      style={{ animationDuration: '.3s' }}
                    >
                      <Image
                        src={
                          item.thumbnail
                            ? item.thumbnail
                            : '/images/errors/placeholder.webp'
                        }
                        alt="video thumbnail"
                        className="thumbnail_img"
                        onError={(e) => {
                          e.currentTarget.src =
                            '/images/errors/placeholder.webp';
                        }}
                        width={100}
                        height={100}
                        quality={100}
                        sizes="(max-width: 1200px) 50vw, 33vw"
                      />
                      <Image
                        src="/icons/play.svg"
                        alt="play svg image"
                        className="play_icon"
                        onError={(e) => {
                          e.currentTarget.src =
                            '/images/errors/placeholder.webp';
                        }}
                        width={100}
                        height={100}
                        quality={75}
                        sizes="(max-width: 1200px) 50vw, 33vw"
                      />
                    </div>
                  </SwiperSlide>
                );
              }
            })}
        </Swiper>
      </section>

      <div className="transition-box">
        <h2>
          <div className="corner-border--open" />
          Gallery
          <div className="corner-border--close" />
        </h2>
      </div>

      <section className="gallery-section ">
        <div className="images-list parallax-container">
          {imagesNVideos &&
            imagesNVideos.map((item, index) => {
              if (item.isImage) {
                return (
                  <div
                    key={item.id}
                    className="image_container"
                    onClick={() => {
                      // openModal(constants.baseUrl + item.image);
                    }}
                  >
                    <Image
                      src={constants.baseUrl + item.image}
                      alt={item.title}
                      onError={(e) => {
                        e.currentTarget.src = '/images/errors/placeholder.webp';
                      }}
                      width={100}
                      height={100}
                      quality={75}
                      sizes="(max-width: 1200px) 50vw, 33vw"
                    />
                  </div>
                );
              } else {
                return (
                  <div
                    className="video-thumb relative"
                    onClick={() => {
                      // openVidModal(item.videoURL ?? '');
                    }}
                    style={{ animationDuration: '.3s' }}
                    key={index}
                  >
                    <Image
                      src={constants.baseUrl + item.thumbnail}
                      alt="video thumbnail"
                      className="thumbnail_img"
                      onError={(e) => {
                        e.currentTarget.src = '/images/errors/placeholder.webp';
                      }}
                      width={100}
                      height={100}
                      quality={75}
                      sizes="(max-width: 1200px) 50vw, 33vw"
                    />
                    <Image
                      src="/icons/play.svg"
                      alt="play svg image"
                      className="play_icon"
                      width={100}
                      height={100}
                      quality={75}
                      sizes="(max-width: 1200px) 50vw, 33vw"
                    />
                  </div>
                );
              }
            })}
        </div>
      </section>
    </main>
  );
}
