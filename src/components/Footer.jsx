import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Code, Zap, Mail, Phone, MapPin, Facebook, Twitter, Instagram, Linkedin, ArrowUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };
  const footerLinks = {
    layanan: [{
      name: 'Website Development',
      href: '/services'
    }, {
      name: 'Digital Marketing',
      href: '/services'
    }, {
      name: 'Business Consulting',
      href: '/services'
    }, {
      name: 'Management System',
      href: '/services'
    }],
    perusahaan: [{
      name: 'Tentang Kami',
      href: '/about'
    }, {
      name: 'Portfolio',
      href: '/portfolio'
    }, {
      name: 'Blog',
      href: '/blog'
    }, {
      name: 'Kontak',
      href: '/contact'
    }],
    dukungan: [{
      name: 'FAQ',
      href: '#'
    }, {
      name: 'Dokumentasi',
      href: '#'
    }, {
      name: 'Support',
      href: '#'
    }, {
      name: 'Privacy Policy',
      href: '#'
    }]
  };
  const socialLinks = [{
    icon: Facebook,
    href: '#',
    label: 'Facebook'
  }, {
    icon: Twitter,
    href: '#',
    label: 'Twitter'
  }, {
    icon: Instagram,
    href: '#',
    label: 'Instagram'
  }, {
    icon: Linkedin,
    href: '#',
    label: 'LinkedIn'
  }];
  return <footer className="relative bg-slate-900 border-t border-slate-800">
      <div className="absolute inset-0 bg-gradient-to-br from-blue-900/10 to-purple-900/10"></div>
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer Content */}
        <div className="py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Company Info */}
            <div className="lg:col-span-1">
              <Link to="/" className="flex items-center space-x-2 mb-6">
                <div className="relative">
                  <Code className="h-8 w-8 text-blue-500" />
                  <Zap className="h-4 w-4 text-purple-500 absolute -top-1 -right-1" />
                </div>
                <span className="text-xl font-bold gradient-text">Caniel Agency</span>
              </Link>
              <p className="text-gray-400 mb-6 leading-relaxed">
                Solusi teknologi terdepan untuk mengembangkan bisnis Anda. 
                Kami menyediakan layanan website development, digital marketing, 
                dan konsultasi bisnis profesional.
              </p>
              <div className="flex space-x-4">
                {socialLinks.map((social, index) => <motion.a key={social.label} href={social.href} whileHover={{
                scale: 1.1
              }} whileTap={{
                scale: 0.95
              }} className="w-10 h-10 bg-slate-800 rounded-lg flex items-center justify-center text-gray-400 hover:text-white hover:bg-blue-600 transition-all duration-300" aria-label={social.label}>
                    <social.icon className="h-5 w-5" />
                  </motion.a>)}
              </div>
            </div>

            {/* Services Links */}
            <div>
              <span className="text-lg font-semibold text-white mb-6 block">
                Layanan
              </span>
              <ul className="space-y-3">
                {footerLinks.layanan.map(link => <li key={link.name}>
                    <Link to={link.href} className="text-gray-400 hover:text-blue-400 transition-colors duration-300">
                      {link.name}
                    </Link>
                  </li>)}
              </ul>
            </div>

            {/* Company Links */}
            <div>
              <span className="text-lg font-semibold text-white mb-6 block">
                Perusahaan
              </span>
              <ul className="space-y-3">
                {footerLinks.perusahaan.map(link => <li key={link.name}>
                    <Link to={link.href} className="text-gray-400 hover:text-blue-400 transition-colors duration-300">
                      {link.name}
                    </Link>
                  </li>)}
              </ul>
            </div>

            {/* Contact Info */}
            <div>
              <span className="text-lg font-semibold text-white mb-6 block">
                Kontak Kami
              </span>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <MapPin className="h-5 w-5 text-blue-500 mt-1 flex-shrink-0" />
                  <p className="text-gray-400">
										The Family Residence
										Jl. Pratama, Kav-101 Deplu Kreo, Cipadu Jaya, Larangan<br />
                    Kota Tangerang, 15155
                  </p>
                </div>
                <div className="flex items-center space-x-3">
                  <Phone className="h-5 w-5 text-blue-500 flex-shrink-0" />
                  <p className="text-gray-400">+62 818 414 951</p>
                </div>
                <div className="flex items-center space-x-3">
                  <Mail className="h-5 w-5 text-blue-500 flex-shrink-0" />
                  <p className="text-gray-400">marketing@caniel.my.id</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Footer */}
        <div className="border-t border-slate-800 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm">© 2024 Caniel Agency. Semua hak dilindungi.</p>
            <div className="flex items-center space-x-6 mt-4 md:mt-0">
              <Link to="#" className="text-gray-400 hover:text-blue-400 text-sm transition-colors">
                Syarat & Ketentuan
              </Link>
              <Link to="#" className="text-gray-400 hover:text-blue-400 text-sm transition-colors">
                Kebijakan Privasi
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll to Top Button */}
      <motion.button onClick={scrollToTop} whileHover={{
      scale: 1.1
    }} whileTap={{
      scale: 0.9
    }} className="fixed bottom-8 right-8 w-12 h-12 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center text-white shadow-lg hover:shadow-xl transition-all duration-300 z-40" aria-label="Scroll to top">
        <ArrowUp className="h-6 w-6" />
      </motion.button>
    </footer>;
};
export default Footer;