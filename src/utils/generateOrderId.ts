const LETTERS = 'АБВГДЕЖЗИКЛМНОПРСТУФХЦЧШЩЭЮЯ';

export const generateOrderId = (): string => {
  const digits = String(Math.floor(Math.random() * 900) + 100);
  const first = LETTERS[Math.floor(Math.random() * LETTERS.length)];
  const second = LETTERS[Math.floor(Math.random() * LETTERS.length)];
  return `${digits}${first}${second}`;
};
