import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Lock, Shield, Globe, Sun, Moon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/context/AuthContext';
import { useTheme } from '@/context/ThemeContext';
import { useLanguage } from '@/context/LanguageContext';
import { useToast } from '@/components/ui/use-toast.js';
import LoginDialog from '@/components/auth/LoginDialog.jsx';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const { user, logout, login, hasRole } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const { language, toggleLanguage, translate } = useLanguage();
  const { toast } = useToast();
  const location = useLocation();
  const navigate = useNavigate();

  const isAdmin = hasRole('admin');

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogout = () => {
    logout();
    toast({
      title: translate('logout.success'),
      description: language === 'id' ? "Anda telah keluar dari CMS Admin." : "You have logged out from CMS Admin.",
    });
  };

  const navItems = [{
    name: translate('nav.home'),
    path: '/'
  }, {
    name: translate('nav.about'),
    path: '/about'
  }, {
    name: translate('nav.services'),
    path: '/services'
  }, {
    name: translate('nav.portfolio'),
    path: '/portfolio'
  }, {
    name: translate('nav.blog'),
    path: '/blog'
  }, {
    name: translate('nav.contact'),
    path: '/contact'
  }];
  return <motion.nav initial={{
    y: -100
  }} animate={{
    y: 0
  }} className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'glass-effect shadow-lg' : 'bg-transparent'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center space-x-2">
            <img alt="Logo Caniel Agency" className="h-8 w-auto" src="https://horizons-cdn.hostinger.com/44c1747d-ce99-4087-aad3-0f3e3f7030b0/caniel-agency_trans_text-white_exp-1_by-is-YvLG5.webp" />
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-6">
            {navItems.map(item => <Link key={item.path} to={item.path} className={`nav-link text-sm font-medium transition-colors ${location.pathname === item.path ? 'text-blue-400 active' : 'text-gray-300 hover:text-white'}`}>
                {item.name}
              </Link>)}
            
            {/* Theme Toggle Button */}
            <Button
              onClick={toggleTheme}
              variant="ghost"
              size="icon"
              className="text-gray-300 hover:text-white transition-colors"
              title={theme === 'dark' ? translate('nav.light_mode') : translate('nav.dark_mode')}
            >
              {theme === 'dark' ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </Button>

            {/* Language Toggle Button */}
            <Button
              onClick={toggleLanguage}
              variant="ghost"
              size="icon"
              className="text-gray-300 hover:text-white transition-colors"
              title={translate('nav.translate')}
            >
              <Globe className="h-5 w-5" />
              <span className="ml-1 text-xs font-semibold">{language === 'id' ? 'EN' : 'ID'}</span>
            </Button>

            {/* CMS Admin Buttons */}
            {isAdmin ? (
              <Button
                onClick={handleLogout}
                className="flex items-center gap-2 h-9 px-4 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800"
              >
                <X className="h-4 w-4" />
                <span>{translate('nav.logout')}</span>
              </Button>
            ) : (
              <Button
                onClick={() => setIsLoginOpen(true)}
                className="flex items-center gap-2 h-9 px-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
              >
                <Lock className="h-4 w-4" />
                <span>{translate('nav.login')}</span>
              </Button>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <Button variant="ghost" size="icon" onClick={() => setIsOpen(!isOpen)} className="text-white">
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && <motion.div initial={{
        opacity: 0,
        height: 0
      }} animate={{
        opacity: 1,
        height: 'auto'
      }} exit={{
        opacity: 0,
        height: 0
      }} className="md:hidden glass-effect border-t border-gray-700">
            <div className="px-4 py-4 space-y-3">
              {navItems.map(item => <Link key={item.path} to={item.path} onClick={() => setIsOpen(false)} className={`block py-2 text-sm font-medium transition-colors ${location.pathname === item.path ? 'text-blue-400' : 'text-gray-300 hover:text-white'}`}>
                  {item.name}
                </Link>)}
              
              {/* Theme Toggle - Mobile */}
              <Button
                onClick={() => {
                  setIsOpen(false);
                  toggleTheme();
                }}
                variant="ghost"
                className="w-full flex items-center justify-center gap-2 py-2 text-gray-300 hover:text-white transition-colors"
              >
                {theme === 'dark' ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
                <span>{theme === 'dark' ? translate('nav.light_mode') : translate('nav.dark_mode')}</span>
              </Button>

              {/* Language Toggle - Mobile */}
              <Button
                onClick={() => {
                  setIsOpen(false);
                  toggleLanguage();
                }}
                variant="ghost"
                className="w-full flex items-center justify-center gap-2 py-2 text-gray-300 hover:text-white transition-colors"
              >
                <Globe className="h-5 w-5" />
                <span>{translate('nav.translate')} ({language === 'id' ? 'EN' : 'ID'})</span>
              </Button>

              {/* CMS Admin Buttons - Mobile */}
              {isAdmin ? (
                <Button
                  onClick={() => {
                    setIsOpen(false);
                    handleLogout();
                  }}
                  className="w-full flex items-center justify-center gap-2 mt-4 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800"
                >
                  <X className="h-4 w-4" />
                  <span>{translate('nav.logout')}</span>
                </Button>
              ) : (
                <Button
                  onClick={() => {
                    setIsOpen(false);
                    setIsLoginOpen(true);
                  }}
                  className="w-full flex items-center justify-center gap-2 mt-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                >
                  <Lock className="h-4 w-4" />
                  <span>{translate('nav.login_cms')}</span>
                </Button>
              )}
            </div>
          </motion.div>}
      </AnimatePresence>

      {/* Login Dialog */}
      <LoginDialog
        isOpen={isLoginOpen}
        onOpenChange={setIsLoginOpen}
        onLogin={login}
      />
    </motion.nav>;
};
export default Navbar;