import { apiPaths } from '@/core/api/apiConstants';
import { baseApi } from '@/core/api/apiQuery';
import { PaginatedResponseType } from '@/core/types/responseTypes';
import { RescueMissionType } from './rescue_missionType';

const rescueMissionApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // get all
    getAllRescueMission: builder.query<
      PaginatedResponseType<RescueMissionType>,
      number
    >({
      query: (pageNumber) =>
        `${apiPaths.rescuemissionUrl}?page=${pageNumber}`,
      providesTags: (response) =>
        response?.results
          ? [
            ...response.results.map(
              ({ id }) => ({ type: 'RescueMission', id }) as const
            ),
            { type: 'RescueMission', id: 'LIST' },
          ]
          : [{ type: 'RescueMission', id: 'LIST' }],
      serializeQueryArgs: ({ endpointName, queryArgs }) =>
        `${endpointName}(${queryArgs})`,

      async onQueryStarted(payload, { queryFulfilled }) {
        try {
          await queryFulfilled;
        } catch (err) {
          console.log(err);
        }
      },
      forceRefetch({ currentArg, previousArg }) {
        return currentArg !== previousArg;
      },
    }),

  }),
  overrideExisting: true,
});
export default rescueMissionApi;
