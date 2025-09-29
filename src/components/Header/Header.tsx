import { Link } from 'react-router-dom';

import './Header.css';

export const Header: React.FunctionComponent = () => {
  return (
    <header className='header'>
      <Link
        to='/'
        aria-label='назад в меню'
      >
        <img
          src='/src/assets/images/logo-black.png'
          alt='logo'
          className='header__logo'
        />
      </Link>
    </header>
  );
};
