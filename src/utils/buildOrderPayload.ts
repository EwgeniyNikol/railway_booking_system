import type { RootState } from '../store/store';
import type {
  OrderPayload,
  OrderSeat,
  OrderDirection,
  PersonInfo,
} from '../types/order';
import type { Passenger, SelectedPlace } from '../store/slices/bookingSlice';

const BIRTHDAY_REGEX = /^\d{2}\/\d{2}\/\d{4}$/;
const PASSPORT_REGEX = /^\d{10}$/;

const formatBirthday = (value: string): string => {
  if (!BIRTHDAY_REGEX.test(value)) {
    return '';
  }
  const [day, month, year] = value.split('/');
  return `${year}-${month}-${day}`;
};

const mapDocumentType = (type: string): string => {
  if (type === 'passport') return 'паспорт';
  if (type === 'birth') return 'свидетельство о рождении';
  return type;
};

const formatDocumentData = (data: string, documentType: string): string => {
  if (documentType === 'passport' && PASSPORT_REGEX.test(data)) {
    return `${data.slice(0, 4)} ${data.slice(4)}`;
  }
  return data;
};

const buildPersonInfo = (passenger: Passenger): PersonInfo => ({
  is_adult: passenger.isAdult,
  first_name: passenger.firstName,
  last_name: passenger.lastName,
  patronymic: passenger.patronymic,
  gender: passenger.gender,
  birthday: formatBirthday(passenger.birthday),
  document_type: mapDocumentType(passenger.documentType),
  document_data: formatDocumentData(
    passenger.documentData,
    passenger.documentType
  ),
});

const buildSeats = (
  places: SelectedPlace[],
  passengers: Passenger[],
  childrenWithoutSeat: number
): OrderSeat[] => {
  const sortedPlaces = [...places].sort((a, b) => a.seatNumber - b.seatNumber);

  let childrenSeatLeft = childrenWithoutSeat;

  return sortedPlaces.map((place, index) => {
    const passenger = passengers[index];

    const includeChildrenSeat = passenger.isAdult && childrenSeatLeft > 0;

    if (includeChildrenSeat) {
      childrenSeatLeft -= 1;
    }

    return {
      coach_id: place.coachId,
      person_info: buildPersonInfo(passenger),
      seat_number: place.seatNumber,
      is_child: passenger.isChild,
      include_children_seat: includeChildrenSeat,
    };
  });
};

const buildDirection = (
  routeId: string,
  places: SelectedPlace[],
  passengers: Passenger[],
  childrenWithoutSeat: number
): OrderDirection => ({
  route_direction_id: routeId,
  seats: buildSeats(places, passengers, childrenWithoutSeat),
});

export const buildOrderPayload = (state: RootState): OrderPayload | null => {
  const {
    selectedRoute,
    selectedReturnRoute,
    selectedPlaces,
    passengers,
    passengerCount,
    payer,
  } = state.booking;

  if (!selectedRoute) {
    return null;
  }

  const forwardPlaces = selectedPlaces.filter((p) => p.direction === 'forward');
  const backPlaces = selectedPlaces.filter((p) => p.direction === 'back');

  if (forwardPlaces.length !== passengers.length) {
    return null;
  }

  if (selectedReturnRoute && backPlaces.length !== passengers.length) {
    return null;
  }

  const payload: OrderPayload = {
    user: {
      first_name: payer.firstName,
      last_name: payer.lastName,
      patronymic: payer.patronymic,
      phone: payer.phone,
      email: payer.email,
      payment_method: payer.paymentMethod,
    },
    departure: buildDirection(
      selectedRoute._id,
      forwardPlaces,
      passengers,
      passengerCount.childrenWithoutSeat
    ),
  };

  if (selectedReturnRoute) {
    payload.arrival = buildDirection(
      selectedReturnRoute._id,
      backPlaces,
      passengers,
      passengerCount.childrenWithoutSeat
    );
  }

  return payload;
};
