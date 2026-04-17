import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

import { useThemeStore } from '@/features';
import { LanguageSwitcher, ThemeSwitcher } from '@/shared';
import { LogoBlackImage, LogoWhiteImage } from '@/shared/assets';

import './Header.scss';

export const Header: React.FunctionComponent = () => {
  const theme = useThemeStore((state) => state.theme);
  const { t } = useTranslation();

  return (
    <header className='header'>
      <Link
        to='/'
        aria-label={t('aria.backToMenu')}
      >
        {theme === 'dark' ? (
          <LogoWhiteImage
            aria-label={t('aria.logo')}
            className='header__logo'
          />
        ) : (
          <LogoBlackImage
            aria-label={t('aria.logo')}
            className='header__logo'
          />
        )}
      </Link>
      <div className='header__switchers'>
        <ThemeSwitcher />
        <LanguageSwitcher />
      </div>
    </header>
  );
};
