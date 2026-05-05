import React from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { 
  ArrowRight, 
  Code, 
  TrendingUp, 
  Users, 
  Settings,
  Star,
  CheckCircle,
  Zap,
  Globe,
  Smartphone,
  BarChart3
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { useLanguage } from '@/context/LanguageContext';

const Home = () => {
  const { toast } = useToast();
  const { translate } = useLanguage();

  const handleConsultation = () => {
    toast({
      title: "🚧 Fitur ini belum diimplementasikan—tapi jangan khawatir! Anda bisa memintanya di prompt berikutnya! 🚀",
      duration: 5000,
    });
  };

  const services = [
    {
      icon: Code,
      title: translate('service.web_dev.title'),
      description: translate('service.web_dev.desc'),
      features: [
        translate('service.web_dev.feature1'), 
        translate('service.web_dev.feature2'), 
        translate('service.web_dev.feature3'), 
        translate('service.web_dev.feature4')
      ]
    },
    {
      icon: TrendingUp,
      title: translate('service.digital_marketing.title'),
      description: translate('service.digital_marketing.desc'),
      features: [
        translate('service.digital_marketing.feature1'), 
        translate('service.digital_marketing.feature2'), 
        translate('service.digital_marketing.feature3'), 
        translate('service.digital_marketing.feature4')
      ]
    },
    {
      icon: Users,
      title: translate('service.business_consulting.title'),
      description: translate('service.business_consulting.desc'),
      features: [
        translate('service.business_consulting.feature1'), 
        translate('service.business_consulting.feature2'), 
        translate('service.business_consulting.feature3'), 
        translate('service.business_consulting.feature4')
      ]
    },
    {
      icon: Settings,
      title: translate('service.management_system.title'),
      description: translate('service.management_system.desc'),
      features: [
        translate('service.management_system.feature1'), 
        translate('service.management_system.feature2'), 
        translate('service.management_system.feature3'), 
        translate('service.management_system.feature4')
      ]
    }
  ];

  const stats = [
    { number: '500+', label: translate('stat.projects'), icon: CheckCircle },
    { number: '200+', label: translate('stat.clients'), icon: Users },
    { number: '5+', label: translate('stat.experience'), icon: Star },
    { number: '24/7', label: translate('stat.support'), icon: Zap }
  ];

  const testimonials = [
    {
      name: 'Budi Santoso',
      company: 'PT. Maju Bersama',
      text: 'Caniel Agency membantu kami meningkatkan penjualan online hingga 300% dalam 6 bulan!',
      rating: 5
    },
    {
      name: 'Sari Dewi',
      company: 'Toko Online Sari',
      text: 'Website yang dibuat sangat profesional dan mudah digunakan. Pelayanan juga sangat memuaskan.',
      rating: 5
    },
    {
      name: 'Ahmad Rahman',
      company: 'CV. Teknologi Maju',
      text: 'Sistem manajemen yang dikembangkan sangat membantu efisiensi operasional perusahaan kami.',
      rating: 5
    }
  ];

  return (
    <>
      <Helmet>
        <title>TechSolutions Pro - Website Developer, Digital Marketing & Business Consultant</title>
        <meta name="description" content="Layanan profesional website development, digital marketing, business consulting, dan management system. Solusi teknologi terdepan untuk mengembangkan bisnis Anda." />
        <meta property="og:title" content="TechSolutions Pro - Website Developer, Digital Marketing & Business Consultant" />
        <meta property="og:description" content="Layanan profesional website development, digital marketing, business consulting, dan management system. Solusi teknologi terdepan untuk mengembangkan bisnis Anda." />
      </Helmet>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 hero-gradient"></div>
        <div className="absolute inset-0 bg-black/20"></div>
        
        {/* Floating Elements */}
        <div className="absolute top-20 left-10 floating-animation">
          <Globe className="h-16 w-16 text-blue-500/30" />
        </div>
        <div className="absolute top-40 right-20 floating-animation" style={{ animationDelay: '2s' }}>
          <Smartphone className="h-12 w-12 text-purple-500/30" />
        </div>
        <div className="absolute bottom-40 left-20 floating-animation" style={{ animationDelay: '4s' }}>
          <BarChart3 className="h-14 w-14 text-cyan-500/30" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6">
              <span className="gradient-text">{translate('home.hero.title').split(' ').slice(0, 2).join(' ')}</span>
              <br />
              <span className="text-white">{translate('home.hero.title').split(' ').slice(2).join(' ')}</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto leading-relaxed">
              {translate('home.hero.subtitle')}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button 
                size="lg" 
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-lg px-8 py-4"
                onClick={handleConsultation}
              >
                {translate('action.free_consultation')}
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Link to="/portfolio">
                <Button 
                  variant="outline" 
                  size="lg" 
                  className="border-2 border-blue-500 text-blue-400 hover:bg-blue-500 hover:text-white text-lg px-8 py-4"
                >
                  {translate('home.hero.cta_secondary')}
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-slate-800/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="text-center"
              >
                <div className="flex justify-center mb-4">
                  <stat.icon className="h-12 w-12 text-blue-500" />
                </div>
                <div className="text-3xl md:text-4xl font-bold gradient-text mb-2">
                  {stat.number}
                </div>
                <div className="text-gray-400 font-medium">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-5xl font-bold mb-6">
              <span className="gradient-text">{translate('home.services.title')}</span>
            </h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              {translate('home.services.subtitle')}
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {services.map((service, index) => (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="service-card rounded-2xl p-8"
              >
                <div className="flex items-center mb-6">
                  <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl flex items-center justify-center mr-4">
                    <service.icon className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-white">{service.title}</h3>
                </div>
                <p className="text-gray-400 mb-6 leading-relaxed">
                  {service.description}
                </p>
                <ul className="space-y-2">
                  {service.features.map((feature) => (
                    <li key={feature} className="flex items-center text-gray-300">
                      <CheckCircle className="h-5 w-5 text-green-500 mr-3 flex-shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mt-12"
          >
            <Link to="/services">
              <Button 
                size="lg" 
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
              >
                Lihat Semua Layanan
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-slate-800/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-5xl font-bold mb-6">
              <span className="gradient-text">{translate('home.testimonials.title')}</span>
            </h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              {translate('home.testimonials.subtitle')}
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={testimonial.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="glass-effect rounded-2xl p-8"
              >
                <div className="flex mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 text-yellow-500 fill-current" />
                  ))}
                </div>
                <p className="text-gray-300 mb-6 italic leading-relaxed">
                  "{testimonial.text}"
                </p>
                <div>
                  <div className="font-semibold text-white">{testimonial.name}</div>
                  <div className="text-blue-400 text-sm">{testimonial.company}</div>
                </div>
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
            <h2 className="text-3xl md:text-5xl font-bold mb-6">
              <span className="gradient-text">{translate('home.cta.title')}</span>
            </h2>
            <p className="text-xl text-gray-400 mb-8 max-w-2xl mx-auto">
              {translate('home.cta.subtitle')}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg" 
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-lg px-8 py-4"
                onClick={handleConsultation}
              >
                {translate('action.free_consultation')}
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Link to="/contact">
                <Button 
                  variant="outline" 
                  size="lg" 
                  className="border-2 border-blue-500 text-blue-400 hover:bg-blue-500 hover:text-white text-lg px-8 py-4"
                >
                  {translate('home.cta.contact')}
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
};

export default Home;