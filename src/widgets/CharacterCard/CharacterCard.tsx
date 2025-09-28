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
    <div className='character_card'>
      <div className='character_card__image'>
        <img
          src={character.imageSrc}
          alt={`avatar ${character.name}`}
          className='character_card__avatar'
        />
      </div>
      <div className='character_card__info'>
        <div className='character_card__header'>
          {readOnly ? (
            <Link
              to='characters/:id'
              className='character_card__link'
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
              className='custom_input__name'
            />
          )}

          <EditButtons
            isEditing={!readOnly}
            onEdit={onEdit}
            onCancel={onCancel}
            onSave={onSave}
          />
        </div>
        <div className='character_card__body'>
          <dl className='character_card__item'>
            <dt className='character_card__title'>Gender</dt>
            <dd className='character_card__definition'>{character.gender}</dd>
          </dl>
          <dl className='character_card__item'>
            <dt className='character_card__title'>Species</dt>
            <dd className='character_card__definition'>{character.species}</dd>
          </dl>
          <dl className='character_card__item'>
            <dt className='character_card__title'>Location</dt>
            {readOnly ? (
              <dd className='character_card__definition'>
                {character.location}
              </dd>
            ) : (
              <Input
                size='big'
                variant='form'
                name={character.location}
                value={currentLocation}
                onChange={handleInputLocationChange}
                className='custom_input__location'
              />
            )}
          </dl>
          <dl className='character_card__item'>
            <dt className='character_card__title'>Status</dt>
            {readOnly ? (
              <dd className='character_card__definition'>
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
