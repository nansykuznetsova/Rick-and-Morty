import { memo, useCallback, useState } from 'react';

import {
  type CharacterCardTypes,
  CharacterCardView,
  STATUS_OPTIONS
} from '@/entities/character';
import { useDraftStore } from '@/features';
import {
  EditButtons,
  Input,
  Select,
  type SelectOptionContentProps,
  StatusCircle,
  type StatusesType
} from '@/shared';

import './EditableCharacterCard.scss';

interface EditableCharacterCardProps {
  character: CharacterCardTypes;
}

export const EditableCharacterCard = memo(function EditableCharacterCard({
  character
}: EditableCharacterCardProps) {
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

  if (readOnly) {
    return (
      <CharacterCardView
        character={viewModel}
        titleAction={
          <EditButtons
            isEditing={false}
            onEdit={onEdit}
            onCancel={onCancel}
            onSave={onSave}
          />
        }
      />
    );
  }

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
          <Input
            size='big'
            variant='form'
            name={viewModel.name}
            value={draft.name}
            onChange={handleInputNameChange}
            className='character-card__name-input'
          />
          <EditButtons
            isEditing={true}
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
            <Input
              size='big'
              variant='form'
              name={viewModel.location.name}
              value={draft.location.name}
              onChange={handleInputLocationChange}
              className='character-card__location-input'
            />
          </dl>
          <dl className='character-card__description-item'>
            <dt className='character-card__description-title'>Status</dt>
            <Select<StatusesType>
              variant='small'
              value={draft.status}
              options={STATUS_OPTIONS}
              onChange={handleStatusChange}
              SelectOptionComponent={(
                props: SelectOptionContentProps<StatusesType>
              ) => (
                <>
                  {props.value}
                  <StatusCircle status={props.optionValue} />
                </>
              )}
            />
          </dl>
        </div>
      </div>
    </div>
  );
});
