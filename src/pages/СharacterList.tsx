import { useEffect, useState } from 'react';

import { Layout } from '@/components';
import { Loader } from '@/components';
import { Logo } from '@/components';
import { getCharacters } from '@/shared';
import { type CharacterCardTypes } from '@/types/character';
import { CharacterCard } from '@/widgets';
import { FilterPanel } from '@/widgets';

import './CharacterList.css';

export const CharacterList: React.FunctionComponent = () => {
  const [characters, setCharacters] = useState<CharacterCardTypes[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    getCharacters()
      .then((data) => {
        setCharacters(data);
      })
      .finally(() => setLoading(false));
  }, []);

  return (
    <Layout>
      <div className='character-list'>
        <Logo />
        <FilterPanel />
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
