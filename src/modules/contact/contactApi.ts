import { apiPaths } from '@/core/api/apiConstants';
import { baseApi } from '@/core/api/apiQuery';
import { toast } from 'react-toastify';
import { ContactFormType } from './contactType';

const contactApi = baseApi
  .enhanceEndpoints({ addTagTypes: ['Contacts'] })
  .injectEndpoints({
    endpoints: (builder) => ({
      postContactUs: builder.mutation<any, ContactFormType>({
        query: ({ ...payload }) => {
          const data = {
            ...payload,
            phone: payload.tel,
            date: payload.date.toISOString().split('T')[0],
          };

          return {
            url: `${apiPaths.contactUsUrl}`,
            method: 'POST',
            body: data,
            // formData: true,
          };
        },
        invalidatesTags: [{ type: 'Contacts', id: 'LIST' }],
        async onQueryStarted(payload, { queryFulfilled }) {
          try {
            const response = await queryFulfilled;
            toast.success(response.data.message);
          } catch (err) {
            console.log(err);
            toast.error('Opps! Message add failed.');
          }
        },
        transformResponse: (response: any) => {
          return response as any;
        },
      }),
    }),
    overrideExisting: true,
  });

export default contactApi;
