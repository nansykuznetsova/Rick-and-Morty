import { useEffect } from 'react';
import toast from 'react-hot-toast';
import { Link, useNavigate, useParams } from 'react-router-dom';

import { formatStatus, useLoadCharacter } from '@/shared';
import { Layout, Loader } from '@/shared';
import { ArrowBack } from '@/shared/assets';
import { useCharacterDetailsStore } from '@/store';

import './CharacterDetails.scss';

export const CharacterDetails: React.FunctionComponent = () => {
  const { character, isLoading, isError } = useCharacterDetailsStore();

  const { id } = useParams();
  const numericId = Number(id);
  const navigate = useNavigate();

  useLoadCharacter(numericId);

  // обрабатывает 404, выводит тост
  useEffect(() => {
    if (isError) {
      navigate('/404');
      toast.error(isError);
    }
  }, [isError, navigate]);

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
        {isLoading ? (
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
          <div className='character-details__content'>{isError}</div>
        )}
      </div>
    </Layout>
  );
};
