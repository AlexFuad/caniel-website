import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle } from 'lucide-react';

const ContactFAQ = () => {
  const faqs = [
    {
      question: 'Berapa lama waktu pengerjaan website?',
      answer: 'Waktu pengerjaan bervariasi tergantung kompleksitas proyek, umumnya 2-8 minggu untuk website standar.'
    },
    {
      question: 'Apakah ada garansi untuk layanan yang diberikan?',
      answer: 'Ya, kami memberikan garansi 6 bulan untuk bug fixing dan 1 tahun untuk maintenance website.'
    },
    {
      question: 'Bagaimana sistem pembayaran yang tersedia?',
      answer: 'Kami menerima pembayaran melalui transfer bank, e-wallet, dan dapat dicicil sesuai kesepakatan.'
    },
    {
      question: 'Apakah bisa konsultasi gratis terlebih dahulu?',
      answer: 'Tentu! Kami menyediakan konsultasi gratis untuk memahami kebutuhan proyek Anda.'
    }
  ];

  return (
    <section className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            <span className="gradient-text">Pertanyaan yang Sering Diajukan</span>
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Temukan jawaban untuk pertanyaan umum tentang layanan kami
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="glass-effect rounded-2xl p-6"
            >
              <div className="flex items-start space-x-3">
                <CheckCircle className="h-6 w-6 text-blue-500 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="text-lg font-bold text-white mb-3">
                    {faq.question}
                  </h3>
                  <p className="text-gray-400 leading-relaxed">
                    {faq.answer}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ContactFAQ;