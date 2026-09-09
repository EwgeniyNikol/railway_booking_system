import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { fetchSeats, submitOrder } from '../../api';

export interface SelectedPlace {
  id: string;
  routeDirectionId: string;
  coachId: string;
  seatNumber: number;
  classType: string;
  price: number;
  topPrice?: number;
  bottomPrice?: number;
  sidePrice?: number;
  linensPrice: number;
  wifiPrice: number;
  isLinensIncluded: boolean;
}

export interface Passenger {
  placeId: string;
  firstName: string;
  lastName: string;
  patronymic: string;
  gender: boolean;
  birthday: string;
  documentType: string;
  documentData: string;
  isAdult: boolean;
  isChild: boolean;
}

export interface BookingState {
  selectedRoute: unknown | null;
  selectedPlaces: SelectedPlace[];
  passengers: Passenger[];
  services: {
    linens: boolean;
    wifi: boolean;
    airConditioning: boolean;
  };
  orderStatus: 'idle' | 'loading' | 'success' | 'error';
  orderError: string | null;
}

const initialState: BookingState = {
  selectedRoute: null,
  selectedPlaces: [],
  passengers: [],
  services: {
    linens: false,
    wifi: false,
    airConditioning: false,
  },
  orderStatus: 'idle',
  orderError: null,
};

export const getSeats = createAsyncThunk(
  'booking/getSeats',
  async ({
    routeId,
    params,
  }: {
    routeId: string;
    params: Record<string, string | number | boolean>;
  }) => {
    const response = await fetchSeats(routeId, params);
    return response;
  }
);

export const submitBooking = createAsyncThunk(
  'booking/submitBooking',
  async (order: unknown) => {
    const response = await submitOrder(order);
    return response;
  }
);

const bookingSlice = createSlice({
  name: 'booking',
  initialState,
  reducers: {
    setSelectedRoute(state, action: PayloadAction<unknown>) {
      state.selectedRoute = action.payload;
    },
    addPlace(state, action: PayloadAction<SelectedPlace>) {
      state.selectedPlaces.push(action.payload);
    },
    removePlace(state, action: PayloadAction<string>) {
      state.selectedPlaces = state.selectedPlaces.filter(
        (place) => place.id !== action.payload
      );
      state.passengers = state.passengers.filter(
        (passenger) => passenger.placeId !== action.payload
      );
    },
    addPassenger(state, action: PayloadAction<Passenger>) {
      state.passengers.push(action.payload);
    },
    updatePassenger(
      state,
      action: PayloadAction<{ placeId: string; data: Partial<Passenger> }>
    ) {
      const passenger = state.passengers.find(
        (p) => p.placeId === action.payload.placeId
      );
      if (passenger) {
        Object.assign(passenger, action.payload.data);
      }
    },
    removePassenger(state, action: PayloadAction<string>) {
      state.passengers = state.passengers.filter(
        (passenger) => passenger.placeId !== action.payload
      );
    },
    setServices(
      state,
      action: PayloadAction<Partial<BookingState['services']>>
    ) {
      state.services = { ...state.services, ...action.payload };
    },
    resetBooking(state) {
      state.selectedRoute = null;
      state.selectedPlaces = [];
      state.passengers = [];
      state.services = initialState.services;
      state.orderStatus = 'idle';
      state.orderError = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(submitBooking.pending, (state) => {
        state.orderStatus = 'loading';
      })
      .addCase(submitBooking.fulfilled, (state) => {
        state.orderStatus = 'success';
      })
      .addCase(submitBooking.rejected, (state, action) => {
        state.orderStatus = 'error';
        state.orderError = action.error.message || 'Ошибка оформления заказа';
      });
  },
});

export const {
  setSelectedRoute,
  addPlace,
  removePlace,
  addPassenger,
  updatePassenger,
  removePassenger,
  setServices,
  resetBooking,
} = bookingSlice.actions;
export default bookingSlice.reducer;
