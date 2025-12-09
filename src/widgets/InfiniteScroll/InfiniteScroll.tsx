import { useEffect, useRef } from 'react';

import { ROOT_MARGIN } from '@/constants';
import { Loader } from '@/shared';

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

  //подгрузка новых данных при прокрутке
  useEffect(() => {
    if (!hasMore) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const target = entries[0];
        if (target.isIntersecting) {
          loadMore();
        }
      },
      {
        rootMargin: ROOT_MARGIN
      }
    );

    if (loaderRef.current) observer.observe(loaderRef.current);

    return () => {
      if (loaderRef.current) observer.unobserve(loaderRef.current);
      observer.disconnect();
    };
  }, [hasMore, loadMore]);

  return <div ref={loaderRef}>{isLoading && <Loader size='small' />}</div>;
};
