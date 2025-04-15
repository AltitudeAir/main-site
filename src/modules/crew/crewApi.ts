import { apiPaths } from '@/core/api/apiConstants';
import { baseApi } from '@/core/api/apiQuery';
import { CrewsType } from './crewType';

const crewApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllCrew: builder.query<CrewsType[], void>({
      query: () => `${apiPaths.crewallUrl}`,
      providesTags: (response) =>
        response
          ? [
              ...response.map(({ id }) => ({ type: 'Crew', id }) as const),
              { type: 'Crew', id: 'LIST' },
            ]
          : [{ type: 'Crew', id: 'LIST' }],
      serializeQueryArgs: ({ endpointName }) => endpointName,

      async onQueryStarted(_, { queryFulfilled }) {
        try {
          await queryFulfilled;
        } catch (err) {
          console.log(err);
        }
      },
      forceRefetch() {
        return true;
      },
    }),
  }),
  overrideExisting: true,
});

export default crewApi;
