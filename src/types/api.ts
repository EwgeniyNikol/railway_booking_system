export type City = {
  _id: string;
  name: string;
};

export type Station = {
  railway_station_name: string;
  city: City;
  datetime: number;
};

export type PriceInfo = {
  top_price?: number;
  bottom_price?: number;
  side_price?: number;
  price?: number;
  top_seats?: number;
  bottom_seats?: number;
  side_seats?: number;
};

export type Departure = {
  _id: string;
  have_first_class: boolean;
  have_second_class: boolean;
  have_third_class: boolean;
  have_fourth_class: boolean;
  have_wifi: boolean;
  have_air_conditioning: boolean;
  is_express: boolean;
  have_food?: boolean;
  have_linens?: boolean;
  min_price: number;
  duration: number;
  available_seats: number;
  available_seats_info: {
    first?: number;
    second?: number;
    third?: number;
    fourth?: number;
  };
  train: {
    _id: string;
    name: string;
  };
  from: Station;
  to: Station;
  price_info: {
    first?: PriceInfo;
    second?: PriceInfo;
    third?: PriceInfo;
    fourth?: PriceInfo;
  };
};

export type RouteItem = {
  have_first_class: boolean;
  have_second_class: boolean;
  have_third_class: boolean;
  have_fourth_class: boolean;
  have_wifi: boolean;
  have_air_conditioning: boolean;
  is_express: boolean;
  min_price: number;
  available_seats: number;
  available_seats_info: {
    first?: number;
    second?: number;
    third?: number;
    fourth?: number;
  };
  departure: Departure;
  arrival?: Departure;
};

export type Seat = {
  index: number;
  available: boolean;
};

export type CoachClass = 'first' | 'second' | 'third' | 'fourth';

export type Coach = {
  _id: string;
  number: number;
  name: string;
  class_type: CoachClass;
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
  seats: Seat[];
};
