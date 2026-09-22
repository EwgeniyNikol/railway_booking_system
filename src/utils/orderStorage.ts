import type { Payer } from '../store/slices/bookingSlice';

export interface StoredOrder {
  lastOrderId: string;
  orderTotal: number;
  payer: Payer;
}

const STORAGE_KEY = 'lastOrder';

export const saveOrder = (order: StoredOrder): void => {
  sessionStorage.setItem(STORAGE_KEY, JSON.stringify(order));
};

export const loadOrder = (): StoredOrder | null => {
  const raw = sessionStorage.getItem(STORAGE_KEY);
  if (!raw) return null;
  try {
    return JSON.parse(raw) as StoredOrder;
  } catch {
    return null;
  }
};

export const clearOrder = (): void => {
  sessionStorage.removeItem(STORAGE_KEY);
};
