import { Link } from 'react-router-dom';

import { EnIcon, LogoBlackImage, MoonIcon } from '@/shared/assets';

import './Header.css';

export const Header: React.FunctionComponent = () => {
  return (
    <header className='header'>
      <Link
        to='/'
        aria-label='back to menu'
      >
        <LogoBlackImage
          alt='logo'
          className='header__logo'
        />
      </Link>
      <div className='header__switchers'>
        <button
          className='header__switcher-button'
          type='button'
        >
          <MoonIcon />
        </button>
        <button
          className='header__switcher-button'
          type='button'
        >
          <EnIcon />
        </button>
      </div>
    </header>
  );
};
