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
      'home.hero.title': 'Solusi Teknologi Terdepan untuk Bisnis',
      'home.hero.subtitle': 'Kami menyediakan layanan website development, digital marketing, business consulting, dan management system untuk mengembangkan bisnis Anda',
      'home.hero.cta': 'Konsultasi Gratis',
      'home.hero.cta_secondary': 'Lihat Portfolio',
      'home.services.title': 'Layanan Kami',
      'home.services.subtitle': 'Solusi lengkap untuk kebutuhan teknologi dan bisnis Anda',
      'home.portfolio.title': 'Portfolio Terbaru',
      'home.portfolio.subtitle': 'Hasil kerja kami yang membanggakan',
      'home.testimonials.title': 'Testimoni Klien',
      'home.testimonials.subtitle': 'Apa kata klien kami tentang layanan yang kami berikan',
      'home.cta.title': 'Siap Mengembangkan Bisnis?',
      'home.cta.subtitle': 'Hubungi kami sekarang untuk konsultasi gratis dan dapatkan solusi terbaik untuk bisnis Anda',
      'home.cta.contact': 'Hubungi Kami',
      
      // Services
      'service.web_dev.title': 'Website Development',
      'service.web_dev.desc': 'Membangun website modern, responsif, dan SEO-friendly untuk bisnis Anda',
      'service.web_dev.feature1': 'Responsive Design',
      'service.web_dev.feature2': 'SEO Optimized',
      'service.web_dev.feature3': 'Fast Loading',
      'service.web_dev.feature4': 'Modern UI/UX',
      
      'service.digital_marketing.title': 'Digital Marketing',
      'service.digital_marketing.desc': 'Strategi pemasaran digital yang efektif untuk meningkatkan brand awareness',
      'service.digital_marketing.feature1': 'Social Media Marketing',
      'service.digital_marketing.feature2': 'Google Ads',
      'service.digital_marketing.feature3': 'Content Marketing',
      'service.digital_marketing.feature4': 'Analytics',
      
      'service.business_consulting.title': 'Business Consulting',
      'service.business_consulting.desc': 'Konsultasi bisnis profesional untuk mengoptimalkan operasional perusahaan',
      'service.business_consulting.feature1': 'Business Strategy',
      'service.business_consulting.feature2': 'Process Optimization',
      'service.business_consulting.feature3': 'Market Analysis',
      'service.business_consulting.feature4': 'Growth Planning',
      
      'service.management_system.title': 'Management System',
      'service.management_system.desc': 'Sistem manajemen terintegrasi untuk efisiensi operasional bisnis',
      'service.management_system.feature1': 'CRM System',
      'service.management_system.feature2': 'Inventory Management',
      'service.management_system.feature3': 'HR Management',
      'service.management_system.feature4': 'Financial Tracking',
      
      // Stats
      'stat.projects': 'Proyek Selesai',
      'stat.clients': 'Klien Puas',
      'stat.experience': 'Tahun Pengalaman',
      'stat.support': 'Support',
      
      // Common Actions
      'action.view_all_services': 'Lihat Semua Layanan',
      'action.get_quote': 'Dapatkan Penawaran',
      'action.free_consultation': 'Konsultasi Gratis',
      
      // About Page
      'about.title': 'Tentang Kami',
      'about.subtitle': 'Tim profesional yang berdedikasi untuk mengembangkan bisnis Anda dengan solusi teknologi terdepan dan strategi yang terbukti efektif',
      'about.story.title': 'Cerita Kami',
      'about.story.para1': 'Caniel Agency didirikan pada tahun 2019 dengan visi menjadi partner teknologi terpercaya bagi bisnis di Indonesia. Berawal dari tim kecil yang passionate terhadap teknologi, kami telah berkembang menjadi perusahaan yang melayani ratusan klien.',
      'about.story.para2': 'Dengan pengalaman lebih dari 5 tahun, kami telah membantu berbagai jenis bisnis mulai dari startup hingga perusahaan besar untuk bertransformasi digital dan mencapai target bisnis mereka.',
      'about.story.para3': 'Komitmen kami adalah memberikan solusi teknologi yang tidak hanya modern dan inovatif, tetapi juga praktis dan memberikan ROI yang terukur bagi setiap klien.',
      'about.team.title': 'Tim Profesional',
      'about.team.subtitle': 'Bertemu dengan tim ahli yang siap membantu mengembangkan bisnis Anda',
      'about.values.title': 'Nilai-Nilai Kami',
      'about.values.subtitle': 'Prinsip-prinsip yang menjadi fondasi dalam setiap layanan yang kami berikan',
      'about.achievements.title': 'Pencapaian Kami',
      'about.achievements.subtitle': 'Angka-angka yang menunjukkan dedikasi dan kualitas layanan kami',
      'about.mission.title': 'Misi Kami',
      'about.mission.content': 'Memberikan solusi teknologi terbaik yang membantu bisnis bertransformasi digital, meningkatkan efisiensi operasional, dan mencapai pertumbuhan yang berkelanjutan melalui inovasi dan layanan berkualitas tinggi.',
      'about.vision.title': 'Visi Kami',
      'about.vision.content': 'Menjadi partner teknologi terpercaya dan terdepan di Indonesia yang membantu ribuan bisnis mencapai kesuksesan melalui transformasi digital dan strategi bisnis yang inovatif.',
      
      // Values
      'value.focus.title': 'Fokus pada Hasil',
      'value.focus.desc': 'Kami berkomitmen memberikan solusi yang menghasilkan dampak nyata bagi bisnis klien',
      'value.innovation.title': 'Inovasi Berkelanjutan',
      'value.innovation.desc': 'Selalu mengikuti perkembangan teknologi terbaru untuk memberikan solusi terdepan',
      'value.satisfaction.title': 'Kepuasan Klien',
      'value.satisfaction.desc': 'Kepuasan dan kesuksesan klien adalah prioritas utama dalam setiap proyek',
      'value.global.title': 'Standar Global',
      'value.global.desc': 'Menerapkan standar internasional dalam setiap layanan yang kami berikan',
      
      // Team
      'team.ceo.name': 'Alex Fuad',
      'team.ceo.position': 'CEO & Founder',
      'team.ceo.desc': 'Berpengalaman 8+ tahun dalam teknologi dan bisnis digital',
      'team.dev.name': 'Eca Tatianna',
      'team.dev.position': 'Lead Developer',
      'team.dev.desc': 'Expert dalam web development dan system architecture',
      'team.marketing.name': 'Daniel Rizky N',
      'team.marketing.position': 'Digital Marketing Manager',
      'team.marketing.desc': 'Spesialis strategi pemasaran digital dan growth hacking',
      'team.consultant.name': 'Aprilianti P',
      'team.consultant.position': 'Business Consultant',
      'team.consultant.desc': 'Konsultan bisnis dengan track record mengembangkan 100+ perusahaan',
      
      // Achievements
      'achievement.projects': 'Proyek Berhasil',
      'achievement.clients': 'Klien Puas',
      'achievement.experience': 'Tahun Pengalaman',
      'achievement.awards': 'Award & Sertifikasi',
      
      // Services Page
      'services.title': 'Layanan Kami',
      'services.subtitle': 'Solusi teknologi lengkap untuk mengembangkan bisnis Anda dengan layanan profesional dan harga yang kompetitif',
      'services.hero.title': 'Layanan Kami',
      'services.hero.subtitle': 'Solusi teknologi lengkap untuk mengembangkan bisnis Anda dengan layanan profesional dan harga yang kompetitif',
      'services.additional.title': 'Layanan Tambahan',
      'services.additional.subtitle': 'Layanan pendukung untuk melengkapi kebutuhan teknologi bisnis Anda',
      'services.process.title': 'Proses Kerja Kami',
      'services.process.subtitle': 'Metodologi yang terbukti untuk menghasilkan solusi berkualitas tinggi',
      'services.cta.title': 'Siap Memulai Proyek?',
      'services.cta.subtitle': 'Konsultasikan kebutuhan bisnis Anda dengan tim ahli kami dan dapatkan solusi terbaik yang sesuai dengan budget dan timeline Anda',
      'services.cta.quote': 'Dapatkan Penawaran',
      
      // Services Details
      'services.web_dev.title': 'Website Development',
      'services.web_dev.desc': 'Membangun website modern, responsif, dan SEO-friendly yang memberikan pengalaman terbaik bagi pengunjung dan meningkatkan konversi bisnis Anda.',
      'services.web_dev.features': 'Fitur Utama:',
      'services.web_dev.technologies': 'Teknologi:',
      'services.web_dev.price': 'Mulai dari Rp 5.000.000',
      'services.web_dev.feature1': 'Responsive Web Design',
      'services.web_dev.feature2': 'SEO Optimization',
      'services.web_dev.feature3': 'Fast Loading Speed',
      'services.web_dev.feature4': 'Modern UI/UX Design',
      'services.web_dev.feature5': 'Cross-browser Compatibility',
      'services.web_dev.feature6': 'Mobile-first Approach',
      'services.web_dev.feature7': 'Content Management System',
      'services.web_dev.feature8': 'E-commerce Integration',
      
      'services.digital_marketing.title': 'Digital Marketing',
      'services.digital_marketing.desc': 'Strategi pemasaran digital yang komprehensif untuk meningkatkan brand awareness, traffic website, dan penjualan online Anda.',
      'services.digital_marketing.price': 'Mulai dari Rp 3.000.000/bulan',
      'services.digital_marketing.feature1': 'Social Media Marketing',
      'services.digital_marketing.feature2': 'Google Ads Management',
      'services.digital_marketing.feature3': 'SEO & Content Marketing',
      'services.digital_marketing.feature4': 'Email Marketing',
      'services.digital_marketing.feature5': 'Influencer Marketing',
      'services.digital_marketing.feature6': 'Analytics & Reporting',
      'services.digital_marketing.feature7': 'Conversion Optimization',
      'services.digital_marketing.feature8': 'Brand Strategy',
      
      'services.business_consulting.title': 'Business Consulting',
      'services.business_consulting.desc': 'Konsultasi bisnis profesional untuk mengoptimalkan operasional, strategi pertumbuhan, dan transformasi digital perusahaan Anda.',
      'services.business_consulting.price': 'Mulai dari Rp 2.000.000/sesi',
      'services.business_consulting.feature1': 'Business Strategy Planning',
      'services.business_consulting.feature2': 'Process Optimization',
      'services.business_consulting.feature3': 'Market Analysis',
      'services.business_consulting.feature4': 'Digital Transformation',
      'services.business_consulting.feature5': 'Performance Improvement',
      'services.business_consulting.feature6': 'Risk Management',
      'services.business_consulting.feature7': 'Growth Planning',
      'services.business_consulting.feature8': 'Change Management',
      
      'services.management_system.title': 'Management System',
      'services.management_system.desc': 'Sistem manajemen terintegrasi yang dirancang khusus untuk meningkatkan efisiensi operasional dan produktivitas bisnis Anda.',
      'services.management_system.price': 'Mulai dari Rp 15.000.000',
      'services.management_system.feature1': 'Customer Relationship Management',
      'services.management_system.feature2': 'Inventory Management',
      'services.management_system.feature3': 'Human Resource Management',
      'services.management_system.feature4': 'Financial Management',
      'services.management_system.feature5': 'Project Management',
      'services.management_system.feature6': 'Document Management',
      'services.management_system.feature7': 'Reporting & Analytics',
      'services.management_system.feature8': 'Mobile Access',
      
      // Additional Services
      'services.domain.title': 'Domain & Hosting',
      'services.domain.desc': 'Layanan domain dan hosting berkualitas tinggi dengan uptime 99.9%',
      'services.security.title': 'Website Security',
      'services.security.desc': 'Perlindungan website dari malware, hacking, dan ancaman keamanan',
      'services.migration.title': 'Data Migration',
      'services.migration.desc': 'Migrasi data yang aman dari sistem lama ke sistem baru',
      'services.optimization.title': 'Performance Optimization',
      'services.optimization.desc': 'Optimasi performa website untuk kecepatan loading maksimal',
      
      // Process Steps
      'process.step1.title': 'Konsultasi & Analisis',
      'process.step1.desc': 'Memahami kebutuhan bisnis dan menganalisis requirements',
      'process.step2.title': 'Perencanaan & Strategi',
      'process.step2.desc': 'Menyusun strategi dan timeline proyek yang detail',
      'process.step3.title': 'Development & Implementation',
      'process.step3.desc': 'Mengembangkan solusi sesuai dengan rencana yang telah dibuat',
      'process.step4.title': 'Testing & Quality Assurance',
      'process.step4.desc': 'Melakukan testing menyeluruh untuk memastikan kualitas',
      'process.step5.title': 'Launch & Support',
      'process.step5.desc': 'Meluncurkan proyek dan memberikan support berkelanjutan',
      
      // Portfolio Page
      'portfolio.title': 'Portfolio & Media',
      'portfolio.subtitle': 'Jelajahi proyek-proyek yang telah kami kerjakan dan hasil nyata yang kami capai untuk berbagai klien di berbagai industri',
      'portfolio.hero.title': 'Portfolio & Media',
      'portfolio.hero.subtitle': 'Jelajahi proyek-proyek yang telah kami kerjakan dan hasil nyata yang kami capai untuk berbagai klien di berbagai industri',
      'portfolio.filter.all': 'Semua Proyek',
      'portfolio.filter.web': 'Website Development',
      'portfolio.filter.marketing': 'Digital Marketing',
      'portfolio.filter.consulting': 'Business Consulting',
      'portfolio.filter.system': 'Management System',
      'portfolio.view_project': 'Lihat Detail',
      'portfolio.view_all': 'Lihat Semua Portfolio',
      'portfolio.stats.title': 'Pencapaian Portfolio',
      'portfolio.stats.subtitle': 'Angka-angka yang menunjukkan dampak nyata dari proyek-proyek kami',
      'portfolio.cta.title': 'Siap Menjadi Bagian dari Portfolio Kami?',
      'portfolio.cta.subtitle': 'Mari diskusikan proyek Anda dan ciptakan hasil yang luar biasa bersama tim ahli kami',
      'portfolio.cta.start': 'Mulai Proyek Anda',
      
      // Portfolio Project Details
      'portfolio.client': 'Klien',
      'portfolio.technologies': 'Teknologi',
      'portfolio.more': 'lainnya',
      'portfolio.results': 'Hasil Utama',
      'portfolio.completed': 'Proyek Selesai',
      'portfolio.satisfied': 'Klien Puas',
      'portfolio.success_rate': 'Success Rate',
      'portfolio.support': 'Support',
      'portfolio.completed_desc': 'Berbagai jenis proyek',
      'portfolio.satisfied_desc': 'Dari berbagai industri',
      'portfolio.success_desc': 'Tingkat keberhasilan proyek',
      'portfolio.support_desc': 'Dukungan berkelanjutan',
      
      // Blog Page
      'blog.title': 'Blog & Insights',
      'blog.subtitle': 'Wawasan terbaru dari Caniel Agency untuk pertumbuhan bisnis digital Anda',
      'blog.hero.title': 'Blog & Insights',
      'blog.hero.subtitle': 'Wawasan terbaru dari Caniel Agency untuk pertumbuhan bisnis digital Anda',
      'blog.search_placeholder': 'Cari artikel...',
      'blog.filter.all': 'Semua Artikel',
      'blog.filter.web': 'Web Development',
      'blog.filter.marketing': 'Digital Marketing',
      'blog.filter.business': 'Business Tips',
      'blog.filter.tech': 'Technology',
      'blog.filter.tips': 'Tips & Tricks',
      'blog.featured': 'Artikel Unggulan',
      'blog.featured_desc': 'Artikel pilihan yang paling banyak dibaca dan memberikan value terbaik',
      'blog.all_articles': 'Semua Artikel',
      'blog.showing': 'Menampilkan',
      'blog.articles': 'artikel',
      'blog.new_article': 'Artikel Baru',
      'blog.read_more': 'Baca Selengkapnya',
      'blog.read': 'Baca',
      'blog.published_on': 'Diterbitkan pada',
      'blog.category': 'Kategori',
      'blog.author': 'Penulis',
      'blog.tags': 'Tag',
      'blog.related_posts': 'Artikel Terkait',
      'blog.recent_posts': 'Artikel Terbaru',
      'blog.popular_tags': 'Tag Populer',
      'blog.newsletter': 'Newsletter',
      'blog.newsletter_desc': 'Dapatkan artikel terbaru langsung di email Anda',
      'blog.email_placeholder': 'Email Anda',
      'blog.subscribe': 'Berlangganan',
      'blog.admin_active': 'Mode Admin Aktif',
      'blog.cms_dashboard': 'CMS Dashboard',
      'blog.logout': 'Logout',
      
      // Contact Page
      'contact.title': 'Hubungi Kami',
      'contact.subtitle': 'Siap membantu mengembangkan bisnis Anda dengan solusi teknologi terdepan. Mari diskusikan proyek Anda bersama tim ahli kami',
      'contact.hero.title': 'Hubungi Kami',
      'contact.hero.subtitle': 'Siap membantu mengembangkan bisnis Anda dengan solusi teknologi terdepan. Mari diskusikan proyek Anda bersama tim ahli kami',
      'contact.form.title': 'Kirim Pesan Kepada Kami',
      'contact.form.name': 'Nama Lengkap',
      'contact.form.email': 'Email',
      'contact.form.phone': 'Nomor Telepon',
      'contact.form.company': 'Nama Perusahaan',
      'contact.form.service': 'Layanan yang Dibutuhkan',
      'contact.form.message': 'Pesan',
      'contact.form.submit': 'Kirim Pesan',
      'contact.form.required': '*',
      'contact.form.name_placeholder': 'Masukkan nama lengkap',
      'contact.form.email_placeholder': 'email@example.com',
      'contact.form.phone_placeholder': '+62 812 3456 7890',
      'contact.form.company_placeholder': 'PT. Nama Perusahaan',
      'contact.form.service_placeholder': 'Pilih layanan',
      'contact.form.message_placeholder': 'Ceritakan tentang proyek atau kebutuhan Anda...',
      'contact.form.select_service': 'Pilih layanan',
      'contact.form.other': 'Lainnya',
      
      // Contact Services
      'contact.service.web_dev': 'Website Development',
      'contact.service.digital_marketing': 'Digital Marketing',
      'contact.service.business_consulting': 'Business Consulting',
      'contact.service.management_system': 'Management System',
      'contact.service.ecommerce': 'E-commerce Development',
      'contact.service.mobile_app': 'Mobile App Development',
      'contact.service.seo': 'SEO Optimization',
      
      // Contact Info
      'contact.info.title': 'Informasi Kontak',
      'contact.info.office': 'Lokasi Kantor',
      'contact.info.quick_actions': 'Aksi Cepat',
      'contact.info.response_time': 'Waktu Respon',
      'contact.info.whatsapp': 'Chat WhatsApp',
      'contact.info.schedule': 'Jadwalkan Meeting',
      'contact.info.consultation': 'Konsultasi Tim',
      'contact.info.email_response': 'Email',
      'contact.info.whatsapp_response': 'WhatsApp',
      'contact.info.phone_response': 'Telepon',
      'contact.info.email_time': '< 24 jam',
      'contact.info.whatsapp_time': '< 2 jam',
      'contact.info.phone_time': 'Langsung',
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
      
      // Footer
      'footer.description': 'Solusi teknologi terdepan untuk mengembangkan bisnis Anda. Kami menyediakan layanan website development, digital marketing, dan konsultasi bisnis profesional.',
      'footer.services': 'Layanan',
      'footer.company': 'Perusahaan',
      'footer.contact': 'Kontak Kami',
      'footer.copyright': '© 2024 Caniel Agency. Semua hak dilindungi.',
      'footer.terms': 'Syarat & Ketentuan',
      'footer.privacy': 'Kebijakan Privasi',
      'footer.address': 'The Family Residence\nJl. Pratama, Kav-101 Deplu Kreo, Cipadu Jaya, Larangan\nKota Tangerang, 15155',
      'footer.phone': '+62 818 414 951',
      'footer.email': 'marketing@caniel.my.id',
      
      // Footer Links
      'footer.link.web_dev': 'Website Development',
      'footer.link.digital_marketing': 'Digital Marketing',
      'footer.link.business_consulting': 'Business Consulting',
      'footer.link.management_system': 'Management System',
      'footer.link.about': 'Tentang Kami',
      'footer.link.portfolio': 'Portfolio',
      'footer.link.blog': 'Blog',
      'footer.link.contact': 'Kontak',
      'footer.link.faq': 'FAQ',
      'footer.link.documentation': 'Dokumentasi',
      'footer.link.support': 'Support',
      'footer.link.privacy_policy': 'Privacy Policy',
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
      'home.hero.title': 'Leading Technology Solutions for Business',
      'home.hero.subtitle': 'We provide website development, digital marketing, business consulting, and management system services to grow your business',
      'home.hero.cta': 'Free Consultation',
      'home.hero.cta_secondary': 'View Portfolio',
      'home.services.title': 'Our Services',
      'home.services.subtitle': 'Complete solutions for your technology and business needs',
      'home.portfolio.title': 'Latest Portfolio',
      'home.portfolio.subtitle': 'Our proud work results',
      'home.testimonials.title': 'Client Testimonials',
      'home.testimonials.subtitle': 'What our clients say about the services we provide',
      'home.cta.title': 'Ready to Grow Your Business?',
      'home.cta.subtitle': 'Contact us now for a free consultation and get the best solution for your business',
      'home.cta.contact': 'Contact Us',
      
      // Services
      'service.web_dev.title': 'Website Development',
      'service.web_dev.desc': 'Building modern, responsive, and SEO-friendly websites for your business',
      'service.web_dev.feature1': 'Responsive Design',
      'service.web_dev.feature2': 'SEO Optimized',
      'service.web_dev.feature3': 'Fast Loading',
      'service.web_dev.feature4': 'Modern UI/UX',
      
      'service.digital_marketing.title': 'Digital Marketing',
      'service.digital_marketing.desc': 'Effective digital marketing strategies to increase brand awareness',
      'service.digital_marketing.feature1': 'Social Media Marketing',
      'service.digital_marketing.feature2': 'Google Ads',
      'service.digital_marketing.feature3': 'Content Marketing',
      'service.digital_marketing.feature4': 'Analytics',
      
      'service.business_consulting.title': 'Business Consulting',
      'service.business_consulting.desc': 'Professional business consulting to optimize company operations',
      'service.business_consulting.feature1': 'Business Strategy',
      'service.business_consulting.feature2': 'Process Optimization',
      'service.business_consulting.feature3': 'Market Analysis',
      'service.business_consulting.feature4': 'Growth Planning',
      
      'service.management_system.title': 'Management System',
      'service.management_system.desc': 'Integrated management systems for operational business efficiency',
      'service.management_system.feature1': 'CRM System',
      'service.management_system.feature2': 'Inventory Management',
      'service.management_system.feature3': 'HR Management',
      'service.management_system.feature4': 'Financial Tracking',
      
      // Stats
      'stat.projects': 'Projects Completed',
      'stat.clients': 'Satisfied Clients',
      'stat.experience': 'Years Experience',
      'stat.support': 'Support',
      
      // Common Actions
      'action.view_all_services': 'View All Services',
      'action.get_quote': 'Get Quote',
      'action.free_consultation': 'Free Consultation',
      
      // About Page
      'about.title': 'About Us',
      'about.subtitle': 'A dedicated professional team committed to growing your business with leading technology solutions and proven effective strategies',
      'about.story.title': 'Our Story',
      'about.story.para1': 'Caniel Agency was founded in 2019 with the vision of becoming a trusted technology partner for businesses in Indonesia. Starting from a small team passionate about technology, we have grown into a company serving hundreds of clients.',
      'about.story.para2': 'With over 5 years of experience, we have helped various types of businesses from startups to large companies to transform digitally and achieve their business targets.',
      'about.story.para3': 'Our commitment is to provide technology solutions that are not only modern and innovative, but also practical and deliver measurable ROI for every client.',
      'about.team.title': 'Professional Team',
      'about.team.subtitle': 'Meet the expert team ready to help grow your business',
      'about.values.title': 'Our Values',
      'about.values.subtitle': 'Principles that form the foundation of every service we provide',
      'about.achievements.title': 'Our Achievements',
      'about.achievements.subtitle': 'Numbers that show our dedication and service quality',
      'about.mission.title': 'Our Mission',
      'about.mission.content': 'To provide the best technology solutions that help businesses transform digitally, improve operational efficiency, and achieve sustainable growth through innovation and high-quality services.',
      'about.vision.title': 'Our Vision',
      'about.vision.content': 'To become a trusted and leading technology partner in Indonesia that helps thousands of businesses achieve success through digital transformation and innovative business strategies.',
      
      // Values
      'value.focus.title': 'Focus on Results',
      'value.focus.desc': 'We are committed to providing solutions that create real impact for client businesses',
      'value.innovation.title': 'Continuous Innovation',
      'value.innovation.desc': 'Always following the latest technology developments to provide cutting-edge solutions',
      'value.satisfaction.title': 'Client Satisfaction',
      'value.satisfaction.desc': 'Client satisfaction and success is our top priority in every project',
      'value.global.title': 'Global Standards',
      'value.global.desc': 'Applying international standards in every service we provide',
      
      // Team
      'team.ceo.name': 'Alex Fuad',
      'team.ceo.position': 'CEO & Founder',
      'team.ceo.desc': '8+ years experience in technology and digital business',
      'team.dev.name': 'Eca Tatianna',
      'team.dev.position': 'Lead Developer',
      'team.dev.desc': 'Expert in web development and system architecture',
      'team.marketing.name': 'Daniel Rizky N',
      'team.marketing.position': 'Digital Marketing Manager',
      'team.marketing.desc': 'Specialist in digital marketing strategies and growth hacking',
      'team.consultant.name': 'Aprilianti P',
      'team.consultant.position': 'Business Consultant',
      'team.consultant.desc': 'Business consultant with track record of developing 100+ companies',
      
      // Achievements
      'achievement.projects': 'Successful Projects',
      'achievement.clients': 'Satisfied Clients',
      'achievement.experience': 'Years Experience',
      'achievement.awards': 'Awards & Certifications',
      
      // Services Page
      'services.title': 'Our Services',
      'services.subtitle': 'Complete technology solutions to grow your business with professional services and competitive pricing',
      'services.hero.title': 'Our Services',
      'services.hero.subtitle': 'Complete technology solutions to grow your business with professional services and competitive pricing',
      'services.additional.title': 'Additional Services',
      'services.additional.subtitle': 'Supporting services to complete your business technology needs',
      'services.process.title': 'Our Work Process',
      'services.process.subtitle': 'Proven methodology to produce high-quality solutions',
      'services.cta.title': 'Ready to Start a Project?',
      'services.cta.subtitle': 'Consult your business needs with our expert team and get the best solution that fits your budget and timeline',
      'services.cta.quote': 'Get Quote',
      
      // Services Details
      'services.web_dev.title': 'Website Development',
      'services.web_dev.desc': 'Building modern, responsive, and SEO-friendly websites that provide the best experience for visitors and increase your business conversion.',
      'services.web_dev.features': 'Key Features:',
      'services.web_dev.technologies': 'Technologies:',
      'services.web_dev.price': 'Starting from Rp 5,000,000',
      'services.web_dev.feature1': 'Responsive Web Design',
      'services.web_dev.feature2': 'SEO Optimization',
      'services.web_dev.feature3': 'Fast Loading Speed',
      'services.web_dev.feature4': 'Modern UI/UX Design',
      'services.web_dev.feature5': 'Cross-browser Compatibility',
      'services.web_dev.feature6': 'Mobile-first Approach',
      'services.web_dev.feature7': 'Content Management System',
      'services.web_dev.feature8': 'E-commerce Integration',
      
      'services.digital_marketing.title': 'Digital Marketing',
      'services.digital_marketing.desc': 'Comprehensive digital marketing strategies to increase brand awareness, website traffic, and your online sales.',
      'services.digital_marketing.price': 'Starting from Rp 3,000,000/month',
      'services.digital_marketing.feature1': 'Social Media Marketing',
      'services.digital_marketing.feature2': 'Google Ads Management',
      'services.digital_marketing.feature3': 'SEO & Content Marketing',
      'services.digital_marketing.feature4': 'Email Marketing',
      'services.digital_marketing.feature5': 'Influencer Marketing',
      'services.digital_marketing.feature6': 'Analytics & Reporting',
      'services.digital_marketing.feature7': 'Conversion Optimization',
      'services.digital_marketing.feature8': 'Brand Strategy',
      
      'services.business_consulting.title': 'Business Consulting',
      'services.business_consulting.desc': 'Professional business consulting to optimize operations, growth strategies, and digital transformation of your company.',
      'services.business_consulting.price': 'Starting from Rp 2,000,000/session',
      'services.business_consulting.feature1': 'Business Strategy Planning',
      'services.business_consulting.feature2': 'Process Optimization',
      'services.business_consulting.feature3': 'Market Analysis',
      'services.business_consulting.feature4': 'Digital Transformation',
      'services.business_consulting.feature5': 'Performance Improvement',
      'services.business_consulting.feature6': 'Risk Management',
      'services.business_consulting.feature7': 'Growth Planning',
      'services.business_consulting.feature8': 'Change Management',
      
      'services.management_system.title': 'Management System',
      'services.management_system.desc': 'Integrated management system specifically designed to improve operational efficiency and business productivity.',
      'services.management_system.price': 'Starting from Rp 15,000,000',
      'services.management_system.feature1': 'Customer Relationship Management',
      'services.management_system.feature2': 'Inventory Management',
      'services.management_system.feature3': 'Human Resource Management',
      'services.management_system.feature4': 'Financial Management',
      'services.management_system.feature5': 'Project Management',
      'services.management_system.feature6': 'Document Management',
      'services.management_system.feature7': 'Reporting & Analytics',
      'services.management_system.feature8': 'Mobile Access',
      
      // Additional Services
      'services.domain.title': 'Domain & Hosting',
      'services.domain.desc': 'High-quality domain and hosting services with 99.9% uptime',
      'services.security.title': 'Website Security',
      'services.security.desc': 'Website protection from malware, hacking, and security threats',
      'services.migration.title': 'Data Migration',
      'services.migration.desc': 'Secure data migration from old systems to new systems',
      'services.optimization.title': 'Performance Optimization',
      'services.optimization.desc': 'Website performance optimization for maximum loading speed',
      
      // Process Steps
      'process.step1.title': 'Consultation & Analysis',
      'process.step1.desc': 'Understanding business needs and analyzing requirements',
      'process.step2.title': 'Planning & Strategy',
      'process.step2.desc': 'Preparing detailed strategy and project timeline',
      'process.step3.title': 'Development & Implementation',
      'process.step3.desc': 'Developing solutions according to the plan that has been made',
      'process.step4.title': 'Testing & Quality Assurance',
      'process.step4.desc': 'Conducting comprehensive testing to ensure quality',
      'process.step5.title': 'Launch & Support',
      'process.step5.desc': 'Launching the project and providing ongoing support',
      
      // Portfolio Page
      'portfolio.title': 'Portfolio & Media',
      'portfolio.subtitle': 'Explore the projects we have worked on and the real results we have achieved for various clients in various industries',
      'portfolio.hero.title': 'Portfolio & Media',
      'portfolio.hero.subtitle': 'Explore the projects we have worked on and the real results we have achieved for various clients in various industries',
      'portfolio.filter.all': 'All Projects',
      'portfolio.filter.web': 'Website Development',
      'portfolio.filter.marketing': 'Digital Marketing',
      'portfolio.filter.consulting': 'Business Consulting',
      'portfolio.filter.system': 'Management System',
      'portfolio.view_project': 'View Details',
      'portfolio.view_all': 'View All Portfolio',
      'portfolio.stats.title': 'Portfolio Achievements',
      'portfolio.stats.subtitle': 'Numbers that show the real impact of our projects',
      'portfolio.cta.title': 'Ready to Be Part of Our Portfolio?',
      'portfolio.cta.subtitle': 'Let\'s discuss your project and create amazing results together with our expert team',
      'portfolio.cta.start': 'Start Your Project',
      
      // Portfolio Project Details
      'portfolio.client': 'Client',
      'portfolio.technologies': 'Technologies',
      'portfolio.more': 'more',
      'portfolio.results': 'Key Results',
      'portfolio.completed': 'Projects Completed',
      'portfolio.satisfied': 'Satisfied Clients',
      'portfolio.success_rate': 'Success Rate',
      'portfolio.support': 'Support',
      'portfolio.completed_desc': 'Various types of projects',
      'portfolio.satisfied_desc': 'From various industries',
      'portfolio.success_desc': 'Project success rate',
      'portfolio.support_desc': 'Ongoing support',
      
      // Blog Page
      'blog.title': 'Blog & Insights',
      'blog.subtitle': 'Latest insights from Caniel Agency for your digital business growth',
      'blog.hero.title': 'Blog & Insights',
      'blog.hero.subtitle': 'Latest insights from Caniel Agency for your digital business growth',
      'blog.search_placeholder': 'Search articles...',
      'blog.filter.all': 'All Articles',
      'blog.filter.web': 'Web Development',
      'blog.filter.marketing': 'Digital Marketing',
      'blog.filter.business': 'Business Tips',
      'blog.filter.tech': 'Technology',
      'blog.filter.tips': 'Tips & Tricks',
      'blog.featured': 'Featured Articles',
      'blog.featured_desc': 'Selected articles that are most read and provide the best value',
      'blog.all_articles': 'All Articles',
      'blog.showing': 'Showing',
      'blog.articles': 'articles',
      'blog.new_article': 'New Article',
      'blog.read_more': 'Read More',
      'blog.read': 'Read',
      'blog.published_on': 'Published on',
      'blog.category': 'Category',
      'blog.author': 'Author',
      'blog.tags': 'Tags',
      'blog.related_posts': 'Related Posts',
      'blog.recent_posts': 'Recent Posts',
      'blog.popular_tags': 'Popular Tags',
      'blog.newsletter': 'Newsletter',
      'blog.newsletter_desc': 'Get the latest articles directly in your email',
      'blog.email_placeholder': 'Your Email',
      'blog.subscribe': 'Subscribe',
      'blog.admin_active': 'Admin Mode Active',
      'blog.cms_dashboard': 'CMS Dashboard',
      'blog.logout': 'Logout',
      
      // Contact Page
      'contact.title': 'Contact Us',
      'contact.subtitle': 'Ready to help grow your business with leading technology solutions. Let\'s discuss your project with our expert team',
      'contact.hero.title': 'Contact Us',
      'contact.hero.subtitle': 'Ready to help grow your business with leading technology solutions. Let\'s discuss your project with our expert team',
      'contact.form.title': 'Send Us a Message',
      'contact.form.name': 'Full Name',
      'contact.form.email': 'Email',
      'contact.form.phone': 'Phone Number',
      'contact.form.company': 'Company Name',
      'contact.form.service': 'Service Needed',
      'contact.form.message': 'Message',
      'contact.form.submit': 'Send Message',
      'contact.form.required': '*',
      'contact.form.name_placeholder': 'Enter full name',
      'contact.form.email_placeholder': 'email@example.com',
      'contact.form.phone_placeholder': '+62 812 3456 7890',
      'contact.form.company_placeholder': 'PT. Company Name',
      'contact.form.service_placeholder': 'Select service',
      'contact.form.message_placeholder': 'Tell us about your project or needs...',
      'contact.form.select_service': 'Select service',
      'contact.form.other': 'Other',
      
      // Contact Services
      'contact.service.web_dev': 'Website Development',
      'contact.service.digital_marketing': 'Digital Marketing',
      'contact.service.business_consulting': 'Business Consulting',
      'contact.service.management_system': 'Management System',
      'contact.service.ecommerce': 'E-commerce Development',
      'contact.service.mobile_app': 'Mobile App Development',
      'contact.service.seo': 'SEO Optimization',
      
      // Contact Info
      'contact.info.title': 'Contact Information',
      'contact.info.office': 'Office Location',
      'contact.info.quick_actions': 'Quick Actions',
      'contact.info.response_time': 'Response Time',
      'contact.info.whatsapp': 'Chat WhatsApp',
      'contact.info.schedule': 'Schedule Meeting',
      'contact.info.consultation': 'Team Consultation',
      'contact.info.email_response': 'Email',
      'contact.info.whatsapp_response': 'WhatsApp',
      'contact.info.phone_response': 'Phone',
      'contact.info.email_time': '< 24 hours',
      'contact.info.whatsapp_time': '< 2 hours',
      'contact.info.phone_time': 'Direct',
      'contact.info.address': 'Address',
      'contact.info.phone': 'Phone',
      'contact.info.email': 'Email',
      'contact.info.hours': 'Operating Hours',
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
      
      // Footer
      'footer.description': 'Leading technology solutions to grow your business. We provide website development, digital marketing, and professional business consulting services.',
      'footer.services': 'Services',
      'footer.company': 'Company',
      'footer.contact': 'Contact Us',
      'footer.copyright': '© 2024 Caniel Agency. All rights reserved.',
      'footer.terms': 'Terms & Conditions',
      'footer.privacy': 'Privacy Policy',
      'footer.address': 'The Family Residence\nJl. Pratama, Kav-101 Deplu Kreo, Cipadu Jaya, Larangan\nTangerang City, 15155',
      'footer.phone': '+62 818 414 951',
      'footer.email': 'marketing@caniel.my.id',
      
      // Footer Links
      'footer.link.web_dev': 'Website Development',
      'footer.link.digital_marketing': 'Digital Marketing',
      'footer.link.business_consulting': 'Business Consulting',
      'footer.link.management_system': 'Management System',
      'footer.link.about': 'About Us',
      'footer.link.portfolio': 'Portfolio',
      'footer.link.blog': 'Blog',
      'footer.link.contact': 'Contact',
      'footer.link.faq': 'FAQ',
      'footer.link.documentation': 'Documentation',
      'footer.link.support': 'Support',
      'footer.link.privacy_policy': 'Privacy Policy',
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
