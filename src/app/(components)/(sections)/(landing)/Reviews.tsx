'use client';
import { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
// import required modules
import { useAppDispatch, useAppSelector } from '@/core/redux/clientStore';
import { RootState } from '@/core/redux/store';
import { PaginatedResponseType } from '@/core/types/responseTypes';
import { parseHtml } from '@/core/utils/helper';
import reviewApi from '@/modules/review/reviewApi';
import { ReviewType } from '@/modules/review/reviewType';
import Image from 'next/image';
import { Autoplay, Pagination } from 'swiper/modules';

export default function Reviews() {
  const [reviews, setReviews] = useState<ReviewType[] | undefined>([]);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(reviewApi.endpoints.getAllReview.initiate(1));
  }, [dispatch]);

  const sreviewData = useAppSelector(
    (state: RootState) =>
      state.baseApi.queries['getAllReview(1)']
        ?.data as PaginatedResponseType<ReviewType>
  );

  // useEffect(() => {
  //   axiosInst.get('/review/').then((result: any) => {
  //     const data = result.data.data;
  //     setReviews(data);
  //   });
  // }, []);

  return (
    <section className="reviews">
      <div className="review-list">
        <h2 className="text-center ">TESTIMONIALS</h2>
        {sreviewData && (
          <Swiper
            pagination={{
              dynamicBullets: true,
            }}
            modules={[Pagination, Autoplay]}
            className="mySwiper"
            autoplay
          >
            {sreviewData?.results.map((review, index) => {
              return (
                <SwiperSlide key={index}>
                  <div className="review-item cursor-pointer">
                    <h3>{review.title}</h3>
                    {parseHtml(review.content)}
                    <h4>{review.author}</h4>
                    <div className="flex justify-center items-center gap-2 mb-10">
                      {[...Array(review.rating)].map((x, i) => (
                        <Image
                          key={i}
                          src="./images/icons/star.svg"
                          alt="*"
                          width={25}
                          height={25}
                        />
                      ))}
                    </div>
                  </div>
                </SwiperSlide>
              );
            })}
          </Swiper>
        )}
      </div>
    </section>
  );
}
