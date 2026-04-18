import { useTranslation } from 'react-i18next';

import { classNames } from '@/shared';
import { LoaderImage } from '@/shared/assets';

import './Loader.scss';

interface LoaderProps {
  text?: string;
  size?: 'small' | 'large';
}

export const Loader = ({ text, size }: LoaderProps) => {
  const { t } = useTranslation();

  return (
    <div className='loader'>
      <img
        src={LoaderImage}
        alt={t('loading.default')}
        className={classNames('loader__img', {
          loader__img_large: size === 'large',
          loader__img_small: size === 'small'
        })}
      />
      {text && <p>{text}</p>}
    </div>
  );
};
