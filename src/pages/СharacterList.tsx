import { memo, useCallback } from 'react';

import { DEBOUNCE_DELAY } from '@/constants';
import { useDebounce, useLoadCharacters } from '@/shared';
import { Layout, Loader, Logo } from '@/shared';
import { useFilterStore } from '@/store';
import { type CharacterFilters } from '@/types';
import { CharacterCard, FilterPanel } from '@/widgets';
import { InfiniteScroll } from '@/widgets';

import './CharacterList.scss';

export const CharacterList: React.FunctionComponent = memo(
  function CharacterList() {
    const { setFilters } = useFilterStore();

    const {
      data,
      fetchNextPage,
      isFetching,
      hasNextPage,
      isLoading,
      isFetchingNextPage
    } = useLoadCharacters();

    const characters = data?.pages.flatMap((page) => page.results) ?? [];

    const handleFilterChange = useCallback((newFilters: CharacterFilters) => {
      setFilters(newFilters);
    }, []);

    const handleName = useCallback((value: CharacterFilters) => {
      setFilters(value);
    }, []);

    const handleInputFilterChange = useDebounce<CharacterFilters>(
      handleName,
      DEBOUNCE_DELAY
    );

    const handleLoadMore = useCallback(() => {
      if (!isFetching && hasNextPage) {
        fetchNextPage();
      }
    }, [isFetching, hasNextPage, fetchNextPage]);

    return (
      <Layout>
        <div className='character-list'>
          <Logo />
          <FilterPanel
            onChangeFilters={handleFilterChange}
            onChangeInput={handleInputFilterChange}
          />

          <div className='character-list__cards-wrapper'>
            {isLoading ? (
              <Loader
                text='Loading characters...'
                size='large'
              />
            ) : (
              <>
                <ul className='character-list__cards'>
                  {characters.length > 0 ? (
                    characters.map((character) => (
                      <li key={character.id}>
                        <CharacterCard character={character} />
                      </li>
                    ))
                  ) : (
                    <span className='character-list__cards-empty-list'>
                      No character found
                    </span>
                  )}
                </ul>
                {hasNextPage && (
                  <InfiniteScroll
                    loadMore={handleLoadMore}
                    isLoading={isFetchingNextPage}
                    hasMore={hasNextPage}
                  />
                )}
              </>
            )}
          </div>
        </div>
      </Layout>
    );
  }
);
