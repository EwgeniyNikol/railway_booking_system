import { useEffect, useRef, useState } from 'react';

export const useTooltip = (prefix: string) => {
  const [openTooltip, setOpenTooltip] = useState<string | null>(null);
  const ref = useRef<HTMLDivElement>(null);

  const toggle = (type: string) => {
    setOpenTooltip((prev) => (prev === type ? null : type));
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      const isSeatCount = target.closest(`[class*="${prefix}__seatCount"]`);
      const isTooltip = target.closest(`[class*="${prefix}__tooltip"]`);

      if (!isSeatCount && !isTooltip) {
        setOpenTooltip(null);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [prefix]);

  return { openTooltip, toggle, ref };
};
