import { apiPaths } from '@/core/api/apiConstants';
import { baseApi } from '@/core/api/apiQuery';
import { FooterResultType } from './footerType';

export const footerTag = 'Footer';

const footerApi = baseApi
  .enhanceEndpoints({ addTagTypes: [footerTag] })
  .injectEndpoints({
    endpoints: (builder) => ({
      getAllFooters: builder.query<FooterResultType, void>({
        query: () => `${apiPaths.allNewsUrl}`,
        serializeQueryArgs: ({ endpointName }) => {
          return endpointName;
        },
      }),
    }),
    overrideExisting: true,
  });

export default footerApi;
