'use client';

import { PaginatedResponseType } from '@/core/types/responseTypes';
import { parseHtml } from '@/core/utils/helper';
import { ReviewType } from '@/modules/review/reviewType';
import Image from 'next/image';
import 'swiper/css';
import 'swiper/css/pagination';
import { Autoplay, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

export default function Reviews({
  reviews,
}: {
  reviews?: PaginatedResponseType<ReviewType>;
}) {
  return (
    <section className="reviews ">
      <div className="review-list mx-auto px-4">
        <h2 className="text-center text-2xl font-bold">TESTIMONIALS</h2>
        {reviews && (
          <Swiper
            pagination={{ dynamicBullets: true }}
            modules={[Pagination, Autoplay]}
            className="mySwiper"
            autoplay
            autoHeight
          >
            {reviews?.results.map((review, index) => (
              <SwiperSlide key={index} className="p-5">
                <div className="review-item py-5 text-center">
                  <h3 className="text-xl font-semibold">{review.title}</h3>
                  <div className="text-gray-700">
                    {parseHtml(review.content)}
                  </div>
                  <h4 className="text-lg font-medium mt-3">{review.author}</h4>
                  <div className="flex justify-center items-center gap-1 mt-2">
                    {[...Array(review.rating)].map((_, i) => (
                      <Image
                        key={i}
                        src="/images/icons/star.svg"
                        alt="*"
                        width={25}
                        height={25}
                      />
                    ))}
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        )}
      </div>
    </section>
  );
}
