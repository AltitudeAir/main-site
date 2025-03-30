'use client';
import { useAppDispatch, useAppSelector } from '@/core/redux/hooks';
import { RootState } from '@/core/redux/store';
import { PaginatedResponseType } from '@/core/types/responseTypes';
import CalendarPicker from '@/core/ui/components/CalendarPicker';
import SelectInput from '@/core/ui/components/SelectInput';
import availableSeatsApi from '@/modules/availableSeats/avaiableSeatsApi';
import { AvailableSeatsDataType } from '@/modules/availableSeats/avaiableSeatsType';
// import { setBookingDetails } from '@/modules/bookings/bookingSlice';
import { PackagesDataType } from '@/modules/packages/packagesType';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

// export const options = [
//   { value: '1', label: '1 Traveler' },
//   { value: '2', label: '2 Travelers' },
//   { value: '3', label: '3 Travelers' },
//   { value: '4', label: '4 Travelers' },
//   { value: '5', label: '5 Travelers' },
//   { value: '5', label: '5 Travelers' },
// ];

interface Option {
  value: string;
  label: string;
}

export const months: Record<number, string> = {
  0: 'Jan',
  1: 'Feb',
  2: 'Mar',
  3: 'Apr',
  4: 'May',
  5: 'Jun',
  6: 'Jul',
  7: 'Aug',
  8: 'Sept',
  9: 'Oct',
  10: 'Nov',
  11: 'Dec',
};

const BookingMainCard = ({
  packageData,
}: {
  packageData: PackagesDataType;
}) => {
  const router = useRouter();

  const [departureDate, setDepartureDate] = useState<Date>(new Date());
  const [selectedOption, setSelectedOption] = useState<{
    value: string;
    label: string;
  }>({ value: '', label: '' });

  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useAppDispatch();

  const generateOptions = (n: number) => {
    return Array.from({ length: n }, (_, i) => ({
      value: (i + 1).toString(),
      label: `${i + 1} Traveler${i + 1 > 1 ? 's' : ''}`,
    }));
  };
  const initialOptions = generateOptions(packageData.max_size ?? 5);
  const [options, setOptions] = useState<Option[]>(initialOptions);

  useEffect(() => {
    setIsLoading(true);
    dispatch(
      availableSeatsApi.endpoints.getAvailableSeats.initiate(packageData.slug)
    )
      .then(() => {
        setIsLoading(false);
      })
      .catch((error: any) => {
        setIsLoading(false);
        console.error('Error fetching available seats:', error);
      });
  }, [dispatch, packageData.slug]);

  const availableSeats = useAppSelector(
    (state: RootState) =>
      state.baseApi.queries[`getAvailableSeats`]
        ?.data as PaginatedResponseType<AvailableSeatsDataType>
  );

  return (
    <>
      <div className="relative container mx-auto min-h-20 z-20">
        <div className="absolute -top-12 left-1/2 -translate-x-1/2 min-w-72 w-11/12 sm:w-full md:w-3/4 lg:w-2/3 xl:w-1/2 grid sm:grid-cols-12 grid-cols-9 content-stretch place-content-center items-stretch bg-custom-gray border border-custom-gray-light rounded-lg shadow-md px-3">
          <div className="col-span-3 first-of-type:border-0 border-l border-custom-gray-light py-3 first-of-type:ps-0 ps-3 hover:bg-custom-blue/10 cursor-pointer">
            <CalendarPicker
              customElement={true}
              onDateSelect={(date) => {
                setDepartureDate(date);
              }}
              hasAvailableSeats={(seats: number | null) => {
                if (seats != null && packageData.max_size) {
                  setOptions(generateOptions(seats));
                }
              }}
              availableSeats={availableSeats && availableSeats.results}
            >
              <p className="text-xs sm:text-base text-custom-blue capitalize font-normal">
                Departure Date
              </p>
              <p
                className={`text-sm sm:text-xl capitalize font-bold ${departureDate ? 'text-custom-blue' : 'text-custom-blue/50'}`}
              >
                {departureDate
                  ? `${departureDate.getDate()} ${months[departureDate.getMonth()]} ${departureDate.getFullYear()}`
                  : 'Month Days Years'}
              </p>
            </CalendarPicker>
          </div>
          <div className="relative col-span-3 first-of-type:border-0 border-l border-custom-gray-light py-3 ps-3 cursor-pointer hover:bg-custom-blue/10">
            {packageData.pricing_type === 'fixed' ? (
              <>
                <p className="text-xs sm:text-base text-custom-blue capitalize font-normal">
                  Travelers
                </p>
                <p className="text-sm sm:text-xl text-custom-blue capitalize font-bold">
                  {packageData.min_size} to {packageData.max_size}
                </p>
              </>
            ) : (
              <SelectInput
                options={options}
                onChange={(selectedOption) => setSelectedOption(selectedOption)}
              />
            )}
          </div>
          <div className="col-span-3 first-of-type:border-0 border-l border-custom-gray-light py-3 ps-3">
            <p className="text-xs sm:text-base text-custom-blue capitalize font-normal">
              Total Price
            </p>
            {packageData.price ? (
              <p className="text-sm sm:text-xl text-custom-blue font-bold">
                {packageData.currency === 'USD' ? '$' : 'NPR.'}
                {packageData.pricing_type === 'per_person'
                  ? `${(parseFloat(packageData.price!) * parseInt(selectedOption.value)).toFixed(packageData.currency === 'USD' ? 2 : 0)} /p`
                  : `${parseFloat(packageData.price).toFixed(packageData.currency === 'USD' ? 2 : 0)} `}
              </p>
            ) : (
              <></>
            )}
          </div>
          <div className="sm:col-span-3 h-full col-span-0 hidden sm:inline-flex py-3 ps-3 cursor-pointer text-right">
            <Link
              href={(() => {
                const params = new URLSearchParams({
                  depart: departureDate.toUTCString(),
                  travellers:
                    packageData.pricing_type === 'fixed'
                      ? ''
                      : selectedOption.value,
                });
                return `/packages/${packageData.slug}/booking?${params.toString()}`;
              })()}
              className="rounded-md text-custom-primary inline-flex items-center bg-custom-blue hover:shadow-md px-3 sm:px-6 text-xs sm:text-lg font-light"
            >
              Book Now
            </Link>
          </div>
        </div>
      </div>
      <Link
        href={(() => {
          const params = new URLSearchParams({
            depart: departureDate.toUTCString(),
            travellers:
              packageData.pricing_type === 'fixed' ? '' : selectedOption.value,
          });
          return `/packages/${packageData.slug}/booking?${params.toString()} `;
        })()}
        className="fixed sm:hidden mb-5 mr-20 rounded-xl border border-white  text-white shadow-xl inline-flex z-50 text-xl items-center bg-custom-blue  bottom-0 right-0 hover:shadow-md px-3 py-2 font-light"
      >
        Book Now
      </Link>
    </>
  );
};

export default BookingMainCard;
