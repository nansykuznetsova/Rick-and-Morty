import { useThemeStore } from '@/features';
import { MoonIcon, SunIcon } from '@/shared/assets';

import './ThemeSwitcher.scss';

export const ThemeSwitcher: React.FunctionComponent = () => {
  const theme = useThemeStore((state) => state.theme);
  const toggleTheme = useThemeStore((state) => state.toggleTheme);

  const isDarkTheme = theme === 'dark';
  const iconLabel = isDarkTheme ? 'switch to light theme' : 'switch to dark theme';

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
