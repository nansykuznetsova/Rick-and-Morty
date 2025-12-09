import { Link } from 'react-router-dom';

import LogoBlackImage from '@/shared/assets/images/logo-black.png';

import './Header.css';

export const Header: React.FunctionComponent = () => {
  return (
    <header className='header'>
      <Link
        to='/'
        aria-label='back to menu'
      >
        <img
          src={LogoBlackImage}
          alt='logo'
          className='header__logo'
        />
      </Link>
    </header>
  );
};
