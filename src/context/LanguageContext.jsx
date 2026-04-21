import React, { createContext, useContext, useState, useEffect } from 'react';
import { STORAGE_KEYS } from '@/config/constants';

const LanguageContext = createContext(null);

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within LanguageProvider');
  }
  return context;
};

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState('id');
  const [translations, setTranslations] = useState({});

  // Translation dictionary
  const translationData = {
    id: {
      // Navigation
      'nav.home': 'Beranda',
      'nav.about': 'Tentang Kami',
      'nav.services': 'Layanan',
      'nav.portfolio': 'Portfolio',
      'nav.blog': 'Blog',
      'nav.contact': 'Kontak',
      'nav.login': 'Login',
      'nav.logout': 'Logout',
      'nav.login_cms': 'Login CMS',
      'nav.translate': 'Terjemahkan',
      'nav.dark_mode': 'Mode Gelap',
      'nav.light_mode': 'Mode Terang',
      
      // Common
      'loading': 'Memuat...',
      'error': 'Terjadi kesalahan',
      'success': 'Berhasil',
      'cancel': 'Batal',
      'save': 'Simpan',
      'edit': 'Edit',
      'delete': 'Hapus',
      'search': 'Cari',
      'close': 'Tutup',
      'view_more': 'Lihat Lebih Lanjut',
      'read_more': 'Baca Selengkapnya',
      'send_message': 'Kirim Pesan',
      'learn_more': 'Pelajari Lebih Lanjut',
      'get_started': 'Mulai Sekarang',
      'contact_us': 'Hubungi Kami',
      'back_to_top': 'Kembali ke Atas',
      
      // Home Page
      'home.hero.title': 'Solusi Digital Terpadu untuk Bisnis Anda',
      'home.hero.subtitle': 'Kami menghadirkan inovasi teknologi untuk mengubah cara bisnis Anda beroperasi di era digital',
      'home.hero.cta': 'Mulai Sekarang',
      'home.hero.cta_secondary': 'Lihat Portfolio',
      'home.services.title': 'Layanan Kami',
      'home.services.subtitle': 'Solusi komprehensif untuk kebutuhan digital bisnis Anda',
      'home.portfolio.title': 'Portfolio Terbaru',
      'home.portfolio.subtitle': 'Hasil kerja kami yang membanggakan',
      'home.testimonials.title': 'Apa Kata Klien',
      'home.testimonials.subtitle': 'Kepuasan klien adalah prioritas utama kami',
      
      // About Page
      'about.title': 'Tentang Kami',
      'about.subtitle': 'Mengenal lebih dekat tim dan visi kami',
      'about.story.title': 'Cerita Kami',
      'about.story.content': 'Kami adalah tim profesional yang berdedikasi untuk memberikan solusi digital terbaik',
      'about.team.title': 'Tim Kami',
      'about.mission.title': 'Misi Kami',
      'about.vision.title': 'Visi Kami',
      'about.values.title': 'Nilai-Nilai Kami',
      
      // Services Page
      'services.title': 'Layanan Kami',
      'services.subtitle': 'Solusi digital yang komprehensif untuk bisnis Anda',
      'services.web_dev.title': 'Pengembangan Web',
      'services.web_dev.desc': 'Website modern dan responsif untuk bisnis Anda',
      'services.mobile_dev.title': 'Pengembangan Mobile',
      'services.mobile_dev.desc': 'Aplikasi mobile yang inovatif dan user-friendly',
      'services.ui_ux.title': 'Desain UI/UX',
      'services.ui_ux.desc': 'Desain yang menarik dan pengalaman pengguna yang optimal',
      'services.digital_marketing.title': 'Digital Marketing',
      'services.digital_marketing.desc': 'Strategi pemasaran digital yang efektif',
      
      // Portfolio Page
      'portfolio.title': 'Portfolio Kami',
      'portfolio.subtitle': 'Hasil kerja terbaik kami',
      'portfolio.filter.all': 'Semua',
      'portfolio.filter.web': 'Website',
      'portfolio.filter.mobile': 'Mobile',
      'portfolio.filter.design': 'Desain',
      'portfolio.view_project': 'Lihat Proyek',
      
      // Blog Page
      'blog.title': 'Blog Kami',
      'blog.subtitle': 'Artikel dan wawasan tentang teknologi dan bisnis',
      'blog.read_more': 'Baca Selengkapnya',
      'blog.published_on': 'Diterbitkan pada',
      'blog.category': 'Kategori',
      'blog.author': 'Penulis',
      'blog.tags': 'Tag',
      'blog.related_posts': 'Artikel Terkait',
      
      // Contact Page
      'contact.title': 'Hubungi Kami',
      'contact.subtitle': 'Kami siap membantu kebutuhan digital Anda',
      'contact.form.name': 'Nama Lengkap',
      'contact.form.email': 'Email',
      'contact.form.subject': 'Subjek',
      'contact.form.message': 'Pesan',
      'contact.form.submit': 'Kirim Pesan',
      'contact.info.title': 'Informasi Kontak',
      'contact.info.address': 'Alamat',
      'contact.info.phone': 'Telepon',
      'contact.info.email': 'Email',
      'contact.info.hours': 'Jam Operasional',
      
      // Auth
      'login.title': 'Masuk ke CMS',
      'login.username': 'Username',
      'login.password': 'Password',
      'login.remember': 'Ingat saya',
      'login.button': 'Masuk',
      'login.success': 'Login berhasil',
      'login.error': 'Login gagal',
      'logout.success': 'Logout berhasil',
      
      // WhatsApp
      'whatsapp.message': 'Halo, saya tertarik dengan layanan Anda',
    },
    en: {
      // Navigation
      'nav.home': 'Home',
      'nav.about': 'About Us',
      'nav.services': 'Services',
      'nav.portfolio': 'Portfolio',
      'nav.blog': 'Blog',
      'nav.contact': 'Contact',
      'nav.login': 'Login',
      'nav.logout': 'Logout',
      'nav.login_cms': 'CMS Login',
      'nav.translate': 'Translate',
      'nav.dark_mode': 'Dark Mode',
      'nav.light_mode': 'Light Mode',
      
      // Common
      'loading': 'Loading...',
      'error': 'An error occurred',
      'success': 'Success',
      'cancel': 'Cancel',
      'save': 'Save',
      'edit': 'Edit',
      'delete': 'Delete',
      'search': 'Search',
      'close': 'Close',
      'view_more': 'View More',
      'read_more': 'Read More',
      'send_message': 'Send Message',
      'learn_more': 'Learn More',
      'get_started': 'Get Started',
      'contact_us': 'Contact Us',
      'back_to_top': 'Back to Top',
      
      // Home Page
      'home.hero.title': 'Integrated Digital Solutions for Your Business',
      'home.hero.subtitle': 'We bring technological innovation to transform how your business operates in the digital era',
      'home.hero.cta': 'Get Started',
      'home.hero.cta_secondary': 'View Portfolio',
      'home.services.title': 'Our Services',
      'home.services.subtitle': 'Comprehensive solutions for your digital business needs',
      'home.portfolio.title': 'Latest Portfolio',
      'home.portfolio.subtitle': 'Our proud work results',
      'home.testimonials.title': 'What Clients Say',
      'home.testimonials.subtitle': 'Client satisfaction is our top priority',
      
      // About Page
      'about.title': 'About Us',
      'about.subtitle': 'Get to know our team and vision better',
      'about.story.title': 'Our Story',
      'about.story.content': 'We are a team of dedicated professionals committed to providing the best digital solutions',
      'about.team.title': 'Our Team',
      'about.mission.title': 'Our Mission',
      'about.vision.title': 'Our Vision',
      'about.values.title': 'Our Values',
      
      // Services Page
      'services.title': 'Our Services',
      'services.subtitle': 'Comprehensive digital solutions for your business',
      'services.web_dev.title': 'Web Development',
      'services.web_dev.desc': 'Modern and responsive websites for your business',
      'services.mobile_dev.title': 'Mobile Development',
      'services.mobile_dev.desc': 'Innovative and user-friendly mobile applications',
      'services.ui_ux.title': 'UI/UX Design',
      'services.ui_ux.desc': 'Attractive design and optimal user experience',
      'services.digital_marketing.title': 'Digital Marketing',
      'services.digital_marketing.desc': 'Effective digital marketing strategies',
      
      // Portfolio Page
      'portfolio.title': 'Our Portfolio',
      'portfolio.subtitle': 'Our best work results',
      'portfolio.filter.all': 'All',
      'portfolio.filter.web': 'Website',
      'portfolio.filter.mobile': 'Mobile',
      'portfolio.filter.design': 'Design',
      'portfolio.view_project': 'View Project',
      
      // Blog Page
      'blog.title': 'Our Blog',
      'blog.subtitle': 'Articles and insights about technology and business',
      'blog.read_more': 'Read More',
      'blog.published_on': 'Published on',
      'blog.category': 'Category',
      'blog.author': 'Author',
      'blog.tags': 'Tags',
      'blog.related_posts': 'Related Posts',
      
      // Contact Page
      'contact.title': 'Contact Us',
      'contact.subtitle': 'We are ready to help with your digital needs',
      'contact.form.name': 'Full Name',
      'contact.form.email': 'Email',
      'contact.form.subject': 'Subject',
      'contact.form.message': 'Message',
      'contact.form.submit': 'Send Message',
      'contact.info.title': 'Contact Information',
      'contact.info.address': 'Address',
      'contact.info.phone': 'Phone',
      'contact.info.email': 'Email',
      'contact.info.hours': 'Business Hours',
      
      // Auth
      'login.title': 'Login to CMS',
      'login.username': 'Username',
      'login.password': 'Password',
      'login.remember': 'Remember me',
      'login.button': 'Login',
      'login.success': 'Login successful',
      'login.error': 'Login failed',
      'logout.success': 'Logout successful',
      
      // WhatsApp
      'whatsapp.message': 'Hello, I am interested in your services',
    }
  };

  useEffect(() => {
    // Load language from localStorage
    const savedLanguage = localStorage.getItem(STORAGE_KEYS.LANGUAGE);
    
    if (savedLanguage && ['id', 'en'].includes(savedLanguage)) {
      setLanguage(savedLanguage);
    }
    
    // Set initial translations
    setTranslations(translationData);
  }, []);

  const translate = (key) => {
    if (!translations[language]) return key;
    return translations[language][key] || key;
  };

  const changeLanguage = (newLanguage) => {
    if (['id', 'en'].includes(newLanguage)) {
      setLanguage(newLanguage);
      localStorage.setItem(STORAGE_KEYS.LANGUAGE, newLanguage);
    }
  };

  const toggleLanguage = () => {
    const newLanguage = language === 'id' ? 'en' : 'id';
    changeLanguage(newLanguage);
  };

  const value = {
    language,
    translate,
    changeLanguage,
    toggleLanguage,
    isIndonesian: language === 'id',
    isEnglish: language === 'en',
  };

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
};
