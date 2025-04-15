import { apiPaths } from '@/core/api/apiConstants';
import { baseApi } from '@/core/api/apiQuery';
import { NewsDataType } from './newsType';

const newsApi = baseApi
  .enhanceEndpoints({ addTagTypes: ['News'] })
  .injectEndpoints({
    endpoints: (builder) => ({
      getAllNews: builder.query<NewsDataType[], void>({
        query: () => `${apiPaths.allNewsUrl}`,
        providesTags: (response: any) =>
          response
            ? [
                ...(response?.data?.map(
                  ({ id }: { id: number }) => ({ type: 'News', id }) as const
                ) ?? []),
                { type: 'News', id: 'LIST' },
              ]
            : [{ type: 'News', id: 'LIST' }],
        serializeQueryArgs: ({ endpointName }) => {
          return endpointName;
        },
        forceRefetch({ currentArg, previousArg }) {
          return currentArg !== previousArg;
        },
        transformResponse: (response: any) => {
          return response.data as NewsDataType[];
        },
      }),
      getNewsLimit: builder.query<NewsDataType[], number>({
        query: (arg) => `${apiPaths.newsLimitUrl}${arg}/`,
        providesTags: (response: any) =>
          response
            ? [
                ...(response?.data?.map(
                  ({ id }: { id: number }) => ({ type: 'News', id }) as const
                ) ?? []),
                { type: 'News', id: 'LIST' },
              ]
            : [{ type: 'News', id: 'LIST' }],
        serializeQueryArgs: ({ endpointName }) => {
          return endpointName;
        },
        forceRefetch({ currentArg, previousArg }) {
          return currentArg !== previousArg;
        },
        transformResponse: (response: any) => {
          return response.data as NewsDataType[];
        },
      }),
    }),
    overrideExisting: true,
  });

export default newsApi;
