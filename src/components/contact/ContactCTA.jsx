import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';

const ContactCTA = ({ handleSubmit }) => {
  return (
    <section className="py-20 bg-slate-800/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="glass-effect rounded-3xl p-12 text-center"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            <span className="gradient-text">Siap Memulai Proyek Anda?</span>
          </h2>
          <p className="text-xl text-gray-400 mb-8 max-w-2xl mx-auto">
            Jangan ragu untuk menghubungi kami. Tim ahli kami siap membantu 
            mewujudkan visi digital Anda menjadi kenyataan
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg" 
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-lg px-8 py-4"
              onClick={handleSubmit}
            >
              Konsultasi Gratis Sekarang
            </Button>
            <Button 
              variant="outline" 
              size="lg" 
              className="border-2 border-blue-500 text-blue-400 hover:bg-blue-500 hover:text-white text-lg px-8 py-4"
              onClick={handleSubmit}
            >
              Lihat Portfolio
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ContactCTA;