import React from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { 
  Code, 
  TrendingUp, 
  Users, 
  Settings,
  CheckCircle,
  ArrowRight,
  Globe,
  Smartphone,
  Search,
  BarChart3,
  Target,
  Zap,
  Database,
  Shield
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';

const Services = () => {
  const { toast } = useToast();

  const handleGetQuote = () => {
    toast({
      title: "🚧 Fitur ini belum diimplementasikan—tapi jangan khawatir! Anda bisa memintanya di prompt berikutnya! 🚀",
      duration: 5000,
    });
  };

  const services = [
    {
      icon: Code,
      title: 'Website Development',
      description: 'Membangun website modern, responsif, dan SEO-friendly yang memberikan pengalaman terbaik bagi pengunjung dan meningkatkan konversi bisnis Anda.',
      features: [
        'Responsive Web Design',
        'SEO Optimization',
        'Fast Loading Speed',
        'Modern UI/UX Design',
        'Cross-browser Compatibility',
        'Mobile-first Approach',
        'Content Management System',
        'E-commerce Integration'
      ],
      technologies: ['React', 'Next.js', 'WordPress', 'Laravel', 'Node.js'],
      startingPrice: 'Mulai dari Rp 5.000.000'
    },
    {
      icon: TrendingUp,
      title: 'Digital Marketing',
      description: 'Strategi pemasaran digital yang komprehensif untuk meningkatkan brand awareness, traffic website, dan penjualan online Anda.',
      features: [
        'Social Media Marketing',
        'Google Ads Management',
        'SEO & Content Marketing',
        'Email Marketing',
        'Influencer Marketing',
        'Analytics & Reporting',
        'Conversion Optimization',
        'Brand Strategy'
      ],
      technologies: ['Google Analytics', 'Facebook Ads', 'Google Ads', 'SEMrush', 'Mailchimp'],
      startingPrice: 'Mulai dari Rp 3.000.000/bulan'
    },
    {
      icon: Users,
      title: 'Business Consulting',
      description: 'Konsultasi bisnis profesional untuk mengoptimalkan operasional, strategi pertumbuhan, dan transformasi digital perusahaan Anda.',
      features: [
        'Business Strategy Planning',
        'Process Optimization',
        'Market Analysis',
        'Digital Transformation',
        'Performance Improvement',
        'Risk Management',
        'Growth Planning',
        'Change Management'
      ],
      technologies: ['Business Intelligence', 'Data Analytics', 'Project Management', 'CRM'],
      startingPrice: 'Mulai dari Rp 2.000.000/sesi'
    },
    {
      icon: Settings,
      title: 'Management System',
      description: 'Sistem manajemen terintegrasi yang dirancang khusus untuk meningkatkan efisiensi operasional dan produktivitas bisnis Anda.',
      features: [
        'Customer Relationship Management',
        'Inventory Management',
        'Human Resource Management',
        'Financial Management',
        'Project Management',
        'Document Management',
        'Reporting & Analytics',
        'Mobile Access'
      ],
      technologies: ['Custom Development', 'Cloud Integration', 'API Development', 'Database Design'],
      startingPrice: 'Mulai dari Rp 15.000.000'
    }
  ];

  const additionalServices = [
    {
      icon: Globe,
      title: 'Domain & Hosting',
      description: 'Layanan domain dan hosting berkualitas tinggi dengan uptime 99.9%'
    },
    {
      icon: Shield,
      title: 'Website Security',
      description: 'Perlindungan website dari malware, hacking, dan ancaman keamanan'
    },
    {
      icon: Database,
      title: 'Data Migration',
      description: 'Migrasi data yang aman dari sistem lama ke sistem baru'
    },
    {
      icon: Zap,
      title: 'Performance Optimization',
      description: 'Optimasi performa website untuk kecepatan loading maksimal'
    }
  ];

  const process = [
    {
      step: '01',
      title: 'Konsultasi & Analisis',
      description: 'Memahami kebutuhan bisnis dan menganalisis requirements'
    },
    {
      step: '02',
      title: 'Perencanaan & Strategi',
      description: 'Menyusun strategi dan timeline proyek yang detail'
    },
    {
      step: '03',
      title: 'Development & Implementation',
      description: 'Mengembangkan solusi sesuai dengan rencana yang telah dibuat'
    },
    {
      step: '04',
      title: 'Testing & Quality Assurance',
      description: 'Melakukan testing menyeluruh untuk memastikan kualitas'
    },
    {
      step: '05',
      title: 'Launch & Support',
      description: 'Meluncurkan proyek dan memberikan support berkelanjutan'
    }
  ];

  return (
    <>
      <Helmet>
        <title>Layanan Kami - Website Development, Digital Marketing, Business Consulting | Caniel Agency</title>
        <meta name="description" content="Layanan profesional website development, digital marketing, business consulting, dan management system. Solusi teknologi terdepan untuk mengembangkan bisnis Anda dengan harga terjangkau." />
        <meta property="og:title" content="Layanan Kami - Website Development, Digital Marketing, Business Consulting | Caniel Agency" />
        <meta property="og:description" content="Layanan profesional website development, digital marketing, business consulting, dan management system. Solusi teknologi terdepan untuk mengembangkan bisnis Anda dengan harga terjangkau." />
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
                <span className="gradient-text">Layanan Kami</span>
              </h1>
              <p className="text-xl md:text-2xl text-gray-300 max-w-4xl mx-auto leading-relaxed">
                Solusi teknologi lengkap untuk mengembangkan bisnis Anda dengan 
                layanan profesional dan harga yang kompetitif
              </p>
            </motion.div>
          </div>
        </section>

        {/* Main Services */}
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="space-y-20">
              {services.map((service, index) => (
                <motion.div
                  key={service.title}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8 }}
                  className={`grid grid-cols-1 lg:grid-cols-2 gap-12 items-center ${
                    index % 2 === 1 ? 'lg:grid-flow-col-dense' : ''
                  }`}
                >
                  <div className={index % 2 === 1 ? 'lg:col-start-2' : ''}>
                    <div className="flex items-center mb-6">
                      <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl flex items-center justify-center mr-4">
                        <service.icon className="h-8 w-8 text-white" />
                      </div>
                      <h2 className="text-3xl md:text-4xl font-bold text-white">
                        {service.title}
                      </h2>
                    </div>
                    
                    <p className="text-gray-300 text-lg mb-8 leading-relaxed">
                      {service.description}
                    </p>

                    <div className="mb-8">
                      <h3 className="text-xl font-semibold text-white mb-4">Fitur Utama:</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        {service.features.map((feature) => (
                          <div key={feature} className="flex items-center">
                            <CheckCircle className="h-5 w-5 text-green-500 mr-3 flex-shrink-0" />
                            <span className="text-gray-300">{feature}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="mb-8">
                      <h3 className="text-xl font-semibold text-white mb-4">Teknologi:</h3>
                      <div className="flex flex-wrap gap-2">
                        {service.technologies.map((tech) => (
                          <span
                            key={tech}
                            className="px-3 py-1 bg-blue-600/20 text-blue-400 rounded-full text-sm border border-blue-600/30"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-2xl font-bold gradient-text">
                          {service.startingPrice}
                        </p>
                      </div>
                      <Button 
                        className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                        onClick={handleGetQuote}
                      >
                        Dapatkan Penawaran
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </div>
                  </div>

                  <div className={index % 2 === 1 ? 'lg:col-start-1' : ''}>
                    <div className="service-card rounded-2xl p-8 h-full">
                      <img  
                        alt={`${service.title} illustration`}
                        className="w-full h-80 object-cover rounded-xl"
                       src="https://images.unsplash.com/photo-1698512156323-28e03350851e" />
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Additional Services */}
        <section className="py-20 bg-slate-800/30">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center mb-16"
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                <span className="gradient-text">Layanan Tambahan</span>
              </h2>
              <p className="text-xl text-gray-400 max-w-3xl mx-auto">
                Layanan pendukung untuk melengkapi kebutuhan teknologi bisnis Anda
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {additionalServices.map((service, index) => (
                <motion.div
                  key={service.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="glass-effect rounded-2xl p-6 text-center"
                >
                  <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl flex items-center justify-center mx-auto mb-4">
                    <service.icon className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-3">{service.title}</h3>
                  <p className="text-gray-400 leading-relaxed">{service.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Process Section */}
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center mb-16"
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                <span className="gradient-text">Proses Kerja Kami</span>
              </h2>
              <p className="text-xl text-gray-400 max-w-3xl mx-auto">
                Metodologi yang terbukti untuk menghasilkan solusi berkualitas tinggi
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
              {process.map((step, index) => (
                <motion.div
                  key={step.step}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="text-center relative"
                >
                  <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-xl font-bold text-white">{step.step}</span>
                  </div>
                  <h3 className="text-lg font-bold text-white mb-3">{step.title}</h3>
                  <p className="text-gray-400 text-sm leading-relaxed">{step.description}</p>
                  
                  {index < process.length - 1 && (
                    <div className="hidden md:block absolute top-8 left-full w-full h-0.5 bg-gradient-to-r from-blue-600 to-purple-600 transform -translate-x-8"></div>
                  )}
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-slate-800/30">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="glass-effect rounded-3xl p-12 text-center"
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                <span className="gradient-text">Siap Memulai Proyek?</span>
              </h2>
              <p className="text-xl text-gray-400 mb-8 max-w-2xl mx-auto">
                Konsultasikan kebutuhan bisnis Anda dengan tim ahli kami dan dapatkan 
                solusi terbaik yang sesuai dengan budget dan timeline Anda
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button 
                  size="lg" 
                  className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-lg px-8 py-4"
                  onClick={handleGetQuote}
                >
                  Konsultasi Gratis
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
                <Button 
                  variant="outline" 
                  size="lg" 
                  className="border-2 border-blue-500 text-blue-400 hover:bg-blue-500 hover:text-white text-lg px-8 py-4"
                  onClick={handleGetQuote}
                >
                  Dapatkan Penawaran
                </Button>
              </div>
            </motion.div>
          </div>
        </section>
      </div>
    </>
  );
};

export default Services;