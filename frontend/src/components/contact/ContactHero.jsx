import React from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '@/context/LanguageContext';

const ContactHero = () => {
  const { translate } = useLanguage();
  return (
    <section className="py-20 bg-gradient-to-br from-slate-900 to-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            <span className="gradient-text">{translate('contact.hero.title')}</span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 max-w-4xl mx-auto leading-relaxed">
            {translate('contact.hero.subtitle')}
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default ContactHero;