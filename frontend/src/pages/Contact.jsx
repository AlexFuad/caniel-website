import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { useToast } from '@/components/ui/use-toast';
import ContactHero from '@/components/contact/ContactHero';
import ContactInfo from '@/components/contact/ContactInfo.jsx';
import ContactForm from '@/components/contact/ContactForm.jsx';
import ContactFAQ from '@/components/contact/ContactFAQ.jsx';
import ContactCTA from '@/components/contact/ContactCTA.jsx';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    service: '',
    message: ''
  });
  const { toast } = useToast();

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    toast({
      title: "🚧 Fitur ini belum diimplementasikan—tapi jangan khawatir! Anda bisa memintanya di prompt berikutnya! 🚀",
      duration: 5000,
    });
  };

  return (
    <>
      <Helmet>
        <title>Kontak Kami - Konsultasi Gratis Website Development & Digital Marketing | Caniel Agency</title>
        <meta name="description" content="Hubungi Caniel Agency untuk konsultasi gratis website development, digital marketing, business consulting. Telepon: +62 818 414 951, Email: marketing@caniel.my.id" />
        <meta property="og:title" content="Kontak Kami - Konsultasi Gratis Website Development & Digital Marketing | Caniel Agency" />
        <meta property="og:description" content="Hubungi Caniel Agency untuk konsultasi gratis website development, digital marketing, business consulting. Telepon: +62 818 414 951, Email: marketing@caniel.my.id" />
      </Helmet>

      <div className="pt-16">
        <ContactHero />
        <ContactInfo />
        <ContactForm 
          formData={formData}
          handleInputChange={handleInputChange}
          handleSubmit={handleSubmit}
        />
        <ContactFAQ />
        <ContactCTA handleSubmit={handleSubmit} />
      </div>
    </>
  );
};

export default Contact;