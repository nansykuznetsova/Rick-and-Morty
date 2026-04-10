import { create } from 'zustand';

export type Theme = 'light' | 'dark';

const THEME_STORAGE_KEY = 'theme';
const DEFAULT_THEME: Theme = 'light';

const isTheme = (value: string | null): value is Theme =>
  value === 'light' || value === 'dark';

const applyTheme = (theme: Theme) => {
  document.documentElement.dataset.theme = theme;
};

const getStoredTheme = (): Theme => {
  const storedTheme = localStorage.getItem(THEME_STORAGE_KEY);

  return isTheme(storedTheme) ? storedTheme : DEFAULT_THEME;
};

interface ThemeStore {
  theme: Theme;
  initializeTheme: () => void;
  setTheme: (theme: Theme) => void;
  toggleTheme: () => void;
}

export const useThemeStore = create<ThemeStore>((set, get) => ({
  theme: DEFAULT_THEME,

  initializeTheme: () => {
    const theme = getStoredTheme();

    set({ theme });
    applyTheme(theme);
  },

  setTheme: (theme) => {
    localStorage.setItem(THEME_STORAGE_KEY, theme);
    set({ theme });
    applyTheme(theme);
  },

  toggleTheme: () => {
    const nextTheme = get().theme === 'light' ? 'dark' : 'light';

    get().setTheme(nextTheme);
  }
}));
