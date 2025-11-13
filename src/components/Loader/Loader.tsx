import cn from 'classnames';

import './Loader.css';

import LoaderImage from '/src/assets/images/loader.png';

interface LoaderProps {
  text?: string;
  size?: 'small' | 'large';
}

export const Loader = ({ text, size }: LoaderProps) => {
  return (
    <div className='loader'>
      <img
        src={LoaderImage}
        alt='Loading...'
        className={cn('loader__img', {
          loader__img_large: size === 'large',
          loader__img_small: size === 'small'
        })}
      />
      <p>{text}</p>
    </div>
  );
};
