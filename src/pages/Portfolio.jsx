import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ExternalLink, 
  Github, 
  Filter,
  Code,
  TrendingUp,
  Users,
  Settings,
  Eye,
  Calendar
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';

const Portfolio = () => {
  const [activeFilter, setActiveFilter] = useState('all');
  const { toast } = useToast();

  const handleViewProject = () => {
    toast({
      title: "🚧 Fitur ini belum diimplementasikan—tapi jangan khawatir! Anda bisa memintanya di prompt berikutnya! 🚀",
      duration: 5000,
    });
  };

  const categories = [
    { id: 'all', name: 'Semua Proyek', icon: Filter },
    { id: 'website', name: 'Website Development', icon: Code },
    { id: 'marketing', name: 'Digital Marketing', icon: TrendingUp },
    { id: 'consulting', name: 'Business Consulting', icon: Users },
    { id: 'system', name: 'Management System', icon: Settings }
  ];

  const projects = [
    {
      id: 1,
      title: 'E-Commerce Fashion Store',
      category: 'website',
      description: 'Platform e-commerce modern untuk toko fashion dengan fitur lengkap termasuk payment gateway, inventory management, dan customer dashboard.',
      image: 'Modern e-commerce website for fashion store with shopping cart',
      technologies: ['React', 'Node.js', 'MongoDB', 'Stripe'],
      client: 'Fashion Boutique Indonesia',
      year: '2024',
      results: ['300% peningkatan penjualan online', '50% peningkatan konversi', '10,000+ pengguna aktif']
    },
    {
      id: 2,
      title: 'Digital Marketing Campaign - Restaurant Chain',
      category: 'marketing',
      description: 'Kampanye digital marketing komprehensif untuk jaringan restoran yang meningkatkan brand awareness dan customer acquisition.',
      image: 'Digital marketing campaign dashboard with analytics and social media',
      technologies: ['Google Ads', 'Facebook Ads', 'Instagram', 'Analytics'],
      client: 'Resto Chain Nusantara',
      year: '2024',
      results: ['500% ROI dari iklan digital', '200% peningkatan followers', '150% peningkatan reservasi']
    },
    {
      id: 3,
      title: 'Business Process Optimization - Manufacturing',
      category: 'consulting',
      description: 'Konsultasi dan optimasi proses bisnis untuk perusahaan manufaktur yang menghasilkan efisiensi operasional signifikan.',
      image: 'Manufacturing business process optimization with workflow diagrams',
      technologies: ['Process Mapping', 'Lean Six Sigma', 'KPI Dashboard', 'Training'],
      client: 'PT. Manufaktur Sejahtera',
      year: '2023',
      results: ['40% pengurangan waste', '60% peningkatan produktivitas', '25% penghematan biaya operasional']
    },
    {
      id: 4,
      title: 'Hospital Management System',
      category: 'system',
      description: 'Sistem manajemen rumah sakit terintegrasi dengan fitur appointment, medical records, billing, dan inventory management.',
      image: 'Hospital management system interface with patient records and scheduling',
      technologies: ['Laravel', 'MySQL', 'Vue.js', 'API Integration'],
      client: 'RS. Sehat Sentosa',
      year: '2023',
      results: ['80% pengurangan waktu administrasi', '95% akurasi data pasien', '100% digitalisasi rekam medis']
    },
    {
      id: 5,
      title: 'Corporate Website - Tech Startup',
      category: 'website',
      description: 'Website korporat modern untuk startup teknologi dengan fokus pada user experience dan conversion optimization.',
      image: 'Modern tech startup corporate website with innovative design',
      technologies: ['Next.js', 'Tailwind CSS', 'Framer Motion', 'Vercel'],
      client: 'TechStart Innovation',
      year: '2024',
      results: ['400% peningkatan traffic', '250% peningkatan lead generation', '90% improvement in page speed']
    },
    {
      id: 6,
      title: 'Social Media Strategy - Beauty Brand',
      category: 'marketing',
      description: 'Strategi media sosial komprehensif untuk brand kecantikan yang fokus pada engagement dan brand building.',
      image: 'Beauty brand social media strategy with content calendar and analytics',
      technologies: ['Instagram Marketing', 'TikTok Ads', 'Influencer Marketing', 'Content Creation'],
      client: 'Beauty Glow Indonesia',
      year: '2024',
      results: ['1M+ total reach per bulan', '15% engagement rate', '300% peningkatan brand awareness']
    },
    {
      id: 7,
      title: 'Digital Transformation - Traditional Retail',
      category: 'consulting',
      description: 'Transformasi digital untuk retailer tradisional mencakup strategi omnichannel dan implementasi teknologi.',
      image: 'Traditional retail digital transformation with omnichannel strategy',
      technologies: ['Digital Strategy', 'Omnichannel', 'POS System', 'E-commerce Integration'],
      client: 'Toko Tradisional Nusantara',
      year: '2023',
      results: ['200% peningkatan penjualan', '50% ekspansi ke pasar online', '30% peningkatan customer retention']
    },
    {
      id: 8,
      title: 'School Management System',
      category: 'system',
      description: 'Sistem informasi sekolah lengkap dengan fitur akademik, keuangan, dan komunikasi orang tua-sekolah.',
      image: 'School management system with student portal and academic tracking',
      technologies: ['PHP', 'MySQL', 'Bootstrap', 'Mobile App'],
      client: 'SMA Negeri 1 Jakarta',
      year: '2023',
      results: ['100% digitalisasi administrasi', '90% kepuasan orang tua', '50% pengurangan paperwork']
    }
  ];

  const filteredProjects = activeFilter === 'all' 
    ? projects 
    : projects.filter(project => project.category === activeFilter);

  return (
    <>
      <Helmet>
        <title>Portfolio & Media - Proyek Website Development, Digital Marketing | Caniel Agency</title>
        <meta name="description" content="Lihat portfolio proyek website development, digital marketing, business consulting, dan management system yang telah kami kerjakan. Hasil nyata untuk berbagai industri." />
        <meta property="og:title" content="Portfolio & Media - Proyek Website Development, Digital Marketing | Caniel Agency" />
        <meta property="og:description" content="Lihat portfolio proyek website development, digital marketing, business consulting, dan management system yang telah kami kerjakan. Hasil nyata untuk berbagai industri." />
      </Helmet>

      <div className="pt-16">
        {/* Hero Section */}
        <section className="py-20 bg-gradient-to-br from-slate-900 to-slate-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center"
            >
              <h1 className="text-4xl md:text-6xl font-bold mb-6">
                <span className="gradient-text">Portfolio & Media</span>
              </h1>
              <p className="text-xl md:text-2xl text-gray-300 max-w-4xl mx-auto leading-relaxed">
                Jelajahi proyek-proyek yang telah kami kerjakan dan hasil nyata 
                yang kami capai untuk berbagai klien di berbagai industri
              </p>
            </motion.div>
          </div>
        </section>

        {/* Filter Section */}
        <section className="py-12 bg-slate-800/30">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="flex flex-wrap justify-center gap-4"
            >
              {categories.map((category) => (
                <Button
                  key={category.id}
                  variant={activeFilter === category.id ? "default" : "outline"}
                  className={`flex items-center space-x-2 ${
                    activeFilter === category.id
                      ? 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700'
                      : 'border-blue-500 text-blue-400 hover:bg-blue-500 hover:text-white'
                  }`}
                  onClick={() => setActiveFilter(category.id)}
                >
                  <category.icon className="h-4 w-4" />
                  <span>{category.name}</span>
                </Button>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Projects Grid */}
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeFilter}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
              >
                {filteredProjects.map((project, index) => (
                  <motion.div
                    key={project.id}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    className="portfolio-card rounded-2xl overflow-hidden group"
                  >
                    <div className="relative overflow-hidden">
                      <img  
                        alt={project.title}
                        className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-110"
                       src="https://images.unsplash.com/photo-1595872018818-97555653a011" />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <div className="absolute bottom-4 left-4 right-4">
                          <div className="flex space-x-2">
                            <Button
                              size="sm"
                              className="bg-blue-600 hover:bg-blue-700"
                              onClick={handleViewProject}
                            >
                              <Eye className="h-4 w-4 mr-2" />
                              Lihat Detail
                            </Button>
                            <Button
                              size="sm"
                              variant="outline"
                              className="border-white text-white hover:bg-white hover:text-black"
                              onClick={handleViewProject}
                            >
                              <ExternalLink className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="p-6">
                      <div className="flex items-center justify-between mb-3">
                        <span className="px-3 py-1 bg-blue-600/20 text-blue-400 rounded-full text-sm border border-blue-600/30">
                          {categories.find(cat => cat.id === project.category)?.name}
                        </span>
                        <div className="flex items-center text-gray-400 text-sm">
                          <Calendar className="h-4 w-4 mr-1" />
                          {project.year}
                        </div>
                      </div>

                      <h3 className="text-xl font-bold text-white mb-3 group-hover:text-blue-400 transition-colors">
                        {project.title}
                      </h3>

                      <p className="text-gray-400 text-sm mb-4 leading-relaxed">
                        {project.description}
                      </p>

                      <div className="mb-4">
                        <p className="text-sm text-gray-500 mb-2">Klien: {project.client}</p>
                        <div className="flex flex-wrap gap-1">
                          {project.technologies.slice(0, 3).map((tech) => (
                            <span
                              key={tech}
                              className="px-2 py-1 bg-gray-700 text-gray-300 rounded text-xs"
                            >
                              {tech}
                            </span>
                          ))}
                          {project.technologies.length > 3 && (
                            <span className="px-2 py-1 bg-gray-700 text-gray-300 rounded text-xs">
                              +{project.technologies.length - 3} lainnya
                            </span>
                          )}
                        </div>
                      </div>

                      <div className="border-t border-gray-700 pt-4">
                        <p className="text-sm font-medium text-white mb-2">Hasil Utama:</p>
                        <ul className="space-y-1">
                          {project.results.slice(0, 2).map((result, idx) => (
                            <li key={idx} className="text-xs text-green-400 flex items-center">
                              <div className="w-1 h-1 bg-green-400 rounded-full mr-2"></div>
                              {result}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </AnimatePresence>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-20 bg-slate-800/30">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center mb-16"
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                <span className="gradient-text">Pencapaian Portfolio</span>
              </h2>
              <p className="text-xl text-gray-400 max-w-3xl mx-auto">
                Angka-angka yang menunjukkan dampak nyata dari proyek-proyek kami
              </p>
            </motion.div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {[
                { number: '500+', label: 'Proyek Selesai', description: 'Berbagai jenis proyek' },
                { number: '200+', label: 'Klien Puas', description: 'Dari berbagai industri' },
                { number: '95%', label: 'Success Rate', description: 'Tingkat keberhasilan proyek' },
                { number: '24/7', label: 'Support', description: 'Dukungan berkelanjutan' }
              ].map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, scale: 0.5 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="text-center"
                >
                  <div className="text-3xl md:text-4xl font-bold gradient-text mb-2">
                    {stat.number}
                  </div>
                  <div className="text-white font-medium mb-1">{stat.label}</div>
                  <div className="text-gray-400 text-sm">{stat.description}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="glass-effect rounded-3xl p-12 text-center"
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                <span className="gradient-text">Siap Menjadi Bagian dari Portfolio Kami?</span>
              </h2>
              <p className="text-xl text-gray-400 mb-8 max-w-2xl mx-auto">
                Mari diskusikan proyek Anda dan ciptakan hasil yang luar biasa bersama tim ahli kami
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button 
                  size="lg" 
                  className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-lg px-8 py-4"
                  onClick={handleViewProject}
                >
                  Mulai Proyek Anda
                </Button>
                <Button 
                  variant="outline" 
                  size="lg" 
                  className="border-2 border-blue-500 text-blue-400 hover:bg-blue-500 hover:text-white text-lg px-8 py-4"
                  onClick={handleViewProject}
                >
                  Lihat Semua Portfolio
                </Button>
              </div>
            </motion.div>
          </div>
        </section>
      </div>
    </>
  );
};

export default Portfolio;