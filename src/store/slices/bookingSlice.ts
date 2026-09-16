import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { fetchSeats, submitOrder } from '../../api';
import type { Departure } from '../../types/api';

export interface SelectedPlace {
  coachId: string;
  seatNumber: number;
  classType: 'first' | 'second' | 'third' | 'fourth';
  price: number;
  direction: 'forward' | 'back';
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

export interface CoachApiResponse {
  coach: {
    _id: string;
    name: string;
    class_type: 'first' | 'second' | 'third' | 'fourth';
    have_wifi: boolean;
    have_air_conditioning: boolean;
    price: number;
    top_price: number;
    bottom_price: number;
    side_price: number;
    linens_price: number;
    wifi_price: number;
    is_linens_included: boolean;
    available_seats: number;
    train: string;
  };
  seats: {
    index: number;
    available: boolean;
  }[];
}

export interface BookingState {
  selectedRoute: Departure | null;
  selectedReturnRoute: Departure | null;
  seats: CoachApiResponse[];
  returnSeats: CoachApiResponse[];
  selectedPlaces: SelectedPlace[];
  passengerCount: {
    adults: number;
    children: number;
    childrenWithoutSeat: number;
  };
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
  selectedReturnRoute: null,
  seats: [],
  returnSeats: [],
  selectedPlaces: [],
  passengerCount: {
    adults: 2,
    children: 1,
    childrenWithoutSeat: 0,
  },
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

export const getReturnSeats = createAsyncThunk(
  'booking/getReturnSeats',
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
    setSelectedRoute(state, action: PayloadAction<Departure>) {
      state.selectedRoute = action.payload;
    },
    setSelectedReturnRoute(state, action: PayloadAction<Departure | null>) {
      state.selectedReturnRoute = action.payload;
    },
    setPassengerCount(
      state,
      action: PayloadAction<Partial<BookingState['passengerCount']>>
    ) {
      state.passengerCount = { ...state.passengerCount, ...action.payload };
    },
    togglePlace(state, action: PayloadAction<SelectedPlace>) {
      const { coachId, seatNumber, direction } = action.payload;
      const index = state.selectedPlaces.findIndex(
        (p) =>
          p.coachId === coachId &&
          p.seatNumber === seatNumber &&
          p.direction === direction
      );
      if (index >= 0) {
        state.selectedPlaces.splice(index, 1);
        return;
      }
      const maxPlaces =
        state.passengerCount.adults + state.passengerCount.children;
      const placesForDirection = state.selectedPlaces.filter(
        (p) => p.direction === direction
      );
      if (placesForDirection.length >= maxPlaces) {
        return;
      }
      state.selectedPlaces.push(action.payload);
    },
    clearPlaces(state) {
      state.selectedPlaces = [];
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
      state.selectedReturnRoute = null;
      state.seats = [];
      state.returnSeats = [];
      state.selectedPlaces = [];
      state.passengerCount = initialState.passengerCount;
      state.passengers = [];
      state.services = initialState.services;
      state.orderStatus = 'idle';
      state.orderError = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getSeats.fulfilled, (state, action) => {
        state.seats = action.payload;
      })
      .addCase(getReturnSeats.fulfilled, (state, action) => {
        state.returnSeats = action.payload;
      })
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
  setSelectedReturnRoute,
  setPassengerCount,
  togglePlace,
  clearPlaces,
  addPassenger,
  updatePassenger,
  removePassenger,
  setServices,
  resetBooking,
} = bookingSlice.actions;
export default bookingSlice.reducer;
