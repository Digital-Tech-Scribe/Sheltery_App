import { useEffect, useRef, useState } from "react";

export function useScrollReveal<T extends HTMLElement>(
  threshold = 0.22,
  rootMargin = "0px 0px -10% 0px"
) {
  const ref = useRef<T | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;

    if (!node) {
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) {
          return;
        }

        setIsVisible(true);
        observer.unobserve(entry.target);
      },
      {
        threshold,
        rootMargin
      }
    );

    observer.observe(node);

    return () => {
      observer.disconnect();
    };
  }, [rootMargin, threshold]);

  return { ref, isVisible };
}
