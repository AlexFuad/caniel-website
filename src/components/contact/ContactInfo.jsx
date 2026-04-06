import React from 'react';
import { motion } from 'framer-motion';
import { 
  Mail, 
  Phone, 
  MapPin, 
  Clock
} from 'lucide-react';

const ContactInfo = () => {
  const contactInfo = [
    {
      icon: Phone,
      title: 'Telepon',
      details: ['+62 818 414 951', '+62 882 9143 7432'],
      description: 'Senin - Jumat, 09:00 - 18:00 WIB'
    },
    {
      icon: Mail,
      title: 'Email',
      details: ['info@caniel.my.id', 'support@caniel.my.id'],
      description: 'Respon dalam 24 jam'
    },
    {
      icon: MapPin,
      title: 'Alamat',
      details: ['The Family Residence, Jl. Pratama, Kav-101 Deplu Kreo, Cipadu Jaya, Larangan', 'Kota Tangerang, 15155'],
      description: 'Kunjungi kantor kami'
    },
    {
      icon: Clock,
      title: 'Jam Operasional',
      details: ['Senin - Jumat: 09:00 - 18:00', 'Sabtu: 09:00 - 15:00'],
      description: 'Minggu tutup'
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
            <span className="gradient-text">Informasi Kontak</span>
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Berbagai cara untuk menghubungi kami dan mendapatkan bantuan yang Anda butuhkan
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {contactInfo.map((info, index) => (
            <motion.div
              key={info.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="glass-effect rounded-2xl p-6 text-center"
            >
              <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl flex items-center justify-center mx-auto mb-4">
                <info.icon className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">{info.title}</h3>
              <div className="space-y-1 mb-3">
                {info.details.map((detail, idx) => (
                  <p key={idx} className="text-gray-300">{detail}</p>
                ))}
              </div>
              <p className="text-gray-400 text-sm">{info.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ContactInfo;