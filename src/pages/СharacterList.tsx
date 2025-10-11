import { Layout, Loader, Logo } from '@/components';
import { FIRST_PAGE_PAGINATION } from '@/constants';
import { useLoadCharacters } from '@/shared';
import { type CharacterFilters } from '@/types';
import { CharacterCard, FilterPanel } from '@/widgets';

import './CharacterList.css';

export const CharacterList: React.FunctionComponent = () => {
  const { characters, loading, filters, setFilters, setPage } =
    useLoadCharacters();

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
