import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';

import ArrowBack from '@/assets/icons/arrow-back.svg?react';
import { Layout, Loader } from '@/components';
import { formatStatus } from '@/shared';
import { getCharacterById } from '@/shared/api/getCharacterById.ts';
import type { CharacterDetailsType } from '@/types';

import './CharacterDetails.css';

export const CharacterDetails: React.FunctionComponent = () => {
  const { id } = useParams();
  const numericId = Number(id);
  const [character, setCharacter] = useState<CharacterDetailsType | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCharacter = async () => {
      try {
        setLoading(true);
        const data = await getCharacterById(numericId);
        setCharacter(data);
      } finally {
        setLoading(false);
      }
    };

    fetchCharacter();
  }, [id]);

  return (
    <Layout>
      <div className='character-details'>
        <Link
          to='/'
          className='character-details__link'
          aria-label='back to menu'
        >
          <ArrowBack className='character-details__link-icon' />
          GO BACK
        </Link>
        {loading ? (
          <Loader
            text='Loading character...'
            size='large'
          />
        ) : character ? (
          <div className='character-details__content'>
            <div className='character-details__image'>
              <img
                src={character.image}
                alt={character.name}
              />
            </div>
            <div className='character-details__info'>
              <h1>{character.name}</h1>
              <span>Information</span>
              <div className='character-details__description'>
                <div className='character-details__description-gender'>
                  <strong>Gender</strong>
                  <span>{character.gender}</span>
                </div>
                <div className='character-details__description-status'>
                  <strong>Status</strong>
                  <span>{formatStatus(character.status)}</span>
                </div>
                <div className='character-details__description-species'>
                  <strong>Specie</strong>
                  <span>{character.species}</span>
                </div>
                <div className='character-profile__content-table-origin'>
                  <strong>Origin</strong>
                  <span>{character.origin.name}</span>
                </div>
                <div className='character-profile__content-table-type'>
                  <strong>Type</strong>
                  <span>{character.type || 'Unknown'}</span>
                </div>
                <div className='character-details__description-location'>
                  <strong>Location</strong>
                  <span>{character.location.name}</span>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className='character-details__content'>Character not found.</div>
        )}
      </div>
    </Layout>
  );
};
