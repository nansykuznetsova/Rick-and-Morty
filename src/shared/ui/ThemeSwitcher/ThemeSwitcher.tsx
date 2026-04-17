import { useTranslation } from 'react-i18next';

import { useThemeStore } from '@/features';
import { MoonIcon, SunIcon } from '@/shared/assets';

import './ThemeSwitcher.scss';

export const ThemeSwitcher: React.FunctionComponent = () => {
  const theme = useThemeStore((state) => state.theme);
  const toggleTheme = useThemeStore((state) => state.toggleTheme);
  const { t } = useTranslation();

  const isDarkTheme = theme === 'dark';
  const iconLabel = isDarkTheme
    ? t('theme.switchToLight')
    : t('theme.switchToDark');

  return (
    <button
      className='theme-switcher'
      type='button'
      aria-label={iconLabel}
      onClick={toggleTheme}
    >
      {isDarkTheme ? <SunIcon /> : <MoonIcon />}
    </button>
  );
};
