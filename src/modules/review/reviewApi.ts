import { apiPaths } from '@/core/api/apiConstants';
import { baseApi } from '@/core/api/apiQuery';
import { PaginatedResponseType } from '@/core/types/responseTypes';
import { ReviewType } from './reviewType';

export const reviewTag = 'Review';

const reviewApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllReview: builder.query<PaginatedResponseType<ReviewType>, number>({
      query: (pageNumber) => `${apiPaths.reviewurl}?page=${pageNumber}`,
      providesTags: (response) =>
        response?.results
          ? [
              ...response.results.map(
                ({ id }) => ({ type: reviewTag, id }) as const
              ),
              { type: reviewTag, id: 'LIST' },
            ]
          : [{ type: reviewTag, id: 'LIST' }],
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

export default reviewApi;
