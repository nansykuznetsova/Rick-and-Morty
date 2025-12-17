import { useCallback, useEffect, useState } from 'react';

import { DEBOUNCE_DELAY, FIRST_PAGE_PAGINATION } from '@/constants';
import { useDebounce, useLoadCharacters } from '@/shared';
import { Layout, Loader, Logo } from '@/shared';
import { type CharacterCardTypes, type CharacterFilters } from '@/types';
import { CharacterCard, FilterPanel } from '@/widgets';
import { InfiniteScroll } from '@/widgets';

import './CharacterList.scss';

export const CharacterList: React.FunctionComponent = () => {
  const {
    characters: loadedCharacters,
    isLoading,
    filters,
    setFilters,
    setPage,
    hasMore,
    isLoadingMore
  } = useLoadCharacters();

  const [characters, setCharacters] = useState<CharacterCardTypes[]>([]);

  // синхронизирует локальное состояние characters с обновлёнными данными loadedCharacters каждый раз, когда они меняются
  useEffect(() => {
    setCharacters(loadedCharacters);
  }, [loadedCharacters]);

  const handleFilterChange = useCallback((newFilters: CharacterFilters) => {
    setFilters((prev) => ({
      ...prev,
      ...newFilters
    }));
    setPage(FIRST_PAGE_PAGINATION);
  }, []);

  const handleName = useCallback((value: CharacterFilters) => {
    setFilters((prev) => ({
      ...prev,
      ...value
    }));
    setPage(FIRST_PAGE_PAGINATION);
  }, []);

  const handleInputFilterChange = useDebounce<CharacterFilters>(
    handleName,
    DEBOUNCE_DELAY
  );

  const handleLoadMore = useCallback(() => {
    if (!isLoading && hasMore) {
      setPage((prev) => prev + 1);
    }
  }, [isLoading, hasMore]);

  const handleEditCharacter = useCallback(
    (updatedCharacter: CharacterCardTypes) => {
      setCharacters((prev) =>
        prev.map((char) =>
          char.id === updatedCharacter.id ? updatedCharacter : char
        )
      );
    },
    []
  );

  return (
    <Layout>
      <div className='character-list'>
        <Logo />
        <FilterPanel
          filters={filters}
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
                      <CharacterCard
                        character={character}
                        onEditCharacter={handleEditCharacter}
                      />
                    </li>
                  ))
                ) : (
                  <span className='character-list__cards-empty-list'>
                    No character found
                  </span>
                )}
              </ul>
              {hasMore && (
                <InfiniteScroll
                  loadMore={handleLoadMore}
                  isLoading={isLoadingMore}
                  hasMore={hasMore}
                />
              )}
            </>
          )}
        </div>
      </div>
    </Layout>
  );
};
