const STORAGE_KEY = 'railway_search';
const TTL = 5 * 60 * 60 * 1000;

export interface SearchData {
  fromCity: { _id: string; name: string } | null;
  toCity: { _id: string; name: string } | null;
  dateStart: string;
  dateEnd: string;
}

interface StoredSearch extends SearchData {
  timestamp: number;
}

export const saveSearch = (data: SearchData): void => {
  const payload: StoredSearch = { ...data, timestamp: Date.now() };
  localStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
};

export const loadSearch = (): SearchData | null => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const data: StoredSearch = JSON.parse(raw);
    if (Date.now() - data.timestamp > TTL) {
      localStorage.removeItem(STORAGE_KEY);
      return null;
    }
    return {
      fromCity: data.fromCity,
      toCity: data.toCity,
      dateStart: data.dateStart,
      dateEnd: data.dateEnd,
    };
  } catch {
    localStorage.removeItem(STORAGE_KEY);
    return null;
  }
};

export const clearSearch = (): void => {
  localStorage.removeItem(STORAGE_KEY);
};
