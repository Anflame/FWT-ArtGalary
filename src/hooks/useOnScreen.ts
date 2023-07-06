import React, { useEffect, useState } from 'react';

export const useOnScreen = (
  ref: React.MutableRefObject<HTMLElement | null>,
  rootMargin = '0px',
) => {
  const [isIntersecting, setIntersecting] = useState(false);
  const observer = new IntersectionObserver(
    ([entry]) => {
      setIntersecting(entry.isIntersecting);
    },
    {
      rootMargin,
    },
  );
  useEffect(() => {
    if (ref.current) {
      observer.observe(ref.current);
    }
    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, [observer]);
  return isIntersecting;
};
