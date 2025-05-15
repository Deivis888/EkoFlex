import React from 'react';
import { Moon, Sun } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';

const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-500"
      aria-label="Toggle theme"
    >
      {theme === 'dark' ? (
        <Moon className="h-5 w-5 text-gray-200" />
      ) : (
        <Sun className="h-5 w-5 text-gray-800" />
      )}
    </button>
  );
};

export default ThemeToggle;