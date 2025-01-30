import { apiPaths } from "@/core/api/apiConstants";
import { baseApi } from "@/core/api/apiQuery";
import { PaginatedResponseType } from "@/core/types/responseTypes";
import { BlogCategoryType, BlogType } from "./blogType";

const blogApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getAllBlog: builder.query<
            PaginatedResponseType<BlogType>,
            number
        >({
            query: (pageNumber) =>
                `${apiPaths.blogUrl}?page=${pageNumber}`,
            providesTags: (response) =>
                response?.results
                    ? [
                        ...response.results.map(
                            ({ id }) => ({ type: 'Blog', id }) as const
                        ),
                        { type: 'Blog', id: 'LIST' },
                    ]
                    : [{ type: 'Blog', id: 'LIST' }],
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

        getEachBlog: builder.query<BlogType, number>({
            query: (blogId) => `${apiPaths.blogUrl}${`${blogId}`}`,
            providesTags: (result, error, id) => {
                return [{ type: 'Blog', id }];
            },
            serializeQueryArgs: ({ queryArgs, endpointName }) => {
                return endpointName + "-" + queryArgs;
            },
            async onQueryStarted(payload, { queryFulfilled }) {
                try {
                    await queryFulfilled;
                } catch (err) {
                    console.log(err);
                }
            },
        }),
        // blog-category
        getAllBlogCategory: builder.query<
            PaginatedResponseType<BlogCategoryType>,
            number
        >({
            query: (pageNumber) =>
                `${apiPaths.blogCatrgoryUrl}?page=${pageNumber}`,
            providesTags: (response) =>
                response?.results
                    ? [
                        ...response.results.map(
                            ({ id }) => ({ type: 'BlogCategory', id }) as const
                        ),
                        { type: 'BlogCategory', id: 'LIST' },
                    ]
                    : [{ type: 'BlogCategory', id: 'LIST' }],
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

export default blogApi;