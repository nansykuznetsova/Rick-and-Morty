import { Link } from 'react-router-dom';

import { useThemeStore } from '@/features';
import { EnIcon, LogoBlackImage, LogoWhiteImage } from '@/shared/assets';
import { ThemeSwitcher } from '@/shared/ui/ThemeSwitcher/ThemeSwitcher';

import './Header.scss';

export const Header: React.FunctionComponent = () => {
  const theme = useThemeStore((state) => state.theme);

  return (
    <header className='header'>
      <Link
        to='/'
        aria-label='back to menu'
      >
        {theme === 'dark' ? (
          <LogoWhiteImage
            aria-label='logo'
            className='header__logo'
          />
        ) : (
          <LogoBlackImage
            aria-label='logo'
            className='header__logo'
          />
        )}
      </Link>
      <div className='header__switchers'>
        <ThemeSwitcher />
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
