import { apiPaths } from "@/core/api/apiConstants";
import { baseApi } from "@/core/api/apiQuery";
import { PaginatedResponseType } from "@/core/types/responseTypes";
import { ReviewType } from "./reviewType";

const reviewApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getAllReview: builder.query<
            PaginatedResponseType<ReviewType>,
            number
        >({
            query: (pageNumber) =>
                `${apiPaths.reviewurl}?page=${pageNumber}`,
            providesTags: (response) =>
                response?.results
                    ? [
                        ...response.results.map(
                            ({ id }) => ({ type: 'Review', id }) as const
                        ),
                        { type: 'Review', id: 'LIST' },
                    ]
                    : [{ type: 'Review', id: 'LIST' }],
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