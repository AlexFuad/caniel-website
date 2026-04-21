import React from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { MessageCircle } from 'lucide-react';

const WhatsAppButton = () => {
  const { language, translate } = useLanguage();
  const phoneNumber = '+6288291437432';
  const message = language === 'id' ? 'Halo, saya tertarik dengan layanan Anda' : 'Hello, I am interested in your services';
  
  const handleClick = () => {
    const whatsappUrl = `https://wa.me/${phoneNumber.replace('+', '')}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <button
      onClick={handleClick}
      className="fixed bottom-6 right-6 z-50 flex items-center justify-center w-14 h-14 bg-green-500 hover:bg-green-600 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-110 group"
      aria-label="Contact us on WhatsApp"
    >
      <MessageCircle className="w-6 h-6" />
      <span className="absolute right-full mr-3 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white px-3 py-1 rounded-md text-sm whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
        {translate('contact_us')}
      </span>
    </button>
  );
};

export default WhatsAppButton;
