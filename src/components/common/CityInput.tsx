import { useState, useRef, useEffect } from 'react';
import { searchCities } from '../../api';
import styles from './CityInput.module.scss';

type City = {
  _id: string;
  name: string;
};

type CityInputProps = {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
};

const CityInput = ({
  value,
  onChange,
  placeholder,
  className,
}: CityInputProps) => {
  const [cities, setCities] = useState<City[]>([]);
  const [open, setOpen] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (value.length < 2) {
      return;
    }

    const timer = setTimeout(async () => {
      try {
        const data = await searchCities(value);
        const sorted = [...data].sort((a: City, b: City) =>
          a.name.localeCompare(b.name)
        );
        setCities(sorted);
      } catch {
        setCities([]);
      }
    }, 300);

    return () => clearTimeout(timer);
  }, [value]);

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
    const capitalized = city.name.charAt(0).toUpperCase() + city.name.slice(1);
    onChange(capitalized);
    setOpen(false);
  };

  return (
    <div className={styles.cityInput} ref={wrapperRef}>
      <input
        type="text"
        value={value}
        placeholder={placeholder}
        onChange={(e) => {
          onChange(e.target.value);
          setOpen(true);
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
              {city.name.charAt(0).toUpperCase() + city.name.slice(1)}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default CityInput;
