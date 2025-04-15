import { apiPaths } from '@/core/api/apiConstants';
import { baseApi } from '@/core/api/apiQuery';
import { toast } from 'react-toastify';
import { HazardFormType } from './hazardType';

const hazardApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // create booking
    postHazard: builder.mutation<any, HazardFormType>({
      query: (payload) => {
        const data = {
          ...payload,
          date: payload.date.toISOString().split('T')[0],
        };
        return {
          url: `${apiPaths.contactUsUrl}`,
          method: 'POST',
          body: data,
        };
      },
      async onQueryStarted(payload, { queryFulfilled }) {
        try {
          await queryFulfilled;
          toast.success(
            'Your request has been submitted. Check your email or phone for verification.'
          );
        } catch (err) {
          console.log(err);
          toast.error('Error submitting form!');
        }
      },
      transformResponse: (response: any) => {
        return response;
      },
      // invalidatesTags: [{ type: 'Booking', id: 'LIST' }],
    }),
  }),
  overrideExisting: false,
});

export default hazardApi;
