import { Link } from 'react-router-dom';

import './Header.css';

import LogoBlackImage from '/src/assets/images/logo-black.png';

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
