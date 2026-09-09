import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { fetchRoutes, fetchLastRoutes, searchCities } from '../../api';

export interface SearchState {
  params: {
    from_city_id: string | null;
    to_city_id: string | null;
    date_start: string | null;
    date_end: string | null;
    have_first_class: boolean;
    have_second_class: boolean;
    have_third_class: boolean;
    have_fourth_class: boolean;
    have_wifi: boolean;
    have_air_conditioning: boolean;
    have_express: boolean;
    price_from: number | null;
    price_to: number | null;
    start_departure_hour_from: number | null;
    start_departure_hour_to: number | null;
    start_arrival_hour_from: number | null;
    start_arrival_hour_to: number | null;
    limit: number;
    offset: number;
    sort: 'date' | 'price' | 'duration' | null;
  };
  routes: unknown[];
  total_count: number;
  lastRoutes: unknown[];
  cities: unknown[];
  status: 'idle' | 'loading' | 'success' | 'error';
  error: string | null;
}

const initialState: SearchState = {
  params: {
    from_city_id: null,
    to_city_id: null,
    date_start: null,
    date_end: null,
    have_first_class: false,
    have_second_class: false,
    have_third_class: false,
    have_fourth_class: false,
    have_wifi: false,
    have_air_conditioning: false,
    have_express: false,
    price_from: null,
    price_to: null,
    start_departure_hour_from: null,
    start_departure_hour_to: null,
    start_arrival_hour_from: null,
    start_arrival_hour_to: null,
    limit: 5,
    offset: 0,
    sort: null,
  },
  routes: [],
  total_count: 0,
  lastRoutes: [],
  cities: [],
  status: 'idle',
  error: null,
};

export const searchRoutes = createAsyncThunk(
  'search/searchRoutes',
  async (params: SearchState['params']) => {
    const response = await fetchRoutes(params);
    return response;
  }
);

export const getLastRoutes = createAsyncThunk(
  'search/getLastRoutes',
  async () => {
    const response = await fetchLastRoutes();
    return response;
  }
);

export const getCities = createAsyncThunk(
  'search/getCities',
  async (name: string) => {
    const response = await searchCities(name);
    return response;
  }
);

const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    setParams(state, action: PayloadAction<Partial<SearchState['params']>>) {
      state.params = { ...state.params, ...action.payload };
    },
    resetParams(state) {
      state.params = initialState.params;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(searchRoutes.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(searchRoutes.fulfilled, (state, action) => {
        state.status = 'success';
        state.routes = action.payload.items;
        state.total_count = action.payload.total_count;
      })
      .addCase(searchRoutes.rejected, (state, action) => {
        state.status = 'error';
        state.error = action.error.message || 'Ошибка загрузки направлений';
      })
      .addCase(getLastRoutes.fulfilled, (state, action) => {
        state.lastRoutes = action.payload;
      })
      .addCase(getCities.fulfilled, (state, action) => {
        state.cities = action.payload;
      });
  },
});

export const { setParams, resetParams } = searchSlice.actions;
export default searchSlice.reducer;
