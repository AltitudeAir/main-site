import { apiPaths } from '@/core/api/apiConstants';
import { baseApi } from '@/core/api/apiQuery';
import { FooterResultType } from './footerType';

const footerApi = baseApi
    .enhanceEndpoints({ addTagTypes: ['Footer'] })
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