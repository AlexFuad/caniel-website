import React from 'react';
import { Moon, Sun, Bell, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useTheme } from '@/context/ThemeContext';
import { useAuth } from '@/context/AuthContext';

/**
 * TopNavbar Component - Header with search, theme toggle, and user info
 */
export function TopNavbar({ title, subtitle, onMenuToggle }) {
  const { theme, toggleTheme } = useTheme();
  const { user } = useAuth();

  return (
    <header className="sticky top-0 z-30 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800">
      <div className="flex items-center justify-between px-4 lg:px-6 py-4">
        {/* Left section */}
        <div className="flex items-center gap-4 flex-1">
          {/* Mobile menu button */}
          <Button
            variant="ghost"
            size="icon"
            onClick={onMenuToggle}
            className="lg:hidden"
          >
            <Search className="h-5 w-5" />
          </Button>

          {/* Page title */}
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
              {title}
            </h1>
            {subtitle && (
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-0.5">
                {subtitle}
              </p>
            )}
          </div>
        </div>

        {/* Right section */}
        <div className="flex items-center gap-2">
          {/* Theme toggle */}
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleTheme}
            className="rounded-full"
          >
            {theme === 'dark' ? (
              <Sun className="h-5 w-5 text-yellow-500" />
            ) : (
              <Moon className="h-5 w-5 text-gray-600" />
            )}
          </Button>

          {/* Notifications */}
          <Button
            variant="ghost"
            size="icon"
            className="rounded-full relative"
          >
            <Bell className="h-5 w-5 text-gray-600 dark:text-gray-400" />
            <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full" />
          </Button>

          {/* User avatar */}
          <div className="flex items-center gap-3 ml-2 pl-4 border-l border-gray-200 dark:border-gray-700">
            <div className="w-9 h-9 rounded-full bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center text-white font-medium text-sm">
              {user?.fullName?.charAt(0) || 'U'}
            </div>
            <div className="hidden md:block">
              <p className="text-sm font-medium text-gray-900 dark:text-white">
                {user?.fullName}
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400 capitalize">
                {user?.role}
              </p>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

export default TopNavbar;
