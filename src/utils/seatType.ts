export type SeatType = 'top' | 'bottom' | 'side';

export const getSeatType = (
  index: number,
  classType: 'first' | 'second' | 'third' | 'fourth'
): SeatType => {
  if (classType === 'third' && index > 32) {
    return 'side';
  }

  if (classType === 'first' || classType === 'fourth') {
    return 'bottom';
  }

  return index % 2 === 0 ? 'top' : 'bottom';
};

export const getSeatPrice = (
  coach: {
    price: number;
    top_price: number;
    bottom_price: number;
    side_price: number;
  },
  seatType: SeatType
): number => {
  if (seatType === 'top') {
    return coach.top_price;
  }
  if (seatType === 'side') {
    return coach.side_price;
  }
  return coach.bottom_price || coach.price;
};
