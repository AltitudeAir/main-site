import { configureStore } from '@reduxjs/toolkit';
// import bookingReducer from '../../modules/bookings/bookingSlice';
import { rtkQueryErrorLogger } from '../api/apiMiddleware';
import { baseApi } from '../api/apiQuery';

export const makeStore = () => {
    return configureStore({
        reducer: {
            baseApi: baseApi.reducer,
            // booking: bookingReducer,
        },
        middleware(getDefaultMiddleware) {
            return getDefaultMiddleware()
                .concat(baseApi.middleware)
                .concat(rtkQueryErrorLogger);
        },
    })
}

// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']