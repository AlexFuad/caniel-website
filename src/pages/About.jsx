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

const About = () => {
  const values = [
    {
      icon: Target,
      title: 'Fokus pada Hasil',
      description: 'Kami berkomitmen memberikan solusi yang menghasilkan dampak nyata bagi bisnis klien'
    },
    {
      icon: Lightbulb,
      title: 'Inovasi Berkelanjutan',
      description: 'Selalu mengikuti perkembangan teknologi terbaru untuk memberikan solusi terdepan'
    },
    {
      icon: Heart,
      title: 'Kepuasan Klien',
      description: 'Kepuasan dan kesuksesan klien adalah prioritas utama dalam setiap proyek'
    },
    {
      icon: Globe,
      title: 'Standar Global',
      description: 'Menerapkan standar internasional dalam setiap layanan yang kami berikan'
    }
  ];

  const team = [
    {
      name: 'Alex Fuad',
      position: 'CEO & Founder',
      description: 'Berpengalaman 8+ tahun dalam teknologi dan bisnis digital',
      image: 'Professional CEO in modern office setting'
    },
    {
      name: 'Eca Tatianna',
      position: 'Lead Developer',
      description: 'Expert dalam web development dan system architecture',
      image: 'Female software developer working on computer'
    },
    {
      name: 'Daniel Rizky N',
      position: 'Digital Marketing Manager',
      description: 'Spesialis strategi pemasaran digital dan growth hacking',
      image: 'Marketing professional analyzing data charts'
    },
    {
      name: 'Aprilianti P',
      position: 'Business Consultant',
      description: 'Konsultan bisnis dengan track record mengembangkan 100+ perusahaan',
      image: 'Business consultant in professional meeting'
    }
  ];

  const achievements = [
    { number: '500+', label: 'Proyek Berhasil' },
    { number: '200+', label: 'Klien Puas' },
    { number: '5+', label: 'Tahun Pengalaman' },
    { number: '50+', label: 'Award & Sertifikasi' }
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
                <span className="gradient-text">Tentang Kami</span>
              </h1>
              <p className="text-xl md:text-2xl text-gray-300 max-w-4xl mx-auto leading-relaxed">
                Tim profesional yang berdedikasi untuk mengembangkan bisnis Anda 
                dengan solusi teknologi terdepan dan strategi yang terbukti efektif
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
                  <span className="gradient-text">Cerita Kami</span>
                </h2>
                <div className="space-y-6 text-gray-300 leading-relaxed">
                  <p>
                    Caniel Agency didirikan pada tahun 2019 dengan visi menjadi partner 
                    teknologi terpercaya bagi bisnis di Indonesia. Berawal dari tim kecil 
                    yang passionate terhadap teknologi, kami telah berkembang menjadi 
                    perusahaan yang melayani ratusan klien.
                  </p>
                  <p>
                    Dengan pengalaman lebih dari 5 tahun, kami telah membantu berbagai 
                    jenis bisnis mulai dari startup hingga perusahaan besar untuk 
                    bertransformasi digital dan mencapai target bisnis mereka.
                  </p>
                  <p>
                    Komitmen kami adalah memberikan solusi teknologi yang tidak hanya 
                    modern dan inovatif, tetapi juga praktis dan memberikan ROI yang 
                    terukur bagi setiap klien.
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
                <span className="gradient-text">Nilai-Nilai Kami</span>
              </h2>
              <p className="text-xl text-gray-400 max-w-3xl mx-auto">
                Prinsip-prinsip yang menjadi fondasi dalam setiap layanan yang kami berikan
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
                <span className="gradient-text">Tim Profesional</span>
              </h2>
              <p className="text-xl text-gray-400 max-w-3xl mx-auto">
                Bertemu dengan tim ahli yang siap membantu mengembangkan bisnis Anda
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
                <span className="gradient-text">Pencapaian Kami</span>
              </h2>
              <p className="text-xl text-gray-400 max-w-3xl mx-auto">
                Angka-angka yang menunjukkan dedikasi dan kualitas layanan kami
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
                  <h3 className="text-2xl font-bold text-white">Misi Kami</h3>
                </div>
                <p className="text-gray-300 leading-relaxed">
                  Memberikan solusi teknologi terbaik yang membantu bisnis bertransformasi 
                  digital, meningkatkan efisiensi operasional, dan mencapai pertumbuhan 
                  yang berkelanjutan melalui inovasi dan layanan berkualitas tinggi.
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
                  <h3 className="text-2xl font-bold text-white">Visi Kami</h3>
                </div>
                <p className="text-gray-300 leading-relaxed">
                  Menjadi partner teknologi terpercaya dan terdepan di Indonesia yang 
                  membantu ribuan bisnis mencapai kesuksesan melalui transformasi digital 
                  dan strategi bisnis yang inovatif.
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