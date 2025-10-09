import { useEffect, useState } from 'react';

import { Layout } from '@/components';
import { Loader } from '@/components';
import { Logo } from '@/components';
import { getCharacters } from '@/shared';
import { useDebounce } from '@/shared';
import { type CharacterFilters } from '@/types';
import { type CharacterCardTypes } from '@/types/character';
import { CharacterCard } from '@/widgets';
import { FilterPanel } from '@/widgets';

import './CharacterList.css';

export const CharacterList: React.FunctionComponent = () => {
  const [characters, setCharacters] = useState<CharacterCardTypes[]>([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState<CharacterFilters>({});
  const [page, setPage] = useState(1);

  const debouncedName = useDebounce(filters.name, 400);

  useEffect(() => {
    setLoading(true);
    getCharacters({ ...filters, page, name: debouncedName })
      .then((data) => setCharacters(data))
      .finally(() => setLoading(false));
  }, [filters.species, filters.gender, filters.status, debouncedName, page]);

  const handleFilterChange = (newFilters: Partial<CharacterFilters>) => {
    setFilters((prev) => ({
      ...prev,
      ...newFilters
    }));
    setPage(1);
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
