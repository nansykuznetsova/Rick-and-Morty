import { memo, useCallback, useState } from 'react';
import { Link } from 'react-router-dom';

import { STATUS_OPTIONS } from '@/constants';
import { formatStatus } from '@/shared';
import {
  EditButtons,
  Input,
  Select,
  type SelectOptionContentProps,
  StatusCircle,
  type StatusesType
} from '@/shared';
import { useDraftStore } from '@/store';
import { type CharacterCardTypes } from '@/types';

import './CharacterCard.scss';

interface CharacterCardProps {
  character: CharacterCardTypes;
}

export const CharacterCard = memo(function CharacterCard({
  character
}: CharacterCardProps) {
  const { drafts, setDraft } = useDraftStore();
  const draftFromStore = drafts[character.id];

  const [draft, setLocalDraft] = useState<CharacterCardTypes>(() => ({
    ...character,
    ...draftFromStore
  }));
  const [readOnly, setReadOnly] = useState(true);

  const onEdit = () => setReadOnly(false);

  const onCancel = () => {
    setLocalDraft({ ...character, ...draftFromStore });
    setReadOnly(true);
  };

  const onSave = () => {
    setDraft(character.id, draft);
    setReadOnly(true);
  };

  const handleInputNameChange = useCallback((value: string) => {
    setLocalDraft((prev) => ({ ...prev, name: value }));
  }, []);

  const handleInputLocationChange = useCallback((value: string) => {
    setLocalDraft((prev) => ({
      ...prev,
      location: { ...prev.location, name: value }
    }));
  }, []);

  const handleStatusChange = useCallback((status: StatusesType) => {
    setLocalDraft((prev) => ({ ...prev, status }));
  }, []);

  const viewModel = draftFromStore
    ? { ...character, ...draftFromStore }
    : character;

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
          {readOnly ? (
            <Link
              to={`/character/${character.id}`}
              className='character-card__name-link'
              aria-label='go to character'
            >
              {viewModel.name}
            </Link>
          ) : (
            <Input
              size='big'
              variant='form'
              name={viewModel.name}
              value={draft.name}
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
              {viewModel.gender}
            </dd>
          </dl>
          <dl className='character-card__description-item'>
            <dt className='character-card__description-title'>Species</dt>
            <dd className='character-card__description-content'>
              {viewModel.species}
            </dd>
          </dl>
          <dl className='character-card__description-item'>
            <dt className='character-card__description-title'>Location</dt>
            {readOnly ? (
              <dd className='character-card__description-content'>
                <span className='character-card__description-content-location'>
                  {viewModel.location.name}
                </span>
              </dd>
            ) : (
              <Input
                size='big'
                variant='form'
                name={viewModel.location.name}
                value={draft.location.name}
                onChange={handleInputLocationChange}
                className='character-card__location-input'
              />
            )}
          </dl>
          <dl className='character-card__description-item'>
            <dt className='character-card__description-title'>Status</dt>
            {readOnly ? (
              <dd className='character-card__description-content'>
                {formatStatus(viewModel.status)}
                <StatusCircle status={viewModel.status} />
              </dd>
            ) : (
              <Select
                variant='small'
                value={formatStatus(draft.status ?? character.status)}
                options={STATUS_OPTIONS}
                onChange={handleStatusChange}
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
});
