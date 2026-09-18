import type { Passenger } from '../store/slices/bookingSlice';

export interface ValidationError {
  field: keyof Passenger;
  message: string;
}

const NAME_REGEX = /^[А-Яа-яЁё\s-]+$/;
const DATE_REGEX = /^\d{2}\/\d{2}\/\d{4}$/;

const getAge = (value: string): number => {
  const [day, month, year] = value.split('/').map(Number);
  const today = new Date();
  let age = today.getFullYear() - year;
  if (
    today.getMonth() + 1 < month ||
    (today.getMonth() + 1 === month && today.getDate() < day)
  ) {
    age -= 1;
  }
  return age;
};

const validateBirthday = (value: string): string | null => {
  if (!DATE_REGEX.test(value)) {
    return 'Неверная дата';
  }
  const [day, month, year] = value.split('/').map(Number);
  if (month < 1 || month > 12) {
    return 'Неверная дата';
  }
  const daysInMonth = new Date(year, month, 0).getDate();
  if (day < 1 || day > daysInMonth) {
    return 'Неверная дата';
  }
  const age = getAge(value);
  if (age < 0 || age > 120) {
    return 'Неверная дата';
  }
  return null;
};

export const validatePassenger = (passenger: Passenger): ValidationError[] => {
  const errors: ValidationError[] = [];

  if (!passenger.lastName.trim()) {
    errors.push({ field: 'lastName', message: 'Укажите фамилию' });
  } else if (!NAME_REGEX.test(passenger.lastName)) {
    errors.push({ field: 'lastName', message: 'Только русские буквы' });
  }

  if (!passenger.firstName.trim()) {
    errors.push({ field: 'firstName', message: 'Укажите имя' });
  } else if (!NAME_REGEX.test(passenger.firstName)) {
    errors.push({ field: 'firstName', message: 'Только русские буквы' });
  }

  if (passenger.patronymic && !NAME_REGEX.test(passenger.patronymic)) {
    errors.push({ field: 'patronymic', message: 'Только русские буквы' });
  }

  if (!passenger.birthday.trim()) {
    errors.push({ field: 'birthday', message: 'Укажите дату рождения' });
  } else {
    const dateError = validateBirthday(passenger.birthday);
    if (dateError) {
      errors.push({ field: 'birthday', message: dateError });
    }
  }

  if (!passenger.documentData.trim()) {
    errors.push({ field: 'documentData', message: 'Укажите номер документа' });
  }

  return errors;
};
