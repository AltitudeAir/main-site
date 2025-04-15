import { apiPaths } from '@/core/api/apiConstants';
import { baseApi } from '@/core/api/apiQuery';
import { PaginatedResponseType } from '@/core/types/responseTypes';
import { AvailableSeatsDataType } from './avaiableSeatsType';

const availableSeatsApi = baseApi
  .enhanceEndpoints({ addTagTypes: ['AvailableSeats'] })
  .injectEndpoints({
    endpoints: (builder) => ({
      getAvailableSeats: builder.query<
        PaginatedResponseType<AvailableSeatsDataType>,
        string
      >({
        query: (slug) => `${apiPaths.getPackages}${slug}/seats`,
        providesTags: (response) =>
          response
            ? [
                ...response.results.map(
                  ({ id }) => ({ type: 'AvailableSeats', id }) as const
                ),
                { type: 'AvailableSeats', id: 'LIST' },
              ]
            : [{ type: 'AvailableSeats', id: 'LIST' }],
        serializeQueryArgs: ({ endpointName }) => {
          return endpointName;
        },
        forceRefetch({ currentArg, previousArg }) {
          return currentArg !== previousArg;
        },
        transformResponse: (response: any) => {
          return response as PaginatedResponseType<AvailableSeatsDataType>;
        },
      }),
    }),
    overrideExisting: true,
  });

export default availableSeatsApi;
