import { createSelector } from '@reduxjs/toolkit';
import type { RootState } from '../store';
import type { SelectedPlace } from '../slices/bookingSlice';

export interface TotalPriceBreakdown {
  placesTotal: number;
  linensTotal: number;
  wifiTotal: number;
  airConditioningTotal: number;
  totalPrice: number;
}

export const selectSelectedPlaces = (state: RootState) =>
  state.booking.selectedPlaces;
export const selectServices = (state: RootState) => state.booking.services;

export const selectTotalPrice = createSelector(
  [selectSelectedPlaces, selectServices],
  (places: SelectedPlace[], services): TotalPriceBreakdown => {
    const placesTotal = places.reduce((sum, place) => sum + place.price, 0);

    const linensTotal = places.reduce((sum, place) => {
      if (place.isLinensIncluded) return sum;
      return sum + (services.linens ? place.linensPrice : 0);
    }, 0);

    const wifiTotal = places.reduce(
      (sum, place) => sum + (services.wifi ? place.wifiPrice : 0),
      0
    );

    const airConditioningTotal = places.reduce(
      (sum) => sum + (services.airConditioning ? 100 : 0),
      0
    );

    const totalPrice =
      placesTotal + linensTotal + wifiTotal + airConditioningTotal;

    return {
      placesTotal,
      linensTotal,
      wifiTotal,
      airConditioningTotal,
      totalPrice,
    };
  }
);
