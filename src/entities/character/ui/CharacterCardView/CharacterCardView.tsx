import { type ReactNode } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

import { type CharacterCardTypes } from '@/entities/character';
import { StatusCircle } from '@/shared';

import './CharacterCardView.scss';

interface CharacterCardViewProps {
  character: CharacterCardTypes;
  titleAction?: ReactNode;
  nameSlot?: ReactNode;
  locationSlot?: ReactNode;
  statusSlot?: ReactNode;
}

export const CharacterCardView = ({
  character,
  titleAction,
  nameSlot,
  locationSlot,
  statusSlot
}: CharacterCardViewProps) => {
  const { t } = useTranslation();
  const translatedGender = t(
    `genderOptions.${character.gender.toLowerCase()}`,
    {
      defaultValue: character.gender
    }
  );
  const translatedSpecies = t(
    `speciesOptions.${character.species.toLowerCase()}`,
    {
      defaultValue: character.species
    }
  );

  return (
    <div className='character-card'>
      <div className='character-card__image-wrapper'>
        <img
          className='character-card__image'
          src={character.image}
          alt={t('aria.avatar', { name: character.name })}
        />
      </div>
      <div className='character-card__info'>
        <div className='character-card__title'>
          {nameSlot ?? (
            <Link
              to={`/character/${character.id}`}
              className='character-card__name-link'
              aria-label={t('aria.goToCharacter')}
            >
              {character.name}
            </Link>
          )}
          {titleAction}
        </div>
        <div className='character-card__description'>
          <dl className='character-card__description-item'>
            <dt className='character-card__description-title'>
              {t('character.gender')}
            </dt>
            <dd className='character-card__description-content'>
              {translatedGender}
            </dd>
          </dl>
          <dl className='character-card__description-item'>
            <dt className='character-card__description-title'>
              {t('character.species')}
            </dt>
            <dd className='character-card__description-content'>
              {translatedSpecies}
            </dd>
          </dl>
          <dl className='character-card__description-item'>
            <dt className='character-card__description-title'>
              {t('character.location')}
            </dt>
            {locationSlot ?? (
              <dd className='character-card__description-content'>
                <span className='character-card__description-content-location'>
                  {character.location.name}
                </span>
              </dd>
            )}
          </dl>
          <dl className='character-card__description-item'>
            <dt className='character-card__description-title'>
              {t('character.status')}
            </dt>
            {statusSlot ?? (
              <dd className='character-card__description-content'>
                {t(`statusOptions.${character.status}`)}
                <StatusCircle status={character.status} />
              </dd>
            )}
          </dl>
        </div>
      </div>
    </div>
  );
};
