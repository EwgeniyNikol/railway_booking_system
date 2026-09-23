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
