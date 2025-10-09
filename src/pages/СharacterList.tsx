import { useEffect, useState } from 'react';

import { Layout } from '@/components';
import { Loader } from '@/components';
import { Logo } from '@/components';
import { getCharacters } from '@/shared';
import { type CharacterFilters } from '@/types';
import { type CharacterCardTypes } from '@/types/character';
import { CharacterCard } from '@/widgets';
import { FilterPanel } from '@/widgets';

import './CharacterList.css';

export const CharacterList: React.FunctionComponent = () => {
  const [characters, setCharacters] = useState<CharacterCardTypes[]>([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState<CharacterFilters>({ page: 1 });

  const [debouncedName, setDebouncedName] = useState(filters.name || '');

  useEffect(() => {
    const timeout = setTimeout(() => {
      setDebouncedName(filters.name || '');
    }, 400);
    return () => clearTimeout(timeout);
  }, [filters.name]);

  useEffect(() => {
    setLoading(true);
    getCharacters({ ...filters, name: debouncedName })
      .then((data) => setCharacters(data))
      .finally(() => setLoading(false));
  }, [
    filters.species,
    filters.gender,
    filters.status,
    debouncedName,
    filters.page
  ]);

  const handleFilterChange = (newFilters: Partial<CharacterFilters>) => {
    setFilters((prev) => ({
      ...prev,
      ...newFilters,
      page: newFilters.page ?? 1 // сбрасываем страницу при изменении фильтров
    }));
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
