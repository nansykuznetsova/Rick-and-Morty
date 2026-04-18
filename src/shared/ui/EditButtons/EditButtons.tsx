import { useTranslation } from 'react-i18next';

import { classNames } from '@/shared';
import { CheckIcon, CloseIcon, EditIcon } from '@/shared/assets';

import './EditButtons.scss';

export interface EditButtonsProps {
  isEditing: boolean;
  onEdit: () => void;
  onCancel: () => void;
  onSave: () => void;
}

export const EditButtons = (props: EditButtonsProps) => {
  const { isEditing, onEdit, onCancel, onSave } = props;
  const { t } = useTranslation();

  return (
    <div className={classNames('edit-buttons', { editing: isEditing })}>
      {isEditing ? (
        <>
          <button
            className='character-card__btn-icon'
            onClick={onCancel}
            type='button'
          >
            <CloseIcon aria-label={t('edit.closeEditing')} />
          </button>
          <button
            className='character-card__btn-icon'
            onClick={onSave}
            type='button'
          >
            <CheckIcon aria-label={t('edit.confirmChanges')} />
          </button>
        </>
      ) : (
        <>
          <button
            className='character-card__btn-icon'
            onClick={onEdit}
            type='button'
          >
            <EditIcon
              className='character-card__btn-icon_edit'
              aria-label={t('edit.editCard')}
            />
          </button>
        </>
      )}
    </div>
  );
};
