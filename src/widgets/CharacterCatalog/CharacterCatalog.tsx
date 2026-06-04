import { memo, useCallback, useEffect } from 'react';
import toast from 'react-hot-toast';
import { useTranslation } from 'react-i18next';

import axios from 'axios';

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
import { DEBOUNCE_DELAY, RATE_LIMIT_RETRY_DELAY } from '@/shared/config';
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
      hasNextPage,
      isLoading,
      isFetchingNextPage,
      isFetchNextPageError,
      error
    } = useLoadCharacters();
    const isRateLimitError =
      isFetchNextPageError &&
      axios.isAxiosError(error) &&
      error.response?.status === 429;

    useEffect(() => {
      if (!isFetchNextPageError || !error) return;
      if (isRateLimitError) return;
      toast.error(t('errors.somethingWentWrong'));
    }, [isFetchNextPageError, error, isRateLimitError, t]);

    useEffect(() => {
      if (!isRateLimitError || isFetchingNextPage) return;

      const timer = setTimeout(() => {
        fetchNextPage();
      }, RATE_LIMIT_RETRY_DELAY);

      return () => clearTimeout(timer);
    }, [isRateLimitError, isFetchingNextPage, fetchNextPage]);

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
      if (isRateLimitError) return;
      fetchNextPage();
    }, [isRateLimitError, fetchNextPage]);

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
              {hasNextPage && !isRateLimitError && (
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
