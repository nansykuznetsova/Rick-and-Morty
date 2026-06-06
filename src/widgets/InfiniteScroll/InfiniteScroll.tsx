import { memo, useEffect, useRef, useState } from 'react';

import { Loader, useThrottle } from '@/shared';
import { ROOT_MARGIN, THROTTLE_DELAY } from '@/shared/config';

interface InfiniteScrollProps {
  loadMore: () => void;
  isLoading?: boolean;
  hasMore?: boolean;
}

export const InfiniteScroll: React.FC<InfiniteScrollProps> = memo(
  function InfiniteScroll({ loadMore, isLoading, hasMore = true }) {
    const loaderRef = useRef<HTMLDivElement | null>(null);
    const [isIntersecting, setIsIntersecting] = useState(false);
    const throttledLoad = useThrottle(loadMore, THROTTLE_DELAY);

    useEffect(() => {
      if (!hasMore) return;
      const target = loaderRef.current;

      const observer = new IntersectionObserver(
        ([entry]) => setIsIntersecting(entry.isIntersecting),
        { rootMargin: ROOT_MARGIN }
      );

      if (target) observer.observe(target);

      return () => observer.disconnect();
    }, [hasMore]);

    useEffect(() => {
      if (isIntersecting && !isLoading && hasMore) {
        throttledLoad();
      }
    }, [isIntersecting, isLoading, hasMore, throttledLoad]);

    return <div ref={loaderRef}>{isLoading && <Loader size='small' />}</div>;
  }
);
