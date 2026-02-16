import { useEffect, useRef } from 'react';

import { Loader } from '@/shared';
import { ROOT_MARGIN } from '@/shared/config';

interface InfiniteScrollProps {
  loadMore: () => void;
  isLoading?: boolean;
  hasMore?: boolean;
}

export const InfiniteScroll: React.FC<InfiniteScrollProps> = ({
  loadMore,
  isLoading,
  hasMore = true
}) => {
  const loaderRef = useRef<HTMLDivElement | null>(null);

  // подгрузка новых данных при прокрутке
  useEffect(() => {
    if (!hasMore) return;
    const target = loaderRef.current;

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (entry.isIntersecting) {
          loadMore();
        }
      },
      {
        rootMargin: ROOT_MARGIN
      }
    );

    if (target) observer.observe(target);

    return () => {
      if (target) observer.unobserve(target);
      observer.disconnect();
    };
  }, [hasMore, loadMore]);

  return <div ref={loaderRef}>{isLoading && <Loader size='small' />}</div>;
};
