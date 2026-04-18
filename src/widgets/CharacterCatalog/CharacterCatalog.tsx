import { memo, useCallback } from 'react';
import { useTranslation } from 'react-i18next';

import { type CharacterFilters } from '@/entities/character';
import {
  CharacterFiltersPanel,
  EditableCharacterCard,
  useFilterStore,
  useLoadCharacters,
  useUrlFilters
} from '@/features';
import { useDebounce } from '@/shared';
import { Loader, Logo } from '@/shared';
import { DEBOUNCE_DELAY } from '@/shared/config';
import { InfiniteScroll } from '@/widgets';

import './CharacterCatalog.scss';

export const CharacterCatalog: React.FunctionComponent = memo(
  function CharacterCatalog() {
    const { t } = useTranslation();
    const { setFilters } = useFilterStore();
    useUrlFilters();

    const {
      data,
      fetchNextPage,
      isFetching,
      hasNextPage,
      isLoading,
      isFetchingNextPage
    } = useLoadCharacters();

    const characters = data?.pages.flatMap((page) => page.results) ?? [];

    const handleFilterChange = useCallback(
      (newFilters: CharacterFilters) => {
        setFilters(newFilters);
      },
      [setFilters]
    );

    const handleName = useCallback(
      (value: CharacterFilters) => {
        setFilters(value);
      },
      [setFilters]
    );

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
      <div className='character-list'>
        <Logo />
        <CharacterFiltersPanel
          onChangeFilters={handleFilterChange}
          onChangeInput={handleInputFilterChange}
        />

        <div className='character-list__cards-wrapper'>
          {isLoading ? (
            <Loader
              text={t('loading.characters')}
              size='large'
            />
          ) : (
            <>
              <ul className='character-list__cards'>
                {characters.length > 0 ? (
                  characters.map((character) => (
                    <li key={character.id}>
                      <EditableCharacterCard character={character} />
                    </li>
                  ))
                ) : (
                  <span className='character-list__cards-empty-list'>
                    {t('character.noCharacters')}
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
    );
  }
);
