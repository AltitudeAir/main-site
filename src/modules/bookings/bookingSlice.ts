// // src/redux/bookingSlice.js
// import { createSlice, PayloadAction } from '@reduxjs/toolkit';
// import { BookingSliceType } from './bookingType';

// const initialState: BookingSliceType = {
//     departureDate: undefined,
//     totalPerson: undefined,
//     package: undefined
// };

// const bookingSlice = createSlice({
//     name: 'booking',
//     initialState,
//     reducers: {
//         setBookingDetails: (state, action: PayloadAction<BookingSliceType>) => {
//             state = { ...state, ...action.payload }
//         },
//         resetBookingDetails: (state) => {
//             state.package = initialState.package
//             state.departureDate = initialState.departureDate;
//             state.totalPerson = initialState.totalPerson;
//         }
//     },
// });

// export const { setBookingDetails, resetBookingDetails } = bookingSlice.actions;
// export default bookingSlice.reducer;
