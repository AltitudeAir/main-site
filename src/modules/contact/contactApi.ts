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
          // var formData = new FormData();
          // if (payload.firstName) formData.append('firstName', payload.firstName);
          // if (payload.lastName) formData.append('lastName', payload.lastName);
          // if (payload.date) formData.append('date', payload.date.toISOString());
          // if (payload.details != undefined) formData.append('details', payload.details.toString());
          // if (payload.email) formData.append('email', payload.email);
          // if (payload.tel) formData.append('phone', payload.tel);

          const data = {
            ...payload,
            phone: payload.tel,
            date: `${payload.date.getFullYear()}-${payload.date.getMonth()}-${payload.date.getDate()}`,
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
            await queryFulfilled;
            toast.success(' Message successfully added.');
          } catch (err) {
            console.log(err);
            // toast.error();
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
