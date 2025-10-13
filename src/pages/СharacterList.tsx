import { useCallback } from 'react';

import { Layout, Loader, Logo } from '@/components';
import { DEBOUNCE_DELAY, FIRST_PAGE_PAGINATION } from '@/constants';
import { useDebounce, useLoadCharacters } from '@/shared';
import { type CharacterFilters } from '@/types';
import { CharacterCard, FilterPanel } from '@/widgets';

import './CharacterList.css';

export const CharacterList: React.FunctionComponent = () => {
  const { characters, isLoading, filters, setFilters, setPage } =
    useLoadCharacters();

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
            <ul className='character-list__cards'>
              {characters.map((character) => (
                <li key={character.id}>
                  <CharacterCard character={character} />
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </Layout>
  );
};
