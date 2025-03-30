'use client';

import { useAppDispatch, useAppSelector } from '@/core/redux/hooks';
import { RootState } from '@/core/redux/store';
import packagesApi from '@/modules/packages/packagesApi';
import { PackagesDataType } from '@/modules/packages/packagesType';
import Link from 'next/link';
import { useParams, useSearchParams } from 'next/navigation';
import { useEffect } from 'react';
import { FaLocationDot } from 'react-icons/fa6';
import {
  IoCheckmarkDoneCircleOutline,
  IoCloseCircleOutline,
  IoTimeOutline,
} from 'react-icons/io5';
import BookingForm from './(components)/BookingForm';

const Booking = () => {
  const dispatch = useAppDispatch();
  const params = useParams();

  useEffect(() => {
    if (params.slug) {
      dispatch(
        packagesApi.endpoints.getPackage.initiate(params.slug as string)
      );
    }
  }, [dispatch, params]);

  const packageData = useAppSelector(
    (state: RootState) =>
      state.baseApi.queries[`getPackage`]?.data as PackagesDataType
  );

  const payment = useSearchParams().get('payment');

  return (
    <main className="bg-custom-gray">
      <div
        className="relative z-0 h-[50vh] sm:h-[70vh] w-full bg-no-repeat bg-cover bg-center"
        style={{
          backgroundImage:
            packageData?.cover_image && `url(${packageData.cover_image})`,
        }}
      >
        <div className="relative z-50 container mx-auto h-[40vh] sm:h-[60vh] px-6 sm:px-0 flex items-end">
          <div>
            <h1 className="text-4xl text-white capitalize font-black">
              {packageData?.title}
            </h1>
            <p className="text-base text-white capitalize font-light flex items-center gap-2">
              <FaLocationDot /> {packageData?.address}
            </p>
            <p className="text-base text-white capitalize font-light flex items-center gap-2">
              <IoTimeOutline /> Duration: {packageData?.duration}
            </p>
            <p className="text-base text-white font-light">
              Starting from{' '}
              <span className="text-[#fbc200]">
                {packageData?.currency === 'USD' ? '$' : 'NPR.'}
                {packageData?.price
                  ? parseFloat(packageData.price).toFixed(
                      packageData.currency === 'USD' ? 2 : 0
                    )
                  : '-'}
              </span>
              {packageData?.pricing_type === 'fixed' ? '' : '/p'}
            </p>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 top-0 right-0 bg-gradient-to-t from-custom-blue to-transparent"></div>
      </div>
      <div className="container mx-auto relative pb-20">
        <div className="relative -top-14">
          {payment != undefined || payment == 'cancel' ? (
            <div className="max-w-4xl mx-4 md:mx-auto bg-white shadow-xl rounded-lg">
              {payment == 'success' ? (
                <div className="flex flex-col items-center p-8">
                  <IoCheckmarkDoneCircleOutline size={80} />
                  <div className="text-lg font-bold">Booked successfully.</div>
                  <div className="text-sm text-center">
                    You will be contacted shortly through your phone number or
                    email.
                  </div>
                </div>
              ) : payment == 'failed' ? (
                <div className="flex flex-col items-center p-8">
                  <IoCloseCircleOutline size={80} className="text-red-500" />
                  <div className="text-lg font-bold">Booking failed.</div>
                  <div className="text-sm text-center">
                    Please try booking again or contact us.
                  </div>
                  <Link
                    href={`/packages/${params.slug}`}
                    type="submit"
                    className={
                      'text-white text-sm mt-4 bg-custom-blue hover:bg-opacity-95 hover:shadow-lg py-2 px-4 rounded-md'
                    }
                  >
                    Go back to package
                  </Link>
                </div>
              ) : payment == 'cancel' ? (
                <div className="flex flex-col items-center p-8">
                  <IoCloseCircleOutline size={80} className="text-red-500" />
                  <div className="text-lg font-bold">Booking cancelled.</div>
                  <div className="text-sm text-center">
                    Please try booking again or contact us.
                  </div>
                  <Link
                    href={`/packages/${params.slug}`}
                    type="submit"
                    className={
                      'text-white text-sm mt-4 bg-custom-blue hover:bg-opacity-95 hover:shadow-lg py-2 px-4 rounded-md'
                    }
                  >
                    Go back to package
                  </Link>
                </div>
              ) : (
                <></>
              )}
            </div>
          ) : (
            <BookingForm />
          )}
        </div>
      </div>
    </main>
  );
};

export default Booking;
