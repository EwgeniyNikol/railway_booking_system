import { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getCities } from '../../../store/slices/searchSlice';
import { capitalizeCity } from '../../../utils/format';
import { CITY_REGEX } from '../../../utils/validation';
import type { RootState, AppDispatch } from '../../../store/store';
import styles from './CityInput.module.scss';

type City = {
  _id: string;
  name: string;
};

type CityInputProps = {
  value: string;
  onChange: (value: string) => void;
  onSelect: (city: City) => void;
  placeholder?: string;
  className?: string;
};

const CityInput = ({
  value,
  onChange,
  onSelect,
  placeholder,
  className,
}: CityInputProps) => {
  const dispatch = useDispatch<AppDispatch>();
  const cities = useSelector(
    (state: RootState) => state.search.cities
  ) as City[];
  const [open, setOpen] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (value.length < 2) {
      return;
    }

    const timer = setTimeout(() => {
      dispatch(getCities(value));
    }, 300);

    return () => clearTimeout(timer);
  }, [value, dispatch]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleSelect = (city: City) => {
    onChange(capitalizeCity(city.name));
    onSelect(city);
    setOpen(false);
  };

  return (
    <div className={styles.cityInput} ref={wrapperRef}>
      <input
        type="text"
        value={value}
        placeholder={placeholder}
        onChange={(e) => {
          if (CITY_REGEX.test(e.target.value)) {
            onChange(e.target.value);
            setOpen(true);
          }
        }}
        onFocus={() => setOpen(true)}
        className={className}
      />
      {open && value.length >= 2 && cities.length > 0 && (
        <ul className={styles.cityInput__list}>
          {cities.map((city) => (
            <li
              key={city._id}
              className={styles.cityInput__item}
              onClick={() => handleSelect(city)}
            >
              {capitalizeCity(city.name)}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default CityInput;