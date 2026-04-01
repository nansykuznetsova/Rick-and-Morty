import { type ReactNode } from 'react';
import { Link } from 'react-router-dom';

import { type CharacterCardTypes, formatStatus } from '@/entities/character';
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
  return (
    <div className='character-card'>
      <div className='character-card__image-wrapper'>
        <img
          className='character-card__image'
          src={character.image}
          alt={`avatar ${character.name}`}
        />
      </div>
      <div className='character-card__info'>
        <div className='character-card__title'>
          {nameSlot ?? (
            <Link
              to={`/character/${character.id}`}
              className='character-card__name-link'
              aria-label='go to character'
            >
              {character.name}
            </Link>
          )}
          {titleAction}
        </div>
        <div className='character-card__description'>
          <dl className='character-card__description-item'>
            <dt className='character-card__description-title'>Gender</dt>
            <dd className='character-card__description-content'>
              {character.gender}
            </dd>
          </dl>
          <dl className='character-card__description-item'>
            <dt className='character-card__description-title'>Species</dt>
            <dd className='character-card__description-content'>
              {character.species}
            </dd>
          </dl>
          <dl className='character-card__description-item'>
            <dt className='character-card__description-title'>Location</dt>
            {locationSlot ?? (
              <dd className='character-card__description-content'>
                <span className='character-card__description-content-location'>
                  {character.location.name}
                </span>
              </dd>
            )}
          </dl>
          <dl className='character-card__description-item'>
            <dt className='character-card__description-title'>Status</dt>
            {statusSlot ?? (
              <dd className='character-card__description-content'>
                {formatStatus(character.status)}
                <StatusCircle status={character.status} />
              </dd>
            )}
          </dl>
        </div>
      </div>
    </div>
  );
};
