import cn from 'classnames';

import CheckIcon from '@/assets/icons/check.svg?react';
import CloseIcon from '@/assets/icons/close.svg?react';
import EditIcon from '@/assets/icons/edit.svg?react';

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
    <div className={cn('edit_buttons', { editing: isEditing })}>
      {isEditing ? (
        <>
          <button
            className='character_card__icon'
            onClick={onCancel}
            type='button'
          >
            <CloseIcon />
          </button>
          <button
            className='character_card__icon'
            onClick={onSave}
            type='button'
          >
            <CheckIcon />
          </button>
        </>
      ) : (
        <>
          <button
            className='character_card__icon'
            onClick={onCancel}
            type='button'
          >
            <CloseIcon />
          </button>
          <button
            className='character_card__icon'
            onClick={onEdit}
            type='button'
          >
            <EditIcon />
          </button>
        </>
      )}
    </div>
  );
};
