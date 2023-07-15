import { useEffect, useRef } from 'react';

export const useOutsideClick = (callback: () => void) => {
  const reference = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        reference.current &&
        !reference.current.contains(event.target as Node) &&
        !document.querySelector('#menu-')?.contains(event.target as Node)
      ) {
        callback();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [callback, reference]);

  return reference;
};
