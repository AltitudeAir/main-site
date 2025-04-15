import { apiPaths } from '@/core/api/apiConstants';
import { baseApi } from '@/core/api/apiQuery';
import { GalleryDataType } from './galleryType';

const galleryApi = baseApi
  .enhanceEndpoints({ addTagTypes: ['Gallery'] })
  .injectEndpoints({
    endpoints: (builder) => ({
      getAllGallery: builder.query<GalleryDataType[], void>({
        query: () => `${apiPaths.allGalleryUrl}`,
        providesTags: (response: any) =>
          response
            ? [
                ...(response?.data?.map(
                  ({ id }: { id: number }) => ({ type: 'Gallery', id }) as const
                ) ?? []),
                { type: 'Gallery', id: 'LIST' },
              ]
            : [{ type: 'Gallery', id: 'LIST' }],
        serializeQueryArgs: ({ endpointName }) => {
          return endpointName;
        },
        forceRefetch({ currentArg, previousArg }) {
          return currentArg !== previousArg;
        },
        transformResponse: (response: any) => {
          return response.data as GalleryDataType[];
        },
      }),
    }),
    overrideExisting: true,
  });

export default galleryApi;
