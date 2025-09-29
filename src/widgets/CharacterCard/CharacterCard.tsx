import { useState } from 'react';
import { Link } from 'react-router-dom';

import { Input } from '@/components';
import { EditButtons } from '@/components';
import { Select, type SelectOptionContentProps } from '@/components';
import { StatusCircle, type StatusesType } from '@/components';
import { STATUS_OPTIONS } from '@/constants';
import { type CharacterCardTypes } from '@/types';

import './CharacterCard.css';

interface CharacterCardProps {
  character: CharacterCardTypes;
  onEditCharacter: () => void;
}

export const CharacterCard = (props: CharacterCardProps) => {
  const { character, onEditCharacter } = props;

  const [readOnly, setReadOnly] = useState(true);
  const [currentName, setCurrentName] = useState(character.name);
  const [currentLocation, setCurrentLocation] = useState(character.location);

  const onEdit = () => {
    setReadOnly(false);
  };

  const onCancel = () => {
    setReadOnly(true);
  };

  const onSave = () => {
    onEditCharacter({});
    setReadOnly(true);
  };

  const handleInputNameChange = (value: string) => {
    setCurrentName(value);
  };

  const handleInputLocationChange = (value: string) => {
    setCurrentLocation(value);
  };

  return (
    <div className='character-card'>
      <div className='character-card__image'>
        <img
          src={character.imageSrc}
          alt={`avatar ${character.name}`}
        />
      </div>
      <div className='character-card__info'>
        <div className='character-card__title'>
          {readOnly ? (
            <Link
              to='characters/:id'
              className='character-card__name-link'
              aria-label='go to character'
            >
              {character.name}
            </Link>
          ) : (
            <Input
              size='big'
              variant='form'
              name={character.name}
              value={currentName}
              onChange={handleInputNameChange}
              className='character-card__name-input'
            />
          )}

          <EditButtons
            isEditing={!readOnly}
            onEdit={onEdit}
            onCancel={onCancel}
            onSave={onSave}
          />
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
            {readOnly ? (
              <dd className='character-card__description-content'>
                {character.location}
              </dd>
            ) : (
              <Input
                size='big'
                variant='form'
                name={character.location}
                value={currentLocation}
                onChange={handleInputLocationChange}
                className='character-card__location-input'
              />
            )}
          </dl>
          <dl className='character-card__description-item'>
            <dt className='character-card__description-title'>Status</dt>
            {readOnly ? (
              <dd className='character-card__description-content'>
                {character.status}
                <StatusCircle status={character.status} />
              </dd>
            ) : (
              <Select
                variant='small'
                options={STATUS_OPTIONS}
                SelectOptionComponent={(props: SelectOptionContentProps) => (
                  <>
                    {props.value}

                    <StatusCircle status={props.value as StatusesType} />
                  </>
                )}
              />
            )}
          </dl>
        </div>
      </div>
    </div>
  );
};
