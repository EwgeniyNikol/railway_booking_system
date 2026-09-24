import type { Passenger } from '../store/slices/bookingSlice';

export interface ValidationError {
  field: keyof Passenger;
  message: string;
}

export const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

const NAME_REGEX = /^[А-Яа-яЁё\s-]+$/;
const DATE_REGEX = /^\d{2}\/\d{2}\/\d{4}$/;
const PASSPORT_REGEX = /^\d{10}$/;
const BIRTH_CERT_REGEX = /^[IVX]{1,4}-[А-ЯЁ]{2}-\d{6}$/;

export const getAge = (value: string): number | null => {
  if (!DATE_REGEX.test(value)) return null;
  const [day, month, year] = value.split('/').map(Number);
  if (month < 1 || month > 12) return null;
  const daysInMonth = new Date(year, month, 0).getDate();
  if (day < 1 || day > daysInMonth) return null;
  const today = new Date();
  let age = today.getFullYear() - year;
  if (
    today.getMonth() + 1 < month ||
    (today.getMonth() + 1 === month && today.getDate() < day)
  ) {
    age -= 1;
  }
  if (age < 0 || age > 120) return null;
  return age;
};

const validateBirthday = (value: string): string | null => {
  if (getAge(value) === null) {
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
    } else {
      const age = getAge(passenger.birthday);
      if (age !== null) {
        if (passenger.isAdult && age < 18) {
          errors.push({
            field: 'isAdult',
            message: 'Возраст не соответствует типу пассажира',
          });
        }
        if (passenger.isChild && age >= 18) {
          errors.push({
            field: 'isChild',
            message: 'Возраст не соответствует типу пассажира',
          });
        }
      }
    }
  }

  if (!passenger.documentData.trim()) {
    errors.push({
      field: 'documentData',
      message: 'Укажите номер документа',
    });
  } else if (passenger.documentType === 'passport') {
    if (!PASSPORT_REGEX.test(passenger.documentData)) {
      errors.push({
        field: 'documentData',
        message: 'Номер паспорта указан некорректно. Пример: 4204 380694',
      });
    }
  } else if (!BIRTH_CERT_REGEX.test(passenger.documentData)) {
    errors.push({
      field: 'documentData',
      message:
        'Номер свидетельства о рождении указан некорректно. Пример: VIII-ЫП-123456',
    });
  }

  return errors;
};
