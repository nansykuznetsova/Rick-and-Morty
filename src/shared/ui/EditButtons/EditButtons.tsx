import cn from 'classnames';

import CheckIcon from '@/shared/assets/icons/check.svg?react';
import CloseIcon from '@/shared/assets/icons/close.svg?react';
import EditIcon from '@/shared/assets/icons/edit.svg?react';

import './EditButtons.css';

export interface EditButtonsProps {
  isEditing: boolean;
  onEdit: () => void;
  onCancel: () => void;
  onSave: () => void;
}

export const EditButtons = (props: EditButtonsProps) => {
  const { isEditing, onEdit, onCancel, onSave } = props;

  return (
    <div className={cn('edit-buttons', { editing: isEditing })}>
      {isEditing ? (
        <>
          <button
            className='character-card__btn-icon'
            onClick={onCancel}
            type='button'
          >
            <CloseIcon aria-label='Close editing' />
          </button>
          <button
            className='character-card__btn-icon'
            onClick={onSave}
            type='button'
          >
            <CheckIcon aria-label='Confirm changes' />
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
              aria-label='Edit card'
            />
          </button>
        </>
      )}
    </div>
  );
};
