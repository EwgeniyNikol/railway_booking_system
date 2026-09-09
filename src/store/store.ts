import { configureStore } from '@reduxjs/toolkit';
import searchReducer from './slices/searchSlice';
import bookingReducer from './slices/bookingSlice';

export const store = configureStore({
  reducer: {
    search: searchReducer,
    booking: bookingReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
