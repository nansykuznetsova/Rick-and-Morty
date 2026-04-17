import { memo, useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';

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

const StatusOptionContent = ({
  value,
  optionValue
}: SelectOptionContentProps<StatusesType>) => (
  <>
    {value}
    <StatusCircle status={optionValue} />
  </>
);

interface EditableCharacterCardProps {
  character: CharacterCardTypes;
}

export const EditableCharacterCard = memo(function EditableCharacterCard({
  character
}: EditableCharacterCardProps) {
  const { t } = useTranslation();
  const { drafts, setDraft } = useDraftStore();
  const draftFromStore = drafts[character.id];
  const statusOptions = STATUS_OPTIONS.map((option) => ({
    ...option,
    label: t(`statusOptions.${option.value}`, { defaultValue: option.label })
  }));

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
    <CharacterCardView
      character={viewModel}
      titleAction={
        <EditButtons
          isEditing={!readOnly}
          onEdit={onEdit}
          onCancel={onCancel}
          onSave={onSave}
        />
      }
      nameSlot={
        !readOnly ? (
          <Input
            size='big'
            variant='form'
            name={viewModel.name}
            value={draft.name}
            onChange={handleInputNameChange}
            className='character-card__name-input'
          />
        ) : undefined
      }
      locationSlot={
        !readOnly ? (
          <Input
            size='big'
            variant='form'
            name={viewModel.location.name}
            value={draft.location.name}
            onChange={handleInputLocationChange}
            className='character-card__location-input'
          />
        ) : undefined
      }
      statusSlot={
        !readOnly ? (
          <Select
            variant='small'
            value={draft.status}
            options={statusOptions}
            onChange={handleStatusChange}
            SelectOptionComponent={StatusOptionContent}
          />
        ) : undefined
      }
    />
  );
});
