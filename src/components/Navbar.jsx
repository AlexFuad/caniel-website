import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Lock, Shield } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/context/AuthContext';
import { useToast } from '@/components/ui/use-toast.js';
import LoginDialog from '@/components/auth/LoginDialog.jsx';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const { user, logout, login, hasRole } = useAuth();
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
      title: "Logout Berhasil",
      description: "Anda telah keluar dari CMS Admin.",
    });
  };

  const navItems = [{
    name: 'Beranda',
    path: '/'
  }, {
    name: 'Tentang Kami',
    path: '/about'
  }, {
    name: 'Layanan',
    path: '/services'
  }, {
    name: 'Portfolio',
    path: '/portfolio'
  }, {
    name: 'Blog',
    path: '/blog'
  }, {
    name: 'Kontak',
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
            
            {/* CMS Admin Buttons */}
            {isAdmin ? (
              <>
                <Button
                  onClick={() => navigate('/admin/cms')}
                  className="flex items-center gap-2 h-9 px-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 mr-2"
                >
                  <Shield className="h-4 w-4" />
                  <span>CMS</span>
                </Button>
                <Button
                  onClick={handleLogout}
                  className="flex items-center gap-2 h-9 px-4 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800"
                >
                  <X className="h-4 w-4" />
                  <span>Logout</span>
                </Button>
              </>
            ) : (
              <Button
                onClick={() => setIsLoginOpen(true)}
                className="flex items-center gap-2 h-9 px-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
              >
                <Lock className="h-4 w-4" />
                <span>Login</span>
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
              
              {/* CMS Admin Buttons - Mobile */}
              {isAdmin ? (
                <>
                  <Button
                    onClick={() => {
                      setIsOpen(false);
                      navigate('/admin/cms');
                    }}
                    className="w-full flex items-center justify-center gap-2 mt-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                  >
                    <Shield className="h-4 w-4" />
                    <span>Buka CMS</span>
                  </Button>
                  <Button
                    onClick={() => {
                      setIsOpen(false);
                      handleLogout();
                    }}
                    className="w-full flex items-center justify-center gap-2 mt-2 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800"
                  >
                    <X className="h-4 w-4" />
                    <span>Logout</span>
                  </Button>
                </>
              ) : (
                <Button
                  onClick={() => {
                    setIsOpen(false);
                    setIsLoginOpen(true);
                  }}
                  className="w-full flex items-center justify-center gap-2 mt-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                >
                  <Lock className="h-4 w-4" />
                  <span>Login CMS</span>
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