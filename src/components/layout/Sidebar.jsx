import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  LayoutDashboard,
  FileText,
  Package,
  Briefcase,
  Users,
  Settings,
  ChevronDown,
  ChevronRight,
  Menu,
  X,
  LogOut,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { useAuth } from '@/context/AuthContext';
import { PERMISSIONS } from '@/config/constants';

/**
 * Sidebar Component - Navigation menu with collapsible sections
 */
export function Sidebar({ isOpen, onToggle, mobileIsOpen, onMobileClose }) {
  const location = useLocation();
  const { user, logout, hasPermission } = useAuth();
  const [expandedMenus, setExpandedMenus] = useState({});

  const menuItems = [
    {
      id: 'dashboard',
      label: 'Dashboard',
      icon: LayoutDashboard,
      path: '/admin/dashboard',
      permission: null, // Always visible
    },
    {
      id: 'blog',
      label: 'Blog',
      icon: FileText,
      path: '/admin/blog',
      permission: null,
      submenu: [
        { label: 'Semua Artikel', path: '/admin/blog' },
        { label: 'Tambah Baru', path: '/admin/blog/new' },
      ],
    },
    {
      id: 'products',
      label: 'Produk',
      icon: Package,
      path: '/admin/products',
      permission: PERMISSIONS.EDIT_PRODUCT,
      submenu: [
        { label: 'Semua Produk', path: '/admin/products' },
        { label: 'Tambah Baru', path: '/admin/products/new' },
      ],
    },
    {
      id: 'services',
      label: 'Layanan',
      icon: Briefcase,
      path: '/admin/services',
      permission: PERMISSIONS.EDIT_SERVICE,
      submenu: [
        { label: 'Semua Layanan', path: '/admin/services' },
        { label: 'Tambah Baru', path: '/admin/services/new' },
      ],
    },
    {
      id: 'users',
      label: 'Pengguna',
      icon: Users,
      path: '/admin/users',
      permission: PERMISSIONS.MANAGE_USERS,
      submenu: [
        { label: 'Semua Pengguna', path: '/admin/users' },
        { label: 'Tambah Baru', path: '/admin/users/new' },
      ],
    },
    {
      id: 'settings',
      label: 'Pengaturan',
      icon: Settings,
      path: '/admin/settings',
      permission: null,
    },
  ];

  // Filter menu items based on permissions
  const filteredMenuItems = menuItems.filter(item => {
    if (!item.permission) return true;
    return hasPermission(item.permission);
  });

  const toggleMenu = (menuId) => {
    setExpandedMenus(prev => ({
      ...prev,
      [menuId]: !prev[menuId],
    }));
  };

  const isActive = (path) => {
    return location.pathname === path;
  };

  const handleLogout = async () => {
    await logout();
    onMobileClose?.();
  };

  return (
    <>
      {/* Mobile Overlay */}
      <AnimatePresence>
        {mobileIsOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-40 lg:hidden"
            onClick={onMobileClose}
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <motion.aside
        className={cn(
          'fixed lg:static inset-y-0 left-0 z-50 w-64 bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-800 flex flex-col transition-transform',
          'lg:translate-x-0',
          mobileIsOpen ? 'translate-x-0' : '-translate-x-full'
        )}
      >
        {/* Logo */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-800">
          <Link to="/admin/dashboard" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">C</span>
            </div>
            <span className="font-bold text-xl text-gray-900 dark:text-white">CMS</span>
          </Link>
          <Button
            variant="ghost"
            size="icon"
            onClick={onMobileClose}
            className="lg:hidden"
          >
            <X className="h-5 w-5" />
          </Button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto p-4 space-y-1">
          {filteredMenuItems.map((item) => {
            const Icon = item.icon;
            const isExpanded = expandedMenus[item.id];
            const isItemActive = isActive(item.path);
            const hasSubmenu = item.submenu && item.submenu.length > 0;

            return (
              <div key={item.id}>
                {/* Main menu item */}
                <button
                  onClick={() => {
                    if (hasSubmenu) {
                      toggleMenu(item.id);
                    }
                    onMobileClose?.();
                  }}
                  className={cn(
                    'w-full flex items-center justify-between px-3 py-2 rounded-lg text-sm transition-colors',
                    isItemActive
                      ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 font-medium'
                      : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
                  )}
                >
                  <Link to={item.path} className="flex items-center gap-3 flex-1">
                    <Icon className="h-5 w-5" />
                    <span>{item.label}</span>
                  </Link>
                  {hasSubmenu && (
                    isExpanded ? (
                      <ChevronDown className="h-4 w-4" />
                    ) : (
                      <ChevronRight className="h-4 w-4" />
                    )
                  )}
                </button>

                {/* Submenu */}
                <AnimatePresence>
                  {hasSubmenu && isExpanded && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="overflow-hidden"
                    >
                      <div className="ml-8 mt-1 space-y-1">
                        {item.submenu.map((subItem, index) => (
                          <Link
                            key={index}
                            to={subItem.path}
                            onClick={onMobileClose}
                            className={cn(
                              'block px-3 py-2 rounded-lg text-sm transition-colors',
                              isActive(subItem.path)
                                ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 font-medium'
                                : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800'
                            )}
                          >
                            {subItem.label}
                          </Link>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </nav>

        {/* User section */}
        <div className="p-4 border-t border-gray-200 dark:border-gray-800">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center text-white font-medium">
              {user?.fullName?.charAt(0) || 'U'}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
                {user?.fullName}
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400 truncate capitalize">
                {user?.role}
              </p>
            </div>
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={handleLogout}
            className="w-full"
          >
            <LogOut className="h-4 w-4 mr-2" />
            Logout
          </Button>
        </div>
      </motion.aside>

      {/* Mobile menu button */}
      <Button
        variant="ghost"
        size="icon"
        onClick={onToggle}
        className="fixed top-4 left-4 z-30 lg:hidden"
      >
        <Menu className="h-6 w-6" />
      </Button>
    </>
  );
}

export default Sidebar;
