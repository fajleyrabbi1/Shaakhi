'use client';

import { useEffect, useRef } from 'react';

interface UseInfiniteScrollOptions {
  threshold?: number;
  rootMargin?: string;
  enabled?: boolean;
}

/**
 * 'useInfiniteScroll' hook uses the IntersectionObserver API to detect when
 * a bottom element (sentinel) enters the viewport, executing a loading callback.
 */
export function useInfiniteScroll(
  onIntersect: () => void,
  options: UseInfiniteScrollOptions = {}
) {
  const { threshold = 0.1, rootMargin = '100px', enabled = true } = options;
  const sentinelRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!enabled || !sentinelRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const firstEntry = entries[0];
        if (firstEntry.isIntersecting) {
          onIntersect();
        }
      },
      {
        threshold,
        rootMargin
      }
    );

    observer.observe(sentinelRef.current);

    return () => {
      observer.disconnect();
    };
  }, [onIntersect, threshold, rootMargin, enabled]);

  return { sentinelRef };
}
