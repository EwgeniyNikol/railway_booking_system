export const capitalizeCity = (name: string): string =>
  name
    .split(/[-\s]/)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(name.includes('-') ? '-' : ' ');

export const formatTime = (timestamp: number): string => {
  const date = new Date(timestamp * 1000);
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');
  return `${hours}:${minutes}`;
};

export const formatDuration = (from: number, to: number): string => {
  const diffSec = Math.abs(to - from);
  const hours = Math.floor(diffSec / 3600);
  const minutes = Math.floor((diffSec % 3600) / 60);
  return `${hours} : ${String(minutes).padStart(2, '0')}`;
};

export const formatDate = (value: string): string => {
  const digits = value.replace(/\D/g, '').slice(0, 8);
  const parts: string[] = [];
  if (digits.length > 0) parts.push(digits.slice(0, 2));
  if (digits.length > 2) parts.push(digits.slice(2, 4));
  if (digits.length > 4) parts.push(digits.slice(4, 8));
  return parts.join('/');
};

export const formatDateOnBlur = (value: string): string => {
  const parts = value.split('/');
  if (parts.length !== 3) return value;
  const [day, month, year] = parts;
  if (year.length === 2) {
    return `${day}/${month}/20${year}`;
  }
  return value;
};

export const normalizeCalendarDate = (value: string): string => {
  return value.replace(/\./g, '/');
};
