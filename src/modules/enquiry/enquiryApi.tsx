import { apiPaths } from '@/core/api/apiConstants';
import { baseApi } from '@/core/api/apiQuery';
import { toast } from 'react-toastify';
import { EnquirySchemaType } from './enquiryTypes';

const enquiryApi = baseApi
  .enhanceEndpoints({ addTagTypes: ['Enquiries'] })
  .injectEndpoints({
    endpoints: (builder) => ({
      postEnquiry: builder.mutation<any, EnquirySchemaType>({
        query: ({ ...payload }) => {
          const data = {
            count: payload.countForm.count,
            travelDate: `${payload.dateForm.travelDate?.getFullYear()}-${payload.dateForm.travelDate?.getMonth().toString().padStart(2, '0')}-${payload.dateForm.travelDate?.getDate()}`,
            service: payload.destinationForm.service,
            currentLatitude: payload.destinationForm.currentLatitude,
            currentLongitude: payload.destinationForm.currentLongitude,
            destinationLatitude: payload.destinationForm.destinationLatitude,
            destinationLongitude: payload.destinationForm.destinationLongitude,
            minbudget: payload.budgetForm.minbudget,
            maxbudget: payload.budgetForm.maxbudget,
            firstName: payload.infosForm.firstName,
            lastName: payload.infosForm.lastName,
            email: payload.infosForm.email,
            phone: payload.infosForm.phone,
            details: payload.infosForm.details,
          };
          return {
            url: `${apiPaths.enquiryUrl}`,
            method: 'POST',
            body: data,
            // formData: true,
          };
        },
        invalidatesTags: [{ type: 'Enquiries', id: 'LIST' }],
        async onQueryStarted(payload, { queryFulfilled }) {
          try {
            await queryFulfilled;
            toast.success('Enquiry added.');
          } catch (err) {
            console.log(err);
            toast.error('Opps! enquiry failed.');
          }
        },
        transformResponse: (response: any) => {
          return response as any;
        },
      }),
    }),
    overrideExisting: true,
  });

export default enquiryApi;
