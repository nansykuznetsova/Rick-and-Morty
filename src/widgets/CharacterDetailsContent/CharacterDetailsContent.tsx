import { useEffect } from 'react';
import toast from 'react-hot-toast';
import { useTranslation } from 'react-i18next';
import { Link, Navigate, useParams } from 'react-router-dom';

import axios from 'axios';

import { useLoadCharacter } from '@/entities/character';
import { Loader } from '@/shared';
import { ArrowBack } from '@/shared/assets';

import './CharacterDetailsContent.scss';

export const CharacterDetailsContent: React.FunctionComponent = () => {
  const { t } = useTranslation();
  const { id } = useParams();
  const numericId = Number(id);

  const {
    data: character,
    isLoading,
    isError,
    error
  } = useLoadCharacter(numericId);

  useEffect(() => {
    if (
      isError &&
      !(axios.isAxiosError(error) && error.response?.status === 404)
    ) {
      toast.error(t('errors.somethingWentWrong'));
    }
  }, [isError, error, t]);

  if (isError && axios.isAxiosError(error) && error.response?.status === 404) {
    return (
      <Navigate
        to='/404'
        replace
      />
    );
  }

  const translatedGender = character
    ? t(`genderOptions.${character.gender.toLowerCase()}`, {
        defaultValue: character.gender
      })
    : '';
  const translatedSpecies = character
    ? t(`speciesOptions.${character.species.toLowerCase()}`, {
        defaultValue: character.species
      })
    : '';

  return (
    <div className='character-details'>
      <Link
        to='/'
        className='character-details__link'
        aria-label={t('aria.backToMenu')}
      >
        <ArrowBack className='character-details__link-icon' />
        {t('actions.goBack')}
      </Link>
      {isLoading ? (
        <Loader
          text={t('loading.character')}
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
            <span>{t('character.information')}</span>
            <div className='character-details__description'>
              <div className='character-details__description-gender'>
                <strong>{t('character.gender')}</strong>
                <span>{translatedGender}</span>
              </div>
              <div className='character-details__description-status'>
                <strong>{t('character.status')}</strong>
                <span>{t(`statusOptions.${character.status}`)}</span>
              </div>
              <div className='character-details__description-species'>
                <strong>{t('character.species')}</strong>
                <span>{translatedSpecies}</span>
              </div>
              <div className='character-details__description-origin'>
                <strong>{t('character.origin')}</strong>
                <span>{character.origin.name}</span>
              </div>
              <div className='character-details__description-type'>
                <strong>{t('character.type')}</strong>
                <span>{character.type || t('character.unknown')}</span>
              </div>
              <div className='character-details__description-location'>
                <strong>{t('character.location')}</strong>
                <span>{character.location.name}</span>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className='character-details__content'>{isError}</div>
      )}
    </div>
  );
};
