import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { fetchSeats, submitOrder } from '../../api';
import type { Departure } from '../../types/api';
import type { OrderPayload } from '../../types/order';

export interface SelectedPlace {
  id: string;
  coachId: string;
  seatNumber: number;
  classType: 'first' | 'second' | 'third' | 'fourth';
  price: number;
  direction: 'forward' | 'back';
  linensPrice: number;
  wifiPrice: number;
  airConditioningPrice: number;
  isLinensIncluded: boolean;
}

export interface Passenger {
  passengerId: string;
  placeId: string | null;
  returnPlaceId: string | null;
  firstName: string;
  lastName: string;
  patronymic: string;
  gender: boolean;
  birthday: string;
  documentType: string;
  documentData: string;
  isAdult: boolean;
  isChild: boolean;
  isCollapsed: boolean;
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
    air_conditioning_price?: number;
    is_linens_included: boolean;
    available_seats: number;
    train: string;
  };
  seats: {
    index: number;
    available: boolean;
  }[];
}

export interface Payer {
  firstName: string;
  lastName: string;
  patronymic: string;
  phone: string;
  email: string;
  paymentMethod: 'online' | 'cash';
}

export interface BookingState {
  selectedRoute: Departure | null;
  selectedReturnRoute: Departure | null;
  seats: CoachApiResponse[];
  returnSeats: CoachApiResponse[];
  seatsStatus: 'idle' | 'loading' | 'success' | 'error';
  seatsError: string | null;
  returnSeatsStatus: 'idle' | 'loading' | 'success' | 'error';
  returnSeatsError: string | null;
  selectedPlaces: SelectedPlace[];
  passengerCount: {
    adults: number;
    children: number;
    childrenWithoutSeat: number;
  };
  passengers: Passenger[];
  payer: Payer;
  services: {
    linens: boolean;
    wifi: boolean;
    airConditioning: boolean;
  };
  orderStatus: 'idle' | 'loading' | 'success' | 'error';
  orderError: string | null;
  lastOrderId: string | null;
  orderTotal: number;
  rating: number;
}

export const createPassenger = (
  isAdult: boolean,
  isChild: boolean,
  isCollapsed = false
): Passenger => ({
  passengerId: crypto.randomUUID(),
  placeId: null,
  returnPlaceId: null,
  firstName: '',
  lastName: '',
  patronymic: '',
  gender: true,
  birthday: '',
  documentType: isAdult ? 'passport' : 'birth',
  documentData: '',
  isAdult,
  isChild,
  isCollapsed,
});

const initialPayer: Payer = {
  firstName: '',
  lastName: '',
  patronymic: '',
  phone: '',
  email: '',
  paymentMethod: 'online',
};

const initialState: BookingState = {
  selectedRoute: null,
  selectedReturnRoute: null,
  seats: [],
  returnSeats: [],
  seatsStatus: 'idle',
  seatsError: null,
  returnSeatsStatus: 'idle',
  returnSeatsError: null,
  selectedPlaces: [],
  passengerCount: {
    adults: 1,
    children: 0,
    childrenWithoutSeat: 0,
  },
  passengers: [],
  payer: initialPayer,
  services: {
    linens: false,
    wifi: false,
    airConditioning: false,
  },
  orderStatus: 'idle',
  orderError: null,
  lastOrderId: null,
  orderTotal: 0,
  rating: 0,
};

const removePassengerPlaces = (state: BookingState, passenger: Passenger) => {
  if (passenger.placeId) {
    state.selectedPlaces = state.selectedPlaces.filter(
      (p) => p.id !== passenger.placeId
    );
  }
  if (passenger.returnPlaceId) {
    state.selectedPlaces = state.selectedPlaces.filter(
      (p) => p.id !== passenger.returnPlaceId
    );
  }
};

const syncPassengers = (state: BookingState) => {
  const { adults, children, childrenWithoutSeat } = state.passengerCount;
  const adultsInState = state.passengers.filter((p) => p.isAdult).length;
  const childrenInState = state.passengers.length - adultsInState;

  let needAdults = adults - adultsInState;
  let needChildren = children + childrenWithoutSeat - childrenInState;

  while (needAdults > 0) {
    state.passengers.push(createPassenger(true, false));
    needAdults -= 1;
  }

  while (needChildren > 0) {
    state.passengers.push(createPassenger(false, true));
    needChildren -= 1;
  }

  while (needAdults < 0) {
    const index = state.passengers.findIndex((p) => p.isAdult);
    if (index === -1) break;
    removePassengerPlaces(state, state.passengers[index]);
    state.passengers.splice(index, 1);
    needAdults += 1;
  }

  while (needChildren < 0) {
    const index = state.passengers.findIndex((p) => !p.isAdult);
    if (index === -1) break;
    removePassengerPlaces(state, state.passengers[index]);
    state.passengers.splice(index, 1);
    needChildren += 1;
  }
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
  async (order: OrderPayload) => {
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
      syncPassengers(state);
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
    removePlace(state, action: PayloadAction<string>) {
      state.selectedPlaces = state.selectedPlaces.filter(
        (p) => p.id !== action.payload
      );
    },
    clearPlaces(state) {
      state.selectedPlaces = [];
    },
    initPassengers(state) {
      if (state.passengers.length > 0) {
        return;
      }
      syncPassengers(state);
    },
    togglePassengerCollapsed(state, action: PayloadAction<string>) {
      const passenger = state.passengers.find(
        (p) => p.passengerId === action.payload
      );
      if (passenger) {
        passenger.isCollapsed = !passenger.isCollapsed;
      }
    },
    updatePassenger(
      state,
      action: PayloadAction<{ passengerId: string; data: Partial<Passenger> }>
    ) {
      const passenger = state.passengers.find(
        (p) => p.passengerId === action.payload.passengerId
      );
      if (passenger) {
        Object.assign(passenger, action.payload.data);
      }
    },
    removePassenger(state, action: PayloadAction<string>) {
      const passenger = state.passengers.find(
        (p) => p.passengerId === action.payload
      );
      if (!passenger) return;

      removePassengerPlaces(state, passenger);

      state.passengers = state.passengers.filter(
        (p) => p.passengerId !== action.payload
      );

      if (passenger.isAdult) {
        state.passengerCount = {
          ...state.passengerCount,
          adults: Math.max(0, state.passengerCount.adults - 1),
        };
      } else {
        state.passengerCount = {
          ...state.passengerCount,
          children: Math.max(0, state.passengerCount.children - 1),
        };
      }
    },
    setPayer(state, action: PayloadAction<Partial<Payer>>) {
      state.payer = { ...state.payer, ...action.payload };
    },
    setLastOrderId(state, action: PayloadAction<string>) {
      state.lastOrderId = action.payload;
    },
    setOrderTotal(state, action: PayloadAction<number>) {
      state.orderTotal = action.payload;
    },
    setRating(state, action: PayloadAction<number>) {
      state.rating = action.payload;
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
      state.seatsStatus = 'idle';
      state.seatsError = null;
      state.returnSeatsStatus = 'idle';
      state.returnSeatsError = null;
      state.selectedPlaces = [];
      state.passengerCount = initialState.passengerCount;
      state.passengers = [];
      state.payer = initialPayer;
      state.services = initialState.services;
      state.orderStatus = 'idle';
      state.orderError = null;
      state.lastOrderId = null;
      state.orderTotal = 0;
      state.rating = 0;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getSeats.pending, (state) => {
        state.seatsStatus = 'loading';
      })
      .addCase(getSeats.fulfilled, (state, action) => {
        state.seatsStatus = 'success';
        state.seats = action.payload;
      })
      .addCase(getSeats.rejected, (state, action) => {
        state.seatsStatus = 'error';
        state.seatsError = action.error.message || 'Ошибка загрузки мест';
      })
      .addCase(getReturnSeats.pending, (state) => {
        state.returnSeatsStatus = 'loading';
      })
      .addCase(getReturnSeats.fulfilled, (state, action) => {
        state.returnSeatsStatus = 'success';
        state.returnSeats = action.payload;
      })
      .addCase(getReturnSeats.rejected, (state, action) => {
        state.returnSeatsStatus = 'error';
        state.returnSeatsError =
          action.error.message || 'Ошибка загрузки обратных мест';
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
  removePlace,
  clearPlaces,
  initPassengers,
  togglePassengerCollapsed,
  updatePassenger,
  removePassenger,
  setPayer,
  setLastOrderId,
  setOrderTotal,
  setRating,
  setServices,
  resetBooking,
} = bookingSlice.actions;
export default bookingSlice.reducer;
