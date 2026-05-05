import React from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { 
  Users, 
  Target, 
  Award, 
  Lightbulb,
  CheckCircle,
  TrendingUp,
  Globe,
  Heart
} from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

const About = () => {
  const { translate } = useLanguage();
  const values = [
    {
      icon: Target,
      title: translate('value.focus.title'),
      description: translate('value.focus.desc')
    },
    {
      icon: Lightbulb,
      title: translate('value.innovation.title'),
      description: translate('value.innovation.desc')
    },
    {
      icon: Heart,
      title: translate('value.satisfaction.title'),
      description: translate('value.satisfaction.desc')
    },
    {
      icon: Globe,
      title: translate('value.global.title'),
      description: translate('value.global.desc')
    }
  ];

  const team = [
    {
      name: translate('team.ceo.name'),
      position: translate('team.ceo.position'),
      description: translate('team.ceo.desc'),
      image: 'Professional CEO in modern office setting'
    },
    {
      name: translate('team.dev.name'),
      position: translate('team.dev.position'),
      description: translate('team.dev.desc'),
      image: 'Female software developer working on computer'
    },
    {
      name: translate('team.marketing.name'),
      position: translate('team.marketing.position'),
      description: translate('team.marketing.desc'),
      image: 'Marketing professional analyzing data charts'
    },
    {
      name: translate('team.consultant.name'),
      position: translate('team.consultant.position'),
      description: translate('team.consultant.desc'),
      image: 'Business consultant in professional meeting'
    }
  ];

  const achievements = [
    { number: '500+', label: translate('achievement.projects') },
    { number: '200+', label: translate('achievement.clients') },
    { number: '5+', label: translate('achievement.experience') },
    { number: '50+', label: translate('achievement.awards') }
  ];

  return (
    <>
      <Helmet>
        <title>Tentang Kami - Caniel Agency | Tim Profesional Website Developer & Digital Marketing</title>
        <meta name="description" content="Kenali tim profesional Caniel Agency. Berpengalaman 5+ tahun dalam website development, digital marketing, business consulting, dan management system." />
        <meta property="og:title" content="Tentang Kami - Caniel Agency | Tim Profesional Website Developer & Digital Marketing" />
        <meta property="og:description" content="Kenali tim profesional Caniel Agency. Berpengalaman 5+ tahun dalam website development, digital marketing, business consulting, dan management system." />
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
                <span className="gradient-text">{translate('about.title')}</span>
              </h1>
              <p className="text-xl md:text-2xl text-gray-300 max-w-4xl mx-auto leading-relaxed">
                {translate('about.subtitle')}
              </p>
            </motion.div>
          </div>
        </section>

        {/* Company Story */}
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
              >
                <h2 className="text-3xl md:text-4xl font-bold mb-6">
                  <span className="gradient-text">{translate('about.story.title')}</span>
                </h2>
                <div className="space-y-6 text-gray-300 leading-relaxed">
                  <p>
                    {translate('about.story.para1')}
                  </p>
                  <p>
                    {translate('about.story.para2')}
                  </p>
                  <p>
                    {translate('about.story.para3')}
                  </p>
                </div>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                className="relative"
              >
                <div className="glass-effect rounded-2xl p-8">
                  <img  
                    alt="Tim TechSolutions Pro bekerja di office modern"
                    className="w-full h-80 object-cover rounded-xl"
                   src="https://images.unsplash.com/photo-1681184025442-1517cb9319c1" />
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Values Section */}
        <section className="py-20 bg-slate-800/30">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center mb-16"
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                <span className="gradient-text">{translate('about.values.title')}</span>
              </h2>
              <p className="text-xl text-gray-400 max-w-3xl mx-auto">
                {translate('about.values.subtitle')}
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {values.map((value, index) => (
                <motion.div
                  key={value.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="glass-effect rounded-2xl p-6 text-center"
                >
                  <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl flex items-center justify-center mx-auto mb-4">
                    <value.icon className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-3">{value.title}</h3>
                  <p className="text-gray-400 leading-relaxed">{value.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Team Section */}
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center mb-16"
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                <span className="gradient-text">{translate('about.team.title')}</span>
              </h2>
              <p className="text-xl text-gray-400 max-w-3xl mx-auto">
                {translate('about.team.subtitle')}
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {team.map((member, index) => (
                <motion.div
                  key={member.name}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="glass-effect rounded-2xl p-6 text-center"
                >
                  <div className="mb-6">
                    <img  
                      alt={`${member.name} - ${member.position}`}
                      className="w-24 h-24 rounded-full mx-auto object-cover"
                     src="https://images.unsplash.com/photo-1644424235476-295f24d503d9" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2">{member.name}</h3>
                  <p className="text-blue-400 font-medium mb-3">{member.position}</p>
                  <p className="text-gray-400 text-sm leading-relaxed">{member.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Achievements Section */}
        <section className="py-20 bg-slate-800/30">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center mb-16"
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                <span className="gradient-text">{translate('about.achievements.title')}</span>
              </h2>
              <p className="text-xl text-gray-400 max-w-3xl mx-auto">
                {translate('about.achievements.subtitle')}
              </p>
            </motion.div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {achievements.map((achievement, index) => (
                <motion.div
                  key={achievement.label}
                  initial={{ opacity: 0, scale: 0.5 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="text-center"
                >
                  <div className="text-4xl md:text-5xl font-bold gradient-text mb-2">
                    {achievement.number}
                  </div>
                  <div className="text-gray-400 font-medium">{achievement.label}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Mission & Vision */}
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                className="glass-effect rounded-2xl p-8"
              >
                <div className="flex items-center mb-6">
                  <Target className="h-12 w-12 text-blue-500 mr-4" />
                  <h3 className="text-2xl font-bold text-white">{translate('about.mission.title')}</h3>
                </div>
                <p className="text-gray-300 leading-relaxed">
                  {translate('about.mission.content')}
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                className="glass-effect rounded-2xl p-8"
              >
                <div className="flex items-center mb-6">
                  <Award className="h-12 w-12 text-purple-500 mr-4" />
                  <h3 className="text-2xl font-bold text-white">{translate('about.vision.title')}</h3>
                </div>
                <p className="text-gray-300 leading-relaxed">
                  {translate('about.vision.content')}
                </p>
              </motion.div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default About;