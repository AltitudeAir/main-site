import { apiPaths } from '@/core/api/apiConstants';
import { baseApi } from '@/core/api/apiQuery';
import { toast } from 'react-toastify';
import { BookingDetailType, BookingFormType } from './bookingType';

const bookingApi = baseApi
    .enhanceEndpoints({ addTagTypes: ['Bookings'] })
    .injectEndpoints({
        endpoints: (builder) => ({
            createBooking: builder.mutation<BookingDetailType, BookingFormType>({
                query: ({ ...payload }) => {
                    var formData = new FormData();
                    if (payload.package != undefined) formData.append('package', payload.package as string);
                    if (payload.fullName) formData.append('full_name', payload.fullName);
                    if (payload.totalPrice) formData.append('total_price', payload.totalPrice);
                    if (payload.departureDate) formData.append('departure_date', payload.departureDate.toISOString());
                    if (payload.noOfTravelers != undefined) formData.append('no_of_travellers', payload.noOfTravelers.toString());
                    if (payload.email) formData.append('email', payload.email);
                    if (payload.phone) formData.append('phone', payload.phone);
                    if (payload.requirement) formData.append('requirement', payload.requirement);
                    return {
                        url: `${apiPaths.bookingUrl}`,
                        method: 'POST',
                        body: formData,
                        formData: true,
                    };
                },
                invalidatesTags: [{ type: 'Bookings', id: 'LIST' }],
                async onQueryStarted(payload, { queryFulfilled }) {
                    try {
                        await queryFulfilled;
                        toast.success('Bookings added.');
                    } catch (err) {
                        console.log(err);
                        // toast.error();
                        toast.error('Opps! bookings fail.');
                    }
                },
                transformResponse: (response: BookingDetailType) => {
                    return response as BookingDetailType;
                },
            }),
        }),
        overrideExisting: true,
    });

export default bookingApi;