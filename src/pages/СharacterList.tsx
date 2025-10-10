import { useEffect, useState } from 'react';

import { Layout, Loader, Logo } from '@/components';
import { DEBOUNCE_DELAY, FIRST_PAGE_PAGINATION } from '@/constants';
import { getCharacters, useDebounce } from '@/shared';
import { type CharacterCardTypes, type CharacterFilters } from '@/types';
import { CharacterCard, FilterPanel } from '@/widgets';

import './CharacterList.css';

export const CharacterList: React.FunctionComponent = () => {
  const [characters, setCharacters] = useState<CharacterCardTypes[]>([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState<CharacterFilters>({});
  const [page, setPage] = useState(FIRST_PAGE_PAGINATION);

  const debouncedName = useDebounce(filters.name, DEBOUNCE_DELAY);

  useEffect(() => {
    setLoading(true);
    getCharacters({ ...filters, page, name: debouncedName })
      .then((data) => setCharacters(data))
      .finally(() => setLoading(false));
  }, [filters.species, filters.gender, filters.status, debouncedName, page]);

  const handleFilterChange = (newFilters: CharacterFilters) => {
    setFilters((prev) => ({
      ...prev,
      ...newFilters
    }));
    setPage(FIRST_PAGE_PAGINATION);
  };

  return (
    <Layout>
      <div className='character-list'>
        <Logo />
        <FilterPanel
          filters={filters}
          onChange={handleFilterChange}
        />
        <div className='character-list__cards-wrapper'>
          {loading ? (
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
