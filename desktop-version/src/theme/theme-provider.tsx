import {
  FC,
  ReactNode,
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState
} from 'react';
import { getCurrentWindow } from '@tauri-apps/api/window';

type LightOrDark = 'light' | 'dark';
export type Theme = LightOrDark | 'system';
export type ResolvedTheme = LightOrDark;

const STORAGE_KEY = 'theme';
const DARK_QUERY = '(prefers-color-scheme: dark)';

const isTheme = (value: unknown): value is Theme =>
  value === 'light' || value === 'dark' || value === 'system';

const readStoredTheme = (): Theme => {
  const stored = localStorage.getItem(STORAGE_KEY);
  return isTheme(stored) ? stored : 'system';
};

const resolve = (theme: Theme): ResolvedTheme => {
  if (theme !== 'system') return theme;
  return window.matchMedia(DARK_QUERY).matches ? 'dark' : 'light';
};

// Keeps the native window frame (titlebar, scrollbars, context menus) in sync
// with the webview. No-op outside Tauri, e.g. when vite is opened in a browser.
const syncNativeChrome = (theme: Theme) => {
  try {
    getCurrentWindow()
      .setTheme(theme === 'system' ? null : theme)
      .catch(() => { });
  } catch {
    // not running inside Tauri
  }
};

type ThemeContextValue = {
  theme: Theme;
  resolvedTheme: ResolvedTheme;
  setTheme: (theme: Theme) => void;
  toggleTheme: () => void;
};

const ThemeContext = createContext<ThemeContextValue | null>(null);

export const ThemeProvider: FC<{ children?: ReactNode }> = ({ children }) => {
  const [theme, setTheme] = useState<Theme>(readStoredTheme);
  const [resolvedTheme, setResolvedTheme] = useState<ResolvedTheme>(() => resolve(readStoredTheme()));

  useEffect(() => {
    const apply = () => {
      const next = resolve(theme);
      setResolvedTheme(next);
      document.documentElement.classList.toggle('dark', next === 'dark');
    };

    apply();
    localStorage.setItem(STORAGE_KEY, theme);
    syncNativeChrome(theme);

    // Only 'system' needs to react to the OS flipping while the app is open.
    if (theme !== 'system') return;

    const query = window.matchMedia(DARK_QUERY);
    query.addEventListener('change', apply);
    return () => query.removeEventListener('change', apply);
  }, [theme]);

  const toggleTheme = useCallback(() => {
    setTheme(resolvedTheme === 'dark' ? 'light' : 'dark');
  }, [resolvedTheme]);

  const value = useMemo(
    () => ({ theme, resolvedTheme, setTheme, toggleTheme }),
    [theme, resolvedTheme, toggleTheme],
  );

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) throw new Error('useTheme must be used inside <ThemeProvider>');
  return context;
};
